import { useApp } from '@ant-ui/react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export function ProviderReactQuery({ children }: PropsWithChildren) {
  const { notification } = useApp();

  const queryCache = new QueryCache({
    onSuccess: (data: any) => {
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
