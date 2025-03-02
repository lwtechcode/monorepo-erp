import { Formik, FormikProps } from 'formik';
import { useEffect, useRef } from 'react';

import { Checkbox, Flex, Grid, Input, Modal, Typography } from '@ant-ui/react';
import Skeleton from '@ant-ui/react/src/components/Skeleton';
import { RequestVerbEnum } from '../../../../../enums';
import { clientSchema } from './schemas';
import { FormProductCategory, ModalAddProductCategoryProps } from './types';

export function ModalAddProductCategory({
  form,
  type,
  onClose,
  handleAddProductCategory,
  handleUpdateProductCategory,
  isFetchingAddProductCategory,
  isFetchingUpdateProductCategory,
  isVisibleModalAddProductCategory,
}: ModalAddProductCategoryProps) {
  const formikRef = useRef<FormikProps<FormProductCategory>>(null);

  const isLoading =
    isFetchingAddProductCategory || isFetchingUpdateProductCategory;

  const isUpdate = type == RequestVerbEnum.PUT;

  const INITIAL_VALUES = {
    name: isUpdate ? form.name : null,
    observation: isUpdate ? form.observation : null,
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
        const PAYLOAD: FormProductCategory = {
          name: data.name,
          observation: data.observation,
          active: data.active,
        };

        isUpdate && form.id
          ? handleUpdateProductCategory({ ...PAYLOAD, id: form.id })
          : handleAddProductCategory({
              ...PAYLOAD,
            });
      }}
      innerRef={formikRef as any}
      validationSchema={clientSchema}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <Modal
          width="90%"
          open={isVisibleModalAddProductCategory}
          onCancel={handleClose}
          onOk={() => handleSubmit()}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <Flex vertical>
              <Typography.Title level={4}>
                Formulário de categoria
              </Typography.Title>

              {!isUpdate ? (
                <Typography.Text type="secondary">
                  Informe os dados da nova categoria
                </Typography.Text>
              ) : (
                <Typography.Text type="secondary">
                  Altere os dados da categoria {form?.name}
                </Typography.Text>
              )}

              <Grid.Row gutter={[12, 12]}>
                <Grid.Col span={24}>
                  <Input
                    aria-label={values.name || 'Name'}
                    value={values.name as string}
                    onChange={({ target }) =>
                      setFieldValue('name', target.value)
                    }
                    placeholder="Informe o nome da categoria"
                  />
                </Grid.Col>

                <Grid.Col span={24}>
                  <Input.TextArea
                    onChange={({ target }) =>
                      setFieldValue('observation', target.value)
                    }
                    value={values.observation as string}
                    placeholder="Informe a observação"
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <Checkbox
                    checked={values.active as boolean}
                    onChange={({ target }) => {
                      setFieldValue('active', target.checked);
                    }}
                  >
                    Categoria ativa
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
