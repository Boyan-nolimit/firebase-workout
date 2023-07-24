import React from "react";
import check from "../../public/check_small.svg";

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
  selected: boolean;
  onClick: () => void;
}

export const SelectableExerciseCard = ({
  name,
  img,
  description,
  primaryMuscle,
  selected,
  onClick,
}: ExerciseCardProps) => {
  return (
    <button className={"flex text-start gap-3 my-2"} onClick={onClick}>
      <div
        className={`p-0.5 bg-white flex items-center justify-center rounded-lg border-[2.5px] ${getOutlineColor(
          primaryMuscle,
        )}`}
      >
        {selected ? (
          <img
            src={check.src}
            alt="bench press"
            className={"h-12 w-12 m-1 rounded-lg"}
          />
        ) : (
          <img src={img} alt="bench press" className={"h-14 w-14 rounded-lg"} />
        )}
      </div>
      <div className={"flex flex-col flex-1"}>
        <h2 className={"text-md font-bold"}>{name}</h2>
        <p className={"text-xs line-clamp-2 pr-2"}>{description}</p>
      </div>
    </button>
  );
};
