import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const exerciseList = require("../utils/initialExerciseList.json");

export const createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection("users").doc(user.uid).set({
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
  });

  const batch = db.batch();

  exerciseList.forEach((exercise: any) => {
    let docRef = db
      .collection("users")
      .doc(user.uid)
      .collection("exercises")
      .doc();
    batch.set(docRef, {
      name: exercise.name,
      description: exercise.description,
      primaryMuscle: exercise.primaryMuscle,
      secondary: exercise.secondary,
      img: exercise.img,
    });
  });
  batch.commit();
});
