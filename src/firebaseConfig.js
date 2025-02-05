// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABwLn0ZPAqEm3C0n1g3h_z61r1o6XvDmQ",
  authDomain: "rashtriya-swasthya-sanrakshan.firebaseapp.com",
  projectId: "rashtriya-swasthya-sanrakshan",
  storageBucket: "rashtriya-swasthya-sanrakshan.firebasestorage.app",
  messagingSenderId: "810984848155",
  appId: "1:810984848155:web:1bbcceaa4a46f8ccebb1be",
  measurementId: "G-JSYK62BPYS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };