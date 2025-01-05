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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(`https://lomba-backend.vercel.app/teams`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Gagal mengambil data tim");
      const data = await response.json();
      const filteredTeams = data.filter((team: Teams) => team.openSlots > 0);
      setTeams(filteredTeams);
      console.log(filteredTeams);
      setLoading(false);
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
        <div
          className={`w-full flex md:grid grid-cols-1 flex-col justify-start items-start gap-4 ${
            teams.length == 0 && !loading ? "md:grid-cols-1" : "md:grid-cols-2"
          } ${
            teams.length == 0 && !loading ? "xl:grid-cols-1" : "xl:grid-cols-3"
          }`}
        >
          {teams.length == 0 && !loading && (
            <div className="w-full py-12 bg-white rounded-xl p-8 gap-2 flex flex-col justify-center items-center">
              <div className="w-20 aspect-square overflow-hidden">
                <Image
                  src={"/imgs/profile/dizzy.svg"}
                  alt="Fail Fetch Icon"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <p className="font-poppinsSemiBold text-normalText text-base text-center">
                Uuups...
              </p>
              <p className="font-poppinsRegular text-normalText text-sm opacity-70 text-center">
                Belum ada kompetisi yang tersedia, silahkan coba lagi nanti!
              </p>
              <Link
                href={"/"}
                className="w-full flex justify-center items-center"
              >
                <Button className="max-w-72">Beranda</Button>
              </Link>
            </div>
          )}
          {/* CARD */}
          {(loading ? Array.from({ length: 6 }) : teams).map((team, index) => {
            if (loading) {
              return (
                <div
                  key={index}
                  className="card w-full rounded-lg p-4 flex flex-col gap-3 overflow-hidden bg-white"
                >
                  <div className="flex flex-row justify-between items-center">
                    <div className="w-1/3 h-6 bg-[#F1F2F6] rounded-md"></div>
                    <div className="px-3 py-1 w-24 h-6 bg-[#F1F2F6] rounded-full"></div>
                  </div>
                  <div className="w-full h-12 bg-[#F1F2F6] rounded-md"></div>
                  <div className="detail w-full flex flex-col gap-2 justify-start items-start">
                    {/* KETUA */}
                    <div className="w-full bg-white border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                      <div className="w-12 aspect-square overflow-hidden rounded-lg bg-[#F1F2F6]"></div>
                      <div className="flex flex-col justify-start items-start gap-1 w-full">
                        <div className="w-1/2 h-4 bg-[#F1F2F6] rounded-md"></div>
                        <div className="w-1/3 h-3 bg-[#F1F2F6] rounded-md"></div>
                      </div>
                      <div className="w-6 aspect-square rounded-full bg-[#F1F2F6]"></div>
                    </div>
                    {/* SLOT */}
                    <div className="w-full border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                      <div className="w-12 aspect-square rounded-md overflow-hidden bg-[#F1F2F6]"></div>
                      <div className="flex flex-col justify-start items-start gap-1 w-full">
                        <div className="w-1/3 h-4 bg-[#F1F2F6] rounded-md"></div>
                        <div className="w-1/4 h-3 bg-[#F1F2F6] rounded-md"></div>
                      </div>
                    </div>
                    <div className="w-full h-10 bg-[#F1F2F6] rounded-md"></div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                className={`card w-full rounded-lg p-4 flex flex-col gap-3 overflow-hidden bg-white ${
                  (team as Teams).openSlots == 0 ? "hidden" : ""
                }`}
                key={(team as Teams).id}
                href={`/tim/${(team as Teams).id}`}
              >
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-base font-poppinsMedium">
                    {(team as Teams).name}
                  </h2>
                  <div className="px-3 py-1 text-xs bg-blueSec font-poppinsRegular text-white rounded-full">
                    {handleDate((team as Teams).competition.endDate)}
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
                          (team as Teams).leader.profile ||
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
                        {(team as Teams).leader.name}
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
                        {(team as Teams).openSlots} Slot Tersisa
                      </p>
                      <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
                    </div>
                  </div>
                  <Button className="text-sm">Selengkapnya</Button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
