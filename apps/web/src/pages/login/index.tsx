import { Loading } from '@ant-ui/react';
import { lazy, Suspense } from 'react';

const LoginScreenLazy = lazy(() => import('./login'));

export function LoginScreen() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginScreenLazy />
    </Suspense>
  );
}
