import { Loading } from '@ant-ui/react';
import { lazy, Suspense } from 'react';

const HomeScreenLazy = lazy(() => import('./home'));

export function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeScreenLazy />
    </Suspense>
  );
}
