import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdAG8Oci2KblJ3b_VYHd1yIWZN8IH00p0",
  authDomain: "erbil-toastmasters-post-store.firebaseapp.com",
  projectId: "erbil-toastmasters-post-store",
  storageBucket: "erbil-toastmasters-post-store.appspot.com",
  messagingSenderId: "161464534316",
  appId: "1:161464534316:web:a9ec215658eab8e78d5889",
  measurementId: "G-GT7NZDMJYH"
};

export const firebaseApp = initializeApp(firebaseConfig);

if (import.meta.env.VITE_LOCAL_FIREBASE) {
  console.log("local")
  connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
  connectAuthEmulator(getAuth(), "http://localhost:9099");
  connectStorageEmulator(getStorage(), "localhost", 9199);
}