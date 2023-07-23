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
import { Navigation } from "@/components/Navigation";
import { Header } from "@/components/Header";
import exercise from "../../public/exercise.svg";

export default function Home() {
  const { user } = UserAuth();

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
    <main>
      <Navigation activeTab={"workouts"} />
      <Header name={"Workouts"} icon={exercise.src} />
      <div className={"py-16 flex flex-col"}>
        <button onClick={addExercise}>Add Data</button>
        <button onClick={updateExercise}>Update Data</button>

        {!user && (
          <Link href={"/login"} className={"text-bold"}>
            Go to Log in
          </Link>
        )}
      </div>
    </main>
  );
}
