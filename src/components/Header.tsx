import { Button, Flex, FlexProps, HStack, Icon, Text, useColorMode, useDisclosure } from '@chakra-ui/react';
import { BsMoonStarsFill, BsSun } from 'react-icons/bs';
import { MdAdd, MdHowToReg, MdLogin, MdLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser.ts';

import { Logo } from './Logo.tsx';
import { UploadModal } from './UploadModal.tsx';

export const Header = (props: FlexProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useUser();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" p={4} {...props}>
      <Logo />

      <HStack align="center" justify="flex-end" spacing={2}>
        <Button title="Toggle Color Mode" onClick={toggleColorMode} variant="ghost" w="fit-content">
          {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
        {user ? (
          <>
            <Button size="md" rounded="md" colorScheme="teal" onClick={onOpen}>
              <Text display={{ base: 'none', md: 'initial' }} mr={2}>
                Upload
              </Text>
              <Icon as={MdAdd} fontSize={18} />
            </Button>
            <Button size="md" rounded="md" variant="ghost" onClick={logOut}>
              <Text display={{ base: 'none', md: 'initial' }} mr={2}>
                Logout
              </Text>
              <Icon as={MdLogout} />
            </Button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <Button size="md" rounded="md" colorScheme="teal">
                <Text display={{ base: 'none', md: 'initial' }} mr={2}>
                  Create Account
                </Text>
                <Icon as={MdHowToReg} />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="md" rounded="md" variant="ghost">
                <Text display={{ base: 'none', md: 'initial' }} mr={2}>
                  Login
                </Text>
                <Icon as={MdLogin} />
              </Button>
            </Link>
          </>
        )}
      </HStack>
      <UploadModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
