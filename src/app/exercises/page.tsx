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

const categories = ["Arms", "Back", "Chest", "Legs", "Shoulders"];

export default function Exercises() {
  const sortedExerciseList = exerciseList.sort((a, b) => {
    if (a.primaryMuscle < b.primaryMuscle) {
      return -1;
    }
    return 1;
  });

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
        <div className={"flex flex-col"}>
          {sortedExerciseList.map((exercise) => (
            <ExerciseCard
              key={exercise.name}
              name={exercise.name}
              description={exercise.description}
              img={benchPress.src}
              primaryMuscle={exercise.primaryMuscle}
            />
          ))}
        </div>

        <Link
          className="fixed bottom-[70px] right-5 bg-blue-500 hover:bg-blue-700 text-white font-medium p-3 rounded-lg drop-shadow"
          href={"/add-exercise"}
        >
          <Image src={add} alt={"add exercise icon"} height={36} width={36} />
        </Link>
      </div>
    </main>
  );
}
