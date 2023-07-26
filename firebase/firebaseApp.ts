// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwbltv6EhDrXGCM7rqrCqmSmHhp0wLXGM",
  authDomain: "fir-workout-70c79.firebaseapp.com",
  projectId: "fir-workout-70c79",
  storageBucket: "fir-workout-70c79.appspot.com",
  messagingSenderId: "1009886331672",
  appId: "1:1009886331672:web:2f7d58e0f9322a2b03d46d",
  measurementId: "G-5E2LHGNEWQ",
};

export const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" && getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
