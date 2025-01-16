import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Badge,
  useColorModeValue,
  Spinner,
  Center,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserPlanHistory, PlanHistoryItem } from '../services/planHistory';
import ReactMarkdown from 'react-markdown';
import '../styles/markdown.css';

export default function Profile() {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState<(PlanHistoryItem & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PlanHistoryItem & { id: string } | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const fetchHistory = async () => {
      if (!currentUser) return;
      try {
        const data = await getUserPlanHistory(currentUser.uid);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentUser]);

  const renderHistoryCard = (item: PlanHistoryItem & { id: string }) => (
    <Card 
      key={item.id} 
      borderWidth={1} 
      borderColor={borderColor} 
      bg={bgColor}
      onClick={() => {
        setSelectedPlan(item);
        onOpen();
      }}
      cursor="pointer"
      _hover={{ shadow: 'md' }}
    >
      <CardHeader>
        <Heading size="sm">
          {item.type === 'workout' ? 'Workout Plan' : 'Meal Plan'}
          <Badge ml={2} colorScheme={item.type === 'workout' ? 'blue' : 'green'}>
            {item.type}
          </Badge>
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Generated on {item.createdAt.toLocaleDateString()}
        </Text>
      </CardHeader>
      <CardBody>
        <Text noOfLines={3}>{item.content}</Text>
      </CardBody>
    </Card>
  );

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (history.length === 0) {
    return (
      <Box maxW="container.lg" mx="auto" py={8} px={4}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" mb={2}>Profile</Heading>
            <Text color="gray.500">{currentUser?.email}</Text>
          </Box>
          
          <Center p={8} borderWidth={1} borderRadius="lg">
            <VStack spacing={4}>
              <Text fontSize="lg">No workout or meal plans yet!</Text>
              <Text color="gray.500">
                Generate your first plan to see it here.
              </Text>
              <HStack spacing={4}>
                <Button as={RouterLink} to="/workout-planner" colorScheme="blue">
                  Create Workout Plan
                </Button>
                <Button as={RouterLink} to="/meal-planner" colorScheme="green">
                  Create Meal Plan
                </Button>
              </HStack>
            </VStack>
          </Center>
        </VStack>
      </Box>
    );
  }

  return (
    <Box maxW="container.lg" mx="auto" py={8} px={4}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Profile</Heading>
          <Text color="gray.500">{currentUser?.email}</Text>
        </Box>

        <Tabs variant="enclosed">
          <TabList>
            <Tab>All History</Tab>
            <Tab>Workouts</Tab>
            <Tab>Meal Plans</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {history.map(renderHistoryCard)}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {history
                  .filter(item => item.type === 'workout')
                  .map(renderHistoryCard)}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {history
                  .filter(item => item.type === 'meal')
                  .map(renderHistoryCard)}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Modal for displaying full plan */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="800px">
          <ModalHeader borderBottomWidth="1px" pb={4}>
            <Heading size="md">
              {selectedPlan?.type === 'workout' ? 'Workout Plan' : 'Meal Plan'}
            </Heading>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Generated on {selectedPlan?.createdAt.toLocaleDateString()}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <Box 
              className="markdown-body" 
              sx={{
                'ul': {
                  listStyleType: 'disc',
                  pl: 6,
                  '& ul': {
                    listStyleType: 'circle',
                  }
                },
                'p': {
                  my: 4
                },
                'h2, h3': {
                  fontWeight: 'bold'
                }
              }}
            >
              <ReactMarkdown>{selectedPlan?.content || ''}</ReactMarkdown>
            </Box>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" pt={4}>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
