import { Header } from "@/components/Header";
import React from "react";

export default function CreateExercise() {
  return (
    <main>
      <Header name={"Create Exercise"} hideProfile />
      <div className={"flex flex-col py-16"}>
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Exercise Name"}
        />
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Description"}
        />
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Primary Muscle"}
        />
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Image"}
        />

        <input
          type={"submit"}
          className="fixed w-full max-w-[380px] hover:cursor-pointer bottom-[30px] left-[50%] -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow z-20"
          value={"Create"}
        />
      </div>
    </main>
  );
}
