import { Box, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'

export default function Dashboard() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Heading as="h1" mb={6}>
        Your Fitness Dashboard
      </Heading>
      <Text mb={8}>Track your progress and stay motivated!</Text>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Stat
          px={{ base: 2, md: 4 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={'gray.200'}
          rounded={'lg'}>
          <StatLabel>Workouts Completed</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>This month</StatHelpText>
        </Stat>
        
        <Stat
          px={{ base: 2, md: 4 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={'gray.200'}
          rounded={'lg'}>
          <StatLabel>Meal Plans Generated</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>This month</StatHelpText>
        </Stat>
        
        <Stat
          px={{ base: 2, md: 4 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={'gray.200'}
          rounded={'lg'}>
          <StatLabel>Goals Achieved</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>This month</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  )
}
