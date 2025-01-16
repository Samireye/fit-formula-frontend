import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Heading,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
      toast({
        title: 'Success!',
        description: 'You have been logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log in. Please check your credentials.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      await signInWithGoogle();
      navigate('/');
      toast({
        title: 'Success!',
        description: 'You have been logged in with Google.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log in with Google.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={8} p={8} borderWidth={1} borderRadius="lg" bg={bgColor} borderColor={borderColor}>
      <VStack spacing={4}>
        <Heading size="lg">Log In</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              isLoading={loading}
            >
              Log In
            </Button>
          </VStack>
        </form>

        <Divider />

        <Button
          width="full"
          variant="outline"
          leftIcon={<FcGoogle />}
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>

        <Text>
          Don't have an account?{' '}
          <RouterLink to="/signup" style={{ color: 'blue' }}>
            Sign Up
          </RouterLink>
        </Text>
      </VStack>
    </Box>
  );
}
