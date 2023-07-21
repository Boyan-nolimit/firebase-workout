"use client";
import { UserAuth } from "../../../firebase/authContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { user, googleSignIn, logOut } = UserAuth();
  const handleSignIn = async () => {
    try {
      googleSignIn();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">Log In Screen</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignIn}
      >
        Sign In with Google
      </button>
    </main>
  );
}
