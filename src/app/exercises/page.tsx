"use client";
import { Navigation } from "@/components/Navigation";
import add from "../../../public/add.svg";
import { CategoryButton } from "@/components/CategoryButton";
import list from "../../../public/format_list_bulleted.svg";
import { Header } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "@firebase/firestore";
import { app, auth } from "../../../firebase/firebaseApp";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ExerciseCard } from "@/components/ExerciseCard";

const categories = ["Arms", "Back", "Chest", "Legs", "Shoulders"];

function comparePrimaryMuscle(a: any, b: any) {
  if (a.primaryMuscle < b.primaryMuscle) {
    return -1;
  }
  if (a.primaryMuscle > b.primaryMuscle) {
    return 1;
  }
  return 0;
}

export default function Exercises() {
  const [user] = useAuthState(auth);
  const [selectedCategory, setSelectedCategory]: any = useState(null);

  const [exercisesQuery] = useCollection(
    collection(getFirestore(app), `users/${user?.uid}/exercises`),
    {},
  );
  const exercises = exercisesQuery?.docs
    .map((doc) => doc.data())
    .sort(comparePrimaryMuscle);

  const filterExercisesByPrimary = (exercises: any[], primary: string) => {
    if (exercises) {
      if (primary === null) return exercises;
      return exercises.filter((exercise) => {
        return exercise.primaryMuscle === primary;
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

  return (
    <main>
      <Navigation activeTab={"exercises"} />
      <Header name={"Exercise List"} icon={list.src} />
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
              (exercise: any) => (
                <ExerciseCard
                  key={exercise.name}
                  name={exercise.name}
                  description={exercise.description}
                  img={exercise.img}
                  primaryMuscle={exercise.primaryMuscle}
                />
              ),
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
