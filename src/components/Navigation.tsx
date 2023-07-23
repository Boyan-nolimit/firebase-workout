import React from "react";
import Link from "next/link";

interface NavigationProps {
  activeTab: string;
}
export const Navigation = ({ activeTab }: NavigationProps) => {
  return (
    <div
      className={
        "flex flex-1 w-full max-w-[420px] self-center p-4 bg-gray-100 justify-around fixed -mt-5"
      }
    >
      <Link href={"/"} className={`${activeTab === "workouts" && "font-bold"}`}>
        Workouts
      </Link>
      <Link
        href={"/exercises"}
        className={`${activeTab === "exercises" && "font-bold"}`}
      >
        Exercises
      </Link>
    </div>
  );
};
