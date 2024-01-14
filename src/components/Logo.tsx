import { Icon, Text } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
    <Icon as={FaPlay} fontSize={32} color="teal.200" />
    <Text fontWeight="bold" fontSize={24} ml={2} _hover={{ textDecoration: 'underline' }}>
      AWS Videos
    </Text>
  </Link>
);
