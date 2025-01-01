"use client";

import NavbarBackTitled from "@/components/NavbarBackTitled";
import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

interface Teams {
  competition: {
    endDate: string;
  };
  id: string;
  leader: {
    name: string;
    profile: string;
  };
  members: [];
  name: string;
  openSlots: number;
}

export default function Lomba() {
  const [teams, setTeams] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://lomba-backend.vercel.app/teams`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Gagal mengambil data tim");
      const data = await response.json();
      setTeams(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const handleDate = (date: string | null) => {
    if (!date) return;

    const newDate = new Date(date);
    const validDate = newDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
    });
    return validDate;
  };

  return (
    <div className="relative flex flex-col min-h-[100vh] justify-start items-center w-full">
      <NavbarBackTitled>Team</NavbarBackTitled>

      <div className="flex flex-col justify-start items-start p-4 pt-0 gap-2 mt-24 w-full min-h-screen max-w-6xl">
        <p className="text-base font-poppinsSemiBold">Semua Tim</p>
        <div className="w-full flex md:grid md:grid-cols-2 xl:grid-cols-3t flex-col justify-start items-start gap-4">
          {/* CARD */}
          {teams.map((team: Teams) => (
            <Link
              className={`card w-full rounded-lg p-4 flex flex-col gap-3 overflow-hidden bg-white ${
                team.openSlots == 0 ? "hidden" : ""
              }`}
              key={team.id}
              href={`/tim/${team.id}`}
            >
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-base font-poppinsMedium">{team.name}</h2>
                <div className="px-3 py-1 text-xs bg-blueSec font-poppinsRegular text-white rounded-full">
                  {handleDate(team.competition.endDate)}
                </div>
              </div>
              <p className="font-poppinsRegular text-sm text-normalText opacity-40">
                Dicari seorang backend developer serta ui designer figma yang
                kompeten dan dapat diajak berkomunikasi.
              </p>
              <div className="detail w-full flex flex-col gap-2 justify-start items-start">
                {/* KETUA */}
                <div className="w-full bg-white border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                  <div className="w-12 aspect-square overflow-hidden rounded-lg border">
                    <Image
                      src={`${
                        team.leader.profile ||
                        "./imgs/dashboard-imgs/Default-Profile-Img.svg"
                      }`}
                      alt="Image Profile Leader"
                      width={1}
                      height={1}
                      layout="responsive"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-0 w-full">
                    <p className="text-normalText font-poppinsMedium text-sm">
                      {team.leader.name}
                    </p>
                    <p className="font-poppinsRegular text-xs text-normalText opacity-40">
                      Ketua tim
                    </p>
                  </div>
                  <div className="w-6 aspect-square rounded-full">
                    <Image
                      src="./imgs/dashboard-imgs/Crown.svg"
                      alt="Image Profile Leader"
                      width={1}
                      height={1}
                      layout="responsive"
                    />
                  </div>
                </div>
                {/* KETUA */}
                <div className="w-full border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                  <div className="w-12 aspect-square rounded-md overflow-hidden border">
                    <Image
                      src="./imgs/dashboard-imgs/Default-Profile-Img.svg"
                      alt="Image Profile Leader"
                      width={1}
                      height={1}
                      layout="responsive"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-0 w-full">
                    <p className="text-normalText font-poppinsMedium text-sm">
                      {team.openSlots} Slot Tersisa
                    </p>
                    <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
                  </div>
                </div>
                <Button className="text-sm">Selengkapnya</Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
