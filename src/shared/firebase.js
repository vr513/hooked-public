// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_HOOKED_API_KEY,
  authDomain: process.env.REACT_APP_HOOKED_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_HOOKED_PROJECT_ID,
  storageBucket: process.env.REACT_APP_HOOKED_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_HOOKED_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_HOOKED_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const database = getFirestore(app);
