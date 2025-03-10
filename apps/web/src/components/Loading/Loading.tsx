import { Flex, Loading } from '@ant-ui/react';

export function WrapperLoading() {
  return (
    <Flex className="w-full h-full items-center justify-center">
      <Loading />
    </Flex>
  );
}
