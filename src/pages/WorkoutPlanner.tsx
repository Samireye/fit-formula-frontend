import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Heading,
  useToast,
  Textarea,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  SimpleGrid,
  Image,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import ReactMarkdown from 'react-markdown'
import '../styles/workout-plan.css'

interface FormData {
  fitness_level: string
  available_equipment: string[]
  goals: string
  time_per_session: number
  sessions_per_week: number
  medical_conditions: string
}

interface WorkoutPlanResponse {
  workout_plan: string
  metadata: {
    generated_at: string
    fitness_level: string
    goals: string
  }
  exercises: {
    name: string
    description: string
    sets: number
    reps: number
    image: string
  }[]
}

const equipmentOptions = ['dumbbells', 'barbell', 'resistance_bands', 'bodyweight_only', 'gym_machines']

export default function WorkoutPlanner(): JSX.Element {
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [workoutPlan, setWorkoutPlan] = useState<string>('')
  const [exercises, setExercises] = useState<WorkoutPlanResponse['exercises']>([])
  
  // Move color mode values to top level
  const bgColor = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const headingColor = useColorModeValue('blue.600', 'blue.200')
  const subheadingColor = useColorModeValue('gray.700', 'gray.300')
  const strongTextColor = useColorModeValue('gray.700', 'gray.200')
  const exerciseCardBg = useColorModeValue('white', 'gray.800')
  const exerciseDescColor = useColorModeValue('gray.600', 'gray.300')

  const [formData, setFormData] = useState<FormData>({
    fitness_level: '',
    available_equipment: [],
    goals: '',
    time_per_session: 60,
    sessions_per_week: 3,
    medical_conditions: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    
    // Validate equipment selection
    if (formData.available_equipment.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one piece of equipment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    // Validate other required fields
    if (!formData.fitness_level || !formData.goals) {
      toast({
        title: 'Error',
        description: 'Please fill out all required fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setLoading(true)

    try {
      const response = await axios.post<WorkoutPlanResponse>(
        `${import.meta.env.VITE_API_URL}/workout`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      
      setWorkoutPlan(response.data.workout_plan)
      setExercises(response.data.exercises || [])
      toast({
        title: 'Success!',
        description: 'Your workout plan has been generated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error:', error)
      const axiosError = error as AxiosError<{ detail: string }>
      toast({
        title: 'Error',
        description: axiosError.response?.data?.detail || 'Failed to generate workout plan. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNumberInputChange = (field: keyof Pick<FormData, 'time_per_session' | 'sessions_per_week'>, value: string): void => {
    const numValue = parseInt(value)
    if (!isNaN(numValue)) {
      setFormData(prev => ({
        ...prev,
        [field]: numValue
      }))
    }
  }

  const handleEquipmentChange = (equipment: string, isChecked: boolean) => {
    setFormData(prev => {
      if (isChecked) {
        return {
          ...prev,
          available_equipment: [...prev.available_equipment, equipment]
        }
      } else {
        return {
          ...prev,
          available_equipment: prev.available_equipment.filter(e => e !== equipment)
        }
      }
    })
  }

  return (
    <Box maxW="800px" mx="auto" p={{ base: 4, md: 8 }}>
      <Heading mb={6} fontSize={{ base: "xl", md: "2xl" }}>Create Your Workout Plan</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Fitness Level</FormLabel>
            <Select
              placeholder="Select fitness level"
              value={formData.fitness_level}
              size={{ base: "sm", md: "md" }}
              onChange={(e) => setFormData({ ...formData, fitness_level: e.target.value })}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Available Equipment</FormLabel>
            <Stack spacing={2}>
              {equipmentOptions.map((equipment) => (
                <Checkbox
                  key={equipment}
                  isChecked={formData.available_equipment.includes(equipment)}
                  onChange={(e) => handleEquipmentChange(equipment, e.target.checked)}
                  size={{ base: "sm", md: "md" }}>
                  {equipment}
                </Checkbox>
              ))}
            </Stack>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Goals</FormLabel>
            <Select
              placeholder="Select your goal"
              value={formData.goals}
              size={{ base: "sm", md: "md" }}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}>
              <option value="strength">Build Strength</option>
              <option value="muscle">Build Muscle</option>
              <option value="endurance">Improve Endurance</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="general_fitness">General Fitness</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Time per Session (minutes)</FormLabel>
            <NumberInput
              min={15}
              max={120}
              step={15}
              value={formData.time_per_session}
              size={{ base: "sm", md: "md" }}
              onChange={(valueString) => {
                const value = parseInt(valueString)
                if (!isNaN(value)) {
                  setFormData(prev => ({ ...prev, time_per_session: value }))
                }
              }}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Sessions per Week</FormLabel>
            <NumberInput
              min={1}
              max={7}
              value={formData.sessions_per_week}
              size={{ base: "sm", md: "md" }}
              onChange={(valueString) => {
                const value = parseInt(valueString)
                if (!isNaN(value)) {
                  setFormData(prev => ({ ...prev, sessions_per_week: value }))
                }
              }}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Medical Conditions (Optional)</FormLabel>
            <Textarea
              value={formData.medical_conditions || ''}
              size={{ base: "sm", md: "md" }}
              onChange={(e) => setFormData({ ...formData, medical_conditions: e.target.value })}
              placeholder="List any medical conditions that might affect your workout"
            />
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={loading}
            loadingText="Generating"
            size={{ base: "md", md: "lg" }}
            w="full">
            Generate Workout Plan
          </Button>
        </VStack>
      </form>

      {workoutPlan && (
        <Box 
          mt={{ base: 6, md: 8 }} 
          p={{ base: 4, md: 6 }} 
          borderWidth={1} 
          borderRadius="lg" 
          bg={useColorModeValue('white', 'gray.700')}>
          <Heading size={{ base: "md", md: "lg" }} mb={4}>
            Your Personalized Workout Plan
          </Heading>
          <Box 
            className="workout-plan"
            fontSize={{ base: "sm", md: "md" }}
            sx={{
              '& h2': {
                color: useColorModeValue('blue.600', 'blue.200'),
                fontSize: { base: 'lg', md: 'xl' },
                fontWeight: 'bold',
                mt: 4,
                mb: 2
              },
              '& h3': {
                color: useColorModeValue('gray.700', 'gray.300'),
                fontSize: { base: 'md', md: 'lg' },
                fontWeight: 'semibold',
                mt: 3,
                mb: 2
              },
              '& ul': {
                listStyle: 'disc',
                pl: 4,
                mb: 3
              },
              '& li': {
                mb: 2
              },
              '& strong': {
                color: useColorModeValue('gray.700', 'gray.200')
              }
            }}>
            <ReactMarkdown>{workoutPlan}</ReactMarkdown>
          </Box>
        </Box>
      )}
    </Box>
  )
}
