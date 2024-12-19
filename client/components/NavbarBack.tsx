import React from "react";
import Link from "next/link";
import Image from "next/image";

type NavbarBackProps = {
  className?: string;
  href : string;
};

const NavbarBack: React.FC<NavbarBackProps> = ({

  href
}) => {
  return (
    <div className="w-full px-6 py-4 flex flex-row justify-between items-center bg-[#F1F2F6] left-0 fixed z-50">
        <Link href={href}>
            <Image
              src={'/imgs/create-account-imgs/back-btn.svg'}
              alt="Back Button"
              width={1}
              height={1}
              layout="responsive"
            />
        </Link>
        <div className="flex flex-row justify-between items-center px-2 py-1 rounded-full gap-3 bg-white">
          <div className="w-[24px]">
            <Image
              src={'/imgs/indonesia-flag-rounded.svg'}
              alt="Indonesian Flag"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
            <p className="text-xs font-poppinsRegular">
                IDN
            </p>
            <div className="w-[14px]">
            <Image
              src={'/imgs/dropdown-language.svg'}
              alt="Drop Icon"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
        </div>
    </div>
  );
};

export default NavbarBack;
