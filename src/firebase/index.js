
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc , getDoc,collection, getDocs  } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBywydrYycb9Ve7qTijvLTifxVUkIek-j4",
    authDomain: "react-login-signup-64d81.firebaseapp.com",
    projectId: "react-login-signup-64d81",
    storageBucket: "react-login-signup-64d81.appspot.com",
    messagingSenderId: "827343198409",
    appId: "1:827343198409:web:39201d901e581fbd38d518"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc,db , getDoc,collection, getDocs }