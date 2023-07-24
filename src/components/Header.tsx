"use client";
import React from "react";
import Image from "next/image";
import arrowBack from "../../public/arrow_back.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseApp";

interface TitleProps {
  name: string;
  icon?: string;
  hideProfile?: boolean;
}
export const Header = ({ name, icon, hideProfile }: TitleProps) => {
  const [user, loading]: any = useAuthState(auth);
  const router = useRouter();

  const showProfile = () => {
    if (loading) return <p>Loading...</p>;
    if (user && !hideProfile) {
      return (
        <Link href={"/profile"}>
          <img
            src={user.photoURL}
            alt={"user profile"}
            className={"rounded-full h-10 w-10"}
          />
        </Link>
      );
    }
  };

  return (
    <div
      className={
        "flex mb-5 items-center bg-white w-full max-w-[420px] -ml-5 px-5 h-[60px] -mt-5 fixed drop-shadow-sm z-10"
      }
    >
      <div className={"flex flex-1 gap-2.5"}>
        {!icon ? (
          <button onClick={() => router.back()}>
            <Image src={arrowBack} alt={"list icon"} height={20} width={20} />
          </button>
        ) : (
          <Image src={icon} alt={"list icon"} height={22} width={22} />
        )}
        <h1 className="text-xl font-semibold">{name}</h1>
      </div>
      {showProfile()}
    </div>
  );
};
