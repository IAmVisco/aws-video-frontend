import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { authService, LoginFormValues } from '../services/AuthService.ts';

export const LoginForm = ({ mode }: { mode: 'login' | 'signup' }) => {
  const isLogin = mode === 'login';
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values: LoginFormValues) =>
    authService[isLogin ? 'login' : 'signUp'](values)
      .then(() => {
        navigate('/videos');
      })
      .catch((e) => {
        setError('password', { type: 'custom', message: e?.response?.data?.message ?? e.message });
      });

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            {isLogin ? 'Login' : 'Sign up'}
          </Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('gray.50', 'gray.700')} boxShadow="lg" p={8} minW="350px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl isRequired isInvalid={!!errors.name}>
                <Input
                  id="name"
                  placeholder="Username"
                  type="text"
                  {...register('name', {
                    required: 'Username is required',
                    minLength: { value: 6, message: 'Minimum length should be 6' },
                    maxLength: { value: 32, message: 'Must be under 32 symbols' },
                  })}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                {/* Spacer to avoid layout shift */}
                <Text
                  fontSize="sm"
                  mt={2}
                  lineHeight="normal"
                  display={{ base: errors.name?.message ? 'none' : 'inherit' }}
                >
                  &nbsp;
                </Text>
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.password}>
                <InputGroup>
                  <Input
                    id="password"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Minimum length should be 6' },
                      maxLength: { value: 64, message: 'Must be under 64 symbols' },
                    })}
                  />
                  <InputRightElement h="full">
                    <Button variant="ghost" onClick={() => setShowPassword((showPass) => !showPass)}>
                      {showPassword ? <Icon as={MdVisibility} /> : <Icon as={MdVisibilityOff} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                <Text
                  fontSize="sm"
                  mt={2}
                  lineHeight="normal"
                  display={{ base: errors.password?.message ? 'none' : 'inherit' }}
                >
                  &nbsp;
                </Text>
              </FormControl>

              <Button
                loadingText={isLogin ? 'Logging you in...' : 'Creating your account...'}
                size="lg"
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                mb={2}
              >
                {isLogin ? 'Login' : 'Sign up'}
              </Button>

              <Text align="center">
                {isLogin ? 'Need an account? ' : 'Already a user? '}
                <ChakraLink as={Link} to={isLogin ? '/signup' : '/login'} color="blue.400">
                  {isLogin ? 'Sign up' : 'Login'}
                </ChakraLink>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
