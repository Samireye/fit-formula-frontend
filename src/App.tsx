import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import WorkoutPlanner from './pages/WorkoutPlanner'
import MealPlanner from './pages/MealPlanner'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import theme from './theme'
import './styles/animations.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workout-planner" element={<WorkoutPlanner />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  )
}

export default App
