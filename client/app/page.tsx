"use client";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import NavbarLogin from "@/components/NavbarLogin";

import { useState } from "react";
import Link from "next/link";

// Ekspor bernama untuk HideIntroduction
export function HideIntroduction() {
  const [isIntroHidden, setIsIntroHidden] = useState(false);

  const handleIntroHide = () => {
    setIsIntroHidden(true);
  };

  return { isIntroHidden, handleIntroHide }; // Jika ingin menggunakannya di Home
}

export default function Home() {
  const { isIntroHidden, handleIntroHide } = HideIntroduction();
  // FORM
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = true;
  const isLomba = true;
  const isTim = true;

  return (
    <div className={`container relative max-w-sm min-h-screen flex justify-start items-center flex-col overflow-hidden ${isIntroHidden ? "max-h-fit" : "max-h-screen"}`}>
      {isLogin ? (
        <NavbarLogin
          className={`top-[100%] ${
            isIntroHidden ? "animate-animateNavDown" : ""
          }`}
          style={{ animationDelay: `1350ms` }}
        ></NavbarLogin>
      ) : (
        <div className="hidden"></div>
      )}
      <Navbar
        className={`${isIntroHidden && isLogin ? "animate-moveUpAndFade" : ""}`}
      ></Navbar>

      {/* INTRODUCTION */}
      <div className={`coverIntroduction fixed px-4 min-h-screen flex flex-col justify-between ${isIntroHidden ? "z-0" : "z-50"}`}>
        <div className="bodyMain z-10 w-full mt-8 flex flex-col justify-between">
          <div className="cover relative w-ful flex justify-center items-center">
            <img
              src="/imgs/login-imgs/main-img.svg"
              alt="img"
              className={`relative mt-16 w-full top-0 right-0 ${
                isIntroHidden ? "animate-moveUpAndFade" : ""
              } `}
              style={{ animationDelay: `50ms` }}
            />
          </div>
        </div>
        <div className="detailHome flex w-full mb-12 justify-start flex-col itmes-start">
          <h1
            className={`text-blueFade leading-10 text-3xl mt-8 mb-4 font-bold font-poppinsSemiBold ${
              isIntroHidden ? "animate-moveUpAndFade" : ""
            }`}
            style={{ animationDelay: `200ms` }}
          >
            Mulai Perjalanan <br /> Menuju Prestasi <br /> Gemilang!
          </h1>
          <p
            className={`text-sm mb-4 font-poppinsRegular text-blueFade opacity-70 ${
              isIntroHidden ? "animate-moveUpAndFade" : ""
            }`}
            style={{ animationDelay: `250ms` }}
          >
            Temukan berbagai informasi lomba dengan mudah dan ajukan dengan
            sekali klik!
          </p>
          <Button
            onClick={handleIntroHide}
            className={`${isIntroHidden ? "animate-moveUpAndFade " : ""}`}
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
          className={`z-0 absolute min-h-screen left-0 opacity-0 flex flex-col justify-start items-start w-full py-6 ${
            isIntroHidden ? "animate-moveUpAndShow" : ""
          }`}
        >
          <div className="px-6">
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
          </div>
          {/* FORM */}
          <div
            className={`coverForm min-h-[200vh] flex translate-y-[100vh] flex-col justify-start items-start w-full gap-2 p-6 bg-[#F1F2F6] rounded-2xl pt-8 ${
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
              <label htmlFor="password" className="font-poppinsMedium text-sm">
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
              className={`bg-blueSec w-full p-2 text-white font-poppinsMedium mt-4 rounded-lg`}
              onClick={handleIntroHide}
              type="submit"
            >
              Masuk
            </button>
            <p className="font-poppinsRegular text-sm text-[#1d1d1d] text-center mt-2 w-full">
              Belum punya akun?
              <Link href="/createAccount" className="text-blueSec underline">
                {" "}
                Buat akun
              </Link>
            </p>
          </div>
        </form>
      ) : (
        // DASHBOARD IF LOGIN
        <div
          className={`relative z-40 min-h-screen translate-y-[100vh] ${
            isIntroHidden ? "animate-moveUpAndShow" : ""
          }`}
          style={{ animationDelay: `1550ms` }}
        >
          <div className="flex flex-col justify-start items-start py-6 px-4 mt-20 gap-12">
            <div className="flex flex-col w-full rounded-xl bg-bluePrimary p-6 pb-0 gap-8">
              <div className="flex flex-col justify-start items-start gap-2">
                <h1 className="text-xl font-poppinsBold text-white">
                  Halo Sutha!
                </h1>
                <p className="text-sm font-poppinsRegular text-white opacity-70">
                  Yuk temukan info lomba terbaru dan tingkatkan prestasimu!
                </p>
              </div>
              <div className="w-full">
                <img
                  src="./imgs/dashboard-imgs/Dashboard-Main-Img.svg"
                  alt="img dashboard"
                />
              </div>
            </div>

            {/* LOMBA */}
            <div className="flex flex-col gap-4 justify-start items-start w-full min-h-max">
              <p className="text-base font-poppinsSemiBold">
                Lomba Terbaru
              </p>
              <div className="flex flex-col p-6 justify-center items-center rounded-xl w-full min-h-64 bg-white">
                {!isLomba ? (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <img
                      src="./imgs/dashboard-imgs/No-Data-White.svg"
                      alt="no-data"
                      className="w-12"
                    />
                    <p className="font-poppinsRegular text-sm text-normalText opacity-40">
                      Belum ada informasi lomba terbaru
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-4 justify-center items-center">
                    {/* CARD */}
                    <div className="card p-4 w-full rounded-lg flex flex-col gap-4 bg-[#F1F2F6]">
                      <div className="w-full overflow-hidden rounded-lg aspect-video">
                        <img 
                          src="./imgs/dashboard-imgs/Contoh-Gambar_1.png" 
                          alt="img" 
                        />
                      </div>
                      <div className="detail w-full gap-2 justify-start items-start">
                        <h2 className="text-base font-poppinsMedium">Maestro Fest</h2>
                        <div className="flex flex-row gap-1 justify-start items-center my-2">
                          <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">Web Design</div>
                          <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">Tim</div>
                          <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">21 Okt</div>
                        </div>
                        <p className="text-sm font-poppinsRegular text-secText">Perlombaan yang paling dinanti tahun ini! Daftarkan tim mu sekarang dan jadilah juara masa depan!</p>
                        <Button className="text-sm">Selengkapnya</Button>
                      </div>
                    </div>
                    <div className="card p-4 w-full rounded-lg flex flex-col gap-4 bg-[#F1F2F6]">
                      <div className="w-full overflow-hidden rounded-lg aspect-video">
                        <img 
                          src="./imgs/dashboard-imgs/Contoh-Gambar_1.png" 
                          alt="img" 
                        />
                      </div>
                      <div className="detail w-full gap-2 justify-start items-start">
                        <h2 className="text-base font-poppinsMedium">Maestro Fest</h2>
                        <div className="flex flex-row gap-1 justify-start items-center my-2">
                          <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">Web Design</div>
                          <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">Tim</div>
                          <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">21 Okt</div>
                        </div>
                        <p className="text-sm font-poppinsRegular text-secText">Perlombaan yang paling dinanti tahun ini! Daftarkan tim mu sekarang dan jadilah juara masa depan!</p>
                        <Button className="text-sm">Selengkapnya</Button>
                      </div>
                    </div>
                    {/* CARD */}
                    <Link href={'/lomba'} className="text-base underline font-poppinsMedium text-normalText my-1">Lihat Semua</Link>
                  </div>
                )}
              </div>
            </div>
            {/* LOMBA */}

            {/* TIM */}
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <p className="text-base font-poppinsSemiBold">
                Tim Dibutuhkan
              </p>

              <div className="flex flex-col p-6 justify-center items-center rounded-xl w-full min-h-64 bg-white">
                {!isTim ? (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <img
                      src="./imgs/dashboard-imgs/No-Data-White.svg"
                      alt="no-data"
                      className="w-12"
                    />
                    <p className="font-poppinsRegular text-sm text-normalText opacity-40">
                      Belum ada informasi tim yang dibuka
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-4 justify-center items-center">
                    {/* CARD */}
                    <div className="card w-full rounded-lg p-4 flex flex-col gap-3 bg-[#F1F2F6]">
                      <div className="flex flex-row justify-between items-center">
                        <h2 className="text-base font-poppinsMedium">
                          Tim Maba Gacor
                        </h2>
                        <div className="px-3 py-1 text-xs bg-blueSec font-poppinsRegular text-white rounded-full">
                          20 Okt
                        </div>
                      </div>
                      <p className="font-poppinsRegular text-sm text-normalText opacity-40">
                        Dicari seorang backend developer serta ui designer figma yang kompeten dan dapat diajak berkomunikasi.
                      </p>
                      <div className="detail w-full flex flex-col gap-2 justify-start items-start">
                        {/* KETUA */}
                        <div className="w-full bg-white border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                          <img 
                            src="./imgs/dashboard-imgs/Default-Profile-Img.svg" 
                            alt="Image Profile Leader" 
                            className="w-10 h-10 rounded-full border"
                          />
                          <div className="flex flex-col justify-start items-start gap-0 w-full">
                            <p className="text-normalText font-poppinsMedium text-sm">I Made Sutha</p>
                            <p className="font-poppinsRegular text-xs text-normalText opacity-40">Ketua tim</p>
                          </div>
                          <img 
                            src="./imgs/dashboard-imgs/Crown.svg" 
                            alt="Image Profile Leader" 
                            className="w-6 h-6 rounded-full"
                          />
                        </div>
                        {/* KETUA */}
                        <div className="w-full border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                          <img 
                            src="./imgs/dashboard-imgs/Default-Profile-Img.svg" 
                            alt="Image Profile Leader" 
                            className="w-10 h-10 rounded-full border"
                          />
                          <div className="flex flex-col justify-start items-start gap-0 w-full">
                            <p className="text-normalText font-poppinsMedium text-sm">2 Slot Tersisa</p>
                            <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
                          </div>
                        </div>
                        <Button className="text-sm">Selengkapnya</Button>
                      </div>
                    </div>
                    {/* CARD */}
                    <Link href={'/'} className="text-base underline font-poppinsMedium text-normalText my-1">Lihat Semua</Link>
                  </div>
                )}
              </div>
            </div>
            {/* TIM */}
          </div>
        </div>
      )}
    </div>
  );
}
