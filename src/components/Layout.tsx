import React from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgGradient = useColorModeValue(
    'linear(to-r, teal.500, blue.500)',
    'linear(to-r, teal.200, blue.200)'
  )
  const textColor = useColorModeValue('white', 'gray.800')

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box
        as="nav"
        bg={useColorModeValue('white', 'gray.800')}
        borderBottom="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Heading size="lg" bgGradient="linear(to-r, blue.400, teal.400)" bgClip="text">
                FitFormula.AI
              </Heading>
            </Link>
            <HStack spacing={8}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Text color={useColorModeValue('gray.600', 'gray.200')}>Home</Text>
              </Link>
              <Link to="/workout" style={{ textDecoration: 'none' }}>
                <Text color={useColorModeValue('gray.600', 'gray.200')}>Workout Planner</Text>
              </Link>
              <Link to="/meal" style={{ textDecoration: 'none' }}>
                <Text color={useColorModeValue('gray.600', 'gray.200')}>Meal Planner</Text>
              </Link>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <Text color={useColorModeValue('gray.600', 'gray.200')}>Pricing</Text>
              </Link>
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" pb={8}>
        {children}
      </Container>
    </Box>
  )
}
