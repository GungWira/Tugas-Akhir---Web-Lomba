"use client";
import NavbarBackTitledDark from "@/components/NavbarBackTitledDark";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import NavbarLogin from "@/components/NavbarLogin";

interface Competitions {
  id: string;
  title: string;
  imagePoster: string;
  category: string;
  level: string;
  result: string;
  updatedAt: string;
}

export default function Competition() {
  const { user, logout } = useUser();
  const router = useRouter();
  const [cards, setCards] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          console.log(user.id);
          const response = await fetch(
            `https://lomba-backend.vercel.app/profile/competitionUser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
              }),
              credentials: "include",
            }
          );
          if (!response.ok) {
            setLoading(false);
            throw new Error(
              "Gagal mengambil data, mohon coba beberapa saat lagi"
            );
          }
          setLoading(false);
          const data = await response.json();
          console.log(data);
          setCards(data);
          setLoading(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    console.log("Logout");
    try {
      await logout();
      console.log("Log sukses");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Terjadi error yang tidak diketahui");
      }
    }
  };

  const handleDetail = (idCompetition: string) => {
    if (idCompetition) {
      router.push(`/lomba/${idCompetition}`);
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full relative bg-blueFade min-h-screen md:hidden">
        <NavbarBackTitledDark className="pb-6">
          Competitions
        </NavbarBackTitledDark>
        <div className="flex pt-24 min-h-screen">
          <div
            className="bg-[#F1F2F6] w-full min-h-full rounded-3xl p-6 flex flex-col gap-3"
            style={{
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
            }}
          >
            {loading ? (
              Array.from({ length: 3 }).map((card, index) => {
                return (
                  <div
                    className="w-full bg-white rounded-xl overflow-hidden flex flex-col"
                    key={index}
                  >
                    <div className="relative flex justify-start items-start rounded-xl overflow-hidden w-full">
                      <div
                        className={`status px-4 py-2 rounded-full flex flex-row justify-center items-center gap-2 absolute top-4 left-4 bg-white`}
                      >
                        <div className="w-4 aspect-square overflow-hidden">
                          <Image
                            src={"/imgs/profile/crown.svg"}
                            alt="Icon Card"
                            width={1}
                            height={1}
                            layout="responsive"
                          />
                        </div>
                        <p className="text-white font-poppinsRegular text-sm">
                          Peringkat 1
                        </p>
                      </div>
                      <div className="w-full aspect-video overflow-hidden flex justify-center items-center">
                        <Image
                          src={"/imgs/competition/default-poster.svg"}
                          alt="Poster Image"
                          width={1}
                          height={1}
                          layout="responsive"
                        />
                      </div>
                    </div>
                    <div className="flex p-4 w-full">
                      <p className="text-base font-poppinsSemiBold bg-[#F1F2F6] text-[#F1F2F6] w-full">
                        Nama Lomba
                      </p>
                    </div>
                  </div>
                );
              })
            ) : error ? (
              <div className="w-full aspect-video bg-white rounded-xl p-8 gap-2 flex flex-col justify-center items-center">
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
                  Gagal mengambil data Competition kamu. Silahkan coba beberapa
                  saat lagi!
                </p>
                <Link href={"/"} className="w-full">
                  <Button>Beranda</Button>
                </Link>
              </div>
            ) : cards.length == 0 ? (
              <div className="w-full aspect-video bg-white rounded-xl p-8 gap-2 flex flex-col justify-center items-center">
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
                  Kamu belum mengikuti kompetisi mana pun! Ikuti kompetisi
                  sekarang!
                </p>
                <Link href={"/"} className="w-full">
                  <Button>Beranda</Button>
                </Link>
              </div>
            ) : (
              cards.map((card: Competitions) => (
                <div
                  className="w-full bg-white rounded-xl overflow-hidden flex flex-col"
                  key={card.id}
                  onClick={() => handleDetail(card.id)}
                >
                  <div className="relative flex justify-start items-start rounded-xl overflow-hidden w-full">
                    <div
                      className={`status px-4 py-2 rounded-full flex flex-row justify-center items-center gap-2 absolute top-4 left-4 border border-blueSec ${
                        card.result == "PESERTA" ? "bg-white" : "bg-blueSec"
                      }`}
                    >
                      <div className="w-4 aspect-square overflow-hidden">
                        <Image
                          src={
                            card.result == "PESERTA"
                              ? "/imgs/profile/going.svg"
                              : "/imgs/profile/crown.svg"
                          }
                          alt="Icon Card"
                          width={1}
                          height={1}
                          layout="responsive"
                        />
                      </div>
                      <p
                        className={`font-poppinsRegular text-sm ${
                          card.result == "PESERTA"
                            ? "text-blueSec"
                            : "text-white"
                        }`}
                      >
                        {card.result == "PESERTA" ? "On Going" : card.result}
                      </p>
                    </div>
                    <div className="w-full aspect-video overflow-hidden flex justify-center items-center">
                      <Image
                        src={
                          card.imagePoster ||
                          "/imgs/competition/default-poster.svg"
                        }
                        alt="Poster Image"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                  </div>
                  <div className="flex p-4 flex-col w-full gap-1">
                    <p className="text-normalText text-base font-poppinsSemiBold">
                      {card.title}
                    </p>
                    <div className="flex flex-row justify-start items-start gap-2">
                      <p className="text-sm text-normalText font-poppinsRegular opacity-80">
                        {card.category}
                      </p>
                      <p className="text-sm text-normalText font-poppinsRegular opacity-80">
                        |
                      </p>
                      <p className="text-sm text-normalText font-poppinsRegular opacity-80">
                        {card.level}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:flex px-4 xl:px-0 max-w-6xl w-full">
        <NavbarLogin></NavbarLogin>

        {/* USER */}
        <div className="flex flex-row justify-start items-start w-full gap-4 mt-24">
          {/* USER PROFILE */}
          <div className="flex flex-col justify-start items-start rounded-xl bg-white w-full max-w-80 p-4">
            {/* USER DETAIL */}
            <div className="flex flex-row justify-between items-center gap-4 w-full">
              <div className="flex flex-row justify-start items-center gap-2 w-full">
                <div className="w-16 aspect-square overflow-hidden rounded-full">
                  <Image
                    src={
                      user
                        ? user.imageUrl ||
                          "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                        : "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                    }
                    alt="User Profile"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                  <p className="text-normalText font-poppinsSemiBold text-base">
                    {user ? user.name : "Username"}
                  </p>
                  <p className="text-normalText font-poppinsRegular opacity-80 text-sm">
                    {user ? user.nim : "User NIM"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-12 aspect-square overflow-hidden"
              >
                <Image
                  src={"/imgs/profile/logout.svg"}
                  alt="Logout"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </button>
            </div>
            {/* USER NAVIGATION */}
            <div className="flex flex-col justify-start items-start w-full gap-4 mt-7 mb-3">
              <Link
                href={"/profile/"}
                className="flex flex-row justify-start items-center w-full gap-3"
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={"/imgs/profile/edit.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-normalText opacity-80">
                  Edit Profil
                </p>
              </Link>
              <Link
                href={"/profile/competition"}
                className="flex flex-row justify-start items-center w-full gap-3"
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={"/imgs/profile/competition-blue.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-blueSec">
                  Kompetisi
                </p>
              </Link>
              <Link
                href={"/profile/team"}
                className="flex flex-row justify-start items-center w-full gap-3"
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={"/imgs/profile/team.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-normalText opacity-80">
                  Tim Saya
                </p>
              </Link>
              <Link
                href={"/profile/reimburse"}
                className="flex flex-row justify-start items-center w-full gap-3"
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={"/imgs/profile/reimburse.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-normalText opacity-80">
                  Reimburse
                </p>
              </Link>
            </div>
          </div>
          {/* BOX EDIT */}
          <div className="flex flex-col justify-start items-start w-full gap-4">
            {/* HERE */}
            {loading ? (
              Array.from({ length: 3 }).map((card, index) => {
                return (
                  <div
                    className="w-full flex flex-row justify-between items-start gap-4 bg-white p-5 rounded-2xl"
                    key={index}
                  >
                    <div className="flex flex-row justify-start items-center gap-4 w-full">
                      <div className="min-w-20 max-w-20 rounded-xl aspect-square overflow-hidden">
                        <Image
                          src={"/imgs/competition/default-poster.svg"}
                          alt="Image Poster"
                          width={1}
                          height={1}
                          layout="responsive"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start gap-2 w-full">
                        <div className="flex flex-row justify-start items-start gap-4 w-full">
                          <p className="text-xl font-poppinsSemiBold w-full bg-[#F1F2F6] text-[#F1F2F6]">
                            Nama Lomba
                          </p>
                          <div
                            className={`status px-5 py-1 rounded-full flex flex-row justify-center items-center gap-2 top-4 left-4 border border-[#F1F2F6] ${"bg-[#F1F2F6]"}`}
                          >
                            <div className="w-4 aspect-square overflow-hidden opacity-0">
                              <Image
                                src={"/imgs/profile/crown.svg"}
                                alt="Icon Card"
                                width={1}
                                height={1}
                                layout="responsive"
                              />
                            </div>
                            <p
                              className={`font-poppinsRegular text-sm ${"text-[#F1F2F6]"}`}
                            >
                              JUARA
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row justify-start items-start gap-2">
                          <p className="font-poppinsRegular text-sm text-[#F1F2F6] bg-[#F1F2F6] opacity-80">
                            Web Design
                          </p>
                          <p className="font-poppinsRegular text-sm text-[#F1F2F6] opacity-80">
                            |
                          </p>
                          <p className="font-poppinsRegular text-sm text-[#F1F2F6] bg-[#F1F2F6] opacity-80">
                            Individu
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="font-poppinsRegular text-sm text-[#F1F2F6] bg-[#F1F2F6] mt-3 opacity-80 hidden">
                      BaruSajaa
                    </p>
                  </div>
                );
              })
            ) : error ? (
              <div className="w-full aspect-square bg-white rounded-xl p-8 gap-2 flex flex-col justify-center items-center">
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
                  Gagal mengambil data Competition kamu. Silahkan coba beberapa
                  saat lagi!
                </p>
                <Link href={"/"} className="w-full">
                  <Button>Beranda</Button>
                </Link>
              </div>
            ) : cards.length == 0 ? (
              <div className="w-full aspect-square bg-white rounded-xl p-8 gap-2 flex flex-col justify-center items-center">
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
                  Kamu belum mengikuti kompetisi mana pun! Ikuti kompetisi
                  sekarang!
                </p>
                <Link href={"/"} className="w-full">
                  <Button>Beranda</Button>
                </Link>
              </div>
            ) : (
              cards.map((card: Competitions) => (
                <Link
                  href={`/lomba/${card.id}`}
                  className="w-full flex flex-row justify-between items-start bg-white p-5 rounded-2xl"
                  key={card.id}
                >
                  <div className="flex flex-row justify-start items-center gap-4">
                    <div className="w-20 rounded-xl aspect-square overflow-hidden">
                      <Image
                        src={
                          card.imagePoster ||
                          "/imgs/competition/default-poster.svg"
                        }
                        alt="Image Poster"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start gap-1">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <p className="text-normalText text-base font-poppinsSemiBold">
                          {card.title}
                        </p>
                        <div
                          className={`status px-4 py-1 rounded-full flex flex-row justify-center items-center gap-2 relative border border-blueSec ${
                            card.result == "PESERTA" ? "bg-white" : "bg-blueSec"
                          }`}
                        >
                          <div className="w-4 aspect-square overflow-hidden">
                            <Image
                              src={
                                card.result == "PESERTA"
                                  ? "/imgs/profile/going.svg"
                                  : "/imgs/profile/crown.svg"
                              }
                              alt="Icon Card"
                              width={1}
                              height={1}
                              layout="responsive"
                            />
                          </div>
                          <p
                            className={`font-poppinsRegular text-sm ${
                              card.result == "PESERTA"
                                ? "text-blueSec"
                                : "text-white"
                            }`}
                          >
                            {card.result == "PESERTA"
                              ? "On Going"
                              : card.result}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-start items-start gap-2">
                        <p className="font-poppinsRegular text-sm text-normalText opacity-80">
                          {card.category}
                        </p>
                        <p className="font-poppinsRegular text-sm text-normalText opacity-80">
                          |
                        </p>
                        <p className="font-poppinsRegular text-sm text-normalText opacity-80">
                          {card.level}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="font-poppinsRegular text-sm text-normalText opacity-80">
                    {(() => {
                      const now = new Date();
                      const updatedAt = new Date(card.updatedAt);
                      const diff = Math.floor(
                        (now.getTime() - updatedAt.getTime()) / 1000
                      );

                      if (diff < 60) return "baru saja";

                      const minutes = Math.floor(diff / 60);
                      if (minutes < 60) return `${minutes}m`;

                      const hours = Math.floor(minutes / 60);
                      if (hours < 24) return `${hours}h`;

                      const days = Math.floor(hours / 24);
                      if (days < 30) return `${days}d`;

                      const months = Math.floor(days / 30);
                      if (months < 12) return `${months}mon`;

                      const years = Math.floor(months / 12);
                      return `${years}y`;
                    })()}
                  </p>
                </Link>
              ))
            )}
            {/* HERE */}

            {/* HERE */}
          </div>
        </div>
      </div>
    </div>
  );
}
