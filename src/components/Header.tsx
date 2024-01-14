import { Button, Flex, FlexProps, HStack, Icon, Text } from '@chakra-ui/react';
import { MdHowToReg, MdLogin } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Logo } from './Logo.tsx';

const Header = (props: FlexProps) => (
  <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" mb={4} p={4} {...props}>
    <Logo />

    <HStack align="center" justify="flex-end" spacing={2}>
      <Link to="/signup">
        <Button size="md" rounded="md" colorScheme="teal">
          <Text display={{ base: 'none', md: 'initial' }} mr={2}>
            Create Account
          </Text>
          <Icon as={MdHowToReg} />
        </Button>
      </Link>
      <Link to="/login">
        <Button size="md" rounded="md" bg="transparent">
          <Text display={{ base: 'none', md: 'initial' }} mr={2}>
            Login
          </Text>
          <Icon as={MdLogin} />
        </Button>
      </Link>
    </HStack>
  </Flex>
);

export { Header };
