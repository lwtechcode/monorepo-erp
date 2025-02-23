import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RoutesEnum } from '../enums';
import {
  BillsToPayPage,
  BillsToReceivePage,
  BudgetsMadeScreen,
  ClientsPage,
  HomePage,
  ProductsPage,
  RegisterPage,
  SettingsPage,
  SuppliersPage,
} from '../pages';

import BudgetPage from '../pages/budget/budget';
import LoginPage from '../pages/login/login';
import NotFoundPage from '../pages/not-found/notFound';
import SalesMadePage from '../pages/sales-made/sales-made';
import SalesPage from '../pages/sales/sales';
import { ProtectedRoute } from '../providers/protected-route';
import { MainLayout } from './main-layout';

const router = createBrowserRouter([
  {
    path: RoutesEnum.Login,
    element: <LoginPage />,
  },
  {
    path: RoutesEnum.Register,
    element: <RegisterPage />,
  },
  {
    path: RoutesEnum.Root,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: RoutesEnum.Root,
        element: <HomePage />,
      },
      {
        path: RoutesEnum.Products,
        element: <ProductsPage />,
      },
      {
        path: RoutesEnum.Suppliers,
        element: <SuppliersPage />,
      },
      {
        path: RoutesEnum.Clients,
        element: <ClientsPage />,
      },
      {
        path: RoutesEnum.Budget,
        element: <BudgetPage />,
      },
      {
        path: RoutesEnum.BudgetMade,
        element: <BudgetsMadeScreen />,
      },
      {
        path: RoutesEnum.Sales,
        element: <SalesPage />,
      },
      {
        path: RoutesEnum.SalesMade,
        element: <SalesMadePage />,
      },
      {
        path: RoutesEnum.BillsToPay,
        element: <BillsToPayPage />,
      },
      {
        path: RoutesEnum.BillsToReceive,
        element: <BillsToReceivePage />,
      },
      {
        path: RoutesEnum.Configs,
        element: <SettingsPage />,
      },
      {
        path: RoutesEnum.NotFound,
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRoutesEnum() {
  return <RouterProvider router={router} />;
}
