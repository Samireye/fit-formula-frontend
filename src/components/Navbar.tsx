import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  IconButton,
  useDisclosure,
  Collapse,
  VStack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure()

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
        <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
          <Text
            as={RouterLink}
            to="/"
            textAlign={{ base: 'left', md: 'left' }}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="bold"
            fontSize="xl">
            FitFormula.AI
          </Text>
        </Flex>

        {/* Mobile hamburger button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
          variant={'ghost'}
          aria-label={'Toggle Navigation'}
        />

        {/* Desktop navigation */}
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          display={{ base: 'none', md: 'flex' }}>
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

      {/* Mobile navigation */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          p={4}
          display={{ md: 'none' }}
          bg={useColorModeValue('white', 'gray.800')}
          spacing={4}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}>
          <Button
            as={RouterLink}
            to="/workout-planner"
            w="full"
            variant={'ghost'}>
            Workout Planner
          </Button>
          <Button
            as={RouterLink}
            to="/meal-planner"
            w="full"
            colorScheme="green">
            Meal Planner
          </Button>
        </VStack>
      </Collapse>
    </Box>
  )
}
