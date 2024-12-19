"use client"

import NavbarLogin from "@/components/NavbarLogin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";

interface Card {
  id: string;
  title: string;
  imagePoster: string;
  category: string;
  type: string;
  date: string;
  description: string;
  endDate : Date;
}

export default function Lomba () {
    const router = useRouter()
    const [isTim, setIsTim] = useState(true)
    const [competitionCards, setCompetitionCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>()

    useEffect(() => {
      const fetchData = async () => {
        try {
          const responseCompetition = await fetch('https://lomba-backend.vercel.app/competition', {
            method : 'GET',
            credentials : 'include'
          })
          if(!responseCompetition.ok) {
            setCompetitionCards([])
            throw new Error("Failed to fetch lomba cards")
          } 
          const dataCompetition = await responseCompetition.json()
          if(dataCompetition.length == 0) {
            router.push("/")
            return
          }
          setCompetitionCards(dataCompetition)
          setLoading(false)
        } catch (err : unknown) {
          if(err instanceof Error){
            setError(err.message)
          }else{
            setError("Terjaid kesalahan, mohon coba lagi nanti")
          }
        }
      }
      fetchData()
    }, [])

    const handleLomba = (id : string) => {
      router.push(`lomba/${id}`)
    }
    if (error) return(router.push("/"))

    return (
        <div className="relative flex flex-col min-h-[100vh] justify-start items-start w-full px-4">
            <NavbarLogin></NavbarLogin>

            <div className="flex flex-col justify-start items-start py-4 gap-2 mt-24 w-full">
                <p className="text-base font-poppinsSemiBold">
                    Semua Lomba
                </p>
                <div className="w-full rounded-md flex flex-col justify-start items-start gap-4">
                    {/* KATEGORI */}
                    <div className="flex flex-row p-1 rounded-full bg-white w-full justify-between items-center">
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
                    {loading ?
                      <div 
                        className="card w-full rounded-xl overflow-hidden flex flex-col bg-white">
                        <div className="w-full relative overflow-hidden rounded-lg aspect-video">
                          <Image
                            src={"/imgs/dashboard-imgs/Contoh-Gambar_1.png"}
                            alt="Image Poster"
                            width={1}
                            height={1}
                            layout="responsive"
                          />
                          <div className="flex absolute top-2 left-2 w-full flex-row gap-1 justify-start items-center my-2">
                            <div className="flex justify-center items-center rounded-3xl bg-[#F1F2F6] text-[#F1F2F6] font-poppinsRegular text-xs px-4 py-2">Kategori</div>
                            <div className="flex justify-center items-center rounded-3xl bg-[#F1F2F6] text-[#F1F2F6] font-poppinsRegular text-xs px-4 py-2">Tipe</div>
                            <div className="flex justify-center items-center rounded-3xl bg-[#F1F2F6] text-[#F1F2F6] font-poppinsRegular text-xs px-4 py-2">31 Desember</div>
                          </div>
                        </div>
                        <div className="detail w-full px-4 py-5 gap-2 justify-start items-start">
                          <div className="text-base font-poppinsMedium w-3/5 bg-[#F1F2F6] text-[#F1F2F6]">Title</div>
                          
                          <div className="text-sm font-poppinsRegular mt-2 w-full text-[#F1F2F6] bg-[#F1F2F6] h-24">Description</div>
                        </div>
                      </div> : 
                      ""
                    }
                    {competitionCards.map((card : Card, index) => (
                        <div 
                          className={`card w-full rounded-xl overflow-hidden flex-col bg-white ${isTim ? card.type == "Team" ? "flex" : "hidden" : card.type == "Team" ? "hidden" : "flex"}`} 
                          key={index} 
                          onClick={() => {handleLomba(card.id)}}>
                          <div className="w-full relative overflow-hidden rounded-lg aspect-video">
                            <Image
                              src={`${card.imagePoster || "/imgs/dashboard-imgs/Contoh-Gambar_1.png"}`}
                              alt="Image Poster"
                              width={1}
                              height={1}
                              layout="responsive"
                            />
                            <div className="flex absolute top-2 left-2 w-full flex-row gap-1 justify-start items-center my-2">
                              <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">{card.category}</div>
                              <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">{card.type}</div>
                              <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">{formatDate(card.endDate)}</div>
                            </div>
                          </div>
                          <div className="detail w-full px-4 py-5 gap-2 justify-start items-start">
                            <h2 className="text-base font-poppinsMedium">Hoho Competition</h2>
                            
                            <p className="text-sm font-poppinsRegular text-secText">Perlombaan yang paling dinanti tahun ini! Daftarkan tim mu sekarang dan jadilah juara masa depan!</p>
                          </div>
                        </div>
                      ))
                    }
                </div>
            </div>

        </div>
    )
}