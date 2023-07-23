import { Navigation } from "@/components/Navigation";

export default function Exercises() {
  return (
    <main className="flex flex-1 min-h-screen flex-col justify-between p-5">
      <h1 className="text-3xl font-bold pt-12">Exercises</h1>
      <Navigation activeTab={"exercises"} />
    </main>
  );
}
