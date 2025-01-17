import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import WorkoutPlanner from './pages/WorkoutPlanner'
import MealPlanner from './pages/MealPlanner'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import theme from './theme'
import './styles/animations.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Box minH="100vh">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/workout-planner" 
                element={<WorkoutPlanner />}
              />
              <Route 
                path="/meal-planner" 
                element={<MealPlanner />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
