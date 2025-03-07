import { Flex } from '@ant-ui/react';

import { useGetChartsDashboard } from './hooks';

export default function Home() {
  const { chartsDashboard, isFetchingChartsDashboard, refetchChartsDashboard } =
    useGetChartsDashboard();

  return (
    <Flex>
      <div></div>
    </Flex>
  );
}
