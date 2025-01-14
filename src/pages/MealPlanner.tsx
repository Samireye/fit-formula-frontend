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
} from '@chakra-ui/react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

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

export default function MealPlanner() {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [mealPlan, setMealPlan] = useState('')
  const [calculations, setCalculations] = useState<MealPlanResponse['calculations'] | null>(null)

  const [formData, setFormData] = useState<FormData>({
    age: 30,
    gender: '',
    weight: 150,
    height: 70,
    activity_level: '',
    goal: '',
    dietary_restrictions: [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post<MealPlanResponse>(
        `${import.meta.env.VITE_API_URL}/meal-plan`,
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
        <Box mt={8} p={6} borderWidth={1} borderRadius="lg" bg={useColorModeValue('white', 'gray.700')}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Heading size="md" mb={2}>Daily Caloric Needs</Heading>
              <Text>BMR (Basal Metabolic Rate): {calculations.bmr} calories</Text>
              <Text>TDEE (Total Daily Energy Expenditure): {calculations.tdee} calories</Text>
              <Text>Target Daily Calories: {calculations.target_calories} calories</Text>
            </Box>
            
            <Box>
              <Heading size="md" mb={4}>Your Personalized Meal Plan</Heading>
              <Box className="meal-plan">
                <ReactMarkdown>{mealPlan}</ReactMarkdown>
              </Box>
            </Box>
          </VStack>
        </Box>
      )}
    </Box>
  )
}
