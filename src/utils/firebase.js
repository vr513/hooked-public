import { initializeApp, getApps , getApp } from 'firebase/app';

// Initialize Firebase app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_HOOKED_API_KEY,
  authDomain: process.env.REACT_APP_HOOKED_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_HOOKED_PROJECT_ID,
  storageBucket: process.env.REACT_APP_HOOKED_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_HOOKED_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_HOOKED_APP_ID,
};

const app = getApp() || initializeApp(firebaseConfig);



export default app;