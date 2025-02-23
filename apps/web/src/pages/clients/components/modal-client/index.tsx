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
import { STATES } from '../../../../utils/constants';
import {
  formatCEP,
  formatCPF,
  formatDateDOMString,
  formatDateForInput,
  formatPhone,
  formatRG,
  removeNonNumericCharacters,
} from '../../../../utils/formatters';
import { clientSchema } from './schemas';
import { FormClientTypes, ModalClientProps } from './types';

export function ModalClient({
  type,
  form,
  onClose,
  isLoading,
  handleAddClient,
  handleUpdateClient,
  isVisibleModalAddClient,
}: ModalClientProps) {
  const formikRef = useRef<FormikProps<FormClientTypes>>(null);

  const isUpdateClient = type == RequestVerbEnum.PUT;

  const INITIAL_VALUES = {
    name: isUpdateClient ? form.name : null,
    address: isUpdateClient ? form?.address : null,
    birthDate: isUpdateClient
      ? formatDateForInput(form?.birthDate as string)
      : null,
    cep: isUpdateClient ? form.cep : null,
    city: isUpdateClient ? form.city : null,
    complement: isUpdateClient ? form.complement : null,
    cpf: isUpdateClient ? form.cpf : null,
    email: isUpdateClient ? form.email : null,
    gender: isUpdateClient ? form.gender : null,
    neighborhood: isUpdateClient ? form.neighborhood : null,
    number: isUpdateClient ? form.number : null,
    phone: isUpdateClient ? form.phone : null,
    rg: isUpdateClient ? form.rg : null,
    state: isUpdateClient ? form.state : null,
    observation: isUpdateClient ? form.observation || null : null,
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
        const cpf = removeNonNumericCharacters(data.cpf as string);
        const rg = removeNonNumericCharacters(data.rg as string);
        const phone = removeNonNumericCharacters(data.phone as string);
        const cep = removeNonNumericCharacters(data.cep as string);

        const PAYLOAD_CLIENT: FormClientTypes = {
          name: data.name as string,
          birthDate: data.birthDate,
          cep: cep,
          city: data.city,
          complement: data.complement,
          cpf: cpf,
          email: data.email,
          gender: data.gender,
          neighborhood: data.neighborhood,
          number: data.number,
          phone: phone,
          rg: rg,
          state: data.state,
          observation: data.observation,
          address: data.address,
          active: data.active,
        };

        isUpdateClient && form.id
          ? handleUpdateClient({ ...PAYLOAD_CLIENT, id: form.id })
          : handleAddClient({
              ...PAYLOAD_CLIENT,
            });
      }}
      innerRef={formikRef as any}
      validationSchema={clientSchema}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <Modal
          open={isVisibleModalAddClient}
          onCancel={handleClose}
          cancelText="Cancelar"
          okText="Salvar"
          onOk={() => handleSubmit()}
          okButtonProps={{
            loading: isLoading,
          }}
        >
          <Flex vertical>
            <h2>Formulário de clientes</h2>

            {!isUpdateClient ? (
              <Typography.Text type="secondary">
                Informe os dados do novo cliente
              </Typography.Text>
            ) : (
              <Typography.Text type="secondary">
                Altere os dados do seu cliente {form?.name}
              </Typography.Text>
            )}

            <Grid.Row gutter={[12, 12]}>
              <Grid.Col span={24}>
                <Typography.Text>Nome*</Typography.Text>

                <Input
                  aria-label={values.name || 'Name'}
                  value={values.name as string}
                  onChange={({ target }) => setFieldValue('name', target.value)}
                  placeholder="Informe o nome do cliente"
                />

                {errors.name ? (
                  <Typography.Text type="danger">{errors.name}</Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>CPF</Typography.Text>

                <Input
                  aria-label={values.cpf || 'cpf'}
                  onChange={({ target }) =>
                    setFieldValue('cpf', formatCPF(target.value))
                  }
                  value={formatCPF(values.cpf as string)}
                  placeholder="000.000.000-00"
                  maxLength={14}
                />

                {errors.cpf ? (
                  <Typography.Text type="danger">{errors.cpf}</Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>RG</Typography.Text>

                <Input
                  aria-label={values.rg || 'rg'}
                  onChange={({ target }) =>
                    setFieldValue('rg', formatRG(target.value))
                  }
                  value={formatRG(values.rg as string)}
                  placeholder="Informe o RG"
                  maxLength={12}
                />

                {errors.rg ? (
                  <Typography.Text type="danger">{errors.rg}</Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Data de nascimento</Typography.Text>

                <Input
                  aria-label={String(values.birthDate) || 'birthDate'}
                  onChange={({ target }) =>
                    setFieldValue('birthDate', target.value)
                  }
                  value={formatDateDOMString(
                    values.birthDate ? String(values.birthDate) : '',
                  )}
                  type="date"
                />

                {errors.birthDate ? (
                  <Typography.Text type="danger">
                    {errors.birthDate}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Selecione o gênero</Typography.Text>

                  <Select
                    aria-label={values.gender || 'gender'}
                    value={values.gender}
                    onChange={(value: any) => setFieldValue('gender', value)}
                    placeholder="Selecione"
                    options={[
                      { label: 'Masculino', value: 'M' },
                      { label: 'Feminino', value: 'F' },
                    ]}
                    status={errors.gender ? 'error' : undefined}
                  />

                  {errors.gender ? (
                    <Typography.Text type="danger">
                      {errors.gender as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Telefone</Typography.Text>

                <Input
                  aria-label={values.phone || 'phone'}
                  onChange={({ target }) =>
                    setFieldValue('phone', formatPhone(target.value))
                  }
                  value={formatPhone(values.phone as string)}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                />

                {errors.phone ? (
                  <Typography.Text type="danger">
                    {errors.phone as string}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>E-mail</Typography.Text>

                <Input
                  aria-label={values.email || 'email'}
                  placeholder="Informe o e-mail"
                  onChange={({ target }) =>
                    setFieldValue('email', target.value)
                  }
                  value={values.email as string}
                />

                {errors.email ? (
                  <Typography.Text type="danger">
                    {errors.email as string}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>CEP</Typography.Text>

                <Input
                  aria-label={values.cep || 'cep'}
                  onChange={({ target }) =>
                    setFieldValue('cep', formatCEP(target.value))
                  }
                  value={formatCEP(values.cep as string)}
                  placeholder="XXXXX-XXX"
                  maxLength={9}
                />

                {errors.cep ? (
                  <Typography.Text type="danger">
                    {errors.cep as string}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Endereço</Typography.Text>

                <Input
                  aria-label={values.address || 'address'}
                  onChange={({ target }) =>
                    setFieldValue('address', target.value)
                  }
                  value={values.address as string}
                  placeholder="Informe o endereço"
                />

                {errors.address ? (
                  <Typography.Text type="danger">
                    {errors.address as string}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Número</Typography.Text>

                <Input
                  aria-label={values.number || 'number'}
                  onChange={({ target }) =>
                    setFieldValue('number', target.value)
                  }
                  value={values.number as string}
                  placeholder="xxx"
                />

                {errors.number ? (
                  <Typography.Text type="danger">
                    {errors.number as string}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Bairro</Typography.Text>

                <Input
                  aria-label={values.neighborhood || 'neighborhood'}
                  onChange={({ target }) =>
                    setFieldValue('neighborhood', target.value)
                  }
                  value={values.neighborhood as string}
                  placeholder="Informe o bairro"
                />

                {errors.neighborhood ? (
                  <Typography.Text type="danger">
                    {errors.neighborhood as string}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Cidade</Typography.Text>

                <Input
                  aria-label={values.city || 'city'}
                  onChange={({ target }) => setFieldValue('city', target.value)}
                  value={values.city as string}
                  placeholder="Informe o município"
                />

                {errors.city ? (
                  <Typography.Text type="danger">
                    {errors.city as string}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Flex vertical>
                  <Typography.Text>Selecione o estado</Typography.Text>

                  <Select
                    aria-label={values.state || 'state'}
                    onChange={(state: any) => setFieldValue('state', state)}
                    value={values.state}
                    placeholder="Selecione"
                    options={STATES}
                  />

                  {errors.state ? (
                    <Typography.Text type="danger">
                      {errors.state as string}
                    </Typography.Text>
                  ) : null}
                </Flex>
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Complemento</Typography.Text>

                <Input
                  aria-label={values.complement || 'complement'}
                  onChange={({ target }) =>
                    setFieldValue('complement', target.value)
                  }
                  value={values.complement as string}
                  placeholder="Informe o complemento"
                />

                {errors.complement ? (
                  <Typography.Text type="danger">
                    {errors.complement as string}
                  </Typography.Text>
                ) : null}
              </Grid.Col>

              <Grid.Col span={12}>
                <Typography.Text>Observação</Typography.Text>

                <Input
                  aria-label={values.observation || 'observation'}
                  onChange={({ target }) =>
                    setFieldValue('observation', target.value)
                  }
                  value={values.observation as string}
                  placeholder="Informe a observação"
                />

                {errors.observation ? (
                  <Typography.Text type="danger">
                    {errors.observation as string}
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
                  Cliente Ativo
                </Checkbox>
              </Grid.Col>
            </Grid.Row>
          </Flex>
        </Modal>
      )}
    </Formik>
  );
}
