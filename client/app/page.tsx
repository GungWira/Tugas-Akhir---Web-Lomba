"use client";

import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import NavbarLogin from "@/components/NavbarLogin";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";

interface Card {
  id: string;
  title: string;
  imagePoster: string;
  category: string;
  type: string;
  date: string;
  description: string;
  endDate: string;
}

interface Teams {
  competition: {
    endDate: string;
  };
  id: string;
  description: string;
  leader: {
    name: string;
    profile: string;
  };
  members: [];
  name: string;
  openSlots: number;
  endDate: string;
}

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const { login } = useUser();
  // ANIMATION
  const [isIntroHidden, setIsIntroHidden] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [competitionCards, setCompetitionCards] = useState([]);
  const [teamCards, setTeamCards] = useState([]);

  const handleIntroHide = () => {
    setIsIntroHidden(true);
  };

  // FORM LOGIN
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (nim && password) {
        await login({ nim, password });
        if (user) {
          if (!user.isLogin) {
            setError("NIM atau password salah");
          } else {
            setIsIntroHidden(true);
          }
        } else {
          setError("NIM atau password salah");
        }
      } else {
        setError("Field tidak boleh kosong");
      }
      setIsLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan, mohon coba beberapa saat lagi");
      }
    }
  }

  // CHECK IS USER LOGIN
  useEffect(() => {
    const checkLogin = async () => {
      try {
        if (user) {
          setIsLogin(user.isLogin);
          if (user.isLogin) {
            if (user.role === "ADMIN") {
              router.push("/admin");
            } else {
              setIsIntroHidden(true);
            }
          }
        }
      } catch (err: unknown) {
        console.log("Error verifying login :", err);
      }
    };
    checkLogin();
  }, [user, router]);

  // IF USER LOGGEDIN, FETCH DATA FOR USER
  useEffect(() => {
    if (isLogin) {
      const currentDate = new Date();
      const fetchData = async () => {
        try {
          const responseCompetition = await fetch(
            "https://lomba-backend.vercel.app/competitions",
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!responseCompetition.ok) {
            setCompetitionCards([]);
            throw new Error("Failed to fetch lomba cards");
          }
          const dataCompetition = await responseCompetition.json();
          const filteredCompetition = dataCompetition.filter(
            (competition: Card) => {
              const endDate = new Date(competition.endDate);
              return endDate > currentDate;
            }
          );
          setCompetitionCards(filteredCompetition);

          const responseTeam = await fetch(
            "https://lomba-backend.vercel.app/teams",
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!responseTeam.ok) {
            setTeamCards([]);
            throw new Error("Failed to fetch team cards");
          }
          const dataTeam = await responseTeam.json();
          // Filter tim berdasarkan slot terbuka dan tanggal akhir lomba belum lewat
          const filteredTeams = dataTeam.filter((team: Teams) => {
            const endDate = new Date(team.competition.endDate);
            return team.openSlots > 0 && endDate > currentDate;
          });
          const dataTeamFiltered = filteredTeams;

          setTeamCards(dataTeamFiltered);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Terjaid kesalahan, mohon coba lagi nanti");
          }
        }
      };

      fetchData();
    }
  }, [isLogin]);

  const handleDate = (date: string | null) => {
    if (date) {
      const newDate = new Date(date);
      const validDate = newDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
      });
      return validDate;
    }
  };

  const handleLomba = (id: string) => {
    router.push(`/lomba/${id}`);
  };

  return (
    <div
      className={`relative  min-h-screen flex justify-start items-center flex-col overflow-hidden w-full ${
        isIntroHidden ? "max-h-fit" : "max-h-screen"
      }`}
    >
      {isLogin ? (
        <NavbarLogin
          className={`top-[100%] md:z-60 ${
            isIntroHidden ? "animate-animateNavDown" : ""
          }`}
          style={{ animationDelay: `1350ms` }}
          onClick={() => setIsOpen(!isOpen)}
          isAdmin={false}
        ></NavbarLogin>
      ) : (
        <div className="hidden"></div>
      )}
      <Navbar
        className={`md:z-60 md:bg-transparent ${
          isIntroHidden && isLogin ? "animate-moveUpAndFade" : ""
        }`}
      ></Navbar>

      {/* INTRODUCTION */}
      <div
        className={`coverIntroduction fixed px-4 min-h-screen flex flex-col md:flex-row justify-between md:px-0 md:w-full ${
          isIntroHidden ? "z-0" : "z-50"
        }`}
      >
        <div
          className={`bodyMain z-10 w-full mt-8 flex flex-col justify-center relative md:w-full md:items-center md:bg-bluePrimary md:mt-0 md:p-12 xl:p-24 md:flex-3  ${
            isIntroHidden && isLogin ? "animate-moveUpAndFade" : ""
          }`}
        >
          <div className="cover relative w-full flex justify-center items-center md:max-w-[400px] lg:max-w-[512px]">
            <Image
              src={"/imgs/login-imgs/main-img.svg"}
              alt="Hero Image"
              width={1}
              height={1}
              layout="responsive"
              className={`relative mt-16 w-full top-0 right-0 max-h-[45vh] md:max-h-screen ${
                isIntroHidden ? "animate-moveUpAndFade" : ""
              } `}
              style={{ animationDelay: `50ms` }}
            />
          </div>
        </div>

        <div className="detailHome flex w-full mb-12 justify-start flex-col itmes-start md:p-12 md:pl-8 md:justify-center md:flex-2 xl:p-24">
          <h1
            className={`text-blueFade leading-10 text-3xl mt-8 mb-4 font-bold font-poppinsSemiBold md:font-poppinsBold md:text-4xl md:leading-normal ${
              isIntroHidden ? "animate-moveUpAndFade" : ""
            }`}
            style={{ animationDelay: `200ms` }}
          >
            Mulai Perjalanan <br /> Menuju Prestasi <br /> Gemilang!
          </h1>
          <p
            className={`text-sm mb-4 font-poppinsRegular text-blueFade opacity-70 md:max-w-[512px] ${
              isIntroHidden ? "animate-moveUpAndFade" : ""
            }`}
            style={{ animationDelay: `250ms` }}
          >
            Temukan berbagai informasi lomba dengan mudah dan ajukan dengan
            sekali klik!
          </p>
          <Button
            onClick={handleIntroHide}
            className={`md:max-w-[512px] ${
              isIntroHidden ? "animate-moveUpAndFade " : ""
            }`}
            style={{ animationDelay: `300ms` }}
          >
            Berikutnya
          </Button>
        </div>
      </div>
      {/* END INTRODUCTION */}

      {!isLogin ? (
        // FORM IF NOT LOGIN
        <form
          action=""
          method="POST"
          onSubmit={onLogin}
          className={`z-0 absolute min-h-screen left-0 opacity-0 flex flex-col justify-start items-start md:items-stretch w-full py-6 md:py-0 md:flex-row ${
            isIntroHidden ? "animate-moveUpAndShow" : ""
          }`}
        >
          <div
            className={`w-full hidden translate-y-[100vh] h-screen justify-center items-center md:flex md:flex-3 md:px-12 xl:px-24 ${
              isIntroHidden ? "animate-moveUpAndShow" : ""
            }`}
            style={{ animationDelay: `1550ms` }}
          >
            <div className="w-full md:max-w-[400px] lg:max-w-[512px]">
              <Image
                src={"/imgs/create-account-imgs/avatar.svg"}
                alt={`Avatar Vector`}
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-2 md:justify-center md:items-start min-h-screen md:px-12 xl:px-24">
            <div className="px-6  flex flex-col">
              <h1
                className={`text-blueFade  translate-y-[100vh] text-4xl mt-16 mb-4 font-bold font-poppinsSemiBold ${
                  isIntroHidden ? "animate-moveUpAndShow" : ""
                }`}
                style={{ animationDelay: `1550ms` }}
              >
                Masukkan <br></br>Akun
              </h1>
              <p
                className={`text-sm mb-4 translate-y-[100vh] font-poppinsRegular text-blueFade ${
                  isIntroHidden ? "animate-moveUpAndShow" : ""
                }`}
                style={{ animationDelay: `1550ms` }}
              >
                Login dengan akun anda disini!
              </p>
              {error ? (
                <div className="text-sm mb-4 font-poppinsRegular text-red-600">
                  * {error}
                </div>
              ) : (
                ""
              )}
            </div>
            {/* FORM */}
            <div
              className={`coverForm min-h-[200vh] md:max-w-[512px] md:min-h-0 flex translate-y-[100vh] flex-col justify-start items-start w-full gap-2 p-6 bg-[#F1F2F6] rounded-2xl pt-8 ${
                isIntroHidden ? "animate-moveUpAndShow" : ""
              }`}
              style={{ animationDelay: `1650ms` }}
            >
              {/* NIM */}
              <div className="itemForm w-full flex flex-col gap-1">
                <label htmlFor="nim" className="font-poppinsMedium text-sm">
                  NIM
                </label>
                <input
                  type="number"
                  name="nim"
                  id="nim"
                  autoComplete="off"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="p-2 w-full bg-white rounded-md font-poppinsRegular text-xs text-[#1d1d1d]"
                  placeholder="Masukkan NIM Anda"
                  style={{ outline: "none" }}
                />
              </div>
              {/* PASSWORD */}
              <div className="itemForm w-full flex flex-col gap-1 mt-2">
                <label
                  htmlFor="password"
                  className="font-poppinsMedium text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 w-full bg-white rounded-md font-poppinsRegular text-xs text-[#1d1d1d]"
                  placeholder="Masukkan Password Anda"
                  style={{ outline: "none" }}
                />
              </div>
              {/* SUBMIT */}
              <button
                className={`bg-blueSec w-full p-2 text-white font-poppinsMedium mt-4 rounded-lg flex justify-center items-center gap-2 ${
                  isLoading ? "opacity-70" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isLoading ? "Loading..." : "Masuk"}
              </button>
              <p className="font-poppinsRegular text-sm text-[#1d1d1d] text-center mt-2 w-full">
                Belum punya akun?
                <Link href="/createAccount" className="text-blueSec underline">
                  {" "}
                  Buat akun
                </Link>
              </p>
            </div>
          </div>
        </form>
      ) : (
        // DASHBOARD IF LOGIN
        <div
          className={`relative z-40 w-full  min-h-screen translate-y-[100vh] flex flex-col justify-center items-center ${
            isIntroHidden ? "animate-moveUpAndShow" : ""
          }`}
          style={{ animationDelay: `1550ms` }}
        >
          <div className="flex flex-col w-full justify-start items-center py-6 px-4 mt-20 gap-12 max-w-6xl">
            {/* SAMBUTAN */}
            <div
              className="
              flex w-full rounded-3xl bg-bluePrimary px-6 gap-0 sm:gap-8 overflow-hidden
              flex-row justify-start items-center md:items-end sm:rounded-3xl sm:pb-0 sm:max-h-64 sm:-h-full sm:py-0 md:max-h-fit"
            >
              <div className="flex flex-col justify-start items-start gap-2 relative sm:w-full min-w-64 md:pt-8 md:pb-12 md:ps-8">
                <h1 className="text-xl md:text-2xl font-poppinsSemiBold text-white">
                  Halo {user?.name}!
                </h1>
                <p className="text-sm md:text-base font-poppinsRegular text-white opacity-70 md:max-w-80">
                  Yuk temukan info lomba terbaru dan tingkatkan prestasimu!
                </p>
                <Button className="hidden max-w-fit px-8 md:mt-2 md:flex">
                  Mulai Sekarang
                </Button>
              </div>
              <div className="w-full md:h-full md:w-auto sm:flex min-w-64 md:min-w-80">
                <Image
                  src={"/imgs/dashboard-imgs/Dashboard-Main-Img.svg"}
                  alt="Image Dashboard"
                  width={1}
                  height={3}
                  layout="responsive"
                />
              </div>
            </div>

            {/* LOMBA */}
            <div className="flex flex-col gap-1 justify-start items-start w-full min-h-max">
              <div className="flex flex-row justify-between items-center gap-4 w-full">
                <div className="flex flex-col justify-start items-start w-full gap-1">
                  <p className="text-base font-poppinsSemiBold md:text-xl">
                    Lomba Terbaru
                  </p>
                  <p className="text-xs md:text-sm font-poppinsRegular text-normalText opacity-70 mb-4">
                    Cek lomba favoritmu sekarang juga!
                  </p>
                </div>
                <Link
                  href={"/lomba"}
                  className="text-base font-poppinsMedium text-normalText my-1 w-full justify-end items-center text-right hidden sm:flex"
                >
                  <Button className="max-w-fit px-8 text-sm sm:mt-0">
                    Lihat Semua
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col justify-center items-center w-full min-h-64 overflow-hidden">
                {competitionCards.length == 0 ? (
                  <div className="flex flex-col justify-center items-center gap-4 rounded-xl bg-white w-full min-h-64">
                    <div className="w-12 relative">
                      <Image
                        src={"/imgs/dashboard-imgs/No-Data-White.svg"}
                        alt="Image No-Data"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <p className="font-poppinsRegular text-sm text-normalText opacity-40">
                      Belum ada informasi lomba terbaru
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full flex sm:grid sm:grid-cols-2 lg:grid-cols-3 flex-col gap-4 justify-center sm:justify-start sm:overflow-scroll items-center">
                      {/* CARD */}
                      {competitionCards.map((card: Card, index: number) => (
                        <div
                          className="card w-full rounded-xl overflow-hidden flex flex-col bg-white"
                          key={index}
                          onClick={() => {
                            handleLomba(card.id);
                          }}
                        >
                          <div className="w-full relative overflow-hidden rounded-lg aspect-video">
                            <Image
                              src={card.imagePoster}
                              alt="Image Poster"
                              width={1}
                              height={1}
                              layout="responsive"
                            />
                            <div className="flex absolute top-2 left-2 w-full flex-row gap-1 justify-start items-center my-2">
                              <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">
                                {card.category}
                              </div>
                              <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">
                                {card.type}
                              </div>
                              <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">
                                {handleDate(card.endDate)}
                              </div>
                            </div>
                          </div>
                          <div className="detail w-full px-4 py-5 gap-2 justify-start items-start">
                            <h2 className="text-base font-poppinsMedium">
                              {card.title}
                            </h2>

                            <p
                              className="text-sm font-poppinsRegular text-secText line-clamp-3 mt-1"
                              style={{ WebkitLineClamp: 3 }}
                            >
                              {card.description}
                            </p>
                          </div>
                        </div>
                      ))}
                      {/* CARD */}
                    </div>
                    <Link
                      href={"/lomba"}
                      className="text-base underline font-poppinsMedium text-normalText my-1 sm:hidden"
                    >
                      Lihat Semua
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {/* LOMBA */}

            {/* TIM */}
            <div className="w-full flex flex-col justify-start items-start">
              <div className="flex flex-row justify-between items-center gap-4 w-full">
                <div className="flex flex-col justify-start items-start w-full gap-1">
                  <p className="text-base font-poppinsSemiBold md:text-xl">
                    Tim Dibutuhkan
                  </p>
                  <p className="text-xs md:text-sm font-poppinsRegular text-normalText opacity-70 mb-4">
                    Temukan tim ideal untuk kolaborasi!
                  </p>
                </div>
                <Link
                  href={"/tim"}
                  className="text-base font-poppinsMedium text-normalText my-1 w-full justify-end items-center text-right hidden sm:flex"
                >
                  <Button className="max-w-fit px-8 text-sm sm:mt-0">
                    Lihat Semua
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col justify-center items-center w-full">
                {teamCards.length == 0 ? (
                  // HEREEE
                  <div className="flex flex-col justify-center items-center gap-4 w-full rounded-xl min-h-64 bg-white">
                    <div className="w-12 relative">
                      <Image
                        src={"/imgs/dashboard-imgs/No-Data-White.svg"}
                        alt="Image No-Data"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>

                    <p className="font-poppinsRegular text-sm text-normalText opacity-40">
                      Belum ada informasi tim yang dibuka
                    </p>
                  </div>
                ) : (
                  <div className="w-full sm:grid flex md:grid-cols-2 flex-col gap-4 justify-start items-start">
                    {/* CARD */}
                    {teamCards.map((team: Teams) => (
                      <Link
                        className={`card w-full rounded-lg p-4 flex flex-col gap-3 overflow-hidden bg-white h-full ${
                          team.openSlots > 0 ? "" : "hidden"
                        }`}
                        key={team.id}
                        href={`/tim/${team.id}`}
                      >
                        <div className="flex flex-row justify-between items-center">
                          <h2 className="text-base font-poppinsMedium">
                            {team.name}
                          </h2>
                          <div className="px-3 py-1 text-xs bg-blueSec font-poppinsRegular text-white rounded-full">
                            {handleDate(team.endDate)}
                          </div>
                        </div>
                        <p className="font-poppinsRegular text-sm text-normalText opacity-40">
                          {team.description}
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
                    {/* CARD */}
                    <Link
                      href={"/tim"}
                      className="text-base underline font-poppinsMedium text-normalText my-1 sm:hidden w-full flex justify-center items-center"
                    >
                      Lihat Semua
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {/* TIM */}
          </div>
          <Footer></Footer>
        </div>
      )}
      <SideBar
        isAdmin={false}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      ></SideBar>
    </div>
  );
}
