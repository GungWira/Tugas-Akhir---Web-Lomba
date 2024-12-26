import React from "react";
import Link from "next/link";
import Image from "next/image";

type NavbarProps = {
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-full px-6 py-4 flex flex-row justify-between items-center bg-[#F1F2F6] fixed z-50 ${className}`}
    >
      <Link href={"/"}>
        <div className="w-8 aspect-square overflow-hidden">
          <Image
            src="./imgs/logo-univ-mini-round.svg"
            alt="logo primakara"
            width={1}
            height={1}
            layout="responsive"
          />
        </div>
      </Link>
      <div className="flex flex-row justify-between items-center px-2 py-1 rounded-full gap-3 bg-white">
        <div className="w-6 aspect-square overflow-hidden">
          <Image
            src="./imgs/indonesia-flag-rounded.svg"
            alt="indonesia"
            width={1}
            height={1}
            layout="responsive"
            className="w-[24px]"
          />
        </div>
        <p className="text-xs font-poppinsRegular">IDN</p>
        <div className="w-4 aspect-square overflow-hidden">
          <Image
            src="./imgs/dropdown-language.svg"
            alt="drop"
            width={1}
            height={1}
            layout="responsive"
            className="w-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
