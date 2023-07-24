"use client";
import Link from "next/link";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "@firebase/firestore";
import { app, auth, db } from "../../firebase/firebaseApp";
import { Navigation } from "@/components/Navigation";
import { Header } from "@/components/Header";
import exercise from "../../public/exercise.svg";
import Image from "next/image";
import add from "../../public/add.svg";
import { Workout } from "@/components/Workout";
import exerciseList from "../initialExerciseList.json";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

function comparePrimaryMuscle(a: any, b: any) {
  if (a.primaryMuscle < b.primaryMuscle) {
    return -1;
  }
  if (a.primaryMuscle > b.primaryMuscle) {
    return 1;
  }
  return 0;
}

export default function Home() {
  // gets the current user
  const [user, loading, error] = useAuthState(auth);

  // gets the exercise collection (not user's exercises)
  const [exercises, exercisesLoading, exercisesError] = useCollectionOnce(
    collection(getFirestore(app), `users/${user?.uid}/exercises`),
    {},
  );
  if (exercises && !exercisesLoading) {
    console.log(exercises.docs.map((doc) => doc.data()));
  }

  // add an exercise to the user's collection
  // const addExercise = async () => {
  //   const exercisesCollection = collection(db, `users/${user.uid}/exercises`);
  //   await addDoc(exercisesCollection, {
  //     name: "Overhead Press",
  //     primaryMuscle: "Shoulders",
  //   });
  // };

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
      <Link
        className="fixed bottom-[30px] left-[50%] -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow z-20"
        href={"/add-workout"}
      >
        <Image src={add} alt={"add exercise icon"} height={36} width={36} />
      </Link>
      {loading && <div>loading...</div>}
      {user && !loading ? (
        <div className={"py-16 flex flex-col"}>
          <Workout name={"Workout 1"} exerciseList={exerciseList.slice(1, 4)} />
          <Workout
            name={"Workout 2"}
            exerciseList={exerciseList.slice(6, 10)}
          />
        </div>
      ) : (
        <div className={"flex py-16"}>
          <Link
            href={"/login"}
            className={
              "text-bold self-center text-white w-full max-w-[420px] p-5 bg-blue-700 rounded-lg z-40 text-center opacity-100"
            }
          >
            Go to Log in
          </Link>
        </div>
      )}
    </main>
  );
}
