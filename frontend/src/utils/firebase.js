// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "learn-flow-b119b.firebaseapp.com",
  projectId: "learn-flow-b119b",
  storageBucket: "learn-flow-b119b.firebasestorage.app",
  messagingSenderId: "722418610884",
  appId: "1:722418610884:web:a8b5c04cb48b3925518f91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth,provider}