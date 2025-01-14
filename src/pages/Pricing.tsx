import {
  Box,
  Button,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export default function Pricing() {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Container maxW="container.xl" py={20}>
      <VStack spacing={8} textAlign="center" mb={16}>
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, blue.400, green.400)"
          bgClip="text">
          Simple, Transparent Pricing
        </Heading>
        <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')} maxW="2xl">
          Choose the plan that best fits your fitness journey
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {/* Free Plan */}
        <Box
          bg={bgColor}
          p={8}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          shadow="base">
          <VStack spacing={4}>
            <Heading size="md">Free</Heading>
            <Text fontSize="4xl" fontWeight="bold">
              $0
              <Text as="span" fontSize="md" fontWeight="normal">
                /month
              </Text>
            </Text>
            <List spacing={3} textAlign="start">
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Basic workout plans
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Basic meal suggestions
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Community support
              </ListItem>
            </List>
            <Button colorScheme="blue" size="lg" w="full">
              Get Started
            </Button>
          </VStack>
        </Box>

        {/* Pro Plan */}
        <Box
          bg={bgColor}
          p={8}
          borderWidth="2px"
          borderColor="blue.400"
          borderRadius="lg"
          shadow="xl">
          <VStack spacing={4}>
            <Heading size="md">Pro</Heading>
            <Text fontSize="4xl" fontWeight="bold">
              $19
              <Text as="span" fontSize="md" fontWeight="normal">
                /month
              </Text>
            </Text>
            <List spacing={3} textAlign="start">
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Advanced workout plans
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Personalized meal plans
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Progress tracking
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Priority support
              </ListItem>
            </List>
            <Button colorScheme="blue" size="lg" w="full" variant="solid">
              Start Pro Trial
            </Button>
          </VStack>
        </Box>

        {/* Enterprise Plan */}
        <Box
          bg={bgColor}
          p={8}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          shadow="base">
          <VStack spacing={4}>
            <Heading size="md">Enterprise</Heading>
            <Text fontSize="4xl" fontWeight="bold">
              Custom
            </Text>
            <List spacing={3} textAlign="start">
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Custom workout programs
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Team management
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                API access
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                24/7 dedicated support
              </ListItem>
            </List>
            <Button colorScheme="blue" size="lg" w="full">
              Contact Sales
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  )
}
