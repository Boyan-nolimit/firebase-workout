"use client";
import Link from "next/link";
import { app, auth } from "../../firebase/firebaseApp";
import { Navigation } from "@/components/Navigation";
import { Header } from "@/components/Header";
import exercise from "../../public/exercise.svg";
import Image from "next/image";
import add from "../../public/add.svg";
import { Workout } from "@/components/Workout";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "@firebase/firestore";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [user, loading] = useAuthState(auth);

  const [workouts, loadingWorkouts] = useCollectionOnce(
    collection(getFirestore(app), `users/${user?.uid}/workouts`),
  );
  const workoutsData = workouts?.docs.map((doc) => doc.data());

  const [exercises] = useCollectionOnce(
    collection(getFirestore(app), `users/${user?.uid}/exercises`),
  );
  const exercisesData = exercises?.docs.map((doc) => doc);

  const getExercisesFromWorkout = (exerciseIds: string[]) => {
    return exerciseIds
      .map((exerciseId) => {
        return exercisesData?.find((exercise) => exercise.id === exerciseId);
      })
      .filter(function (element) {
        return element !== undefined;
      })
      .map((exercise) => exercise?.data());
  };

  return (
    <main>
      <Navigation activeTab={"workouts"} />
      <Header name={"Workouts"} icon={exercise.src} />
      <Link
        className="fixed bottom-[30px] left-[50%] -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow z-20"
        href={"/add-workout"}
      >
        <Image src={add} alt={"add exercise icon"} height={36} width={36} />
      </Link>
      {loading && <div>loading...</div>}
      {!user && (
        <div className={"flex py-16"}>
          <Link
            href={"/login"}
            className={
              "text-bold self-center text-white w-full max-w-[420px] p-5 bg-blue-700 rounded-lg z-40 text-center opacity-100"
            }
          >
            Go to Log in
          </Link>
        </div>
      )}
      {workoutsData && !loadingWorkouts && (
        <div className={"py-16 flex flex-col"}>
          {workoutsData?.map((workout) => (
            <Workout
              key={uuid()}
              name={workout?.name}
              exerciseList={getExercisesFromWorkout(workout?.exercises)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
