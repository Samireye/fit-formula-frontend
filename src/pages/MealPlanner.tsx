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
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Checkbox,
  Text,
} from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import ReactMarkdown from 'react-markdown'
import '../styles/workout-plan.css'

interface FormData {
  age: number
  gender: string
  weight: number // in lbs
  height: number // in inches
  activity_level: string
  goal: string
  dietary_restrictions: string[]
}

interface MealPlanResponse {
  meal_plan: string
  calculations: {
    bmr: number
    tdee: number
    target_calories: number
  }
}

export default function MealPlanner(): JSX.Element {
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [mealPlan, setMealPlan] = useState<string>('')
  const [calculations, setCalculations] = useState<MealPlanResponse['calculations'] | null>(null)
  
  // Move all color mode values to the top level
  const calculationsBg = useColorModeValue('blue.50', 'blue.900')
  const calculationsTextColor = useColorModeValue('gray.700', 'gray.200')
  const mealPlanBg = useColorModeValue('white', 'gray.700')
  const mealPlanTextColor = useColorModeValue('gray.800', 'gray.100')
  const h2Color = useColorModeValue('blue.600', 'blue.200')
  const h3Color = useColorModeValue('gray.700', 'gray.300')
  const strongColor = useColorModeValue('gray.700', 'gray.200')
  
  const [formData, setFormData] = useState<FormData>({
    age: 30,
    gender: '',
    weight: 150,
    height: 67, // 5'7" in inches
    activity_level: '',
    goal: '',
    dietary_restrictions: [],
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    // Validate all required fields
    const requiredFields = {
      gender: 'Gender',
      activity_level: 'Activity Level',
      goal: 'Goal'
    }

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key as keyof typeof requiredFields])
      .map(([_, label]) => label)

    if (missingFields.length > 0) {
      toast({
        title: 'Required Fields Missing',
        description: `Please fill out: ${missingFields.join(', ')}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setLoading(true)

    try {
      const response = await axios.post<MealPlanResponse>(
        'http://localhost:8003/api/generate-meal-plan',
        formData
      )
      
      setMealPlan(response.data.meal_plan)
      setCalculations(response.data.calculations)
      toast({
        title: 'Success!',
        description: 'Your meal plan has been generated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error:', error)
      const axiosError = error as AxiosError<{ detail: string }>
      toast({
        title: 'Error',
        description: axiosError.response?.data?.detail || 'Failed to generate meal plan. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDietaryRestrictionChange = (restriction: string, isChecked: boolean) => {
    setFormData(prev => {
      if (isChecked) {
        return {
          ...prev,
          dietary_restrictions: [...prev.dietary_restrictions, restriction]
        }
      } else {
        return {
          ...prev,
          dietary_restrictions: prev.dietary_restrictions.filter(r => r !== restriction)
        }
      }
    })
  }

  return (
    <Box maxW="800px" mx="auto" p={8}>
      <Heading mb={6}>Create Your Meal Plan</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl>
            <FormLabel>Age</FormLabel>
            <NumberInput
              min={18}
              max={100}
              value={formData.age}
              onChange={(valueString) => {
                const value = parseInt(valueString)
                if (!isNaN(value)) {
                  setFormData(prev => ({ ...prev, age: value }))
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
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Select gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Weight (lbs)</FormLabel>
            <NumberInput
              min={80}
              max={400}
              value={formData.weight}
              onChange={(valueString) => {
                const value = parseInt(valueString)
                if (!isNaN(value)) {
                  setFormData(prev => ({ ...prev, weight: value }))
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
            <FormLabel>Height (inches)</FormLabel>
            <NumberInput
              min={48}
              max={96}
              value={formData.height}
              onChange={(valueString) => {
                const value = parseInt(valueString)
                if (!isNaN(value)) {
                  setFormData(prev => ({ ...prev, height: value }))
                }
              }}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize="sm" color="gray.600" mt={1}>
              Example: 5'7" = 67 inches
            </Text>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Activity Level</FormLabel>
            <Select
              placeholder="Select activity level"
              value={formData.activity_level}
              onChange={(e) => setFormData({ ...formData, activity_level: e.target.value })}>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="lightly_active">Lightly Active (1-3 days/week)</option>
              <option value="moderately_active">Moderately Active (3-5 days/week)</option>
              <option value="very_active">Very Active (6-7 days/week)</option>
              <option value="extra_active">Extra Active (very active + physical job)</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Goal</FormLabel>
            <Select
              placeholder="Select goal"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}>
              <option value="weight_loss">Weight Loss</option>
              <option value="weight_gain">Weight Gain</option>
              <option value="maintenance">Maintenance</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Dietary Restrictions</FormLabel>
            <Stack spacing={2}>
              <Checkbox 
                onChange={(e) => handleDietaryRestrictionChange('vegetarian', e.target.checked)}
                isChecked={formData.dietary_restrictions.includes('vegetarian')}
              >
                Vegetarian
              </Checkbox>
              <Checkbox 
                onChange={(e) => handleDietaryRestrictionChange('vegan', e.target.checked)}
                isChecked={formData.dietary_restrictions.includes('vegan')}
              >
                Vegan
              </Checkbox>
              <Checkbox 
                onChange={(e) => handleDietaryRestrictionChange('gluten_free', e.target.checked)}
                isChecked={formData.dietary_restrictions.includes('gluten_free')}
              >
                Gluten Free
              </Checkbox>
              <Checkbox 
                onChange={(e) => handleDietaryRestrictionChange('dairy_free', e.target.checked)}
                isChecked={formData.dietary_restrictions.includes('dairy_free')}
              >
                Dairy Free
              </Checkbox>
              <Checkbox 
                onChange={(e) => handleDietaryRestrictionChange('nut_free', e.target.checked)}
                isChecked={formData.dietary_restrictions.includes('nut_free')}
              >
                Nut Free
              </Checkbox>
            </Stack>
          </FormControl>

          <Button
            colorScheme="green"
            type="submit"
            isLoading={loading}
            loadingText="Generating">
            Generate Meal Plan
          </Button>
        </VStack>
      </form>

      {calculations && (
        <Box mt={8} p={4} borderWidth={1} borderRadius="lg" bg={calculationsBg}>
          <Heading size="sm" mb={2}>Calculations</Heading>
          <Text color={calculationsTextColor}>BMR: {Math.round(calculations.bmr)} calories/day</Text>
          <Text color={calculationsTextColor}>TDEE: {Math.round(calculations.tdee)} calories/day</Text>
          <Text color={calculationsTextColor}>Target: {Math.round(calculations.target_calories)} calories/day</Text>
        </Box>
      )}

      {mealPlan && (
        <Box mt={8} p={6} borderWidth={1} borderRadius="lg" bg={mealPlanBg}>
          <Heading size="md" mb={4}>
            Your Personalized Meal Plan
          </Heading>
          <Box 
            className="workout-plan" 
            p={4} 
            color={mealPlanTextColor}
            sx={{
              '& h2': {
                color: h2Color,
                fontSize: 'xl',
                fontWeight: 'bold',
                mt: 4,
                mb: 2
              },
              '& h3': {
                color: h3Color,
                fontSize: 'lg',
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
                color: strongColor
              }
            }}
          >
            <ReactMarkdown>{mealPlan}</ReactMarkdown>
          </Box>
        </Box>
      )}
    </Box>
  )
}
