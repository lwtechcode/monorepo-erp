import { Loading } from '@ant-ui/react';
import { lazy, Suspense } from 'react';

const SalesMadeScreenLazy = lazy(() => import('./sales-made'));

export function SalesMadeScreen() {
  return (
    <Suspense fallback={<Loading />}>
      <SalesMadeScreenLazy />
    </Suspense>
  );
}
