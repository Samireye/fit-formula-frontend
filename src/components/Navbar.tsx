import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            as={RouterLink}
            to="/"
            textAlign={{ base: 'center', md: 'left' }}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="bold"
            fontSize="xl">
            FitFormula.AI
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            as={RouterLink}
            to="/workout-planner"
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}>
            Workout Planner
          </Button>
          <Button
            as={RouterLink}
            to="/meal-planner"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            _hover={{
              bg: 'green.500',
            }}>
            Meal Planner
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}
