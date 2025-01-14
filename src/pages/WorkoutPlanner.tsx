import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

interface WorkoutPlan {
  exercises: string[]
}

export default function WorkoutPlanner() {
  const [fitnessGoal, setFitnessGoal] = useState('')
  const [equipmentAvailable, setEquipmentAvailable] = useState('')
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/generate-workout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fitnessGoal,
          equipmentAvailable,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate workout plan')
      }

      const data = await response.json()
      setWorkoutPlan(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Workout Planner</Heading>
        
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg={useColorModeValue('white', 'gray.700')}
          p={8}
          rounded="lg"
          shadow="base">
          
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Fitness Goal</FormLabel>
              <Select
                placeholder="Select your fitness goal"
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}>
                <option value="strength">Build Strength</option>
                <option value="muscle">Build Muscle</option>
                <option value="endurance">Improve Endurance</option>
                <option value="weight-loss">Weight Loss</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Available Equipment</FormLabel>
              <Input
                placeholder="e.g., dumbbells, resistance bands"
                value={equipmentAvailable}
                onChange={(e) => setEquipmentAvailable(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={loading}>
              Generate Workout Plan
            </Button>
          </Stack>
        </Box>

        {workoutPlan && (
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={8}
            rounded="lg"
            shadow="base">
            <VStack spacing={4} align="stretch">
              <Heading size="md">Your Workout Plan</Heading>
              {workoutPlan.exercises.map((exercise, index) => (
                <Box key={index} p={4} bg={useColorModeValue('gray.50', 'gray.600')} rounded="md">
                  {exercise}
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Container>
  )
}
