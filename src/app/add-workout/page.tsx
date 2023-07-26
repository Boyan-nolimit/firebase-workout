"use client";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import add from "../../../public/add.svg";
import { ExerciseCard } from "@/components/ExerciseCard";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, getFirestore, addDoc } from "@firebase/firestore";
import { app, auth } from "../../../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";

const filterExercises = (exercises: any[], selected: string[]) => {
  if (exercises && selected) {
    return exercises.filter((exercise) => {
      return selected.includes(exercise.id);
    });
  }
  return [];
};

export default function AddWorkout() {
  const router = useRouter();

  const [user] = useAuthState(auth);
  const [selectedExercises, setSelectedExercises] = useState(
    typeof window !== "undefined"
      ? sessionStorage.getItem("selectedExercises")?.split(",")
      : [],
  );
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const removeSelectedExercise = (id: string) => {
    if (selectedExercises) {
      const newSelectedExercises = selectedExercises.filter(
        (exercise) => exercise !== id,
      );
      setSelectedExercises(newSelectedExercises);
      typeof window !== "undefined" &&
        sessionStorage.setItem(
          "selectedExercises",
          newSelectedExercises.join(","),
        );
    }
  };

  const addWorkout = async () => {
    if (name && selectedExercises) {
      const workout = {
        name,
        exercises: selectedExercises,
      };
      await addDoc(
        collection(getFirestore(app), `users/${user?.uid}/workouts`),
        workout,
      );
    } else {
      setError("Missing workout name or exercises");
    }
  };

  const [exercisesQuery] = useCollectionOnce(
    collection(getFirestore(app), `users/${user?.uid}/exercises`),
  );

  const exercises = exercisesQuery?.docs.map((doc) => doc);

  return (
    <main>
      <Header name={"Add Workout"} hideProfile />
      <div className={"py-16 flex flex-col"}>
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Workout Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {filterExercises(exercises!, selectedExercises!).map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            name={exercise.data().name}
            img={exercise.data().img}
            description={exercise.data().description}
            primaryMuscle={exercise.data().primaryMuscle}
            onClick={() => removeSelectedExercise(exercise.id)}
          />
        ))}

        <Link
          className={"flex gap-3 my-2 items-center"}
          href={"/select-workout-exercises"}
        >
          <div
            className={`h-[66px] w-[66px] flex items-center justify-center rounded-lg border-[2.5px] bg-blue-500`}
          >
            <Image src={add} alt={"add"} />
          </div>
          <h2 className={"text-md font-bold"}>Add Exercise</h2>
        </Link>

        <p className={"text-red-600 font-medium"}>{error}</p>
        <button
          type={"submit"}
          onClick={() => {
            addWorkout().then(() => router.replace("/"));
            typeof window !== "undefined" &&
              sessionStorage.removeItem("selectedExercises");
          }}
          className="fixed w-full max-w-[380px] hover:cursor-pointer bottom-[30px] left-[50%] -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow z-20"
        >
          Create
        </button>
      </div>
    </main>
  );
}
