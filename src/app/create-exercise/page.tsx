"use client";
import { Header } from "@/components/Header";
import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { auth, db, storage } from "../../../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Exercise } from "@/app/interfaces";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreateExercise() {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [primaryMuscle, setPrimaryMuscle] = useState("");
  const [secondary, setSecondary] = useState("");
  const [image, setImage]: any = useState(null);

  // add an exercise to the user's collection
  const addExercise = async ({
    name,
    description,
    primaryMuscle,
    secondary,
  }: Exercise) => {
    if (!loading && image) {
      const exercisesCollection = collection(
        db,
        `users/${user?.uid}/exercises`,
      );
      const imageRef = ref(storage, `images/${image.name + v4()}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          await addDoc(exercisesCollection, {
            name: name,
            description: description,
            primaryMuscle: primaryMuscle,
            secondary: secondary,
            img: url,
          });
        });
      });
    }
    router.replace("/exercises");
  };

  return (
    <main>
      <Header name={"Create Exercise"} hideProfile />
      <div className={"flex flex-col py-16"}>
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Exercise Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Primary Muscle"}
          value={primaryMuscle}
          onChange={(e) => setPrimaryMuscle(e.target.value)}
        />
        <input
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Secondary Muscle"}
          value={secondary}
          onChange={(e) => setSecondary(e.target.value)}
        />

        <input
          type={"file"}
          className={"bg-gray-100 p-4 rounded-lg w-full mb-4"}
          placeholder={"Image"}
          onChange={(e) => setImage(e.target.files![0])}
        />

        <input
          type={"submit"}
          className="fixed w-full max-w-[380px] hover:cursor-pointer bottom-[30px] left-[50%] -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow z-20"
          value={"Create"}
          onClick={() => {
            addExercise({
              name,
              description,
              primaryMuscle,
              secondary,
            });
          }}
        />
      </div>
    </main>
  );
}
