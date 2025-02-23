import { Loading } from '@ant-ui/react';
import { lazy, Suspense } from 'react';

const NotFoundScreenLazy = lazy(() => import('./notFound'));

export function NotFoundScreen() {
  return (
    <Suspense fallback={<Loading />}>
      <NotFoundScreenLazy />
    </Suspense>
  );
}
