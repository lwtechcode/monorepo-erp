import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ReactDOM from 'react-dom/client';
import { AppRoutesEnum } from './routes';

import { AppComponent, ConfigProvider, EmptyData } from '@ant-ui/react';

import './index.css';
import { ProviderReactQuery } from './providers/providerReactQuery';

function customizeRenderEmpty() {
  return <EmptyData />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppComponent>
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <ProviderReactQuery>
        <AppRoutesEnum />
        <ReactQueryDevtools />
      </ProviderReactQuery>
    </ConfigProvider>
  </AppComponent>,
);
