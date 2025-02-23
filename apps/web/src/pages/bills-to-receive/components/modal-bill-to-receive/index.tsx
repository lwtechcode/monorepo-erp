import { Formik, FormikProps } from 'formik';

import { Flex, Grid, Input, Modal, Select, Typography } from '@ant-ui/react';
import { useEffect, useRef } from 'react';
import { RequestVerbEnum } from '../../../../enums';
import {
  formatDateDOMString,
  removeNonNumericCharacters,
} from '../../../../utils/formatters';
import { FormBillToReceive } from '../../types';
import billToReceiveSchema from './schemas';
import { ModalBillToReceiveProps } from './types';

export function ModalBillToReceive({
  type,
  form,
  onClose,
  clientsOptions = [],
  handleAddBillToReceive,
  handleUpdateBillToReceive,
  isVisibleModalBillToReceive,
}: ModalBillToReceiveProps) {
  const formikRef = useRef<FormikProps<FormBillToReceive>>(null);

  const isUpdate = type == RequestVerbEnum.PUT;

  const INITIAL_VALUES = {
    client_id: isUpdate ? form.client_id : null,
    company_id: null,
    description: isUpdate ? form.description : null,
    due_date: isUpdate ? form.due_date : null,
    id: isUpdate ? form.id : null,
    observation: isUpdate ? form.observation : null,
    receipt_date: isUpdate ? form.receipt_date : null,
    value: isUpdate ? String(Number(form.value).toFixed(2)) : null,
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
      validationSchema={billToReceiveSchema}
      onSubmit={(data) => {
        const VALUE_UNFORMATED = removeNonNumericCharacters(String(data.value));

        const PAYLOAD: FormBillToReceive = {
          due_date: data.due_date,
          client_id: data.client_id,
          description: data.description,
          observation: data.observation,
          receipt_date: data.receipt_date,
          value: Number(VALUE_UNFORMATED),
        };

        isUpdate && form.id
          ? handleUpdateBillToReceive({
              ...PAYLOAD,
              id: form.id,
            })
          : handleAddBillToReceive(PAYLOAD);
      }}
      innerRef={formikRef as any}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <Modal
          open={isVisibleModalBillToReceive}
          onCancel={handleClose}
          cancelText="Cancelar"
          okText="Salvar"
          onOk={() => handleSubmit()}
          okButtonProps={
            {
              // loading: isLoading,
            }
          }
        >
          <Flex vertical>
            <Typography.Text>Formulário de contas a receber</Typography.Text>

            {isUpdate ? (
              <Typography.Text type="secondary">
                Informe os dados da nova conta a receber
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
                <Flex vertical>
                  <Typography.Text>Selecione o Cliente</Typography.Text>

                  <Select
                    value={values.client_id}
                    options={clientsOptions}
                    onChange={(value) => {
                      setFieldValue('client_id', value);
                    }}
                    placeholder="Selecione"
                  />

                  {errors.client_id ? (
                    <Typography.Text type="danger">
                      {errors.client_id}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Valor</Typography.Text>

                <Input
                  aria-label={String(values.value) || 'Valor'}
                  placeholder="Informe o valor"
                  onChange={({ target }) =>
                    setFieldValue('value', target.value)
                  }
                  value={values.value ? String(values.value) : ''}
                />

                {errors.value ? (
                  <Typography.Text type="danger">
                    {errors.value}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Data do vencimento</Typography.Text>

                <Input
                  value={formatDateDOMString(values.due_date as string)}
                  onChange={({ target }) =>
                    setFieldValue('due_date', target.value)
                  }
                  placeholder="Informe a data"
                  type="date"
                />

                {errors?.due_date ? (
                  <Typography.Text type="danger">
                    {errors?.due_date}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Data de recebimento</Typography.Text>

                <Input
                  value={formatDateDOMString(values.receipt_date as string)}
                  onChange={({ target }) =>
                    setFieldValue('receipt_date', target.value)
                  }
                  placeholder="Informe a data"
                  type="date"
                />

                {errors?.receipt_date ? (
                  <Typography.Text type="danger">
                    {errors?.receipt_date}
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
