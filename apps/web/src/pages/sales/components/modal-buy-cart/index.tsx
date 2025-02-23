import {
  AutoComplete,
  Flex,
  Grid,
  Icon,
  Input,
  Modal,
  Select,
  Space,
  Statistic,
  Typography,
} from '@ant-ui/react';
import { salesInitialValue, salesSchema, schemaSalesType } from '@lib/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik, FormikErrors, FormikProps } from 'formik';
import { Fragment, useRef, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import { formatCPF, formatMoney } from '../../../../utils/formatters';
import { getAllPaymentMethodsOptions } from '../../../bills-to-receive/services';
import useClientsMutation from '../../../clients/hooks/useClientMutations';
import { QUERY_OPTIONS_METHODS_PAYMENT } from '../../../settings/payment-methods/utils';
import { addSale } from '../../services';
import { ModalNTF } from '../modal-ntf';
import { ModalProps, StateClientFilterType } from './types';

export function ModalBuyCart({
  isOpen,
  onCloseModal,
  total_items,
  productsSelected,
  value_gross,
  setModalNTFstate,
  modalNTFstate,
  handleResetCartProduct,
}: ModalProps) {
  const formikRef = useRef<FormikProps<schemaSalesType>>(null);

  const [filterClients, setFilterClients] = useState<StateClientFilterType>({
    textFilterByNameAndCpf: '',
  });

  const debounceSearchTerm = useDebounce(
    filterClients?.textFilterByNameAndCpf as string,
  );

  const { clients } = useClientsMutation({
    debounceSearchTerm,
    filterClients,
    selectedPage: 1,
    setIsVisibleModalAddClient: () => false,
  });

  const { data: optionsMethodPayments, isLoading: isLoadingMethodPayments } =
    useQuery({
      queryKey: [QUERY_OPTIONS_METHODS_PAYMENT],
      queryFn: getAllPaymentMethodsOptions,
      enabled: isOpen,
    });

  const {
    data: dataAddSale,
    mutate: mutateAddSale,
    isPending: isFetchingAddSale,
  } = useMutation({
    mutationFn: addSale,
  });

  const items = clients?.clients?.length
    ? clients?.clients?.map(({ id, name, cpf }) => ({
        key: id,
        label: (
          <Typography.Text key={name} className="font-semibold">
            {name}
          </Typography.Text>
        ),
        value: name.concat(` (${formatCPF(cpf as string)})`),
      }))
    : [];

  function handleCloseModal() {
    formikRef?.current?.resetForm();

    onCloseModal();
  }

  const OPTIONS_METHOD_PAYMENT = optionsMethodPayments?.map(
    ({ label, value }) => ({
      label,
      value,
    }),
  );

  function applyDiscountAndAdditions(
    value: string,
    discountValue?: string,
    setFieldValue?: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<schemaSalesType>>,
  ) {
    const taxSelected = optionsMethodPayments?.find((option) =>
      option.value.includes(value),
    )?.tax;

    const numberTax = parseFloat(taxSelected as string);

    const valueTotalGross = parseFloat(value_gross);

    const valueDiscount = parseFloat(discountValue as string);

    const isApplyDiscount =
      Boolean(discountValue) && discountValue && discountValue !== '0';

    const valueBase = isApplyDiscount
      ? valueTotalGross - valueDiscount
      : valueTotalGross;

    const valueAddition = numberTax ? (numberTax / 100) * valueBase : 0;

    const newTotalValue = valueAddition + valueBase;

    setFieldValue ? setFieldValue('total_value', newTotalValue) : null;
  }

  function handleSubmitForm(data: schemaSalesType) {
    const listProducts = productsSelected?.map(
      ({ id, quantity, discount_tax, total_value }) => {
        const isDiscountPerProduct =
          Boolean(discount_tax) && discount_tax !== '0';

        const numberTax = parseFloat(discount_tax as string);
        const numberTotal = parseFloat(total_value as string);

        const newValueDiscountApplyed = numberTax * numberTotal + numberTotal;

        return {
          id,
          qty: Number(quantity),
          discounted_price: isDiscountPerProduct
            ? newValueDiscountApplyed
            : null,
        };
      },
    );

    mutateAddSale(
      {
        client_id: data.client_id as string,
        payment_method_id: data.method_payment as string,
        discount: Number(data?.discount as string),
        products: listProducts,
      },
      {
        onSuccess: () => {
          formikRef?.current?.resetForm();
          setModalNTFstate(true);
        },
      },
    );
  }

  return (
    <Fragment>
      <Formik
        initialValues={salesInitialValue}
        onSubmit={(data) => handleSubmitForm(data)}
        innerRef={formikRef}
        validationSchema={salesSchema}
        validateOnChangeValue={false}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleSubmit, values, errors, setFieldValue, initialValues }) => {
          initialValues.total_value = value_gross;

          return (
            <Modal
              open={isOpen}
              onCancel={handleCloseModal}
              confirmLoading={isFetchingAddSale}
              onOk={() => handleSubmit()}
              okText="Finalizar"
              cancelText="Cancelar"
            >
              <Fragment>
                <Typography.Title level={4} className="text-center">
                  Fechamento de venda
                </Typography.Title>

                <Grid.Row gutter={[12, 12]}>
                  <Grid.Col span={24}>
                    <Flex vertical>
                      <Typography.Text>
                        Pesquisar cliente por nome ou CPF
                      </Typography.Text>

                      <AutoComplete
                        aria-label="Pesquisar cliente"
                        placeholder="Pesquisar cliente por nome ou CPF"
                        options={items}
                        value={values.client}
                        onChange={(value: string, option: any) => {
                          setFieldValue('client', value);
                          setFieldValue('client_id', option?.key);

                          setFilterClients({
                            textFilterByNameAndCpf: value as string,
                          });
                        }}
                        allowClear
                        status={errors.client ? 'error' : undefined}
                      />

                      {errors.client ? (
                        <Typography.Text type="danger">
                          {errors.client as string}
                        </Typography.Text>
                      ) : null}
                    </Flex>
                  </Grid.Col>

                  <Grid.Col span={24}>
                    <Flex vertical>
                      <Typography.Text>
                        Selecione a forma de pagamento
                      </Typography.Text>

                      <Select
                        placeholder="Selecione a forma de pagamento"
                        value={values.method_payment}
                        onChange={(value: string) => {
                          setFieldValue('method_payment', value);

                          applyDiscountAndAdditions(
                            value,
                            values.discount as string,
                            setFieldValue,
                          );
                        }}
                        loading={isLoadingMethodPayments}
                        options={OPTIONS_METHOD_PAYMENT}
                        status={errors.method_payment ? 'error' : undefined}
                      />

                      {errors.method_payment ? (
                        <Typography.Text type="danger">
                          {errors.method_payment as string}
                        </Typography.Text>
                      ) : null}
                    </Flex>
                  </Grid.Col>

                  <Grid.Col span={24}>
                    <Typography.Text>Desconto</Typography.Text>

                    <Input
                      aria-label="Desconto R$"
                      placeholder="Informe o desconto"
                      type="number"
                      prefix="R$"
                      value={values.discount as string}
                      onChange={({ target }) => {
                        setFieldValue('discount', target.value);

                        applyDiscountAndAdditions(
                          values.method_payment as string,
                          target.value,
                          setFieldValue,
                        );
                      }}
                    />
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row gutter={[12, 4]} className="mt-4">
                  <Grid.Col span={8}>
                    <Statistic
                      title="Valor Bruto"
                      value={formatMoney(Number(value_gross))}
                    />
                  </Grid.Col>

                  <Grid.Col span={8}>
                    <Statistic
                      title="Descontos"
                      prefix={
                        <Space>
                          <Icon
                            component="ArrowDownOutlined"
                            className="text-red-500"
                          />
                          {!values?.discount ? 'R$' : null}
                        </Space>
                      }
                      value={formatMoney(values?.discount as string)}
                    />
                  </Grid.Col>

                  <Grid.Col span={8}>
                    <Statistic title="Total de itens" value={total_items} />
                  </Grid.Col>

                  <Grid.Col span={8}>
                    <Statistic
                      title="Valor Final"
                      value={formatMoney(values.total_value as string)}
                    />
                  </Grid.Col>
                </Grid.Row>
              </Fragment>
            </Modal>
          );
        }}
      </Formik>

      <ModalNTF
        sale_id={dataAddSale?.id as string}
        isOpen={modalNTFstate}
        onCloseModal={() => {
          handleResetCartProduct();

          setModalNTFstate(false);

          formikRef.current?.resetForm();

          return onCloseModal();
        }}
      />
    </Fragment>
  );
}
