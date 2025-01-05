"use client";
import NavbarBackTitledDark from "@/components/NavbarBackTitledDark";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import NavbarLogin from "@/components/NavbarLogin";

interface Teams {
  competition: {
    title: string;
    level: string;
  };
  id: string;
  leader: {
    name: string;
    profile: string;
    id: string;
  };
  leaderId: string;
  members: [];
  name: string;
  openSlots: number;
}

export default function Team() {
  const { user, logout } = useUser();
  const router = useRouter();
  const [cards, setCards] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await fetch(
            `https://lomba-backend.vercel.app/profile/teams`,
            {
              method: "POST",
              body: JSON.stringify({
                userId: user.id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (!response.ok) {
            setLoading(false);
            throw new Error(
              "Gagal mengambil data, mohon coba beberapa saat lagi"
            );
          }

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

  const handleDetail = (idTeam: string) => {
    if (idTeam) {
      router.push(`/tim/${idTeam}`);
    }
  };

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

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full relative bg-blueFade min-h-screen md:hidden">
        <NavbarBackTitledDark className="pb-6">Teams</NavbarBackTitledDark>
        <div className="flex pt-24 min-h-screen">
          <div
            className="bg-[#F1F2F6] w-full min-h-full rounded-3xl p-6 flex flex-col gap-3"
            style={{
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
            }}
          >
            {/* BOT */}
            {loading ? (
              <div className="w-full rounded-xl bg-white flex flex-col gap-4 p-4 py-6">
                <div className="flex flex-row justify-between items-center gap-3">
                  <div className="w-full bg-[#F1F2F6] text-[#F1F2F6]">p</div>
                  <div className="w-6 bg-[#f1f2f6]">
                    <Image
                      src={"/imgs/profile/next.svg"}
                      alt="More Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="opacity-0"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-1 w-full">
                  <div className="w-full bg-white border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                    <div className="min-w-10 max-w-10 w-10 aspect-square rounded-full border overflow-hidden">
                      <Image
                        src={"/imgs/dashboard-imgs/Default-Profile-Img.svg"}
                        alt="Image Profile Leader"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start gap-0 w-full">
                      <p className="text-[#F1F2F6] font-poppinsMedium text-sm bg-[#F1F2F6] w-full">
                        Anda
                      </p>
                      <p className="font-poppinsRegular text-xs text-[#F1F2F6] bg-[#F1F2F6] mt-1">
                        Ketua Tim
                      </p>
                    </div>
                    <div className="w-6 aspect-square overflow-hidden rounded-full bg-[#F1F2F6] hidden">
                      <Image
                        src={"/imgs/dashboard-imgs/Crown.svg"}
                        alt="Crown Icon"
                        width={1}
                        height={1}
                        layout="responsive"
                        className="w-6 h-6 rounded-full opacity-0"
                      />
                    </div>
                  </div>
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
                      <p className="text-[#F1F2F6] font-poppinsMedium text-sm bg-[#F1F2F6] w-full">
                        0 Slot Tersisa
                      </p>
                      <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
                    </div>
                  </div>
                </div>
              </div>
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
                  Gagal mengambil data Team kamu. Silahkan coba beberapa saat
                  lagi!
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
                  Kamu belum mengikuti tim manapun! Join tim sekarang!
                </p>
                <Link href={"/"} className="w-full">
                  <Button>Beranda</Button>
                </Link>
              </div>
            ) : (
              cards.map((card: Teams) => (
                <div
                  className="w-full rounded-xl bg-white flex flex-col gap-4 p-4 py-6"
                  onClick={() => {
                    handleDetail(card.id);
                  }}
                  key={`mb${card.id}`}
                >
                  <div className="flex flex-row justify-between items-center">
                    <div className="w-full">
                      {!loading ? (
                        <p className="font-poppinsSemiBold text-normalText text-base">
                          {card.name}
                        </p>
                      ) : (
                        <div className="w-3/5 bg-[#F1F2F6] text-[#F1F2F6]">
                          p
                        </div>
                      )}
                      <div className="flex flex-row justify-start items-center gap-2 mt-1">
                        <p className="font-poppinsRegular text-xs text-normalText opacity-60">
                          {card.competition.title}
                        </p>
                        <p className="font-poppinsRegular text-xs text-normalText opacity-60">
                          |
                        </p>
                        <p className="font-poppinsRegular text-xs text-normalText opacity-60">
                          {card.competition.level}
                        </p>
                      </div>
                    </div>
                    <div className="w-5">
                      <Image
                        src={"/imgs/profile/next.svg"}
                        alt="More Icon"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-1 w-full">
                    <div className="w-full bg-white border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                      <div className="min-w-10 max-w-10 w-10 aspect-square rounded-full border overflow-hidden">
                        <Image
                          src={
                            !loading
                              ? user?.imageUrl ||
                                "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                              : "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                          }
                          alt="Image Profile Leader"
                          width={1}
                          height={1}
                          layout="responsive"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start gap-0 w-full">
                        <p className="text-normalText font-poppinsMedium text-sm">
                          Anda
                        </p>
                        <p className="font-poppinsRegular text-xs text-normalText opacity-40">
                          {!loading
                            ? user?.id == card.leaderId
                              ? "Ketua Tim"
                              : "Anggota"
                            : "Anggota"}
                        </p>
                      </div>
                      <div className="w-6 h-6 rounded-full">
                        <Image
                          src={
                            user?.id == card.leaderId
                              ? "/imgs/dashboard-imgs/Crown.svg"
                              : "/imgs/profile/user.svg"
                          }
                          alt="Crown Icon"
                          width={1}
                          height={1}
                          layout="responsive"
                          className="w-6 h-6 rounded-full"
                        />
                      </div>
                    </div>
                    {/* SLOT */}
                    {card.openSlots == 0 ? (
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
                            {card.openSlots
                              ? card.openSlots + 1 - card.members.length
                              : "0"}{" "}
                            Slot Tersisa
                          </p>
                          <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
                        </div>
                      </div>
                    )}
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
                    src={"/imgs/profile/competition.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-normalText opacity-80">
                  Kompetisi
                </p>
              </Link>
              <Link
                href={"/profile/team"}
                className="flex flex-row justify-start items-center w-full gap-3"
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={"/imgs/profile/team-blue.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-blueSec">
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
                    className="w-full flex flex-row justify-between items-start bg-white p-5 rounded-2xl overflow-hidden gap-4"
                    key={index}
                  >
                    <div className="flex flex-row justify-start items-center gap-4 w-full min-w-fit">
                      <div className="flex flex-col justify-start items-start gap-2 w-full">
                        <div className="flex flex-row justify-start items-start gap-4 w-full">
                          <p className="text-[#F1F2F6] bg-[#F1F2F6] text-xl font-poppinsSemiBold w-full">
                            Nama Lomba
                          </p>
                          <div
                            className={`status px-5 py-1 rounded-full flex flex-row justify-center items-center gap-2 top-4 left-4 border border-[#F1F2F6] ${"bg-[#F1F2F6]"}`}
                          >
                            <div className="w-4 aspect-square overflow-hidden opacity-0">
                              <Image
                                src={"/imgs/profile/accept.svg"}
                                alt="Icon Card"
                                width={1}
                                height={1}
                                layout="responsive"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-start items-start gap-2">
                          <p className="font-poppinsRegular text-sm text-[#F1F2F6] opacity-80 bg-[#F1F2F6]">
                            Web Design
                          </p>
                          <p className="font-poppinsRegular text-sm text-[#F1F2F6] opacity-80">
                            |
                          </p>
                          <p className="font-poppinsRegular text-sm text-[#F1F2F6] bg-[#F1F2F6] opacity-80">
                            Tim
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-4 border border-[#DDDDDD] px-5 py-2 rounded-xl w-full">
                      <div className="flex justify-start items-center gap-3">
                        <div className="w-12 aspect-square overflow-hidden rounded-full border border-[#DDDDDD]">
                          <Image
                            src={"/imgs/create-account-imgs/default-img.svg"}
                            alt="Profile"
                            width={1}
                            height={1}
                            layout="responsive"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <p className="font-poppinsSemiBold text-md text-normalText">
                            Anda
                          </p>
                          <p className="font-poppinsRegular text-sm text-[#F1F2F6] bg-[#F1F2F6] opacity-65">
                            Ketua Tim
                          </p>
                        </div>
                      </div>
                      <div className="w-8 aspect-square overflow-hidden bg-[#F1F2F6]">
                        <Image
                          src={"/imgs/dashboard-imgs/Crown.svg"}
                          alt="Profile"
                          width={1}
                          height={1}
                          layout="responsive"
                          className="opacity-0"
                        />
                      </div>
                    </div>
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
              cards.map((card: Teams) => (
                <Link
                  href={`/tim/${card.id}`}
                  className="w-full flex flex-row justify-between items-start bg-white p-5 rounded-2xl gap-4 overflow-hidden"
                  key={card.id}
                >
                  <div className="flex flex-row justify-start items-center gap-4 w-full">
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="flex flex-row justify-start items-start gap-4">
                        <p className="text-normalText text-xl font-poppinsSemiBold">
                          {card.name}
                        </p>
                        <div
                          className={`status px-5 py-1 rounded-full flex flex-row justify-center items-center gap-2 top-4 left-4 border border-blueSec ${"bg-blueSec"} ${
                            card.openSlots == 0 ? "flex" : "hidden"
                          }`}
                        >
                          <div className="w-4 aspect-square overflow-hidden">
                            <Image
                              src={"/imgs/profile/accept.svg"}
                              alt="Icon Card"
                              width={1}
                              height={1}
                              layout="responsive"
                            />
                          </div>
                          <p
                            className={`font-poppinsRegular text-sm ${"text-white"}`}
                          >
                            Tim Siap
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-start items-start gap-2">
                        <p className="font-poppinsRegular text-sm text-normalText opacity-80">
                          {card.competition.title}
                        </p>
                        <p className="font-poppinsRegular text-sm text-normalText opacity-80">
                          |
                        </p>
                        <p className="font-poppinsRegular text-sm text-normalText opacity-80">
                          {card.competition.level}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-4 border border-[#DDDDDD] px-5 py-2 rounded-xl w-96">
                    <div className="flex justify-start items-center gap-3">
                      <div className="w-12 aspect-square overflow-hidden rounded-full border border-[#DDDDDD]">
                        <Image
                          src={
                            user?.imageUrl ||
                            "/imgs/create-account-imgs/default-img.svg"
                          }
                          alt="Profile"
                          width={1}
                          height={1}
                          layout="responsive"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <p className="font-poppinsSemiBold text-md text-normalText">
                          Anda
                        </p>
                        <p className="font-poppinsRegular text-sm text-normalText opacity-65">
                          Ketua Tim
                        </p>
                      </div>
                    </div>
                    <div className="w-8 aspect-square overflow-hidden">
                      <Image
                        src={"/imgs/dashboard-imgs/Crown.svg"}
                        alt="Profile"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                  </div>
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
