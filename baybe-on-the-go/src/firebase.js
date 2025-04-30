import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCAGjONbDzkXlT8m0dc378sUElnIkEs1nY",
  authDomain: "baybeonthego.firebaseapp.com",
  projectId: "baybeonthego",
  storageBucket: "baybeonthego.firebasestorage.app",
  messagingSenderId: "273294744323",
  appId: "1:273294744323:web:8472ae04cc5747a8436736"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
