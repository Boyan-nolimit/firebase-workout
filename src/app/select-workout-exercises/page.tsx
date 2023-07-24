"use client";
import add from "../../../public/add.svg";
import { CategoryButton } from "@/components/CategoryButton";
import { Header } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "@firebase/firestore";
import { app, auth } from "../../../firebase/firebaseApp";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import benchPress from "../../../public/bench-press.png";
import { SelectableExerciseCard } from "@/components/SelectableExerciseCard";

const categories = ["Arms", "Back", "Chest", "Legs", "Shoulders"];

export default function SelectWorkoutExercises() {
  const [user] = useAuthState(auth);
  const [selectedCategory, setSelectedCategory]: any = useState(null);
  const [selectedExercises, setSelectedExercises]: any = useState([]);

  // gets all exercises from firestore
  const [exercisesQuery] = useCollectionOnce(
    collection(getFirestore(app), `users/${user?.uid}/exercises`),
    {},
  );

  // sorts exercises by primary muscle
  const exercises = exercisesQuery?.docs
    .map((doc) => doc)
    .sort((a, b) => {
      if (a.data().primaryMuscle < b.data().primaryMuscle) {
        return -1;
      }
      if (a.data().primaryMuscle > b.data().primaryMuscle) {
        return 1;
      }
      return 0;
    });

  // filters exercises by primary muscle
  const filterExercisesByPrimary = (exercises: any[], primary: string) => {
    if (exercises) {
      if (primary === null) return exercises;
      return exercises.filter((exercise) => {
        return exercise.data().primaryMuscle === primary;
      });
    }
    return [];
  };

  // handles selecting and deselecting a category
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // handles selecting and deselecting exercises
  const handleSelectExercise = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(
        selectedExercises.filter((id: string) => id !== exerciseId),
      );
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  return (
    <main>
      <Header name={"Select Exercises"} />
      <div className={"py-16"}>
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full"}
          placeholder={"Search"}
        />
        <div className={"flex justify-around mt-5 mb-3"}>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              name={category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
        {exercises && (
          <div className={"flex flex-col"}>
            {filterExercisesByPrimary(exercises, selectedCategory).map(
              (exercise: any) => {
                return (
                  <SelectableExerciseCard
                    key={exercise.id}
                    name={exercise.data().name}
                    description={exercise.data().description}
                    img={benchPress.src}
                    primaryMuscle={exercise.data().primaryMuscle}
                    selected={selectedExercises.includes(exercise.id)}
                    onClick={() => {
                      handleSelectExercise(exercise.id);
                    }}
                  />
                );
              },
            )}
          </div>
        )}

        <Link
          className="fixed bottom-[30px] left-[50%] -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow z-20"
          href={"/create-exercise"}
        >
          <Image src={add} alt={"add exercise icon"} height={36} width={36} />
        </Link>
      </div>
    </main>
  );
}
