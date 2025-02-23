import {
  AutoComplete,
  Button,
  Flex,
  Grid,
  Statistic,
  Typography,
} from '@ant-ui/react';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useAuthStore } from '../../services/auth';
import { formatMoney } from '../../utils/formatters';
import useProductsMutation from '../products/hooks/useProductMutations';
import { Cart, ModalBuyCart } from './components';
import { useStateCartProducts, useStateFilterProducts } from './hooks';
import { calcTaxDiscount, calcTotalListProducts } from './utils';

export default function SalesPage() {
  const [selectedPage, setSelectedPage] = useState(1);

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

  const { products, isLoadingProducts } = useProductsMutation({
    debounceSearchTerm,
    filterProducts: filterState.context,
    selectedPage,
    setIsVisibleModalAddProduct: () => false,
  });

  const items = products?.products?.length
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
                        calcTaxDiscount(discount_tax as string, sale_price),
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

  const { grossValue, qtyTotal } = calcTotalListProducts(
    stateCart?.context?.products,
  );

  const isLoading = isLoadingProducts;

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
                  value_unit: PRODUCT_SELECTED.sale_price,
                  total_value: PRODUCT_SELECTED.sale_price,
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
