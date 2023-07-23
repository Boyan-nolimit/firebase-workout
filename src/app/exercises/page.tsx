import { Navigation } from "@/components/Navigation";
import { ExerciseCard } from "@/components/ExerciseCard";
import benchPress from "../../../public/bench-press.png";
import exerciseList from "../../initialExerciseList.json";
import { CategoryButton } from "@/components/CategoryButton";

const categories = ["Arms", "Back", "Chest", "Legs", "Shoulders"];

export default function Exercises() {
  const sortedExerciseList = exerciseList.sort((a, b) => {
    if (a.primaryMuscle < b.primaryMuscle) {
      return -1;
    }
    return 1;
  });

  return (
    <main className="flex flex-1 min-h-screen flex-col p-5">
      <Navigation activeTab={"exercises"} />
      <h1 className="text-xl font-bold pt-14 mb-2">Exercise list</h1>
      <input className={"bg-gray-100 p-4 rounded-lg"} placeholder={"Search"} />
      <div className={"flex justify-around my-5"}>
        {categories.map((category) => (
          <CategoryButton key={category} name={category} />
        ))}
      </div>
      <div className={"flex flex-col pb-16"}>
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

      <button className="fixed bottom-5 w-[380px] bg-blue-500 hover:bg-blue-700 text-white font-medium p-4 rounded-lg drop-shadow-xl">
        Add Exercise
      </button>
    </main>
  );
}
