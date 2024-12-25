import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type NavbarBackProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const NavbarBack: React.FC<NavbarBackProps> = ({
  children,
  className,
  style = {},
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (router) {
      router.back();
    }
  };
  return (
    <div
      className={`w-full px-6 py-8 pb-12 flex flex-row justify-between items-center bg-blueFade left-0 fixed z-50 ${className}`}
      style={style}
    >
      <button onClick={handleBack} className="w-[36px]">
        <Image
          src={"/imgs/create-account-imgs/back-btn.svg"}
          alt="Back Button"
          width={1}
          height={1}
          layout="responsive"
        />
      </button>
      <div className="text-white text-center font-poppinsSemiBold text-xl">
        {children}
      </div>
      <div className="flex flex-row justify-between items-center  rounded-full w-[36px] bg-blueFade">
        <div className="w-[24px]">
          <Image
            src={"/imgs/indonesia-flag-rounded.svg"}
            alt="Indonesian Flag"
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
