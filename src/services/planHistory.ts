import { db } from '../firebase'
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore'

export interface PlanHistoryItem {
  userId: string
  type: 'workout' | 'meal'
  content: string
  metadata?: any
  createdAt: Date
}

export const savePlanToHistory = async (data: Omit<PlanHistoryItem, 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'planHistory'), {
      ...data,
      createdAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Error saving plan to history:', error)
    if (error instanceof Error && error.message.includes('permission-denied')) {
      throw new Error('You must be logged in to save plans')
    }
    throw error
  }
}

export const getUserPlanHistory = async (userId: string, type?: 'workout' | 'meal') => {
  try {
    let q = query(
      collection(db, 'planHistory'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )

    if (type) {
      q = query(
        collection(db, 'planHistory'),
        where('userId', '==', userId),
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      )
    }

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as (PlanHistoryItem & { id: string })[]
  } catch (error) {
    console.error('Error getting user plan history:', error)
    if (error instanceof Error && error.message.includes('permission-denied')) {
      return [] // Return empty array if user isn't authenticated
    }
    throw error
  }
}
