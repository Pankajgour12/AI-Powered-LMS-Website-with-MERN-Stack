// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "learninig-28916.firebaseapp.com",
  projectId: "learninig-28916",
  storageBucket: "learninig-28916.firebasestorage.app",
  messagingSenderId: "510322938838",
  appId: "1:510322938838:web:684a697f57535eb1a80a77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider= new GoogleAuthProvider();

export {auth,provider};

