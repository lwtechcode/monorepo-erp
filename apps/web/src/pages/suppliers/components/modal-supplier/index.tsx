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
import { FormSupplier, ModalSupplierProps } from './types';

import { RequestVerbEnum } from '../../../../enums';
import { STATES } from '../../../../utils/constants';
import {
  formatCEP,
  formatCNPJ,
  formatPhone,
} from '../../../../utils/formatters';
import { FormSupplierType } from '../../types';
import { supplierSchema } from './schemas';

export function ModalSupplier({
  form,
  type,
  onClose,
  isLoading,
  handleAddSupplier,
  handleUpdateSupplier,
  isVisibleModalAddSupplier,
}: ModalSupplierProps) {
  const formikRef = useRef<FormikProps<FormSupplierType>>(null);

  const isUpdateClient = type == RequestVerbEnum.PUT;

  const INITIAL_VALUES: FormSupplierType = {
    address: isUpdateClient ? form.address : null,
    cep: isUpdateClient ? form.cep : null,
    city: isUpdateClient ? form.city : null,
    complement: isUpdateClient ? form.complement : null,
    cnpj: isUpdateClient ? form.cnpj : null,
    email: isUpdateClient ? form.email : null,
    name: isUpdateClient ? form.name : null,
    neighborhood: isUpdateClient ? form.neighborhood : null,
    number: isUpdateClient ? form.number : null,
    phone: isUpdateClient ? form.phone : null,
    state: isUpdateClient ? form.state : null,
    observation: isUpdateClient ? form.observation : null,
    active: isUpdateClient ? form.active : true,
  };

  function handleSetDefaultValues() {
    isUpdateClient
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
      onSubmit={(data) => {
        const PAYLOAD: FormSupplier = {
          name: data.name as string,
          address: data.address as string,
          cep: data.cep as string,
          city: data.city as string,
          complement: data.complement as string,
          cnpj: data.cnpj as string,
          email: data.email as string,
          neighborhood: data.neighborhood as string,
          number: data.number as string,
          phone: data.phone as string,
          state: data.state as string,
          observation: data.observation as string,
          active: data?.active as boolean,
        };

        isUpdateClient && form.id
          ? handleUpdateSupplier({ ...PAYLOAD, id: form.id })
          : handleAddSupplier({ ...PAYLOAD });
      }}
      innerRef={formikRef as any}
      validationSchema={supplierSchema}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <Modal
          open={isVisibleModalAddSupplier}
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
              Formulário de fornecedores
            </Typography.Title>

            {!isUpdateClient ? (
              <Typography.Text type="secondary">
                Informe os dados do novo fornecedor
              </Typography.Text>
            ) : (
              <Typography.Text type="secondary">
                Altere os dados do seu fornecedor "{form?.name}"
              </Typography.Text>
            )}

            <Grid.Row gutter={[12, 12]}>
              <Grid.Col span={24}>
                <Typography.Text>Nome*</Typography.Text>

                <Input
                  aria-label={values.name || 'Name'}
                  value={values.name as string}
                  onChange={({ target }) => setFieldValue('name', target.value)}
                  placeholder="Informe o nome do fornecedor"
                />

                {errors.name ? (
                  <Typography.Text type="danger">{errors.name}</Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>CNPJ</Typography.Text>

                <Input
                  maxLength={18}
                  value={formatCNPJ(values.cnpj as string)}
                  placeholder="00.000.000/0000-00"
                  onChange={({ target }) => setFieldValue('cnpj', target.value)}
                />

                {errors.cnpj ? (
                  <Typography.Text type="danger">{errors.cnpj}</Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Telefone</Typography.Text>

                <Input
                  maxLength={15}
                  value={formatPhone(values.phone as string)}
                  placeholder="(00) 00000-0000"
                  onChange={({ target }) =>
                    setFieldValue('phone', target.value)
                  }
                />

                {errors.phone ? (
                  <Typography.Text type="danger">
                    {errors.phone}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>E-mail</Typography.Text>

                <Input
                  value={values.email as string}
                  placeholder="Informe o e-mail"
                  onChange={({ target }) =>
                    setFieldValue('email', target.value)
                  }
                />

                {errors.email ? (
                  <Typography.Text type="danger">
                    {errors.email}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>CEP</Typography.Text>

                <Input
                  value={formatCEP(values.cep as string)}
                  placeholder="XXXXX-XXX"
                  onChange={({ target }) => setFieldValue('cep', target.value)}
                />

                {errors.cep ? (
                  <Typography.Text type="danger">{errors.cep}</Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Endereço</Typography.Text>

                <Input
                  value={values.address as string}
                  placeholder="Informe o endereço"
                  onChange={({ target }) =>
                    setFieldValue('address', target.value)
                  }
                />

                {errors.address ? (
                  <Typography.Text type="danger">
                    {errors.address}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Número</Typography.Text>

                <Input
                  value={values.number as string}
                  placeholder="xxx"
                  onChange={({ target }) =>
                    setFieldValue('number', target.value)
                  }
                />

                {errors.number ? (
                  <Typography.Text type="danger">
                    {errors.number}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Bairro</Typography.Text>

                <Input
                  value={values.neighborhood as string}
                  placeholder="Informe o bairro"
                  onChange={({ target }) =>
                    setFieldValue('neighborhood', target.value)
                  }
                />

                {errors.neighborhood ? (
                  <Typography.Text type="danger">
                    {errors.neighborhood}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Município</Typography.Text>

                <Input
                  value={values.city as string}
                  placeholder="Informe o município"
                  onChange={({ target }) => setFieldValue('city', target.value)}
                />

                {errors.city ? (
                  <Typography.Text type="danger">{errors.city}</Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Estado</Typography.Text>

                  <Select
                    value={values.state as string}
                    placeholder="Selecione o estado"
                    onChange={({ target }) =>
                      setFieldValue('state', target.value)
                    }
                    options={STATES}
                    status={errors.state ? 'error' : undefined}
                  />

                  {errors.state ? (
                    <Typography.Text type="danger">
                      {errors.state}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Complemento</Typography.Text>

                <Input
                  value={values.complement as string}
                  placeholder="Informe o complemento"
                  onChange={({ target }) =>
                    setFieldValue('complement', target.value)
                  }
                />

                {errors.complement ? (
                  <Typography.Text type="danger">
                    {errors.complement}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Observação</Typography.Text>

                <Input.TextArea
                  value={values.observation as string}
                  placeholder="Informe a observação"
                  onChange={({ target }) =>
                    setFieldValue('observation', target.value)
                  }
                />

                {errors.observation ? (
                  <Typography.Text type="danger">
                    {errors.observation}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={24}>
                <Flex vertical>
                  <Checkbox
                    checked={values.active as boolean}
                    onChange={({ target }) => {
                      setFieldValue('active', target.checked);
                    }}
                  >
                    Fornecedor Ativo
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
