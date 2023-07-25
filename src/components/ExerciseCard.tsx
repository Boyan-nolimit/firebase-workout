import React from "react";
import Image from "next/image";
import deleteIcon from "../../public/delete.svg";

const getOutlineColor = (primaryMuscle: string) => {
  switch (primaryMuscle) {
    case "Chest":
      return "border-red-300";
    case "Legs":
      return "border-blue-300";
    case "Back":
      return "border-green-300";
    case "Shoulders":
      return "border-yellow-300";
    case "Arms":
      return "border-purple-300";
  }
};

export interface ExerciseCardProps {
  name: string;
  img: string;
  description: string;
  primaryMuscle: string;
  onClick?: () => void;
}

export const ExerciseCard = ({
  name,
  img,
  description,
  primaryMuscle,
  onClick,
}: ExerciseCardProps) => {
  return (
    <div className={"flex gap-3 my-2"}>
      <div
        className={`p-0.5 bg-white flex items-center justify-center rounded-lg border-[2.5px] ${getOutlineColor(
          primaryMuscle,
        )}`}
      >
        <img src={img} alt="bench press" className={"h-14 w-14 rounded-lg"} />
      </div>
      <div className={"flex flex-col flex-1"}>
        <div className={"flex"}>
          <h2 className={"flex flex-1 text-md font-bold"}>{name}</h2>
          {onClick && (
            <button onClick={onClick}>
              <Image src={deleteIcon} alt={"Delete"} height={18} width={18} />
            </button>
          )}
        </div>
        <p className={"text-xs line-clamp-2 pr-2"}>{description}</p>
      </div>
    </div>
  );
};
