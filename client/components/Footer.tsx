import React from "react";
import Link from "next/link";
import Image from "next/image";

type NavbarProps = {
  className?: string;
};

const Footer: React.FC<NavbarProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-full px-6 py-2 flex flex-row justify-between items-center bg-white z-50 ${className}`}
    >
      <div
        className={`w-full max-w-6xl flex flex-col justify-start items-start`}
      >
        {/* SUBSCRIBE */}
        <div className="flex flex-col justify-between w-full items-center gap-4 py-8 border-b border-[#DDDDDD]">
          <div className="w-full max-w-96 flex justify-start items-center font-poppinsSemiBold text-lg text-normalText">
            Ikuti kami agar untuk informasi lomba terbaru
          </div>
          <div className="flex flex-row justify-start items-center gap-2 w-full max-w-96">
            <input
              type="email"
              placeholder="Masukkan Email Anda"
              className="w-full bg-transparent rounded-md p-4 text-normalText font-poppinsRegular text-sm border border-[#DDDDDD]"
            />
            <button className="px-6 py-4 text-white font-poppinsMedium text-sm bg-blueSec rounded-md">
              Subscribe
            </button>
          </div>
        </div>
        {/* FOOTER */}
        <div className="flex flex-col justify-start items-start gap-6 py-8">
          <div className="flex flex-col justify-start items-start gap-1">
            <Link href={"/"} className="w-8 aspect-square overflow-hidden">
              <Image
                src={"/imgs/footer/logo.svg"}
                alt="Logo Primakara"
                width={1}
                height={1}
                layout="responsive"
              />
            </Link>
            <p className="text-normalText font-poppinsSemiBold text-base">
              Informasi Lomba
            </p>
            <p className="text-normalText font-poppinsRegular text-sm">
              Jelajahi lomba, ukir prestasi, gapai mimpimu!
            </p>
          </div>
          <div className="flex flex-col w-full max-w-96 justify-between items-start gap-5">
            <div className="flex flex-col gap-1 justify-start items-start">
              <p className="text-normalText font-poppinsMedium text-base">
                Navigasi
              </p>
              <Link
                href={"/"}
                className="text-normalText font-poppinsRegular text-sm opacity-75"
              >
                Beranda
              </Link>
              <Link
                href={"/"}
                className="text-normalText font-poppinsRegular text-sm opacity-75"
              >
                Informasi Lomba
              </Link>
              <Link
                href={"/profile"}
                className="text-normalText font-poppinsRegular text-sm opacity-75"
              >
                Profil
              </Link>
            </div>
            <div className="flex flex-col gap-1 justify-start items-start">
              <p className="text-normalText font-poppinsMedium text-base">
                Kontak
              </p>
              <Link
                href={"/"}
                className="text-normalText font-poppinsRegular text-sm opacity-75"
              >
                info@primakara.ac.id
              </Link>
              <Link
                href={"/"}
                className="text-normalText font-poppinsRegular text-sm opacity-75"
              >
                +62 831-1422-6818
              </Link>
            </div>
          </div>
        </div>
        {/* COPYRIGHT */}
        <div className="flex justify-start items-start w-full py-6 border-t border-[#DDDDDD]">
          <p className="text-normalText text-xs font-poppinsRegular">
            © 2024 Informasi Lomba Primakara. All right reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
