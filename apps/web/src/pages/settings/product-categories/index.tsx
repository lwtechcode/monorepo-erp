import {
  Button,
  Flex,
  Icon,
  Input,
  Table,
  TableParams,
  Typography,
} from '@ant-ui/react';
import { useState } from 'react';
import { RequestVerbEnum } from '../../../enums';
import useDebounce from '../../../hooks/useDebounce';
import { ModalAddProductCategory } from './components/modal-add-product-category';
import {
  FormProductCategory,
  StateType,
} from './components/modal-add-product-category/types';
import useDataTable from './hooks/useDataTable';
import useProductCategoriesMutation from './hooks/useProductCategoryMutations';
import { initialValues } from './services';
import { FilterProductCategory, ProductCategory } from './types';

export default function ProductCategories() {
  const [tableParams, setTableParams] = useState<TableParams<any>>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const [stateProductCategory, setStateProductCategory] = useState<StateType>({
    type: RequestVerbEnum.POST,
    form: initialValues,
  });

  const [
    isVisibleModalAddProductCategory,
    setIsVisibleModalAddProductCategory,
  ] = useState(false);

  const [filterProductCategories, setFilterProductCategories] =
    useState<FilterProductCategory>({
      name: '',
      status: '',
      ordered: '',
    });

  const debounceSearchTerm = useDebounce(filterProductCategories.name);

  const {
    isFetchingProductCategories,
    productCategories,
    isFetchingAddProductCategories,
    isFetchingUpdateProductCategory,
    mutateAddProductCategory,
    mutateUpdateProductCategory,
  } = useProductCategoriesMutation({
    debounceSearchTerm,
    filterProductCategories,
    selectedPage: tableParams?.pagination?.current as number,
    setIsVisibleModalAddProductCategory,
  });

  function updateProductCategoryAction(
    productCategory: ProductCategory & { id: string },
  ) {
    setStateProductCategory({
      type: RequestVerbEnum.PUT,
      form: {
        name: productCategory.name,
        observation: productCategory.observation || '',
        active: productCategory?.active || false,
        id: productCategory?.id,
      },
    });

    setIsVisibleModalAddProductCategory(true);
  }

  const { columns, data } = useDataTable({
    productCategories: productCategories?.productCategories,
    handleUpdateProductCategories: updateProductCategoryAction,
    handleFilterProductCategories: setFilterProductCategories,
  });

  const isLoading = isFetchingProductCategories;

  const isEmptyList = Boolean(productCategories?.productCategories?.length);

  function handleAddClient(productCategory: FormProductCategory) {
    mutateAddProductCategory(productCategory);
  }

  function handleUpdateClient(
    productCategory: FormProductCategory & { id: string },
  ) {
    mutateUpdateProductCategory(productCategory);
  }

  function handleOrderedList(orderType: 'name' | 'createdAt') {
    setFilterProductCategories((prevState) => ({
      ...prevState,
      ordered: orderType,
    }));
  }

  function handleClearFilters() {
    setFilterProductCategories({
      name: '',
      status: '',
      ordered: '',
    });
  }

  function handleFilterApply() {
    return Boolean(filterProductCategories.status);
  }

  function handleOrderApply() {
    return (
      Boolean(filterProductCategories.ordered) ||
      Boolean(filterProductCategories.name)
    );
  }

  return (
    <Flex className="h-full" justify="center" vertical>
      <Flex gap={12}>
        <Input
          placeholder="Pesquise por nome"
          onChange={({ target }) => {
            setFilterProductCategories({
              ...filterProductCategories,
              name: target.value,
            });
          }}
          value={filterProductCategories.name}
          allowClear
        />

        {handleFilterApply() || handleOrderApply() ? (
          <Button onClick={handleClearFilters} type="dashed">
            <Icon component="ClearOutlined" />
            {handleOrderApply() ? 'Limpar' : 'Limpar filtros'}
          </Button>
        ) : null}

        <Button
          onClick={() => {
            setStateProductCategory({
              form: initialValues,
              type: RequestVerbEnum.POST,
            });
            setIsVisibleModalAddProductCategory(true);
          }}
          type="primary"
        >
          <Icon component="PlusOutlined" />
          Novo
        </Button>
      </Flex>

      <Flex className="h-full" justify="start" vertical rootClassName="mt-4">
        <Table
          columns={columns as any}
          dataSource={data}
          size="small"
          loading={isLoading}
          pagination={{
            ...tableParams.pagination,
            total: productCategories?.totalCount,
            showTotal: (total) => (
              <Flex gap={4}>
                <Typography.Text className="font-bold">
                  Total de Registros:
                </Typography.Text>
                <Typography.Text>{total || 0}</Typography.Text>
              </Flex>
            ),
          }}
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

      <ModalAddProductCategory
        form={stateProductCategory.form}
        handleAddProductCategory={handleAddClient}
        handleUpdateProductCategory={handleUpdateClient}
        isFetchingAddProductCategory={isFetchingAddProductCategories}
        isFetchingUpdateProductCategory={isFetchingUpdateProductCategory}
        isVisibleModalAddProductCategory={isVisibleModalAddProductCategory}
        onClose={() => setIsVisibleModalAddProductCategory(false)}
        type={stateProductCategory.type}
      />
    </Flex>
  );
}
