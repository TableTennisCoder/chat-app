// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPxJC5svkZZCFCR9YdXv5weOFszNEgOhY",
  authDomain: "chat-app-53744.firebaseapp.com",
  projectId: "chat-app-53744",
  storageBucket: "chat-app-53744.appspot.com",
  messagingSenderId: "851915662730",
  appId: "1:851915662730:web:d80f03c6e25e7df9fe1473",
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
