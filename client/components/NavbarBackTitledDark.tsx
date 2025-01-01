import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
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
  const { user } = useUser();

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  const handleBack = () => {
    if (router) {
      router.back();
    }
  };

  const handleProfile = () => {
    if (user) {
      router.push("/profile");
    }
  };
  return (
    <div
      className={`w-full px-6 py-8 pb-6 flex flex-row justify-between items-center bg-bluePrimary left-0 fixed z-60 ${className}`}
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
      <div className="text-white font-poppinsSemiBold text-xl">{children}</div>
      <div className="flex flex-row justify-between items-center  rounded-full w-[36px]">
        <button
          typeof="button"
          onClick={handleProfile}
          className="w-16 aspect-square bg-transparent border-white rounded-lg overflow-hidden"
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

export default NavbarBack;
