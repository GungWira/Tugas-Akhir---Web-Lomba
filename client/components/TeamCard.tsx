import React from "react";
import Image from "next/image";
import Button from "./Button";
import { useUser } from "@/contexts/UserContext";

type TeamCardProps = {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  onClick?: () => void;
  captainName: string;
  captainImgUrl: string;
  teamSlot: number;
  className?: string;
  userId: string;
  //   startDate : Date;
  //   registerLink : string;
  //   guideBooklink? : string;
};

const TeamCard: React.FC<TeamCardProps> = ({
  id,
  title,
  description,
  endDate,
  onClick,
  captainName,
  captainImgUrl,
  teamSlot,
  className,
  userId,
}) => {
  const { user } = useUser();

  const newDate = new Date(endDate);
  const formattedDate = newDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
  });
  return (
    <div
      className={`card w-full rounded-lg px-4 py-6 sm:rounded-xl flex flex-col gap-3 bg-white ${className}`}
      key={id}
      onClick={onClick}
    >
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-base font-poppinsMedium">{title}</h2>
        <div className="px-3 py-1 text-xs bg-blueSec font-poppinsRegular text-white rounded-full">
          {formattedDate}
        </div>
      </div>
      <p className="font-poppinsRegular text-sm text-normalText opacity-40">
        {description}
      </p>
      <div className="detail w-full flex flex-col gap-2 justify-start items-start">
        {/* KETUA */}
        <div className="w-full bg-white border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
          <div className="max-w-10 min-w-10 aspect-square rounded-full border overflow-hidden">
            <Image
              src={captainImgUrl}
              alt="Image Profile Leader"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-0 w-full">
            <p className="text-normalText font-poppinsMedium text-sm">
              {user ? (userId == user.id ? "Anda" : captainName) : ""}
            </p>
            <p className="font-poppinsRegular text-xs text-normalText opacity-40">
              Ketua tim
            </p>
          </div>
          <div className="w-6 h-6 rounded-full">
            <Image
              src={"/imgs/dashboard-imgs/Crown.svg"}
              alt="Crown Icon"
              width={1}
              height={1}
              layout="responsive"
              className="w-6 h-6 rounded-full"
            />
          </div>
        </div>
        {/* ANGGOTA */}
        <div className="w-full border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
          <div className="max-w-10 min-w-10 aspect-square overflow-hidden rounded-full border">
            <Image
              src={"/imgs/dashboard-imgs/Default-Profile-Img.svg"}
              alt="Image Profile Default"
              width={1}
              height={1}
              layout="responsive"
              className="w-full"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-0 w-full">
            <p className="text-normalText font-poppinsMedium text-sm">
              {teamSlot} Slot Tersisa
            </p>
            <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
          </div>
        </div>
        <Button className="text-sm">Detail</Button>
      </div>
    </div>
  );
};

export default TeamCard;
