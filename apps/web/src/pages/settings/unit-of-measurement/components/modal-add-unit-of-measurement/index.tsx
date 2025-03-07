import { Formik, FormikProps } from 'formik';
import { useEffect, useRef } from 'react';

import { Checkbox, Flex, Grid, Input, Modal, Typography } from '@ant-ui/react';
import Skeleton from '@ant-ui/react/src/components/Skeleton';
import { RequestVerbEnum } from '../../../../../enums';
import { unitOfMeasurementSchema } from './schemas';
import { FormUnitOfMeasurement, ModalAddUnitOfMeasurementProps } from './types';

export function ModalAddUnitOfMeasurement({
  form,
  type,
  onClose,
  handleAddUnitOfMeasurement,
  handleUpdateUnitOfMeasurement,
  isFetchingAddUnitOfMeasurement,
  isFetchingUpdateUnitOfMeasurement,
  isVisibleModalAddUnitOfMeasurement,
}: ModalAddUnitOfMeasurementProps) {
  const formikRef = useRef<FormikProps<FormUnitOfMeasurement>>(null);

  const isLoading =
    isFetchingAddUnitOfMeasurement || isFetchingUpdateUnitOfMeasurement;

  const isUpdate = type == RequestVerbEnum.PUT;

  const INITIAL_VALUES = {
    name: isUpdate ? form.name : null,
    abbreviation: isUpdate ? form.abbreviation : null,
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
        const PAYLOAD: FormUnitOfMeasurement = {
          name: data.name,
          abbreviation: data.abbreviation,
          active: data.active,
        };

        isUpdate && form.id
          ? handleUpdateUnitOfMeasurement({ ...PAYLOAD, id: form.id })
          : handleAddUnitOfMeasurement({
              ...PAYLOAD,
            });
      }}
      innerRef={formikRef as any}
      validationSchema={unitOfMeasurementSchema}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <Modal
          open={isVisibleModalAddUnitOfMeasurement}
          onCancel={handleClose}
          onOk={() => handleSubmit()}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <Flex vertical>
              <Typography.Title level={4}>
                Formulário de unidade de medida
              </Typography.Title>

              {!isUpdate ? (
                <Typography.Text type="secondary">
                  Informe os dados da nova unidade de medida
                </Typography.Text>
              ) : (
                <Typography.Text type="secondary">
                  Altere os dados da unidade de medida "{form?.name}"
                </Typography.Text>
              )}

              <Grid.Row gutter={[12, 12]}>
                <Typography.Text>Nome*</Typography.Text>

                <Grid.Col span={24}>
                  <Input
                    value={values.name as string}
                    aria-label={values.name || 'Name'}
                    onChange={({ target }) =>
                      setFieldValue('name', target.value)
                    }
                    placeholder="Informe o nome da categoria"
                  />

                  {errors.name ? (
                    <Typography.Text type="danger">
                      {errors.name}
                    </Typography.Text>
                  ) : null}
                </Grid.Col>

                <Grid.Col span={24}>
                  <Typography.Text>Abreviação</Typography.Text>

                  <Input.TextArea
                    value={values.abbreviation as string}
                    onChange={({ target }) =>
                      setFieldValue('abbreviation', target.value)
                    }
                    placeholder="Informe a abreviação"
                  />

                  {errors.abbreviation ? (
                    <Typography.Text type="danger">
                      {errors.abbreviation}
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
                    Unidade de medida ativa
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
