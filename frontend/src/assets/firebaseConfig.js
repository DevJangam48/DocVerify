// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3HOfym2yTWhzpbx-iRi-vYUaeIPJdfbs",
  authDomain: "doc-verify-auth.firebaseapp.com",
  projectId: "doc-verify-auth",
  storageBucket: "doc-verify-auth.firebasestorage.app",
  messagingSenderId: "400213850002",
  appId: "1:400213850002:web:eea9f00590b51e3aacf34b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
