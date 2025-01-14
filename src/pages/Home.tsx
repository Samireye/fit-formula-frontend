import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Home() {
  return (
    <Container maxW="container.xl" py={20}>
      <VStack spacing={8} textAlign="center">
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, blue.400, green.400)"
          bgClip="text"
          fontWeight="extrabold">
          Your AI-Powered Fitness Journey Starts Here
        </Heading>
        
        <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')} maxW="2xl">
          FitFormula.AI combines cutting-edge AI technology with scientific research 
          to create personalized workout and meal plans tailored to your goals.
        </Text>

        <Box pt={6}>
          <Button
            as={RouterLink}
            to="/workout-planner"
            colorScheme="blue"
            size="lg"
            mr={4}>
            Create Workout Plan
          </Button>
          <Button
            as={RouterLink}
            to="/meal-planner"
            colorScheme="green"
            size="lg">
            Plan Your Meals
          </Button>
        </Box>
      </VStack>
    </Container>
  )
}
