import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box 
        as="main" 
        maxW={{ base: "100%", md: "800px" }} 
        mx="auto" 
        px={{ base: 4, md: 8 }}
        py={{ base: 4, md: 6 }}>
        {children}
      </Box>
    </Box>
  )
}
