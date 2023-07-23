import React from "react";

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

interface ExerciseCardProps {
  name: string;
  img: string;
  description: string;
  primaryMuscle: string;
}

export const ExerciseCard = ({
  name,
  img,
  description,
  primaryMuscle,
}: ExerciseCardProps) => {
  return (
    <div className={"flex gap-3 my-2.5"}>
      <div
        className={`p-0.5 flex items-center justify-center rounded-lg border-[3px] ${getOutlineColor(
          primaryMuscle,
        )}`}
      >
        <img src={img} alt="bench press" className={"h-14 w-14 rounded-lg"} />
      </div>
      <div className={"flex flex-col flex-1"}>
        <h2 className={"text-md font-bold"}>{name}</h2>
        <p className={"text-xs line-clamp-2 pr-2"}>{description}</p>
      </div>
    </div>
  );
};
