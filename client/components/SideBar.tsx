"use client";

import React from "react";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "./Button";

type SideBarProps = {
  className?: string;
  style?: React.CSSProperties;
  isAdmin?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
};

const SideBar: React.FC<SideBarProps> = ({ isAdmin, isOpen, onClick }) => {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout");
    try {
      await logout();
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Terjadi error yang tidak diketahui");
      }
    }
  };
  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 bg-bluePrimary flex flex-col justify-between items-start z-60 sm:hidden transition-all duration-800 ${
        isOpen ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col justify-start items-start w-full px-4 gap-16 pt-16">
        <div className="flex flex-row justify-start items-center gap-4 w-full">
          <Button
            className="bg-transparent p-0 aspect-square overflow-hidden mt-0 m-0"
            style={{ width: "48px", marginTop: "0px", marginLeft: "0px" }}
            onClick={onClick}
          >
            <Image
              src={"/imgs/admin/close.svg"}
              alt="Sidebar Button"
              width={48}
              height={48}
            />
          </Button>
          <div className="flex flex-col justify-start items-start gap-1">
            <p
              className={`font-poppinsRegular text-xs text-white opacity-80 ${
                isAdmin ? "hidden" : "flex"
              }`}
            >
              Informasi Lomba
            </p>
            <p
              className={`font-poppinsRegular text-xs text-white opacity-80 ${
                isAdmin ? "flex" : "hidden"
              }`}
            >
              Dashboard Admin
            </p>
            <h1 className="font-poppinsSemiBold text-sm text-white">
              Universitas Primakara
            </h1>
          </div>
        </div>
        <div
          className={`flex flex-col justify-start items-start gap-8 ${
            isAdmin ? "flex" : "hidden"
          }`}
        >
          <Link
            href="/admin"
            className="font-poppinsRegular text-white text-sm opacity-70"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/competition"
            className="font-poppinsRegular text-white text-sm opacity-70"
          >
            Publish
          </Link>
        </div>
        <div
          className={`flex flex-col justify-start items-start gap-8 ${
            isAdmin ? "hidden" : "flex"
          }`}
        >
          <Link
            href="/"
            className="font-poppinsRegular text-white text-sm opacity-70"
          >
            Beranda
          </Link>
          <Link
            href="/lomba"
            className="font-poppinsRegular text-white text-sm opacity-70"
          >
            Lomba
          </Link>
          <Link
            href="/tim"
            className="font-poppinsRegular text-white text-sm opacity-70"
          >
            Tim
          </Link>
          <Link
            href="/profile"
            className="font-poppinsRegular text-white text-sm opacity-70"
          >
            Profil
          </Link>
        </div>
      </div>
      <div className="w-full px-4 py-6 bg-blueFade flex flex-row justify-between items-center gap-8">
        <Link
          href={`/profile`}
          className="bg-transparent p-0 w-full overflow-hidden flex flex-row justify-start items-center gap-4"
        >
          <div className="w-12 aspect-square overflow-hidden flex items-start rounded-md">
            <Image
              src={
                user?.imageUrl || "/imgs/dashboard-imgs/Default-Profile-Img.svg"
              }
              alt="Logout"
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-1">
            <p className="font-poppinsMedium text-sm text-white">
              {user?.name}
            </p>
            <p
              className={`font-poppinsRegular text-xs opacity-70 text-white ${
                isAdmin ? "hidden" : "flex"
              }`}
            >
              {user?.nim}
            </p>
          </div>
        </Link>
        <Button
          className="bg-transparent p-0 aspect-square overflow-hidden flex flex-row justify-start items-center gap-4"
          style={{ width: "48px", minWidth: "48px", marginTop: "0px" }}
          onClick={handleLogout}
        >
          <Image
            src={"/imgs/profile/logout.svg"}
            alt="Logout"
            width={48}
            height={48}
          />
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
