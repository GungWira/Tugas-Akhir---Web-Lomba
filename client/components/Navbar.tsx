import React from "react";
import Link from "next/link";

type NavbarProps = {
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({
  className = "",
}) => {
  return (
    <div className={`w-full px-6 py-4 flex flex-row justify-between items-center bg-[#F1F2F6] fixed z-50 ${className}`} >
        <Link href={'/'}>
            <img src="./imgs/logo-univ-mini-round.svg" alt="logo primakara" />
        </Link>
        <div className="flex flex-row justify-between items-center px-2 py-1 rounded-full gap-3 bg-white">
            <img src="./imgs/indonesia-flag-rounded.svg" alt="indonesia" className="w-[24px]"/>
            <p className="text-xs font-poppinsRegular">
                IDN
            </p>
            <img src="./imgs/dropdown-language.svg" alt="drop" className="w-[14px]"/>
        </div>
    </div>
  );
};

export default Navbar;
