import React from "react";
import Image from "next/image";
import Button from "./Button";

type AlertProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  description: string;
  onConfirm: () => void;
  onReject: () => void;
  isOpen: boolean;
};

const Alert: React.FC<AlertProps> = ({
  children,
  description,
  onConfirm,
  onReject,
  isOpen = false,
}) => {
  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-60 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="bg-black opacity-60 w-screen h-screen absolute z-10"></div>
      {/* NOTIF */}
      <div className="relative z-20 px-4 justify-center items-center w-full">
        <div className="w-full bg-white rounded-xl p-4 flex flex-col justify-start items-center gap-2">
          <div className="w-14 aspect-square overflow-hidden mt-4">
            <Image
              src="/imgs/alert/danger.svg"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <p className="font-poppinsSemiBold text-normalText text-base text-center w-full">
            {children}
          </p>
          <p className="font-poppinsRegular text-normalText text-sm opacity-70 w-4/5 text-center">
            {description}
          </p>
          <div className="w-full flex justify-start items-start gap-2">
            <Button className="bg-[#DDDDDD] text-[#686868]" onClick={onReject}>
              Batal
            </Button>
            <Button onClick={onConfirm}>Ya</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
