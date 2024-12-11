import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style? : React.CSSProperties;
  type?: "button" | "submit" | "reset";
  isDisabled? : boolean;
};


const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  style ={},
  type = "button",
  isDisabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blueSec w-full p-2 text-white font-poppinsMedium mt-4 rounded-lg ${className}`}
      style={style}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
