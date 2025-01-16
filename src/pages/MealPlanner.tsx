import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Stack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import config from '../config'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface FormData {
  age: number
  gender: string
  weight: number
  height: number
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

const savePlanToHistory = async (data: any) => {
  try {
    const response = await axios.post(`${config.apiUrl}/api/history`, data)
    console.log('Plan saved to history:', response.data)
  } catch (error) {
    console.error('Error saving to history:', error)
  }
}

export default function MealPlanner() {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [mealPlan, setMealPlan] = useState('')
  const [calculations, setCalculations] = useState<MealPlanResponse['calculations'] | null>(null)
  const [formData, setFormData] = useState<FormData>({
    age: 30,
    gender: '',
    weight: 70,
    height: 170,
    activity_level: '',
    goal: '',
    dietary_restrictions: []
  })
  const [hasUsedFreePlan, setHasUsedFreePlan] = useState(false)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  console.log('API URL:', config.apiUrl)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!currentUser && hasUsedFreePlan) {
        toast({
          title: 'Free Trial Used',
          description: 'Please sign up to generate more meal plans!',
          status: 'info',
          duration: 5000,
          isClosable: true,
        })
        navigate('/signup')
        return
      }

      const response = await axios.post<MealPlanResponse>(
        `${config.apiUrl}/api/meal-plan`,
        formData
      )

      setMealPlan(response.data.meal_plan)
      setCalculations(response.data.calculations)
      
      if (!currentUser) {
        setHasUsedFreePlan(true)
      } else {
        // Save to history if user is logged in
        try {
          await savePlanToHistory({
            userId: currentUser.uid,
            type: 'meal',
            content: response.data.meal_plan,
            metadata: {
              calculations: response.data.calculations,
              formData
            }
          })
        } catch (error) {
          console.error('Error saving to history:', error)
        }
      }

      toast({
        title: 'Meal Plan Generated',
        description: 'Your personalized meal plan has been generated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate meal plan. Please try again.',
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
      const newRestrictions = isChecked
        ? [...prev.dietary_restrictions, restriction]
        : prev.dietary_restrictions.filter(r => r !== restriction)
      
      // Handle mutually exclusive options
      if (isChecked) {
        if (restriction === 'carnivore') {
          return {
            ...prev,
            dietary_restrictions: ['carnivore']
          }
        } else if (restriction === 'pescatarian') {
          return {
            ...prev,
            dietary_restrictions: newRestrictions.filter(r => r !== 'carnivore' && r !== 'vegan')
          }
        } else if (restriction === 'vegan') {
          return {
            ...prev,
            dietary_restrictions: newRestrictions.filter(r => r !== 'carnivore' && r !== 'pescatarian')
          }
        }
      }
      
      return {
        ...prev,
        dietary_restrictions: newRestrictions
      }
    })
  }

  const isDietaryRestrictionDisabled = (restriction: string) => {
    if (formData.dietary_restrictions.includes('carnivore')) {
      return restriction !== 'carnivore'
    }
    if (formData.dietary_restrictions.includes('vegan')) {
      return restriction === 'carnivore' || restriction === 'pescatarian'
    }
    if (formData.dietary_restrictions.includes('pescatarian')) {
      return restriction === 'carnivore' || restriction === 'vegan'
    }
    return false
  }

  return (
    <Box maxW="800px" mx="auto" p={{ base: 4, md: 8 }}>
      {!currentUser && hasUsedFreePlan && (
        <Alert status="info" mb={4}>
          <AlertIcon />
          <Box>
            <AlertTitle>Free Trial Plan Used</AlertTitle>
            <AlertDescription>
              Sign up to generate unlimited meal plans and save your history!
            </AlertDescription>
          </Box>
        </Alert>
      )}
      <Heading mb={6} textAlign={{ base: "center", md: "left" }}>Create Your Meal Plan</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel>Age</FormLabel>
            <NumberInput
              min={1}
              max={120}
              value={formData.age}
              onChange={(valueString) => {
                const value = parseInt(valueString)
                if (!isNaN(value)) {
                  setFormData({ ...formData, age: value })
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
              <option value="other">Other</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Weight (lbs)</FormLabel>
            <NumberInput
              min={1}
              max={500}
              value={formData.weight}
              onChange={(valueString) => {
                const value = parseInt(valueString)
                if (!isNaN(value)) {
                  setFormData({ ...formData, weight: value })
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
            <FormLabel>Height (inches)</FormLabel>
            <NumberInput
              min={1}
              max={120}
              value={formData.height}
              onChange={(valueString) => {
                const value = parseInt(valueString)
                if (!isNaN(value)) {
                  setFormData({ ...formData, height: value })
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
            <FormLabel>Activity Level</FormLabel>
            <Select
              placeholder="Select activity level"
              value={formData.activity_level}
              onChange={(e) => setFormData({ ...formData, activity_level: e.target.value })}>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly active (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
              <option value="very">Very active (hard exercise 6-7 days/week)</option>
              <option value="extra">Extra active (very hard exercise & physical job)</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Goal</FormLabel>
            <Select
              placeholder="Select your goal"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}>
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Dietary Restrictions</FormLabel>
            <Stack spacing={2}>
              <Checkbox
                isChecked={formData.dietary_restrictions.includes('vegan')}
                onChange={(e) => handleDietaryRestrictionChange('vegan', e.target.checked)}
                isDisabled={isDietaryRestrictionDisabled('vegan')}
              >
                Vegan
              </Checkbox>
              <Checkbox
                isChecked={formData.dietary_restrictions.includes('vegetarian')}
                onChange={(e) => handleDietaryRestrictionChange('vegetarian', e.target.checked)}
                isDisabled={isDietaryRestrictionDisabled('vegetarian')}
              >
                Vegetarian
              </Checkbox>
              <Checkbox
                isChecked={formData.dietary_restrictions.includes('pescatarian')}
                onChange={(e) => handleDietaryRestrictionChange('pescatarian', e.target.checked)}
                isDisabled={isDietaryRestrictionDisabled('pescatarian')}
              >
                Pescatarian
              </Checkbox>
              <Checkbox
                isChecked={formData.dietary_restrictions.includes('carnivore')}
                onChange={(e) => handleDietaryRestrictionChange('carnivore', e.target.checked)}
                isDisabled={isDietaryRestrictionDisabled('carnivore')}
              >
                Carnivore
              </Checkbox>
              <Checkbox
                isChecked={formData.dietary_restrictions.includes('gluten-free')}
                onChange={(e) => handleDietaryRestrictionChange('gluten-free', e.target.checked)}
                isDisabled={isDietaryRestrictionDisabled('gluten-free')}
              >
                Gluten-Free
              </Checkbox>
              <Checkbox
                isChecked={formData.dietary_restrictions.includes('dairy-free')}
                onChange={(e) => handleDietaryRestrictionChange('dairy-free', e.target.checked)}
                isDisabled={isDietaryRestrictionDisabled('dairy-free')}
              >
                Dairy-Free
              </Checkbox>
            </Stack>
          </FormControl>

          <Button
            type="submit"
            colorScheme="green"
            size="lg"
            isLoading={loading}
            loadingText="Generating">
            Generate Meal Plan
          </Button>
        </VStack>
      </form>

      {mealPlan && calculations && (
        <Box mt={8}>
          {/* Calculations Box */}
          <Box 
            p={6} 
            mb={6} 
            borderWidth={1} 
            borderRadius="lg" 
            bg={useColorModeValue('blue.50', 'blue.900')}
          >
            <Heading size="md" mb={4} color={useColorModeValue('blue.600', 'blue.200')}>
              Daily Caloric Needs
            </Heading>
            <Text color={useColorModeValue('gray.700', 'gray.200')} mb={2}>
              <strong>BMR (Basal Metabolic Rate):</strong> {Math.round(calculations.bmr)} calories/day
            </Text>
            <Text color={useColorModeValue('gray.700', 'gray.200')} mb={2}>
              <strong>TDEE (Total Daily Energy Expenditure):</strong> {Math.round(calculations.tdee)} calories/day
            </Text>
            <Text color={useColorModeValue('gray.700', 'gray.200')}>
              <strong>Target Daily Calories:</strong> {Math.round(calculations.target_calories)} calories/day
            </Text>
          </Box>

          {/* Meal Plan Box */}
          <Box 
            p={6} 
            borderWidth={1} 
            borderRadius="lg" 
            bg={useColorModeValue('white', 'gray.700')}
          >
            <Heading size="md" mb={4} color={useColorModeValue('gray.700', 'gray.200')}>
              Your Personalized Meal Plan
            </Heading>
            <Box 
              className="meal-plan"
              sx={{
                '& h2': {
                  color: useColorModeValue('blue.600', 'blue.200'),
                  fontSize: 'xl',
                  fontWeight: 'bold',
                  mt: 4,
                  mb: 2
                },
                '& h3': {
                  color: useColorModeValue('gray.700', 'gray.300'),
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
                  color: useColorModeValue('gray.700', 'gray.200')
                },
                '& p': {
                  mb: 3
                }
              }}
            >
              <ReactMarkdown>{mealPlan}</ReactMarkdown>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
