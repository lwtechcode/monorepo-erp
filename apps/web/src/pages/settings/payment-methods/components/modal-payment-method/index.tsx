import { Formik, FormikProps } from 'formik';
import { useEffect, useRef } from 'react';

import { Checkbox, Flex, Grid, Input, Modal, Typography } from '@ant-ui/react';
import Skeleton from '@ant-ui/react/src/components/Skeleton';
import { RequestVerbEnum } from '../../../../../enums';
import paymentMethodSchema from './schemas';
import { FormPaymentMethod, ModalAddPaymentMethodProps } from './types';

export function ModalPaymentMethod({
  form,
  type,
  onClose,
  isLoading,
  handleAddPaymentMethod,
  handleUpdatePaymentMethod,
  isVisibleModalAddPaymentMethod,
}: ModalAddPaymentMethodProps) {
  const formikRef = useRef<FormikProps<FormPaymentMethod>>(null);

  const isUpdate = type == RequestVerbEnum.PUT;

  const INITIAL_VALUES = {
    name: isUpdate ? form.name : null,
    observation: isUpdate ? form.observation : null,
    tax: isUpdate ? form.tax : null,
    active: isUpdate ? form.active : true,
  };

  function handleClose() {
    onClose();
    formikRef.current?.resetForm();
  }

  function handleSetDefaultValues() {
    isUpdate
      ? formikRef.current?.setValues(INITIAL_VALUES)
      : formikRef.current?.resetForm();
  }

  useEffect(handleSetDefaultValues, [INITIAL_VALUES]);

  return (
    <Formik
      validateOnChangeValue={false}
      initialValues={INITIAL_VALUES}
      onSubmit={(data) => {
        const PAYLOAD: FormPaymentMethod = {
          name: data.name,
          observation: data.observation,
          active: data.active,
          tax: data.tax,
        };

        isUpdate && form.id
          ? handleUpdatePaymentMethod({ ...PAYLOAD, id: form.id })
          : handleAddPaymentMethod({
              ...PAYLOAD,
            });
      }}
      innerRef={formikRef as any}
      validationSchema={paymentMethodSchema}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <Modal
          open={isVisibleModalAddPaymentMethod}
          onCancel={handleClose}
          onOk={() => handleSubmit()}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <Flex vertical>
              <Typography.Text>
                Formulário de método de pagamento
              </Typography.Text>

              {!isUpdate ? (
                <Typography.Text type="secondary">
                  Informe os dados do novo método de pagamento
                </Typography.Text>
              ) : (
                <Typography.Text type="secondary">
                  Altere os dados do método de pagamento {form?.name}
                </Typography.Text>
              )}

              <Grid.Row gutter={[12, 12]}>
                <Grid.Col span={24}>
                  <Typography.Text>Nome*</Typography.Text>

                  <Input
                    aria-label={values.name || 'Name'}
                    value={values.name as string}
                    onChange={({ target }) =>
                      setFieldValue('name', target.value)
                    }
                    placeholder="Informe o nome do método de pagamento"
                  />

                  {errors.name ? (
                    <Typography.Text type="danger">
                      {errors.name}
                    </Typography.Text>
                  ) : null}
                </Grid.Col>

                <Grid.Col span={24}>
                  <Typography.Text>Taxa</Typography.Text>

                  <Input
                    aria-label={values.tax || 'Tax'}
                    value={values.tax as string}
                    onChange={({ target }) =>
                      setFieldValue('tax', target.value)
                    }
                    placeholder="Informe a taxa do método de pagamento"
                  />

                  {errors.tax ? (
                    <Typography.Text type="danger">
                      {errors.tax}
                    </Typography.Text>
                  ) : null}
                </Grid.Col>

                <Grid.Col span={24}>
                  <Typography.Text>Observação</Typography.Text>

                  <Input.TextArea
                    value={values.observation as string}
                    onChange={({ target }) =>
                      setFieldValue('observation', target.value)
                    }
                    placeholder="Informe a observação"
                  />

                  {errors.observation ? (
                    <Typography.Text type="danger">
                      {errors.observation}
                    </Typography.Text>
                  ) : null}
                </Grid.Col>

                <Grid.Col span={12}>
                  <Checkbox
                    checked={values.active as boolean}
                    onChange={({ target }) => {
                      setFieldValue('active', target.checked);
                    }}
                  >
                    Método de pagamento
                  </Checkbox>
                </Grid.Col>
              </Grid.Row>
            </Flex>
          )}
        </Modal>
      )}
    </Formik>
  );
}
