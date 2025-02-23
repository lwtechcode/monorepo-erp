import { Loading } from '@ant-ui/react';
import { lazy, Suspense } from 'react';

const BudgetScreenLazy = lazy(() => import('./budget'));

export function BudgetScreen() {
  return (
    <Suspense fallback={<Loading />}>
      <BudgetScreenLazy />
    </Suspense>
  );
}
