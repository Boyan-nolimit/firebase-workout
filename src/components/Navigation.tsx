import React from "react";
import Link from "next/link";
import Image from "next/image";
import dumbbell from "../../public/exercise.svg";
import list from "../../public/format_list_bulleted.svg";

interface NavigationProps {
  activeTab: string;
}
export const Navigation = ({ activeTab }: NavigationProps) => {
  return (
    <div
      className={
        "flex flex-1 w-full max-w-[420px] self-center justify-around fixed -mt-5"
      }
    >
      <Link
        href={"/"}
        className={`${
          activeTab === "workouts" && "border-b-4 border-blue-500"
        }  p-4 bg-gray-100 flex flex-1 justify-center`}
      >
        <Image src={dumbbell} alt={"workouts page"} />
      </Link>
      <Link
        href={"/exercises"}
        className={`${
          activeTab === "exercises" && "border-b-4 border-blue-500"
        } p-4 bg-gray-100 flex flex-1 justify-center`}
      >
        <Image src={list} alt={"exercises page"} />
      </Link>
    </div>
  );
};
