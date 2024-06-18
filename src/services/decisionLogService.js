import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const decisionLogRef = collection(db, 'decisionLogs');

export const logDecision = async (description) => {
  try {
    await addDoc(decisionLogRef, {
      description,
      timestamp: serverTimestamp(),
    });
    console.log('Decision logged successfully');
  } catch (error) {
    console.error('Error logging decision:', error);
  }
};

export const getDecisionLogs = async () => {
  try {
    const snapshot = await getDocs(decisionLogRef);
    const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return logs;
  } catch (error) {
    console.error('Error fetching decision logs:', error);
    return [];
  }
};