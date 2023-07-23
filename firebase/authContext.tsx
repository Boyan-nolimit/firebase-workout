"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "@firebase/auth";
import { auth, db } from "./firebaseApp";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";

interface AuthContextProps {
  user: any;
  googleSignIn: () => void;
  logOut: () => void;
}
const AuthContext = createContext<AuthContextProps>({
  user: null,
  googleSignIn: () => {},
  logOut: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const exercises = [
  {
    name: "Bench Press",
    primaryMuscle: "Chest",
  },
  {
    name: "Squat",
    primaryMuscle: "Legs",
  },
  {
    name: "Deadlift",
    primaryMuscle: "Back",
  },
  {
    name: "Pull Ups",
    primaryMuscle: "Back",
  },
  {
    name: "Overhead Press",
    primaryMuscle: "Shoulders",
  },
];

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser]: any = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((result) => {
      const userRef = doc(db, "users", result.user.uid);
      const exercisesCollection = collection(
        db,
        `users/${result.user.uid}/exercises`,
      );
      // if new user then create a user ref and add the exercises
      if (getAdditionalUserInfo(result)?.isNewUser) {
        exercises.forEach((exercise) => {
          addDoc(exercisesCollection, exercise);
        });
        setDoc(userRef, {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        });
      }
    });
  };

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
