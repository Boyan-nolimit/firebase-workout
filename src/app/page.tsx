"use client";
import Link from "next/link";
import { UserAuth } from "../../firebase/authContext";

export default function Home() {
  const { user, logOut } = UserAuth();
  console.log(user);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <h1 className="text-6xl font-bold text-center">HOME SCREEN</h1>
      {user && (
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="text-2xl font-bold text-center">Welcome</h2>
          <img
            className="w-24 h-24 rounded-full"
            src={user.photoURL}
            alt={"user"}
          />
          <h3 className="text-xl font-bold text-center">{user.displayName}</h3>
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
    </main>
  );
}
