import React from "react";
import Image from "next/image";
import edit from "../../public/edit.svg";
import { ExerciseCard } from "@/components/ExerciseCard";
import Link from "next/link";

interface WorkoutProps {
  name: string;
  exerciseList: any[];
}

export const Workout = ({ name, exerciseList }: WorkoutProps) => {
  return (
    <div className={"flex flex-col mb-8"}>
      <div className={"flex justify-between"}>
        <h2>{name}</h2>
        <Link href={"/edit-workout"}>
          <Image src={edit} alt={"edit workout"} height={19} width={19} />
        </Link>
      </div>
      {exerciseList.map((exercise) => (
        <ExerciseCard
          key={exercise.name}
          name={exercise.name}
          img={exercise.img}
          description={exercise.description}
          primaryMuscle={exercise.primaryMuscle}
        />
      ))}
    </div>
  );
};
