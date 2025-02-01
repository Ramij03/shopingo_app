import { initializeApp } from 'firebase/app'; // Correct import from 'firebase/app'
import { getFirestore } from 'firebase/firestore'; // Correct import from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'your-API-Key',
  authDomain: 'firebaseapp.com',
  projectId: 'id',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
