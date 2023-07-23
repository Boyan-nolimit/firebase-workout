"use client";
import Link from "next/link";
import { UserAuth } from "../../firebase/authContext";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app, db } from "../../firebase/firebaseApp";

export default function Home() {
  const { user, logOut } = UserAuth();

  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "exercises"),
    {},
  );

  const exercises = value?.docs.map((doc) => doc.data());

  // add an exercise to the user's collection
  const addExercise = async () => {
    const exercisesCollection = collection(db, `users/${user.uid}/exercises`);
    await addDoc(exercisesCollection, {
      name: "Overhead Press",
      primaryMuscle: "Shoulders",
    });
  };

  // update an exercise in the collection
  const updateExercise = async () => {
    const exerciseRef = doc(db, "exercises", "test");
    await updateDoc(exerciseRef, {
      primaryMuscle: "Back",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <h1 className="text-6xl font-bold text-center">HOME SCREEN</h1>
      {user && (
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="text-2xl font-bold text-center">Welcome</h2>
          <img
            className="w-24 h-24 rounded-full"
            src={user.photoURL}
            alt={"user"}
          />
          <h3 className="text-xl font-bold text-center">{user.displayName}</h3>
        </div>
      )}

      <button onClick={addExercise}>Add Data</button>
      <button onClick={updateExercise}>Update Data</button>

      {user ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logOut}
        >
          Log Out
        </button>
      ) : (
        <Link href={"/login"} className={"text-bold"}>
          Go to Log in
        </Link>
      )}
    </main>
  );
}
