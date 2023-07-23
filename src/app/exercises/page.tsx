"use client";
import { Navigation } from "@/components/Navigation";
import { ExerciseCard } from "@/components/ExerciseCard";
import benchPress from "../../../public/bench-press.png";
import exerciseList from "../../initialExerciseList.json";
import add from "../../../public/add.svg";
import { CategoryButton } from "@/components/CategoryButton";
import list from "../../../public/format_list_bulleted.svg";
import { Header } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "@firebase/firestore";
import { app } from "../../../firebase/firebaseApp";
import { UserAuth } from "../../../firebase/authContext";
import { useEffect, useState } from "react";

const categories = ["Arms", "Back", "Chest", "Legs", "Shoulders"];

export default function Exercises() {
  const { user } = UserAuth();

  const [value, loading, error] = useCollection(
    collection(getFirestore(app), `users/${user.uid}/exercises`),
    {},
  );

  const exercises: any = value?.docs.map((doc) => doc.data());
  console.log(exercises);

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
            <CategoryButton key={category} name={category} />
          ))}
        </div>
        {/*<div className={"flex flex-col"}>*/}
        {/*  {exercises!.map((exercise: any) => (*/}
        {/*    <ExerciseCard*/}
        {/*      key={exercise.name}*/}
        {/*      name={exercise.name}*/}
        {/*      description={exercise.description}*/}
        {/*      img={benchPress.src}*/}
        {/*      primaryMuscle={exercise.primaryMuscle}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</div>*/}

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
