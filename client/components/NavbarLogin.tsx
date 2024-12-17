import Image from "next/image";
import React from "react";

type NavbarLoginProps = {
  className?: string;
  style? : React.CSSProperties;
  imageUrl? : string;
};

const NavbarLogin: React.FC<NavbarLoginProps> = ({
  className = "",
  style,
  imageUrl
}) => {
  return (
    <div 
      className={`w-full px-6 py-4 flex flex-row top-0 left-0 justify-between items-center bg-bluePrimary fixed z-50 gap-2 ${className}`} 
      style={{borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', ...style}}>
        <button typeof="button" className="w-12 h-12 bg-transparent overflow-hidden">
          <Image
            src={'/imgs/dashboard-imgs/Sidebar-Button.svg'}
            alt="Sidebar Button"
            width={1}
            height={1}
            layout="responsive"
          />
        </button>
        <div className="flex flex-col justify-start items-start gap-1 w-full">
          <p className="text-xs text-white opacity-70 font-poppinsMedium">
            Informasi Lomba
          </p>
          <h1 className="text-sm text-white font-poppinsSemiBold">
            Universitas Primakara
          </h1>
        </div>
        <button typeof="button" className="w-12 h-12 bg-transparent border-white rounded-lg overflow-hidden">
          <Image
            src={imageUrl || '/imgs/dashboard-imgs/Default-Profile-Img.svg'}
            alt="User Profile Image"
            width={1}
            height={1}
            layout="responsive"
          />
        </button>
    </div>
  );
};

export default NavbarLogin;
