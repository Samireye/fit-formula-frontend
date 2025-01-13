import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './theme'
import Layout from './components/Layout'
import Home from './pages/Home'
import WorkoutPlanner from './pages/WorkoutPlanner'
import MealPlanner from './pages/MealPlanner'
import Pricing from './pages/Pricing'
import './styles/animations.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workout" element={<WorkoutPlanner />} />
            <Route path="/meal" element={<MealPlanner />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  )
}

export default App
