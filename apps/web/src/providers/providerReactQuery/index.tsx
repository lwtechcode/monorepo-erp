import { Flex, Typography, useApp } from '@ant-ui/react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { renderStatus } from '../../utils/functions';

export function ProviderReactQuery({ children }: PropsWithChildren) {
  const { notification } = useApp();

  const queryCache = new QueryCache({
    onSuccess: (data: any) => {
      data?.notifications
        ? data?.notifications?.map(
            ({ description, due_date, status, value }: any) => {
              notification.info({
                message: description,
                description: (
                  <Flex gap={12} vertical>
                    <Typography.Text>Valor à pagar: {value}</Typography.Text>
                    <Typography.Text>
                      Data do vencimento: {due_date}
                    </Typography.Text>
                    {renderStatus(status)}
                  </Flex>
                ),
                duration: 0,
              });
            },
          )
        : null;

      data.message ? notification.success({ message: data.message }) : null;
    },
    onError: (error) => {
      error.message ? notification.error({ message: error.message }) : null;
    },
  });

  const mutationCache = new MutationCache({
    onSuccess: (data: any) => {
      data.message ? notification.success({ message: data.message }) : null;
    },
    onError: (error) => {
      error.message ? notification.error({ message: error.message }) : null;
    },
  });

  const queryClient = new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
