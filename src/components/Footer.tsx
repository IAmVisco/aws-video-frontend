import { HStack, Icon, Link as ChakraLink, Text } from '@chakra-ui/react';
import { MdLaunch } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <HStack justify="center" mt={2}>
    <ChakraLink as={Link} to="https://github.com/IAmVisco/aws-video-frontend" target="_blank" rel="noopener noreferrer">
      Frontend code <Icon as={MdLaunch} pt={1} />
    </ChakraLink>
    <Text>&bull;</Text>
    <ChakraLink as={Link} to="https://github.com/IAmVisco/aws-video-backend" target="_blank" rel="noopener noreferrer">
      Backend code <Icon as={MdLaunch} pt={1} />
    </ChakraLink>
  </HStack>
);
