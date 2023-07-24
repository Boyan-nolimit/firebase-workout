"use client";
import { useRouter } from "next/navigation";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseApp";

export default function Login() {
  const router = useRouter();

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleLogin = () => {
    signInWithGoogle().then((r) => router.replace("/"));
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User</p>
      </div>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">Log In Screen</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleLogin()}
      >
        Sign In with Google
      </button>
    </main>
  );
}
