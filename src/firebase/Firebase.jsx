import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSO5HYbnwpFZBxLrxv5hL0NsK57NyJ5sc",
  authDomain: "todo-app-58c71.firebaseapp.com",
  projectId: "todo-app-58c71",
  storageBucket: "todo-app-58c71.appspot.com",
  messagingSenderId: "270295917010",
  appId: "1:270295917010:web:d74cd86924adf41081a80b",
  measurementId: "G-GGH9JCXL81",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const Database = getFirestore(app);


