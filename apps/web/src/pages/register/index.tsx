import { Loading } from '@ant-ui/react';
import { lazy, Suspense } from 'react';

const RegisterScreenLazy = lazy(() => import('./register'));

export function RegisterPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RegisterScreenLazy />
    </Suspense>
  );
}
