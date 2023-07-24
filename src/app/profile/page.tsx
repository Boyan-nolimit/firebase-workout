"use client";
import Link from "next/link";
import { Header } from "@/components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseApp";
import { signOut } from "@firebase/auth";

const logOut = async () => {
  await signOut(auth);
};

export default function Profile() {
  const [user, loading]: any = useAuthState(auth);

  return (
    <main>
      <Header name={"Profile"} hideProfile />
      <div className={"py-16 flex flex-col gap-8"}>
        {loading && <p>Loading...</p>}
        {user && (
          <div className="flex flex-col items-center justify-center gap-6">
            <h2 className="text-2xl font-bold text-center">Welcome</h2>
            <img
              className="w-24 h-24 rounded-full"
              src={user.photoURL}
              alt={"user"}
            />
            <h3 className="text-xl font-bold text-center">
              {user.displayName}
            </h3>
          </div>
        )}

        {user ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logOut}
          >
            Log Out
          </button>
        ) : (
          <Link href={"/login"} className={"text-bold"}>
            Go to Log in
          </Link>
        )}
      </div>
    </main>
  );
}
