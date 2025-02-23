import { Formik } from 'formik';

import { Button, Card, Grid, Input, Space, Typography } from '@ant-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderAuth } from '../../components';
import { RoutesEnum } from '../../enums';
import { useAuthStore } from '../../services/auth';
import { loginSchema } from './schemas';
import { handleAuth } from './services';
import { LoginRequestBody } from './types';

export default function LoginPage() {
  const { setUserAuth, user } = useAuthStore();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: handleAuth,
    onSuccess: (response) => {
      setUserAuth(response);
      navigate(RoutesEnum.Root);
    },
  });

  function sendAuthRequest(body: LoginRequestBody) {
    mutate(body);
  }

  useEffect(() => {
    if (user.token) {
      navigate(RoutesEnum.Root);
    }
  }, []);

  return (
    <Fragment>
      <HeaderAuth buttonType="register" />

      <Grid.Row className="h-svh" align="middle" justify="center">
        <Grid.Col>
          <Card>
            <Typography.Title level={3} className="text-center">
              Minha conta
            </Typography.Title>

            <Typography.Paragraph className="text-justify">
              Utilize seu usuário e senha para acessar o sistema.
            </Typography.Paragraph>

            <Formik
              validateOnChange={false}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(data) => sendAuthRequest(data)}
              validationSchema={loginSchema}
            >
              {({ handleSubmit, values, errors, setFieldValue }) => (
                <Space direction="vertical" size="middle" className="w-full">
                  <Input
                    aria-label="E-mail"
                    value={values.email}
                    onChange={(value) => {
                      setFieldValue('email', value.target.value);
                    }}
                    placeholder="nome@minhaempresa.com.br"
                  />

                  <Input.Password
                    aria-label="password"
                    value={values.password}
                    onChange={(value) => {
                      setFieldValue('password', value.target.value);
                    }}
                    placeholder="••••••••••"
                    type="password"
                  />

                  <Typography.Link
                    onClick={() => navigate(RoutesEnum.RecoveryPassword)}
                  >
                    Esqueci a senha
                  </Typography.Link>

                  <Button
                    block
                    onClick={() => {
                      handleSubmit();
                    }}
                    loading={isPending}
                    type="primary"
                  >
                    Entrar
                  </Button>

                  <Typography.Link
                    onClick={() => navigate(RoutesEnum.Register)}
                  >
                    Ainda não tem cadastro? Registre-se agora
                  </Typography.Link>
                </Space>
              )}
            </Formik>
          </Card>
        </Grid.Col>
      </Grid.Row>
    </Fragment>
  );
}
