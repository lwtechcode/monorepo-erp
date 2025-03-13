import { Formik, FormikProps } from 'formik';
import { useEffect, useRef } from 'react';

import {
  Checkbox,
  Flex,
  Grid,
  Input,
  Modal,
  Select,
  Typography,
} from '@ant-ui/react';
import { RequestVerbEnum } from '../../../../enums';
import { FormProduct } from '../../types';
import { productSchema } from './schemas';
import { ModalProductProps } from './types';

export function ModalProduct({
  type,
  form,
  onClose,
  isLoading,
  handleAddProduct,
  suppliersOptions,
  handleUpdateProduct,
  productCategoriesOptions,
  isVisibleModalAddProduct,
}: ModalProductProps) {
  const formikRef = useRef<FormikProps<FormProduct>>(null);

  const isUpdateClient = type == RequestVerbEnum.PUT;

  const INITIAL_VALUES = {
    name: isUpdateClient ? form.name : null,
    cost_price: isUpdateClient ? Number(form.cost_price) : null,
    sale_price: isUpdateClient ? Number(form.sale_price) : null,
    description: isUpdateClient ? form.description : null,
    discount_tax: isUpdateClient ? form.discount_tax : null,
    location_in_store: isUpdateClient ? form.location_in_store : null,
    manufacturer: isUpdateClient ? form.manufacturer : null,
    model: isUpdateClient ? form.model : null,
    observation: isUpdateClient ? form.observation : null,
    product_origin: isUpdateClient ? form.product_origin : null,
    sku: isUpdateClient ? form.sku : null,
    stock: isUpdateClient ? form.stock : null,
    product_category_id: isUpdateClient ? form.product_category_id : null,
    supplier_id: isUpdateClient ? form.supplier_id : null,
    bar_code: isUpdateClient ? form.bar_code : null,
    active: isUpdateClient ? form.active : true,
  };

  function handleSetDefaultValues() {
    isUpdateClient
      ? formikRef.current?.setValues(INITIAL_VALUES as any)
      : formikRef.current?.resetForm();
  }

  useEffect(handleSetDefaultValues, [INITIAL_VALUES]);

  function handleClose() {
    onClose();

    return formikRef.current?.resetForm();
  }

  return (
    <Formik
      validateOnChangeValue={false}
      initialValues={INITIAL_VALUES}
      onSubmit={(data) => {
        const PAYLOAD: FormProduct = {
          name: data.name as string,
          discount_tax: data.discount_tax,
          cost_price: Number(data.cost_price),
          sale_price: Number(data.sale_price),
          product_category_id: data.product_category_id as string,
          supplier_id: data.supplier_id as string,
          manufacturer: data.manufacturer as string,
          model: data.model as string,
          product_origin: data.product_origin as string,
          sku: data.sku as string,
          location_in_store: data.location_in_store as string,
          description: data.description as string,
          stock: data.stock as number,
          observation: data.observation as string,
          bar_code: data?.bar_code as string,
          active: data?.active as boolean,
        };

        isUpdateClient && form.id
          ? handleUpdateProduct({ ...PAYLOAD, id: form.id })
          : handleAddProduct({ ...PAYLOAD });
      }}
      innerRef={formikRef as any}
      validationSchema={productSchema}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <Modal
          width="90%"
          open={isVisibleModalAddProduct}
          onCancel={handleClose}
          cancelText="Cancelar"
          okText="Salvar"
          onOk={() => handleSubmit()}
          okButtonProps={{
            loading: isLoading,
          }}
        >
          <Flex vertical>
            <Typography.Title level={4}>
              Formulário de produtos
            </Typography.Title>

            {!isUpdateClient ? (
              <Typography.Text type="secondary">
                Informe os dados do novo produto
              </Typography.Text>
            ) : (
              <Typography.Text type="secondary">
                Altere os dados do produto "{form?.name}"
              </Typography.Text>
            )}

            <Grid.Row gutter={[12, 12]}>
              <Grid.Col span={24}>
                <Typography.Text>Nome*</Typography.Text>

                <Input
                  aria-label={values.name || 'Name'}
                  value={values.name as string}
                  onChange={({ target }) => setFieldValue('name', target.value)}
                  placeholder="Informe o nome do produto"
                />

                {errors.name ? (
                  <Typography.Text type="danger">{errors.name}</Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Código de barras</Typography.Text>

                <Input
                  value={values.bar_code as string}
                  placeholder="Informe o código de barras"
                  onChange={({ target }) =>
                    setFieldValue('bar_code', target.value)
                  }
                />

                {errors.bar_code ? (
                  <Typography.Text type="danger">
                    {errors.bar_code}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Preço de custo*</Typography.Text>

                <Input
                  value={values.cost_price as number}
                  placeholder="Informe o preço de custo"
                  onChange={({ target }) =>
                    setFieldValue('cost_price', target.value)
                  }
                />

                {errors.cost_price ? (
                  <Typography.Text type="danger">
                    {errors.cost_price}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Preço de venda*</Typography.Text>

                <Input
                  value={values.sale_price as number}
                  placeholder="Informe o preço de venda"
                  onChange={({ target }) =>
                    setFieldValue('sale_price', target.value)
                  }
                />

                {errors.sale_price ? (
                  <Typography.Text type="danger">
                    {errors.sale_price}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Desconto (%)</Typography.Text>

                <Input
                  value={values.discount_tax as string}
                  placeholder="0"
                  onChange={({ target }) =>
                    setFieldValue('discount_tax', target.value)
                  }
                />

                {errors.discount_tax ? (
                  <Typography.Text type="danger">
                    {errors.discount_tax}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Selecione a categoria</Typography.Text>

                  <Select
                    value={values.product_category_id}
                    onChange={(value: any) =>
                      setFieldValue('product_category_id', value)
                    }
                    placeholder="Selecione uma categoria"
                    options={productCategoriesOptions}
                    status={errors.product_category_id ? 'error' : undefined}
                  />

                  {errors.product_category_id ? (
                    <Typography.Text type="danger">
                      {errors.product_category_id as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Selecione o fornecedor</Typography.Text>

                  <Select
                    value={values.supplier_id}
                    onChange={(value: any) =>
                      setFieldValue('supplier_id', value)
                    }
                    placeholder="Selecione um fornecedor"
                    options={suppliersOptions}
                    status={errors.supplier_id ? 'error' : undefined}
                  />

                  {errors.supplier_id ? (
                    <Typography.Text type="danger">
                      {errors.supplier_id as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Fabricante do produto</Typography.Text>

                  <Input
                    value={values.manufacturer as string}
                    onChange={({ target }) =>
                      setFieldValue('manufacturer', target.value)
                    }
                    placeholder="Informe o fabricante do produto"
                  />

                  {errors.manufacturer ? (
                    <Typography.Text type="danger">
                      {errors.manufacturer as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Modelo</Typography.Text>

                  <Input
                    value={values.model as string}
                    onChange={({ target }) =>
                      setFieldValue('model', target.value)
                    }
                    placeholder="Informe o modelo do produto"
                  />

                  {errors.model ? (
                    <Typography.Text type="danger">
                      {errors.model as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Origem</Typography.Text>

                  <Select
                    value={values.product_origin}
                    onChange={(value: any) =>
                      setFieldValue('product_origin', value)
                    }
                    placeholder="Selecione um fornecedor"
                    options={[
                      { label: 'Nacional', value: 'N' },
                      { label: 'Importado', value: 'I' },
                    ]}
                    status={errors.product_origin ? 'error' : undefined}
                  />

                  {errors.product_origin ? (
                    <Typography.Text type="danger">
                      {errors.product_origin as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>SKU</Typography.Text>

                  <Input
                    value={values.sku as string}
                    onChange={({ target }) =>
                      setFieldValue('sku', target.value)
                    }
                    placeholder="Informe o SKU"
                  />

                  {errors.sku ? (
                    <Typography.Text type="danger">
                      {errors.sku as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Localização física</Typography.Text>

                  <Input
                    value={values.location_in_store as string}
                    onChange={({ target }) =>
                      setFieldValue('location_in_store', target.value)
                    }
                    placeholder="Informe a localização física do produto na sua loja"
                  />

                  {errors.location_in_store ? (
                    <Typography.Text type="danger">
                      {errors.location_in_store as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Descrição do produto</Typography.Text>

                  <Input.TextArea
                    placeholder="Informe uma descrição para o produto"
                    onChange={({ target }) =>
                      setFieldValue('description', target.value)
                    }
                    value={values.description || ''}
                  />

                  {errors.description ? (
                    <Typography.Text type="danger">
                      {errors.description as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Observação do produto</Typography.Text>

                  <Input.TextArea
                    placeholder="Informe uma observação para o produto"
                    onChange={({ target }) =>
                      setFieldValue('observation', target.value)
                    }
                    value={values.observation || ''}
                  />

                  {errors.observation ? (
                    <Typography.Text type="danger">
                      {errors.observation as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={24}>
                <Flex vertical>
                  <Checkbox
                    checked={values.active as boolean}
                    onChange={({ target }) => {
                      setFieldValue('active', target.checked);
                    }}
                  >
                    Produto Ativo
                  </Checkbox>

                  {errors.active ? (
                    <Typography.Text type="danger">
                      {errors.active as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>
            </Grid.Row>
          </Flex>
        </Modal>
      )}
    </Formik>
  );
}
