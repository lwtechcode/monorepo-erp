import { lazy, Suspense } from 'react';
import { WrapperLoading } from '../../components';

const HomeScreenLazy = lazy(() => import('./home'));

export function HomePage() {
  return (
    <Suspense fallback={<WrapperLoading />}>
      <HomeScreenLazy />
    </Suspense>
  );
}
