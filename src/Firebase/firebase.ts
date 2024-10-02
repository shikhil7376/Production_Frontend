// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "pet-zone-6aa0d.firebaseapp.com",
  projectId: "pet-zone-6aa0d",
  storageBucket: "pet-zone-6aa0d.appspot.com",
  messagingSenderId: "735655386019",
  appId: "1:735655386019:web:dea0a7516204be73e65816"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);