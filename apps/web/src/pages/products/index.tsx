import { Fragment, useState } from 'react';

import useDebounce from '../../hooks/useDebounce';

import {
  Button,
  Dropdown,
  Flex,
  Grid,
  Icon,
  Input,
  Link,
  List,
  Space,
  Table,
  TableParams,
  Typography,
} from '@ant-ui/react';
import { RequestVerbEnum } from '../../enums';
import { SortOrderType } from '../../utils/types';
import { ModalProduct } from './components/modal-product';
import { ModalViewProduct } from './components/modal-view-product';
import { useDataTable } from './hooks/useDataTable';
import useProductsMutation from './hooks/useProductMutations';
import { initialValues } from './services';
import {
  FilterProduct,
  FormProduct,
  ProductResponseType,
  ProductType,
  StateType,
} from './types';

export function ProductsPage() {
  const [tableParams, setTableParams] = useState<TableParams<FilterProduct>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [showDetailsDataProduct, setShowDetailsDataProduct] = useState(false);

  const [isVisibleModalAddProduct, setIsVisibleModalAddProduct] =
    useState(false);
  const [stateProduct, setStateProduct] = useState<StateType>({
    type: RequestVerbEnum.POST,
    form: initialValues,
  });
  const [filterProducts, setFilterProducts] = useState<Partial<FilterProduct>>({
    textFilterByNameAndBarCode: '',
    status: '',
    ordered: '',
    categoryId: '',
    discount: false,
  });

  const debounceSearchTerm = useDebounce(
    filterProducts.textFilterByNameAndBarCode as string,
  );

  const { useBreakpoint } = Grid.Root;

  const screens = useBreakpoint();

  const {
    products,
    mutateReport,
    mutateAddProduct,
    isLoadingProducts,
    mutateUpdateProduct,
    suppliersOptions = [],
    productCategoriesOptions = [],
  } = useProductsMutation({
    filterProducts: filterProducts as FilterProduct,
    debounceSearchTerm,
    selectedPage: screens.md
      ? (tableParams?.pagination?.current as number)
      : currentPage,
    setIsVisibleModalAddProduct,
  });

  const isLoading = isLoadingProducts;

  const isEmptyList = Boolean(products?.products?.length);

  function handleAddProduct(product: FormProduct) {
    return mutateAddProduct(product);
  }

  function handleUpdateProduct(product: FormProduct & { id: string }) {
    return mutateUpdateProduct(product);
  }

  function updateProductAction(product: ProductResponseType) {
    setIsVisibleModalAddProduct(true);

    return setStateProduct({
      type: RequestVerbEnum.PUT,
      form: {
        cost_price: product.cost_price,
        name: product.name,
        sale_price: product.sale_price,
        description: product.description,
        discount_tax: product.discount_tax,
        id: product.id,
        location_in_store: product.location_in_store,
        manufacturer: product.manufacturer,
        model: product.model,
        observation: product.observation,
        product_category_id: product.product_category_id,
        product_origin: product.product_origin,
        sku: product.sku,
        stock: product.stock,
        supplier_id: product.supplier_id,
        bar_code: product.bar_code,
        active: product.active,
        productCategory: { name: product?.productCategory?.name as string },
        supplier: { name: product?.supplier?.name as string },
        type: product.type,
      },
    });
  }

  const { columns, data } = useDataTable({
    products: products?.products,
    handleUpdateProduct: updateProductAction,
    handleFilterProducts: setFilterProducts,
  });

  function handleFilterApply() {
    return Boolean(filterProducts.status) || filterProducts.categoryId;
  }

  function handleOrderApply() {
    return (
      Boolean(filterProducts.ordered) ||
      Boolean(filterProducts.textFilterByNameAndBarCode)
    );
  }

  function handleClearFilters() {
    return setFilterProducts({
      textFilterByNameAndBarCode: '',
      categoryId: '',
      ordered: '',
      status: '',
      discount: false,
    });
  }

  function handleOrderedList(orderType: 'name' | 'createdAt' | 'price') {
    return setFilterProducts((prevState) => ({
      ...prevState,
      ordered: orderType,
    }));
  }

  function handleTableChange(pagination: any, filters: any, sorter: any) {
    const orderCreatedDate: { [key in SortOrderType]?: () => void } = {
      ascend: () => handleOrderedList('createdAt'),
      descend: () => handleClearFilters(),
    };

    const orderName: { [key in SortOrderType]?: () => void } = {
      ascend: () => handleOrderedList('name'),
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

  return (
    <Flex className="h-full" justify="center" vertical>
      <Typography.Title level={4}>Produtos</Typography.Title>

      <Flex gap={12}>
        <Input
          placeholder="Pesquise por nome ou Código de Barras"
          onChange={({ target }) => {
            setFilterProducts((prevState) => ({
              ...prevState,
              textFilterByNameAndBarCode: target.value,
            }));
          }}
          value={filterProducts.textFilterByNameAndBarCode}
          allowClear
        />

        {screens.md ? (
          <Fragment>
            {handleFilterApply() || handleOrderApply() ? (
              <Button onClick={handleClearFilters} type="dashed">
                <Icon component="ClearOutlined" />
                {handleOrderApply() ? 'Limpar' : 'Limpar filtros'}
              </Button>
            ) : null}

            {isEmptyList ? (
              <Button
                onClick={() => {
                  mutateReport();
                }}
                type="primary"
              >
                <Icon component="DownloadOutlined" />
                Gerar relatório
              </Button>
            ) : null}

            <Button
              onClick={() => {
                setStateProduct({
                  form: initialValues,
                  type: RequestVerbEnum.POST,
                });

                setIsVisibleModalAddProduct(true);
              }}
              type="primary"
            >
              <Icon component="PlusOutlined" />
              Novo
            </Button>
          </Fragment>
        ) : (
          <Flex>
            <Space>
              <Button
                onClick={() => {
                  setStateProduct({
                    form: initialValues,
                    type: RequestVerbEnum.POST,
                  });
                  setIsVisibleModalAddProduct(true);
                }}
                type="primary"
              >
                <Icon component="PlusOutlined" />
                Novo
              </Button>

              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <Fragment>
                          {isEmptyList ? (
                            <Link
                              onClick={() => {
                                mutateReport();
                              }}
                              loading={isLoading}
                              variant="dashed"
                            >
                              <Icon component="DownloadOutlined" />
                              Gerar relatório
                            </Link>
                          ) : (
                            <Typography.Text>
                              Não há opções a ser exibida! Não foi encontrado
                              produtos!
                            </Typography.Text>
                          )}
                        </Fragment>
                      ),
                      type: 'item',
                      key: 'generate-report',
                    },
                  ],
                }}
                trigger={['click']}
              >
                <Icon className="text-xl" component="EllipsisOutlined" />
              </Dropdown>
            </Space>
          </Flex>
        )}
      </Flex>

      {screens.md ? (
        <Flex className="h-full" justify="start" vertical rootClassName="mt-4">
          <Table
            columns={columns}
            dataSource={data as any}
            loading={isLoading}
            size="small"
            expandable={{
              expandedRowRender: (record: ProductType) => {
                const dataProduct = products?.products.find(
                  ({ id }) => record.id === id,
                );

                return (
                  <Grid.Row className="bg-zinc-200 gap-[24px] p-[8px] rounded-lg">
                    <Grid.Col>
                      <Typography.Paragraph>
                        Código de barra: {dataProduct?.bar_code || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Descrição: {dataProduct?.description || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Taxa de desconto: {dataProduct?.discount_tax}%
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Observação: {dataProduct?.observation || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Localização: {dataProduct?.location_in_store || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Fabricante: {dataProduct?.manufacturer || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Modelo: {dataProduct?.model || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Categoria: {dataProduct?.productCategory?.name || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Origem: {dataProduct?.product_origin || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        SKU: {dataProduct?.sku || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Quantidade em Estoque: {dataProduct?.stock || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Fornencedor: {dataProduct?.supplier?.name || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>

                    <Grid.Col>
                      <Typography.Paragraph>
                        Tipo: {dataProduct?.type || '-'}
                      </Typography.Paragraph>
                    </Grid.Col>
                  </Grid.Row>
                );
              },
            }}
            pagination={{
              ...tableParams.pagination,
              total: products?.totalCount,
              showTotal: (total) => (
                <Flex gap={4}>
                  <Typography.Text className="font-bold">
                    Total de Registros:
                  </Typography.Text>
                  <Typography.Text>{total || 0}</Typography.Text>
                </Flex>
              ),
            }}
            onChange={handleTableChange}
          >
            <Table.Column
              title="Action"
              key="action"
              render={(_: any, record: any) => (
                <Icon component="AccountBookOutlined" />
              )}
            />
          </Table>
        </Flex>
      ) : (
        <Flex className="w-full" vertical>
          <List
            itemLayout="horizontal"
            loading={isLoading}
            dataSource={products?.products}
            pagination={{
              current: currentPage,
              onChange: (page) => {
                setCurrentPage(page);
              },
              pageSize: 20,
              total: products?.totalCount,
            }}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Flex align="center" justify="center">
                    <Button
                      type="text"
                      onClick={() => {
                        const productSelected = products?.products?.find(
                          ({ id }) => {
                            return item.id === id;
                          },
                        );

                        productSelected
                          ? updateProductAction({ ...productSelected })
                          : null;

                        return setIsVisibleModalAddProduct(true);
                      }}
                    >
                      <Icon component="EditOutlined" />
                    </Button>

                    <Button
                      type="text"
                      onClick={() => {
                        const productSelected = products?.products?.find(
                          ({ id }) => {
                            return item.id === id;
                          },
                        );

                        productSelected
                          ? updateProductAction({ ...productSelected })
                          : null;

                        return setShowDetailsDataProduct(true);
                      }}
                    >
                      <Icon component="EyeOutlined" />
                    </Button>
                  </Flex>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={item?.productCategory?.name || '-'}
                />
              </List.Item>
            )}
          />
        </Flex>
      )}

      <ModalProduct
        form={stateProduct.form}
        type={stateProduct.type}
        handleAddProduct={handleAddProduct}
        handleUpdateProduct={handleUpdateProduct}
        isVisibleModalAddProduct={isVisibleModalAddProduct}
        onClose={() => setIsVisibleModalAddProduct(false)}
        suppliersOptions={suppliersOptions || []}
        productCategoriesOptions={productCategoriesOptions || []}
      />

      <ModalViewProduct
        productSelected={stateProduct.form}
        onClose={() => setShowDetailsDataProduct(false)}
        isVisibleModalViewProduct={showDetailsDataProduct}
      />
    </Flex>
  );
}
