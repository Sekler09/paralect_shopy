import { FC, ReactElement } from 'react';

import { SimpleGrid, Center } from '@mantine/core';
import Banner from 'components/Banner';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
    <Center px={32} w="100%" h="100vh" component="main">
      {children}
    </Center>
    <Banner />
  </SimpleGrid>
);

export default UnauthorizedLayout;
