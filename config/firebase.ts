import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAm5OmUbT6wagz1V00w0PZaqIolFdd2qxw",
  authDomain: "taskapp-7deef.firebaseapp.com",
  projectId: "taskapp-7deef",
  storageBucket: "taskapp-7deef.appspot.com",
  messagingSenderId: "785666953330",
  appId: "1:785666953330:web:1e87e08ff52d86a9e032eb"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = initializeAuth(app);
export const db = getFirestore(app);