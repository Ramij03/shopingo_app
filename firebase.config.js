import { initializeApp } from 'firebase/app'; // Correct import from 'firebase/app'
import { getFirestore } from 'firebase/firestore'; // Correct import from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBephq-y8CdNuXSgQL8E353X2TWJVI6btI',
  authDomain: 'shopingo-78ae1.firebaseapp.com',
  projectId: 'shopingo-78ae1',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
