import { Formik, FormikProps } from 'formik';
import { useEffect, useRef } from 'react';

import { Flex, Grid, Input, Modal, Typography } from '@ant-ui/react';
import { RequestVerbEnum } from '../../../../enums';
import {
  formatDateDOMString,
  removeNonNumericCharacters,
} from '../../../../utils/formatters';
import { FormBillToPay } from '../../types';
import billToPaySchema from './schemas';
import { ModalBillToPayProps } from './types';

export function ModalBillToPay({
  type,
  form,
  onClose,
  isLoading,
  handleAddBillToPay,
  handleUpdateBillToPay,
  isVisibleModalBillToPay,
}: ModalBillToPayProps) {
  const formikRef = useRef<FormikProps<FormBillToPay>>(null);

  const isUpdate = type == RequestVerbEnum.PUT;

  const INITIAL_VALUES = {
    creditor: isUpdate ? form.creditor : null,
    description: isUpdate ? form.description : null,
    due_date: isUpdate ? form.due_date : null,
    observation: isUpdate ? form.observation : null,
    pay_date: isUpdate ? form.pay_date : null,
    value: isUpdate ? form.value : null,
  };

  function handleSetDefaultValues() {
    isUpdate
      ? formikRef.current?.setValues(INITIAL_VALUES)
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
      validationSchema={billToPaySchema}
      onSubmit={(data) => {
        const VALUE_UNFORMATED = removeNonNumericCharacters(String(data.value));

        const PAYLOAD: FormBillToPay = {
          value: VALUE_UNFORMATED ? parseInt(VALUE_UNFORMATED) : null,
          creditor: data.creditor ? data.creditor : null,
          description: data.description ? data.description : null,
          due_date: data.due_date ? data.due_date : null,
          observation: data.observation ? data.observation : null,
          pay_date: data.pay_date ? data.pay_date : null,
        };

        isUpdate && form.id
          ? handleUpdateBillToPay({
              ...PAYLOAD,
              id: form.id,
            })
          : handleAddBillToPay(PAYLOAD);
      }}
      innerRef={formikRef as any}
    >
      {({ handleSubmit, values, errors, setFieldValue, validateField }) => (
        <Modal
          width="90%"
          open={isVisibleModalBillToPay}
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
              Formulário de contas a pagar
            </Typography.Title>

            {!isUpdate ? (
              <Typography.Text type="secondary">
                Informe os dados da nova conta a pagar
              </Typography.Text>
            ) : (
              <Typography.Text type="secondary">
                Altere os dados da conta "{form?.description}"
              </Typography.Text>
            )}

            <Grid.Row gutter={[12, 12]}>
              <Grid.Col span={24}>
                <Typography.Text>Descrição</Typography.Text>

                <Input
                  aria-label={values.description || 'Descrição'}
                  value={values.description as string}
                  onChange={({ target }) =>
                    setFieldValue('description', target.value)
                  }
                  placeholder="Informe a descrição"
                />

                {errors.description ? (
                  <Typography.Text type="danger">
                    {errors.description}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Credor</Typography.Text>

                <Input
                  aria-label={values.creditor || 'credor'}
                  value={values.creditor as string}
                  onChange={({ target }) =>
                    setFieldValue('creditor', target.value)
                  }
                  placeholder="Informe o credor"
                />

                {errors.creditor ? (
                  <Typography.Text type="danger">
                    {errors.creditor}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Data de Vencimento</Typography.Text>

                <Input
                  value={formatDateDOMString(values.due_date as string)}
                  onChange={({ target }) =>
                    setFieldValue('due_date', target.value)
                  }
                  placeholder="Informe a data"
                  type="date"
                />

                {errors.due_date ? (
                  <Typography.Text type="danger">
                    {errors.due_date}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Data de Pagamento</Typography.Text>

                <Input
                  value={formatDateDOMString(values.pay_date as string)}
                  onChange={({ target }) =>
                    setFieldValue('pay_date', target.value)
                  }
                  placeholder="Informe a data"
                  type="date"
                />

                {errors.pay_date ? (
                  <Typography.Text type="danger">
                    {errors.pay_date}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Valor</Typography.Text>

                <Input
                  aria-label={String(values.value) || 'Valor'}
                  placeholder="Informe o valor"
                  value={values.value as number}
                  onChange={({ target }) =>
                    setFieldValue('value', target.value)
                  }
                />

                {errors.value ? (
                  <Typography.Text type="danger">
                    {errors.value}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={24}>
                <Typography.Text>Observação</Typography.Text>

                <Input.TextArea
                  placeholder="Informe a observação"
                  onChange={({ target }) =>
                    setFieldValue('observation', target.value)
                  }
                  value={values.observation as string}
                  rows={8}
                />

                {errors.observation ? (
                  <Typography.Text type="danger">
                    {errors.observation}
                  </Typography.Text>
                ) : null}
              </Grid.Col>
            </Grid.Row>
          </Flex>
        </Modal>
      )}
    </Formik>
  );
}
