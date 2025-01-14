import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { 
  FaDumbbell, 
  FaApple, 
  FaChartLine, 
  FaBrain,
  FaChartBar,
  FaBullseye
} from 'react-icons/fa'

export default function Home() {
  const features = [
    {
      title: 'Personalized Workout Generator',
      description: 'Advanced AI analyzes your fitness level, goals, and progress to create evolving workout plans optimized for your success.',
      icon: FaDumbbell,
    },
    {
      title: 'Dynamic Nutrition Planning',
      description: 'Smart meal planning that adapts to your preferences, restrictions, and goals while maintaining optimal nutritional balance.',
      icon: FaApple,
    },
    {
      title: 'Real-Time Feedback',
      description: 'Get instant adjustments to your workouts and nutrition based on your performance and recovery needs.',
      icon: FaChartLine,
    },
    {
      title: 'Behavioral Insights',
      description: 'AI-powered motivation tracking and personalized encouragement to keep you on track with your fitness journey.',
      icon: FaBrain,
    },
    {
      title: 'Predictive Analytics',
      description: 'Machine learning algorithms predict your performance trends and help you set achievable fitness goals.',
      icon: FaChartBar,
    },
    {
      title: 'Smart Goal Setting',
      description: 'Set and track SMART goals with sophisticated analytics and detailed progress reports.',
      icon: FaBullseye,
    },
  ]

  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bg={useColorModeValue('gray.900', 'gray.900')} 
        py={{ base: 12, md: 20 }}
        width="100%"
        position="relative"
        overflow="hidden"
      >
        {/* Gradient Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-r, blue.900, cyan.900)"
          opacity={0.9}
        />
        
        <Container maxW="container.xl" position="relative">
          <VStack spacing={6} align="center" textAlign="center">
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              bgGradient="linear(to-r, blue.400, teal.400)"
              bgClip="text"
              lineHeight="1.2"
              mb={4}
              px={{ base: 4, md: 0 }}
            >
              Your AI-Powered
              <br />
              Fitness Journey Starts Here
            </Heading>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              maxW="2xl" 
              color="gray.100"
              px={{ base: 4, md: 0 }}
            >
              Experience the future of fitness with personalized workout and meal plans powered by cutting-edge AI technology.
            </Text>
            <Flex 
              gap={{ base: 2, md: 4 }} 
              mt={4}
              flexDir={{ base: 'column', sm: 'row' }}
              w={{ base: '100%', sm: 'auto' }}
              px={{ base: 4, md: 0 }}
            >
              <Button
                as={RouterLink}
                to="/workout-planner"
                colorScheme="blue"
                size="lg"
                px={8}
                w={{ base: '100%', sm: 'auto' }}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Create Workout Plan
              </Button>
              <Button
                as={RouterLink}
                to="/meal-planner"
                colorScheme="teal"
                size="lg"
                px={8}
                w={{ base: '100%', sm: 'auto' }}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Get Meal Plan
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={{ base: 12, md: 16 }}>
        <VStack spacing={12}>
          <Heading 
            textAlign="center"
            mb={4}
            size="xl"
            px={{ base: 4, md: 0 }}
          >
            AI-Powered Features
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={{ base: 6, md: 8 }} 
            w="full"
            px={{ base: 4, md: 0 }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                bg={bgColor}
                p={{ base: 6, md: 8 }}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-5px)',
                  shadow: 'lg',
                }}
              >
                <Flex
                  w={12}
                  h={12}
                  bg="blue.400"
                  color="white"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  mb={4}
                >
                  <Icon as={feature.icon} boxSize={6} />
                </Flex>
                <Heading size="md" mb={4}>
                  {feature.title}
                </Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                  {feature.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
