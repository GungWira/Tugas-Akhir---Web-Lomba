"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

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
  const [isPublished, setIsPublished] = useState(true);

  const newDate = useMemo(() => new Date(endDate), [endDate]);
  const formattedDate = newDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    const stopPublish = async () => {
      if (id && userId) {
        await fetch(
          `https://lomba-backend.vercel.app/teams/${id}/stopPublication`,
          {
            method: "POST",
            body: JSON.stringify({
              leaderId: userId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        setIsPublished(false);
      }
    };
    const currentDate = new Date();

    if (newDate < currentDate) {
      stopPublish();
    }
  }, [id, userId, newDate]);
  return (
    <div
      className={`card w-full rounded-lg px-4 py-6 sm:rounded-xl flex-col gap-3 bg-white ${className} ${
        isPublished
          ? "flex"
          : user
          ? user.id == userId
            ? "flex"
            : "hidden"
          : "hidden"
      }`}
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

        {teamSlot == 0 ? (
          <div className="w-full border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
            <div className="min-w-10 min-h-10 rounded-full border overflow-hidden">
              <Image
                src={"/imgs/profile/ready.svg"}
                alt="Image Profile Leader"
                width={1}
                height={1}
                layout="responsive"
                className="w-full"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-0 w-full">
              <p className="text-blueSec font-poppinsSemiBold text-sm">
                Tim Siap
              </p>
              <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
            </div>
          </div>
        ) : (
          <div className="w-full border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
            <div className="min-w-10 min-h-10 rounded-full border overflow-hidden">
              <Image
                src={"/imgs/dashboard-imgs/Default-Profile-Img.svg"}
                alt="Image Profile Leader"
                width={1}
                height={1}
                layout="responsive"
                className="w-full"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-0 w-full">
              <p className="text-normalText font-poppinsMedium text-sm">
                {teamSlot ? teamSlot : "0"} Slot Tersisa
              </p>
              <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
            </div>
          </div>
        )}
        <Button className="text-sm">Detail</Button>
      </div>
    </div>
  );
};

export default TeamCard;
