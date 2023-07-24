import React from "react";

const getBgColor = (name: string) => {
  switch (name) {
    case "Chest":
      return "bg-red-300";
    case "Legs":
      return "bg-blue-300";
    case "Back":
      return "bg-green-300";
    case "Shoulders":
      return "bg-yellow-300";
    case "Arms":
      return "bg-purple-300";
  }
};

interface CategoryButtonProps {
  name: string;
  onClick: () => void;
}
export const CategoryButton = ({ name, onClick }: CategoryButtonProps) => {
  return (
    <button className={"flex flex-col items-center flex-1"} onClick={onClick}>
      <div className={`h-12 w-12 rounded-lg ${getBgColor(name)}`} />
      <p className={"text-sm text-center"}>{name}</p>
    </button>
  );
};
