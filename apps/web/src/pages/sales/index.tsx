import { Loading } from '@ant-ui/react';
import { lazy, Suspense } from 'react';

const SalesScreenLazy = lazy(() => import('./sales'));

export function SalesScreen() {
  return (
    <Suspense fallback={<Loading />}>
      <SalesScreenLazy />
    </Suspense>
  );
}
