"use client";

import React from "react";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

type NavbarLoginProps = {
  className?: string;
  style?: React.CSSProperties;
  isAdmin?: boolean;
  onClick?: () => void;
};

const NavbarLogin: React.FC<NavbarLoginProps> = ({
  className = "",
  style,
  isAdmin,
  onClick,
}) => {
  const { user } = useUser();
  const router = useRouter();

  const handleProfile = () => {
    if (user) {
      router.push("/profile");
    }
  };
  return (
    <div
      className={`w-full px-6 py-4 flex flex-row top-0 left-0 justify-center items-center bg-white fixed z-50 gap-2 shadow-sm ${className}`}
      style={{
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        ...style,
      }}
    >
      <div className="w-full flex flex-row items-center sm:justify-between max-w-6xl">
        <button
          typeof="button"
          className="w-12 h-12 bg-transparent overflow-hidden sm:hidden"
          onClick={onClick}
        >
          <Image
            src={"/imgs/dashboard-imgs/Sidebar-Button.svg"}
            alt="Sidebar Button"
            width={1}
            height={1}
            layout="responsive"
          />
        </button>
        <button
          typeof="button"
          className="w-12 h-12 bg-transparent overflow-hidden sm:flex hidden"
        >
          <Image
            src={"/imgs/dashboard-imgs/logo.svg"}
            alt="Sidebar Button"
            width={1}
            height={1}
            layout="responsive"
          />
        </button>
        <div className="flex flex-col justify-start items-start gap-1 w-full sm:hidden">
          <p className="text-xs text-normalText opacity-70 font-poppinsMedium">
            Informasi Lomba
          </p>
          <h1 className="text-sm text-normalText font-poppinsSemiBold">
            Universitas Primakara
          </h1>
        </div>

        <div
          className={`flex-row gap-8 justify-center items-center hidden sm:flex ${
            isAdmin ? "sm:hidden" : ""
          }`}
        >
          <Link
            href={"/"}
            className="font-poppinsRegular text-normalText text-base flex-1"
          >
            Beranda
          </Link>
          <Link
            href={"/lomba"}
            className="font-poppinsRegular text-normalText text-base flex-1"
          >
            Lomba
          </Link>
          <Link
            href={"/tim"}
            className="font-poppinsRegular text-normalText text-base flex-1"
          >
            Tim
          </Link>
        </div>
        <div
          className={`flex-row gap-8 justify-center items-center hidden ${
            isAdmin ? "sm:flex" : "sm:hidden"
          }`}
        >
          <Link
            href={"/admin"}
            className="font-poppinsRegular text-normalText text-base flex-1"
          >
            Dashboard
          </Link>
          <Link
            href={"/admin/competition"}
            className="font-poppinsRegular text-normalText text-base flex-1"
          >
            Publish
          </Link>
        </div>

        <button
          typeof="button"
          onClick={handleProfile}
          className="w-16 sm:w-12 aspect-square bg-transparent border-white rounded-lg overflow-hidden"
        >
          <Image
            src={
              user?.imageUrl || "/imgs/dashboard-imgs/Default-Profile-Img.svg"
            }
            alt="User Profile Image"
            width={1}
            height={1}
            layout="responsive"
          />
        </button>
      </div>
    </div>
  );
};

export default NavbarLogin;
