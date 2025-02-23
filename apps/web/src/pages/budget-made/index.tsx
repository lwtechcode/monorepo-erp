import { Loading } from '@ant-ui/react';
import { lazy, Suspense } from 'react';

const SaleBudgetsMadeScreenLazy = lazy(() => import('./budget-made'));

export function BudgetsMadeScreen() {
  return (
    <Suspense fallback={<Loading />}>
      <SaleBudgetsMadeScreenLazy />
    </Suspense>
  );
}
