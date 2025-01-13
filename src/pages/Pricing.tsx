import React from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

export default function Pricing() {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center" size="2xl" mb={8}>
          Choose Your Plan
        </Heading>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* Basic Plan */}
          <Box
            bg={bgColor}
            p={8}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack align="stretch" spacing={5}>
              <Heading size="lg">FitFormula Basic</Heading>
              <Text fontSize="3xl" fontWeight="bold">
                $0
                <Text as="span" fontSize="md" fontWeight="normal">
                  /month
                </Text>
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Personalized Workout Plans
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Daily Activity Tracking
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Nutrition Recommendations
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  AI Chat Support (Basic)
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Community Access
                </ListItem>
              </List>
              <Button colorScheme="blue" size="lg">
                Get Started Free
              </Button>
            </VStack>
          </Box>

          {/* Pro Plan */}
          <Box
            bg={bgColor}
            p={8}
            borderRadius="lg"
            borderWidth="2px"
            borderColor="blue.400"
            position="relative"
          >
            <Box
              position="absolute"
              top="-3"
              right="5"
              bg="blue.400"
              color="white"
              px={3}
              py={1}
              borderRadius="md"
              fontSize="sm"
            >
              MOST POPULAR
            </Box>
            <VStack align="stretch" spacing={5}>
              <Heading size="lg">FitFormula Pro</Heading>
              <Text fontSize="3xl" fontWeight="bold">
                $14.99
                <Text as="span" fontSize="md" fontWeight="normal">
                  /month
                </Text>
              </Text>
              <Text fontSize="sm" color="gray.500">
                or $149.99/year (save 2 months)
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Advanced AI-Driven Workout Plans
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Smart Macronutrient Calculator
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  AI-Powered Meal Planning
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Progress Tracking with AI Insights
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Advanced AI Chat Support
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Priority Access to New Features
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Integrated Wearable Compatibility
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  Weekly AI Fitness Challenges
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  One-on-One AI Coaching Sessions
                </ListItem>
              </List>
              <Button colorScheme="blue" size="lg" variant="solid">
                Upgrade to Pro
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* AI Features Section */}
        <Box mt={16}>
          <Heading size="xl" mb={8}>
            AI Features of the App
          </Heading>
          <VStack spacing={6} align="stretch">
            {[
              {
                title: 'Personalized Workout Generator',
                description:
                  'The AI analyzes user data, such as fitness level, goals, and progress, to create customized workout plans that evolve as the user progresses.',
              },
              {
                title: 'Dynamic Nutrition and Meal Planning',
                description:
                  'The AI utilizes data such as user preferences, dietary restrictions, and goals to provide personalized meal plans.',
              },
              {
                title: 'Real-Time Feedback and Adjustments',
                description:
                  'Through integration with fitness trackers and user feedback, the AI provides real-time adjustments to workouts and nutrition.',
              },
              {
                title: 'Behavioral Insights and Motivation',
                description:
                  'The AI analyzes user patterns to identify potential drop-off points or loss of motivation, offering targeted encouragement.',
              },
              {
                title: 'Predictive Progress Analytics',
                description:
                  'Using machine learning algorithms, the AI predicts future performance and progress trends based on historical data.',
              },
              {
                title: 'Smart Goal Setting and Tracking',
                description:
                  'The AI assists users in setting SMART goals and tracks progress with sophisticated analytics.',
              },
            ].map((feature, index) => (
              <Box key={index} p={6} bg={bgColor} borderRadius="lg" borderWidth="1px">
                <Heading size="md" mb={3}>
                  {feature.title}
                </Heading>
                <Text>{feature.description}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
