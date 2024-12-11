"use client"

import NavbarLogin from "@/components/NavbarLogin";
import Button from "@/components/Button";


export default function Lomba () {
    return (
        <div className="relative flex flex-col min-h-[100vh] justify-start items-start w-full px-4">
            <NavbarLogin></NavbarLogin>

            <div className="flex flex-col justify-start items-start p-4 gap-2 mt-24 w-full">
                <p className="text-base font-poppinsSemiBold">
                    Semua Tim
                </p>
                <div className="bg-white w-full rounded-md p-4 flex flex-col justify-start items-start gap-4">
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

                </div>
            </div>

        </div>
    )
}