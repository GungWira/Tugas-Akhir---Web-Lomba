"use client";

import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import NavbarLogin from "@/components/NavbarLogin";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

interface Card {
  id: string;
  title: string;
  imgUrl: string;
  link: string;
  category: string;
  type: string;
  date: string;
  description: string;
}

export default function Home() {
  const router = useRouter()
  const user = useUser()
  const { login } = useUser()
  // ANIMATION
  const [isIntroHidden, setIsIntroHidden] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [competitionCards, setCompetitionCards] = useState([]);
  const [teamCards, setTeamCards] = useState([]);

  const handleIntroHide = () => {
    setIsIntroHidden(true);
  };

  // FORM LOGIN
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null)

  async function onLogin(event : FormEvent<HTMLFormElement>){
    event.preventDefault()
    setError('')

    try{
      if( nim && password ){
        await login({nim,password})
        if(!user.isLogin){
          setError("NIM atau password salah")
        }else{
          setIsIntroHidden(true)
        }
      }else {
        setError("Field tidak boleh kosong")
      }
    }catch(err :unknown){
      if(err instanceof Error){
        setError(err.message)
      }else{
        setError("Terjadi kesalahan, mohon coba beberapa saat lagi")
      }
    }
  }

  // CHECK IS USER LOGIN
  useEffect(() => {
    const checkLogin = async () => {
      try{
        if(user){
          setIsLogin(user.isLogin)
          if(user.isLogin){
            setIsIntroHidden(true)
          }
        }
      }catch(err :unknown){
        console.log('Error verifying login :', err)
      }
    }
    checkLogin()
  }, [user])

  // IF USER LOGGEDIN, FETCH DATA FOR USER
  useEffect(() => {
    if(isLogin) {
      const fetchData = async () => {
        try {
          const responseCompetition = await fetch('https://lomba-backend.vercel.app/auth/competition', {
            method : 'GET',
            credentials : 'include'
          })
          if(!responseCompetition.ok) {
            setCompetitionCards([])
            throw new Error("Failed to fetch lomba cards")
          } 
          const dataCompetition = await responseCompetition.json()
          setCompetitionCards(dataCompetition)

          const responseTeam = await fetch('https://lomba-backend.vercel.app/auth/team', {
            method : 'GET',
            credentials : 'include'
          })
          if(!responseTeam.ok) {
            setTeamCards([])
            throw new Error("Failed to fetch team cards")
          }
          const dataTeam = await responseTeam.json()
          setTeamCards(dataTeam)

        } catch (err : unknown) {
          if(err instanceof Error){
            setError(err.message)
          }else{
            setError("Terjaid kesalahan, mohon coba lagi nanti")
          }
        }
      }

      fetchData()
    }
  }, [isLogin])
  
  const handleLomba = (id : string) => {
    router.push(`/lomba/${id}`)
  }

  return (
    <div className={`container relative  min-h-screen flex justify-start items-center flex-col overflow-hidden ${isIntroHidden ? "max-h-fit" : "max-h-screen"}`}>
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
            <Image
              src={'/imgs/login-imgs/main-img.svg'}
              alt="Hero Image"
              width={1}
              height={1}
              layout="responsive"
              className={`relative mt-16 w-full top-0 right-0 max-h-[45vh] ${
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
          method="POST"
          onSubmit={onLogin}
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
            {error ? 
             <div className="text-sm mb-4 font-poppinsRegular text-red-600">* {error}</div>: 
             ''
            }
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
          className={`relative z-40 w-full max-w-3xl min-h-screen translate-y-[100vh] ${
            isIntroHidden ? "animate-moveUpAndShow" : ""
          }`}
          style={{ animationDelay: `1550ms` }}
        >
          <div className="flex flex-col w-full justify-start items-start py-6 px-4 mt-20 gap-12">
            {/* SAMBUTAN */}
            <div className="
              flex w-full rounded-3xl bg-bluePrimary px-6 gap-0 sm:gap-8 overflow-hidden
              flex-row justify-start items-center sm:rounded-3xl sm:pb-0 sm:max-h-64 sm:-h-full sm:py-0">
              <div className="flex flex-col justify-start items-start gap-2 relative sm:w-full min-w-64">
                <h1 className="text-xl font-poppinsBold text-white">
                  Halo {user.user?.name}!
                </h1>
                <p className="text-sm font-poppinsRegular text-white opacity-70">
                  Yuk temukan info lomba terbaru dan tingkatkan prestasimu!
                </p>
              </div>
              <div className="w-full md:h-full md:w-auto sm:flex min-w-64">
                <Image
                  src={'/imgs/dashboard-imgs/Dashboard-Main-Img.svg'}
                  alt="Image Dashboard"
                  width={1}
                  height={3}
                  layout="responsive"
                />
              </div>
            </div>

            {/* LOMBA */}
            <div className="flex flex-col gap-4 justify-start items-start w-full min-h-max">
              <p className="text-base font-poppinsSemiBold">
                Lomba Terbaru
              </p>
              <div className="flex flex-col justify-center items-center w-full min-h-64">
                {competitionCards.length != 0 ? (
                  <div className="flex flex-col justify-center items-center gap-4 rounded-xl bg-white w-full min-h-64">
                    <div className="w-12 relative">
                      <Image
                        src={'/imgs/dashboard-imgs/No-Data-White.svg'}
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
                  <div className="w-full flex sm:grid sm:grid-cols-2 lg:grid-cols-3 flex-col gap-4 justify-center sm:justify-start sm:overflow-scroll items-center">
                    {/* CARD */}
                    {competitionCards.map((card : Card, index : number) => (
                    <div 
                      className="card w-full rounded-xl overflow-hidden flex flex-col bg-white" 
                      key={index} 
                      onClick={() => {handleLomba(card.id)}}>
                      <div className="w-full relative overflow-hidden rounded-lg aspect-video">
                        <Image
                          src={'/imgs/dashboard-imgs/Contoh-Gambar_1.png'}
                          alt="Image Poster"
                          width={1}
                          height={1}
                          layout="responsive"
                        />
                        <div className="flex absolute top-2 left-2 w-full flex-row gap-1 justify-start items-center my-2">
                          <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">Web Design</div>
                          <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">Tim</div>
                          <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">21 Okt</div>
                        </div>
                      </div>
                      <div className="detail w-full px-4 py-5 gap-2 justify-start items-start">
                        <h2 className="text-base font-poppinsMedium">Hoho Competition</h2>
                        
                        <p className="text-sm font-poppinsRegular text-secText">Perlombaan yang paling dinanti tahun ini! Daftarkan tim mu sekarang dan jadilah juara masa depan!</p>
                      </div>
                    </div>
                    ))}

                    <div 
                      className="card w-full rounded-xl overflow-hidden flex flex-col bg-white" 
                      key={'1'} 
                      onClick={() => {handleLomba("q")}}>
                      <div className="w-full relative overflow-hidden rounded-lg aspect-video">
                        <Image
                          src={'/imgs/dashboard-imgs/Contoh-Gambar_1.png'}
                          alt="Image Poster"
                          width={1}
                          height={1}
                          layout="responsive"
                        />
                        <div className="flex absolute top-2 left-2 w-full flex-row gap-1 justify-start items-center my-2">
                          <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">Web Design</div>
                          <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">Tim</div>
                          <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">21 Okt</div>
                        </div>
                      </div>
                      <div className="detail w-full px-4 py-5 gap-2 justify-start items-start">
                        <h2 className="text-base font-poppinsMedium">Hoho Competition</h2>
                        
                        <p className="text-sm font-poppinsRegular text-secText">Perlombaan yang paling dinanti tahun ini! Daftarkan tim mu sekarang dan jadilah juara masa depan!</p>
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

              <div className="flex flex-col justify-center items-center w-full">
                {teamCards.length != 0 ? (
                  <div className="flex flex-col justify-center items-center gap-4 w-full rounded-xl min-h-64 bg-white">
                    <div className="w-12 relative">
                      <Image
                        src={'/imgs/dashboard-imgs/No-Data-White.svg'}
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
                  <div className="w-full flex flex-col gap-4 justify-center items-center">
                    {/* CARD */}
                    <div className="card w-full rounded-lg px-4 py-6 sm:rounded-xl flex flex-col gap-3 bg-white">
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
                          <div className="w-10 h-10 rounded-full border">
                            <Image
                              src={'/imgs/dashboard-imgs/Default-Profile-Img.svg'}
                              alt="Image Profile Leader"
                              width={1}
                              height={1}
                              layout="responsive"
                              className="w-full"
                            />
                          </div>
                          <div className="flex flex-col justify-start items-start gap-0 w-full">
                            <p className="text-normalText font-poppinsMedium text-sm">I Made Sutha</p>
                            <p className="font-poppinsRegular text-xs text-normalText opacity-40">Ketua tim</p>
                          </div>
                          <div className="w-6 h-6 rounded-full">
                            <Image
                              src={'/imgs/dashboard-imgs/Crown.svg'}
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
                          <div className="w-10 h-10 rounded-full border">
                            <Image
                              src={'/imgs/dashboard-imgs/Default-Profile-Img.svg'}
                              alt="Image Profile Default"
                              width={1}
                              height={1}
                              layout="responsive"
                              className="w-full"
                            />
                          </div>
                          <div className="flex flex-col justify-start items-start gap-0 w-full">
                            <p className="text-normalText font-poppinsMedium text-sm">2 Slot Tersisa</p>
                            <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
                          </div>
                        </div>
                        <Button className="text-sm">Detail</Button>
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
