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
    
    // Validate equipment selection - only require at least one piece of equipment
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
        formData
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

  const handleCheckboxChange = (equipment: string, isChecked: boolean) => {
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
    <Box 
      maxW={{ base: "100%", md: "800px" }} 
      mx="auto" 
      p={{ base: 4, md: 8 }}
    >
      <Heading mb={6} textAlign={{ base: "center", md: "left" }}>Create Your Workout Plan</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel>Fitness Level</FormLabel>
            <Select
              placeholder="Select fitness level"
              value={formData.fitness_level}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, fitness_level: e.target.value })
              }>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>
          </FormControl>


          <FormControl isRequired>
            <FormLabel>Available Equipment</FormLabel>
            <Stack spacing={2}>
              <Checkbox 
                onChange={(e) => handleCheckboxChange('dumbbells', e.target.checked)}
                isChecked={formData.available_equipment.includes('dumbbells')}
              >
                Dumbbells
              </Checkbox>
              <Checkbox 
                onChange={(e) => handleCheckboxChange('barbell', e.target.checked)}
                isChecked={formData.available_equipment.includes('barbell')}
              >
                Barbell
              </Checkbox>
              <Checkbox 
                onChange={(e) => handleCheckboxChange('resistance_bands', e.target.checked)}
                isChecked={formData.available_equipment.includes('resistance_bands')}
              >
                Resistance Bands
              </Checkbox>
              <Checkbox 
                onChange={(e) => handleCheckboxChange('bodyweight_only', e.target.checked)}
                isChecked={formData.available_equipment.includes('bodyweight_only')}
              >
                Bodyweight Only
              </Checkbox>
              <Checkbox 
                onChange={(e) => handleCheckboxChange('gym_machines', e.target.checked)}
                isChecked={formData.available_equipment.includes('gym_machines')}
              >
                Gym Machines
              </Checkbox>
            </Stack>
          </FormControl>


          <FormControl isRequired>
            <FormLabel>Goals</FormLabel>
            <Select
              placeholder="Select primary goal"
              value={formData.goals}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                setFormData({ ...formData, goals: e.target.value })
              }>
              <option value="strength">Build Strength</option>
              <option value="muscle">Build Muscle</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="endurance">Improve Endurance</option>
              <option value="flexibility">Increase Flexibility</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Time per Session (minutes)</FormLabel>
            <NumberInput
              min={15}
              max={120}
              value={formData.time_per_session}
              onChange={(valueString) => handleNumberInputChange('time_per_session', valueString)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Sessions per Week</FormLabel>
            <NumberInput
              min={1}
              max={7}
              value={formData.sessions_per_week}
              onChange={(valueString) => handleNumberInputChange('sessions_per_week', valueString)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Medical Conditions or Injuries (Optional)</FormLabel>
            <Textarea
              placeholder="Enter any medical conditions or injuries we should consider..."
              value={formData.medical_conditions}
              onChange={(e) => setFormData({ ...formData, medical_conditions: e.target.value })}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            size="lg"
            w="100%"
            isLoading={loading}
            loadingText="Generating">
            Generate Workout Plan
          </Button>
        </VStack>
      </form>

      {workoutPlan && (
        <Box 
          mt={8} 
          p={{ base: 4, md: 6 }} 
          borderWidth={1} 
          borderRadius="lg" 
          bg={bgColor}
        >
          <Box 
            className="workout-plan" 
            color={textColor}
            sx={{
              '& h1': {
                color: headingColor,
                fontSize: { base: 'xl', md: '2xl' },
                fontWeight: 'bold',
                mb: 4
              },
              '& h2': {
                color: headingColor,
                fontSize: { base: 'lg', md: 'xl' },
                fontWeight: 'bold',
                mt: 4,
                mb: 2
              },
              '& h3': {
                color: subheadingColor,
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
                color: strongTextColor,
                fontWeight: 'bold'
              },
              '& p': {
                mb: 2
              }
            }}
          >
            <ReactMarkdown>{workoutPlan}</ReactMarkdown>
          </Box>

          {exercises.length > 0 && (
            <Box mt={8}>
              <Heading size="lg" mb={6}>Exercise Details</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {exercises.map((exercise, index) => (
                  <Box
                    key={index}
                    p={4}
                    borderWidth={1}
                    borderRadius="lg"
                    bg={exerciseCardBg}
                  >
                    <VStack align="start" spacing={3}>
                      <Heading size="md">{exercise.name}</Heading>
                      {exercise.image && (
                        <Image
                          src={exercise.image}
                          alt={exercise.name}
                          borderRadius="md"
                          maxH="200px"
                          objectFit="cover"
                        />
                      )}
                      <Text color={exerciseDescColor}>{exercise.description}</Text>
                      <Text>
                        <strong>Sets:</strong> {exercise.sets} | <strong>Reps:</strong> {exercise.reps}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
