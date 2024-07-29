import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB7n5wnKKrkeiZzcr8mtliJGdQh2IJ1meE",
    authDomain: "mychatapp-52c84.firebaseapp.com",
    databaseURL: "https://mychatapp-52c84-default-rtdb.firebaseio.com",
    projectId: "mychatapp-52c84",
    storageBucket: "mychatapp-52c84.appspot.com",
    messagingSenderId: "1036150120371",
    appId: "1:1036150120371:web:1415295752c803525c75c6",
    measurementId: "G-ZTTZKNBPSN"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, provider);

export { auth, db, signInWithGoogle };
