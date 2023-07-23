"use client";
import React from "react";
import Image from "next/image";
import { UserAuth } from "../../firebase/authContext";
import arrowBack from "../../public/arrow_back.svg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface TitleProps {
  name: string;
  icon?: string;
}
export const Header = ({ name, icon }: TitleProps) => {
  const { user } = UserAuth();
  const router = useRouter();
  const path = usePathname();
  return (
    <div
      className={
        "flex mb-5 items-center bg-white w-[420px] -ml-5 px-5 h-[60px] -mt-5 fixed drop-shadow-sm z-10"
      }
    >
      <div className={"flex flex-1 gap-2.5"}>
        {!icon ? (
          <button onClick={() => router.back()}>
            <Image src={arrowBack} alt={"list icon"} height={22} width={22} />
          </button>
        ) : (
          <Image src={icon} alt={"list icon"} height={22} width={22} />
        )}
        <h1 className="text-xl font-semibold">{name}</h1>
      </div>
      {user && path !== "/profile" && (
        <Link href={"/profile"}>
          <img
            src={user.photoURL}
            alt={"user profile"}
            className={"rounded-full h-10 w-10"}
          />
        </Link>
      )}
    </div>
  );
};
