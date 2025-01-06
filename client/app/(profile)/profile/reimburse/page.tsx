"use client";
import NavbarBackTitledDark from "@/components/NavbarBackTitledDark";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import NavbarLogin from "@/components/NavbarLogin";

interface Reimburses {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
  competition: {
    title: string;
  };
}

export default function Reimburses() {
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
            `https://lomba-backend.vercel.app/profile/reimburses`,
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

  const handleDetail = (idReimburse: string) => {
    if (idReimburse) {
      router.push(`/profile/reimburse/${idReimburse}`);
    }
  };

  const handleColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-transparent";
      case "APPROVED":
        return "bg-blueSec";
      case "REJECTED":
        return "bg-[#F8D9D9]";
      default:
        return "bg-[#032038]"; // default fallback
    }
  };

  const handleColorText = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "text-[#FFBD00]";
      case "APPROVED":
        return "text-white";
      case "REJECTED":
        return "text-[#D00000]";
      default:
        return "text-white"; // default fallback
    }
  };

  const handleBorder = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "border-[#FFBD00]";
      case "APPROVED":
        return "border-blueSec";
      case "REJECTED":
        return "bg-[#F8D9D9]";
      default:
        return "bg-[#032038]"; // default fallback
    }
  };

  const handleText = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "Diproses";
      case "APPROVED":
        return "Diterima";
      case "REJECTED":
        return "Ditolak";
      default:
        return "Menunggu"; // default fallback
    }
  };

  const handleIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "/imgs/profile/pending.svg";
      case "APPROVED":
        return "/imgs/profile/accept.svg";
      case "REJECTED":
        return "/imgs/profile/reject.svg";
      default:
        return "/imgs/profile/pending.svg"; // default fallback
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
        <NavbarBackTitledDark className="pb-6">Reimburses</NavbarBackTitledDark>
        <div className="flex pt-24 min-h-screen">
          <div
            className="bg-[#F1F2F6] w-full min-h-full rounded-3xl p-6 flex flex-col gap-3"
            style={{
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
            }}
          >
            {loading ? (
              <div className="w-full bg-white p-4 rounded-xl flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center gap-4">
                  <div
                    className={`status px-4 py-2 flex flex-row justify-center items-center gap-2 rounded-full overflow-hidden bg-[#F1F2F6]`}
                  >
                    <div className="w-4 aspect-square overflow-hidden opacity-0">
                      <Image
                        src={`/imgs/profile/accept.svg`}
                        alt="Icon"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <p
                      className={`${handleText} font-poppinsRegular text-sm text-white opacity-0`}
                    >
                      Diterima
                    </p>
                  </div>
                  <div className="text-xs font-poppinsRegular text-[#f1f2f6] bg-[#f1f2f6]">
                    Baru Saja
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-2">
                  <p className="font-poppinsBold text-[#f1f2f6] text-base w-full bg-[#f1f2f6]">
                    Nama Lomba
                  </p>
                  <div className="w-4 overflow-hidden aspect-square hidden">
                    <Image
                      src={`/imgs/profile/more.svg`}
                      alt="Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="opacity-0"
                    />
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
                  Gagal mengambil data Reimburse kamu. Silahkan coba beberapa
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
                  Kamu tidak memiliki reimburse yang sedang berlangsung! Ajukan
                  sekarang!
                </p>
                <Link href={"/"} className="w-full">
                  <Button>Beranda</Button>
                </Link>
              </div>
            ) : (
              cards.map((card: Reimburses) => (
                <div
                  className="w-full bg-white p-4 rounded-xl flex flex-col gap-4"
                  onClick={() => handleDetail(card.id)}
                  key={card.id}
                >
                  <div className="flex flex-row justify-between items-center gap-4">
                    <div
                      className={`status px-5 py-1 rounded-full flex flex-row justify-center items-center gap-2 top-4 left-4 border ${handleBorder(
                        card.status
                      )} ${handleColor(card.status)}`}
                    >
                      <div className="w-4 aspect-square overflow-hidden">
                        <Image
                          src={handleIcon(card.status)}
                          alt="Icon Card"
                          width={1}
                          height={1}
                          layout="responsive"
                        />
                      </div>
                      <p
                        className={`font-poppinsRegular text-sm ${handleColorText(
                          card.status
                        )}`}
                      >
                        {handleText(card.status)}
                      </p>
                    </div>
                    <div className="text-xs font-poppinsRegular text-normalText opacity-70">
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
                        if (months < 12) return `${months}mo`;

                        const years = Math.floor(months / 12);
                        return `${years}y`;
                      })()}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center gap-3">
                    <p className="font-poppinsBold text-normalText text-base">
                      {card.competition.title}
                    </p>
                    <div className="w-4 overflow-hidden aspect-square">
                      <Image
                        src={`/imgs/profile/more.svg`}
                        alt="Icon"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* CARD */}

            {/* TESTING */}
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
                    src={"/imgs/profile/reimburse-blue.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-blueSec">
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
                    className="w-full flex flex-row justify-between items-start bg-white p-5 rounded-2xl gap-6"
                    key={index}
                  >
                    <div className="flex flex-row justify-start items-center gap-4 min-w-fit w-full">
                      <div className="flex flex-col justify-start items-start gap-2 w-full">
                        <div className="flex flex-row justify-start items-start gap-4">
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
                              JUARA BOY
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row justify-start items-start gap-2 w-full">
                          <p className="text-[#F1F2F6] bg-[#F1F2F6] text-base font-poppinsSemiBold w-full">
                            Nama Lomba
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center min-w-fit">
                      <p className="text-[#F1F2F6] bg-[#F1F2F6] text-sm font-poppinsRegular opacity-80 min-w-fit">
                        Baru Saja
                      </p>
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
              cards.map((card: Reimburses) => (
                <div
                  className="w-full flex flex-row justify-between items-start bg-white p-5 rounded-2xl"
                  onClick={() => handleDetail(card.id)}
                  key={card.id}
                >
                  <div className="flex flex-row justify-start items-center gap-4 min-w-fit">
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="flex flex-row justify-start items-start gap-4">
                        <div
                          className={`status px-5 py-1 rounded-full flex flex-row justify-center items-center gap-2 top-4 left-4 border ${handleBorder(
                            card.status
                          )} ${handleColor(card.status)}`}
                        >
                          <div className="w-4 aspect-square overflow-hidden">
                            <Image
                              src={handleIcon(card.status)}
                              alt="Icon Card"
                              width={1}
                              height={1}
                              layout="responsive"
                            />
                          </div>
                          <p
                            className={`font-poppinsRegular text-sm ${handleColorText(
                              card.status
                            )}`}
                          >
                            {handleText(card.status)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-start items-start gap-2">
                        <p className="text-normalText text-base font-poppinsSemiBold">
                          {card.competition.title}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-normalText text-sm font-poppinsRegular opacity-80">
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
                        if (months < 12) return `${months}mo`;

                        const years = Math.floor(months / 12);
                        return `${years}y`;
                      })()}
                    </p>
                  </div>
                </div>
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
