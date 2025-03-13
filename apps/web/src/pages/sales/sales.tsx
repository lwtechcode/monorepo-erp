import {
  AutoComplete,
  Button,
  Flex,
  Grid,
  Statistic,
  TableParams,
  Typography,
} from '@ant-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { useAuthStore } from '../../services/auth';
import { formatMoney } from '../../utils/formatters';
import { SortOrderType } from '../../utils/types';
import { useGetByIdBudgetMade } from '../budget-made/hooks';
import useProductsMutation from '../products/hooks/useProductMutations';
import { Cart, ModalBuyCart } from './components';
import { useStateCartProducts, useStateFilterProducts } from './hooks';
import { calcTaxDiscount, calcTotalListProducts } from './utils';

export default function SalesPage() {
  const { isBudget, idBudget } = useLocation().state;

  const [tableParams, setTableParams] = useState<TableParams<any>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [modalBuyCart, setModalBuyCart] = useState(false);
  const [modalNTFstate, setModalNTFstate] = useState(false);

  const { user } = useAuthStore();

  const { filterState, handleTextFilterChange, handleReset } =
    useStateFilterProducts();

  const {
    stateCart,
    handleAddNewProduct,
    handleRemoveProduct,
    handleUpdateProduct,
    handleResetCartProduct,
  } = useStateCartProducts();

  const debounceSearchTerm = useDebounce(
    filterState.context.textFilterByNameAndBarCode,
  );

  const { budgetIdMade, isFetchingBudgetIdMade } = useGetByIdBudgetMade({
    idBudgetMade: idBudget,
    enabled: isBudget,
  });

  const { products, isLoadingProducts } = useProductsMutation({
    debounceSearchTerm,
    filterProducts: filterState.context,
    selectedPage: tableParams?.pagination?.current as number,
    setIsVisibleModalAddProduct: () => false,
  });

  function handleClearFilters() {
    return handleReset();
  }

  function handleTableChange(pagination: any, filters: any, sorter: any) {
    const orderCreatedDate: { [key in SortOrderType]?: () => void } = {
      // ascend: () => handleOrderedList('createdAt'),
      descend: () => handleClearFilters(),
    };

    const orderName: { [key in SortOrderType]?: () => void } = {
      // ascend: () => handleOrderedList('name'),
      descend: () => handleClearFilters(),
    };

    if (sorter.columnKey?.includes('createdAt')) {
      // Checa se a ordem do sorter está definida e se existe uma função correspondente no mapeamento
      const orderAction = orderCreatedDate[sorter.order as SortOrderType];

      orderAction ? orderAction() : null; // Executa a função correspondente
    }

    if (sorter.columnKey?.includes('name')) {
      // Checa se a ordem do sorter está definida e se existe uma função correspondente no mapeamento
      const orderAction = orderName[sorter.order as SortOrderType];

      orderAction ? orderAction() : null; // Executa a função correspondente
    }

    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      return [];
    }
  }

  const itemsBudget = budgetIdMade?.products_sale_budgets?.length
    ? budgetIdMade?.products_sale_budgets?.map(
        ({ id, name, sale_price, discount_tax, bar_code, manufacturer }) => {
          return {
            key: id,
            label: (
              <Flex key={name} vertical>
                <Flex justify="space-between">
                  <Typography.Text className="font-semibold">
                    {name}
                  </Typography.Text>
                  {Number(discount_tax) > 0 ? (
                    <Typography.Text className="font-bold">
                      <s> {formatMoney(Number(sale_price))}</s>
                    </Typography.Text>
                  ) : null}
                </Flex>

                <Flex justify="space-between">
                  <Typography.Text type="secondary">
                    {manufacturer}
                  </Typography.Text>

                  {Number(discount_tax) > 0 ? (
                    <Typography.Text>
                      {formatMoney(
                        calcTaxDiscount(
                          String(discount_tax),
                          String(sale_price),
                        ),
                      )}
                    </Typography.Text>
                  ) : (
                    <Typography.Text className="font-bold">
                      {formatMoney(Number(sale_price))}
                    </Typography.Text>
                  )}
                </Flex>
              </Flex>
            ),
            value: bar_code ? name.concat(` (${bar_code})`) : name,
          };
        },
      )
    : [];

  const itemsProducts = products?.products?.length
    ? products?.products?.map(
        ({ id, name, manufacturer, sale_price, discount_tax, bar_code }) => {
          return {
            key: id,
            label: (
              <Flex key={name} vertical>
                <Flex justify="space-between">
                  <Typography.Text className="font-semibold">
                    {name}
                  </Typography.Text>
                  {Number(discount_tax) > 0 ? (
                    <Typography.Text className="font-bold">
                      <s> {formatMoney(Number(sale_price))}</s>
                    </Typography.Text>
                  ) : null}
                </Flex>

                <Flex justify="space-between">
                  <Typography.Text type="secondary">
                    {manufacturer}
                  </Typography.Text>

                  {Number(discount_tax) > 0 ? (
                    <Typography.Text>
                      {formatMoney(
                        calcTaxDiscount(
                          discount_tax as string,
                          String(sale_price),
                        ),
                      )}
                    </Typography.Text>
                  ) : (
                    <Typography.Text className="font-bold">
                      {formatMoney(Number(sale_price))}
                    </Typography.Text>
                  )}
                </Flex>
              </Flex>
            ),
            value: bar_code ? name.concat(` (${bar_code as string})`) : name,
          };
        },
      )
    : [];

  const items = isBudget ? itemsBudget : itemsProducts;

  const { grossValue, qtyTotal } = calcTotalListProducts(
    stateCart?.context?.products,
  );

  const isLoading = isLoadingProducts || (isBudget && isFetchingBudgetIdMade);

  function handleSetDefaultProductsBudget() {
    return budgetIdMade?.products_sale_budgets?.map(
      ({ bar_code, product_id, discount_tax, name, qty, original_price }) => {
        handleAddNewProduct({
          id: product_id,
          bar_code: String(bar_code),
          discount_tax: `${discount_tax || 0}`,
          product: name,
          quantity: qty,
          value_unit: original_price,
          total_value: budgetIdMade.total_value,
          discount_amount: null,
        });
      },
    );
  }

  useEffect(() => {
    if (isBudget) {
      handleSetDefaultProductsBudget();
    }
  }, []);

  return (
    <Flex flex={1} vertical justify="space-between">
      <Grid.Row gutter={[32, 20]} justify="space-between" align="bottom">
        <Grid.Col span={12}>
          <Typography.Title level={4}>Nova venda</Typography.Title>

          <AutoComplete
            options={items}
            placeholder="Pesquisar produto"
            className="w-full"
            filterOption
            value={filterState.context.textFilterByNameAndBarCode}
            onChange={(value, option: any) => {
              handleTextFilterChange(value as string);

              const PRODUCT_SELECTED = products?.products?.find(
                ({ id }) => id === option?.key,
              );

              if (PRODUCT_SELECTED) {
                handleAddNewProduct({
                  id: PRODUCT_SELECTED.id as string,
                  product: PRODUCT_SELECTED.name,
                  value_unit: PRODUCT_SELECTED.sale_price as string,
                  total_value: PRODUCT_SELECTED.sale_price as string,
                  quantity: '1',
                  bar_code: PRODUCT_SELECTED.bar_code,
                  discount_amount: null,
                  discount_tax: PRODUCT_SELECTED.discount_tax,
                });

                handleReset();
              }
            }}
            allowClear
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex vertical align="flex-end" justify="end">
            <Typography.Text>Vendedor</Typography.Text>

            <Typography.Text className="text-2xl">{user.name}</Typography.Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={24}>
          <Typography.Title level={4}>Lista de produtos</Typography.Title>

          <Cart
            isLoading={isLoading}
            stateCart={stateCart}
            tableParams={tableParams}
            handleTableChange={handleTableChange}
            handleRemoveProduct={handleRemoveProduct}
            handleUpdateProduct={handleUpdateProduct}
          />
        </Grid.Col>
      </Grid.Row>

      <Grid.Row gutter={[12, 12]} justify="space-between" align="bottom">
        <Grid.Col span={4}>
          <Statistic
            title="Quantidade total"
            value={calcTotalListProducts(stateCart?.context?.products).qtyTotal}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <Statistic
            title="Valor total"
            value={formatMoney(
              calcTotalListProducts(stateCart?.context?.products).total,
            )}
          />
        </Grid.Col>

        <Flex align="flex-end" justify="flex-end">
          <Button
            disabled={!Boolean(stateCart?.context?.products.length)}
            onClick={() => {
              setModalBuyCart(true);
            }}
            type="primary"
          >
            Finalizar venda
          </Button>
        </Flex>
      </Grid.Row>

      <ModalBuyCart
        modalNTFstate={modalNTFstate}
        isOpen={modalBuyCart}
        setModalNTFstate={setModalNTFstate}
        onCloseModal={() => {
          setModalBuyCart(false);
        }}
        total_items={qtyTotal.toString()}
        value_gross={grossValue.toString()}
        handleResetCartProduct={handleResetCartProduct}
        productsSelected={
          stateCart?.context?.products.length
            ? stateCart?.context?.products
            : []
        }
      />
    </Flex>
  );
}
