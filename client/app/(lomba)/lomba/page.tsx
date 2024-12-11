"use client"

import NavbarLogin from "@/components/NavbarLogin";
import Button from "@/components/Button";
import Image from "next/image";

import { useState } from "react";

export default function Lomba () {
    const [isTim, setIsTim] = useState(true)
    return (
        <div className="relative flex flex-col min-h-[100vh] justify-start items-start w-full px-4">
            <NavbarLogin></NavbarLogin>

            <div className="flex flex-col justify-start items-start p-4 gap-2 mt-24 w-full">
                <p className="text-base font-poppinsSemiBold">
                    Semua Lomba
                </p>
                <div className="bg-white w-full rounded-md p-4 flex flex-col justify-start items-start gap-4">
                    {/* KATEGORI */}
                    <div className="flex flex-row p-1 rounded-full bg-[#F1F2F6] w-full justify-between items-center">
                        <button 
                            type="button" 
                            className={`w-1/2 py-2 rounded-full text-sm font-poppinsMedium ${isTim ? "bg-blueSec text-white" : "bg-transparent text-normalText opacity-60"}`}
                            onClick={() => setIsTim(true)}
                        >
                            Tim
                        </button>
                        <button 
                            type="button" 
                            className={`w-1/2 py-2 rounded-full text-sm font-poppinsMedium ${!isTim ? "bg-blueSec text-white" : "bg-transparent text-normalText opacity-60"}`}
                            onClick={() => setIsTim(false)}
                        >
                            Individu
                        </button>
                    </div>
                    {/* CARD */}
                    <div className="card p-4 w-full rounded-lg flex flex-col gap-4 bg-[#F1F2F6]">
                      <div className="w-full overflow-hidden rounded-lg aspect-video">
                        <Image
                          src={'/imgs/dashboard-imgs/Contoh-Gambar_1.png'}
                          alt="Poster Image"
                          width={16}
                          height={9}
                          layout="responsive"
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
                      <Image
                          src={'/imgs/dashboard-imgs/Contoh-Gambar_1.png'}
                          alt="Poster Image"
                          width={16}
                          height={9}
                          layout="responsive"
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
                </div>
            </div>

        </div>
    )
}