import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
  CloseButton,
  useBreakpointValue
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onToggle, onClose } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box 
      position="sticky" 
      top={0} 
      zIndex={1000} 
      bg={bg} 
      borderBottom="1px" 
      borderColor={borderColor}
      px={{ base: 4, md: 8 }}
      py={4}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          _hover={{ textDecoration: 'none' }}
        >
          FitFormula.AI
        </Link>

        {/* Mobile Menu Button */}
        {isMobile && (
          <Flex alignItems="center">
            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              aria-label="Toggle color mode"
              mr={2}
            />
            <IconButton
              onClick={onToggle}
              icon={<HamburgerIcon />}
              variant="ghost"
              aria-label="Toggle navigation"
            />
          </Flex>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <HStack spacing={4}>
            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              aria-label="Toggle color mode"
            />
            <Button
              as={RouterLink}
              to="/workout-planner"
              variant="ghost"
              colorScheme="blue"
            >
              Workout Planner
            </Button>
            <Button
              as={RouterLink}
              to="/meal-planner"
              colorScheme="green"
            >
              Meal Planner
            </Button>
          </HStack>
        )}
      </Flex>

      {/* Mobile Menu */}
      {isMobile && isOpen && (
        <Box
          position="fixed"
          top={0}
          right={0}
          bottom={0}
          width="full"
          bg={bg}
          zIndex={20}
          p={4}
        >
          <Flex justify="flex-end" mb={8}>
            <CloseButton onClick={onClose} />
          </Flex>
          <VStack spacing={4} alignItems="stretch">
            <Button
              as={RouterLink}
              to="/workout-planner"
              variant="ghost"
              colorScheme="blue"
              onClick={onClose}
            >
              Workout Planner
            </Button>
            <Button
              as={RouterLink}
              to="/meal-planner"
              colorScheme="green"
              onClick={onClose}
            >
              Meal Planner
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  )
}
