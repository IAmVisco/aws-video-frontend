import { Box, Divider, Flex } from '@chakra-ui/react';
import React from 'react';
import { Footer } from '../components/Footer.tsx';
import { Header } from '../components/Header.tsx';

export const BaseLayout = ({ children, ...rest }: { children: React.ReactNode }) => (
  <Flex direction="column" m="0 auto" minH="100vh" {...rest}>
    <Header />
    <Divider />
    <Box height="100%" flex="1 1 auto">
      {children}
    </Box>
    <Divider />
    <Footer />
  </Flex>
);
