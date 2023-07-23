import { Header } from "@/components/Header";
import benchPress from "../../../public/bench-press.png";
import add from "../../../public/add.svg";
import { ExerciseCard } from "@/components/ExerciseCard";
import React from "react";
import Image from "next/image";

export default function EditWorkout() {
  return (
    <main>
      <Header name={"Edit Workout"} hideProfile />
      <div className={"py-16 flex flex-col"}>
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          value={"Workout 1"}
        />

        <ExerciseCard
          name={"Bench Press"}
          img={benchPress.src}
          description={"Chest"}
          primaryMuscle={"Chest"}
        />
        <ExerciseCard
          name={"Squat"}
          img={benchPress.src}
          description={"The squat is awesome"}
          primaryMuscle={"Legs"}
        />

        <button className={"flex gap-3 my-2 items-center"}>
          <div
            className={`h-[66px] w-[66px] flex items-center justify-center rounded-lg border-[2.5px] bg-blue-500`}
          >
            <Image src={add} alt={"add"} />
          </div>
          <h2 className={"text-md font-bold"}>Add Exercise</h2>
        </button>

        <input
          type={"submit"}
          className="fixed w-full max-w-[380px] hover:cursor-pointer bottom-[30px] left-[50%] -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow z-20"
          value={"Create"}
        />
      </div>
    </main>
  );
}
