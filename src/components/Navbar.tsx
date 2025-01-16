import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <RouterLink to="/">
          <Text fontSize="xl" fontWeight="bold">
            FitFormula.AI
          </Text>
        </RouterLink>

        <Flex alignItems={'center'}>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <RouterLink to="/workout-planner">
                <Button variant="ghost">Workout Planner</Button>
              </RouterLink>
              <RouterLink to="/meal-planner">
                <Button variant="ghost">Meal Planner</Button>
              </RouterLink>
            </HStack>
          </HStack>

          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            {currentUser ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={currentUser.photoURL || undefined}
                    name={currentUser.email || undefined}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                <RouterLink to="/login">
                  <Button variant={'ghost'}>
                    Sign In
                  </Button>
                </RouterLink>
                <RouterLink to="/signup">
                  <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    colorScheme={'blue'}>
                    Sign Up
                  </Button>
                </RouterLink>
              </Stack>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}
