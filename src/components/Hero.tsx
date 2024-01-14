import { Box, Button, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { MdHowToReg } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Hero = () => (
  <Flex
    align="center"
    justify={{ base: 'center', md: 'space-around' }}
    direction={{ base: 'column', md: 'row' }}
    wrap="nowrap"
    minH="60vh"
    px={8}
  >
    <Stack spacing={4} w={{ base: '80%', md: '40%' }} align={['center', 'center', 'flex-start', 'flex-start']}>
      <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" textAlign={['center', 'center', 'left', 'left']}>
        AWS Videos
      </Heading>
      <Heading
        as="h2"
        size="md"
        color="primary.800"
        opacity="0.8"
        fontWeight="normal"
        lineHeight={1.5}
        textAlign={['center', 'center', 'left', 'left']}
      >
        Sing up to upload
      </Heading>
      <Link to="singup">
        <Button borderRadius="8px" py="4" px="4" size="lg" colorScheme="teal">
          <Text mr={2}>Create Account</Text>
          <Icon as={MdHowToReg} />
        </Button>
      </Link>
    </Stack>

    <Box w={{ base: '100%', sm: '100%', md: '50%' }} mt={{ base: 12, md: 0 }}>
      <Image src="https://source.unsplash.com/rf6ywHVkrlY" rounded="1rem" shadow="2xl" alt="random CTA image" />
    </Box>
  </Flex>
);
