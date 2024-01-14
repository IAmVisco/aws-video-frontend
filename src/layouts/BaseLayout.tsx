import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Header } from '../components/Header.tsx';

export const BaseLayout = ({ children, ...rest }: { children: React.ReactNode }) => (
  <Flex direction="column" m="0 auto" {...rest}>
    <Header />
    {children}
  </Flex>
);
