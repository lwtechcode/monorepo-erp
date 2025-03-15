import {
  Button,
  Flex,
  Grid,
  Input,
  Select,
  Space,
  Typography,
} from '@ant-ui/react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../enums';
import { isAuthenticated } from '../../services/auth';
import { STATES } from '../../utils/constants';
import { formatCEP, formatCNPJ, formatPhone } from '../../utils/formatters';
import { useRegister } from './hooks';
import { schemaRegister } from './schemas';
import { RegisterFormTypes } from './types';

export default function RegisterScreen() {
  const navigate = useNavigate();

  const { mutateRegister, isFetchingRegister } = useRegister();

  function handleSubmitFormRegister(dataForm: RegisterFormTypes) {
    mutateRegister({
      company: {
        city: dataForm.city,
        cnpj: dataForm.cnpj,
        name: dataForm.name,
        email: dataForm.email,
        phone: dataForm.phone,
        state: dataForm.state,
        street: dataForm.street,
        number: dataForm.number,
        zipCode: dataForm.zipCode,
        complement: dataForm.complement,
        neighborhood: dataForm.neighborhood,
      },
      adminUser: {
        email: dataForm.email,
        name: dataForm.nameUser,
        password: dataForm.passwordUser,
      },
    });
  }

  return (
    <Grid.Row className="h-svh">
      <Grid.Col span={8} className="bg-gray-100 h-full overflow-y-auto">
        <Flex vertical className="h-full" align="center" justify="center">
          <Flex
            className="bg-blue-100 w-[80px] h-[80px] rounded-full"
            vertical
            align="center"
            justify="center"
          >
            <Typography.Link
              onClick={() => {
                isAuthenticated()
                  ? navigate(RoutesEnum.Root)
                  : navigate(RoutesEnum.Login);
              }}
              className="text-black"
            >
              Logo
            </Typography.Link>
          </Flex>

          <Flex vertical justify="center" align="center">
            <Formik
              validateOnChange={false}
              initialValues={{
                name: '',
                cnpj: '',
                phone: '',
                email: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                zipCode: '',
                nameUser: '',
                emailUser: '',
                passwordUser: '',
              }}
              onSubmit={(data) => handleSubmitFormRegister(data)}
              validationSchema={schemaRegister}
            >
              {({ handleSubmit, values, setFieldValue, errors }) => (
                <Space
                  direction="vertical"
                  size="middle"
                  className="w-full px-24"
                >
                  <Grid.Row gutter={[8, 8]}>
                    <Grid.Col span={24}>
                      <Typography.Text>E-mail*</Typography.Text>

                      <Input
                        aria-label="E-mail"
                        value={values.email}
                        onChange={(value) => {
                          setFieldValue('email', value.target.value);
                        }}
                        placeholder="e-mail@minhaempresa.com.br"
                      />

                      {errors.email ? (
                        <Typography.Text type="danger">
                          {errors.email}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={24}>
                      <Typography.Text>CNPJ*</Typography.Text>

                      <Input
                        aria-label="CNPJ"
                        value={values.cnpj}
                        onChange={(value) => {
                          setFieldValue('cnpj', formatCNPJ(value.target.value));
                        }}
                        placeholder="00.000.000/0000-00"
                        maxLength={18}
                      />

                      {errors.cnpj ? (
                        <Typography.Text type="danger">
                          {errors.cnpj}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={24}>
                      <Typography.Text>Nome fantasia*</Typography.Text>

                      <Input
                        aria-label="Nome fantasia"
                        value={values.name}
                        onChange={(value) => {
                          setFieldValue('name', value.target.value);
                        }}
                        placeholder="Ex.: Empresa Gestão Comercial"
                      />

                      {errors.name ? (
                        <Typography.Text type="danger">
                          {errors.name}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={24}>
                      <Typography.Text>Usuário*</Typography.Text>

                      <Input
                        aria-label="Usuário"
                        value={values.nameUser}
                        onChange={(value) => {
                          setFieldValue('nameUser', value.target.value);
                        }}
                        placeholder="Ex.: gestor"
                      />

                      {errors.nameUser ? (
                        <Typography.Text type="danger">
                          {errors.nameUser}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={24}>
                      <Typography.Text>Telefone*</Typography.Text>

                      <Input
                        aria-label="Telefone"
                        value={values.phone}
                        onChange={(value) => {
                          setFieldValue(
                            'phone',
                            formatPhone(value.target.value),
                          );
                        }}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                      />

                      {errors.phone ? (
                        <Typography.Text type="danger">
                          {errors.phone}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={24}>
                      <Typography.Text>Senha*</Typography.Text>

                      <Input.Password
                        aria-label="Senha"
                        value={values.passwordUser}
                        onChange={(value) => {
                          setFieldValue('passwordUser', value.target.value);
                        }}
                        placeholder="••••••••••"
                        type="password"
                      />

                      {errors.passwordUser ? (
                        <Typography.Text type="danger">
                          {errors.passwordUser}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>
                  </Grid.Row>

                  <Grid.Row gutter={[8, 8]}>
                    <Grid.Col span={24}>
                      <Typography.Text>CEP*</Typography.Text>

                      <Input
                        aria-label="CEP"
                        value={values.zipCode}
                        onChange={(value) => {
                          setFieldValue(
                            'zipCode',
                            formatCEP(value.target.value),
                          );
                        }}
                        placeholder="00000-00"
                        maxLength={9}
                      />

                      {errors.zipCode ? (
                        <Typography.Text type="danger">
                          {errors.zipCode}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={18}>
                      <Typography.Text>Logradouro*</Typography.Text>

                      <Input
                        aria-label="Logradouro"
                        value={values.street}
                        onChange={(value) => {
                          setFieldValue('street', value.target.value);
                        }}
                        placeholder="Logradouro"
                      />

                      {errors.street ? (
                        <Typography.Text type="danger">
                          {errors.street}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <Typography.Text>Número*</Typography.Text>

                      <Input
                        aria-label="Número"
                        value={values.number}
                        onChange={(value) => {
                          setFieldValue('number', value.target.value);
                        }}
                        placeholder="Número"
                      />

                      {errors.number ? (
                        <Typography.Text type="danger">
                          {errors.number}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={12}>
                      <Typography.Text>Bairro*</Typography.Text>

                      <Input
                        aria-label="Bairro"
                        value={values.neighborhood}
                        onChange={(value) => {
                          setFieldValue('neighborhood', value.target.value);
                        }}
                        placeholder="Bairro"
                      />

                      {errors.neighborhood ? (
                        <Typography.Text type="danger">
                          {errors.neighborhood}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={12}>
                      <Typography.Text>Cidade*</Typography.Text>

                      <Input
                        aria-label="Cidade"
                        value={values.city}
                        onChange={(value) => {
                          setFieldValue('city', value.target.value);
                        }}
                        placeholder="Cidade"
                      />

                      {errors.city ? (
                        <Typography.Text type="danger">
                          {errors.city}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>

                    <Grid.Col span={24}>
                      <Flex vertical>
                        <Typography.Text>Estado*</Typography.Text>

                        <Select
                          aria-label="Estado"
                          value={values.state}
                          onChange={(value) => {
                            setFieldValue('state', value);
                          }}
                          options={STATES}
                          placeholder="Selecione o estado"
                        />

                        {errors.state ? (
                          <Typography.Text type="danger">
                            {errors.state}
                          </Typography.Text>
                        ) : null}
                      </Flex>
                    </Grid.Col>

                    <Grid.Col span={24}>
                      <Typography.Text>Complemento</Typography.Text>

                      <Input
                        aria-label="Complemento"
                        value={values.complement}
                        onChange={(value) => {
                          setFieldValue('complement', value.target.value);
                        }}
                        placeholder="Complemento"
                      />

                      {errors.complement ? (
                        <Typography.Text type="danger">
                          {errors.complement}
                        </Typography.Text>
                      ) : null}
                    </Grid.Col>
                  </Grid.Row>

                  <Button
                    block
                    onClick={() => {
                      handleSubmit();
                    }}
                    type="primary"
                    loading={isFetchingRegister}
                  >
                    Cadastrar
                  </Button>

                  <Flex vertical justify="center" align="center">
                    <Typography.Link
                      onClick={() => navigate(RoutesEnum.RecoveryPassword)}
                    >
                      Esqueci a senha
                    </Typography.Link>

                    <Flex justify="center" align="center" gap={2}>
                      <Typography.Text>Já tenho um cadastro?</Typography.Text>
                      <Typography.Link
                        onClick={() => navigate(RoutesEnum.Login)}
                      >
                        Entrar com e-mail e senha
                      </Typography.Link>
                    </Flex>
                  </Flex>
                </Space>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Grid.Col>

      <Grid.Col span={16} className="h-full">
        <Flex vertical justify="center" align="center" className="h-full">
          <Typography.Text strong className="text-xl">
            Seja Bem Vindo!
          </Typography.Text>
        </Flex>
      </Grid.Col>
    </Grid.Row>
  );
}
