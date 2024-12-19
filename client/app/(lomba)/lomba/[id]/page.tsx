"use client"

import Button from "@/components/Button";
import NavbarLogin from "@/components/NavbarLogin";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Card {
    id: string;
    title: string;
    imagePoster: string;
    link: string;
    category: string;
    type: string;
    level: string;
    endDate: Date;
    description: string;
    linkGuidebook : string;
    linkPendaftaran : string;
  }

export default function DetailLomba({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const router = useRouter()
    const [card, setCard] = useState<Card | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [slug, setSlug] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getSlug = async () => {
            const data = (await params).id
            setSlug(data)
        }
        getSlug()
    }, [params])

    const handleDate = (date : Date | null) =>{
        if(!date) return

        const newDate = new Date(date)
        const validDate = newDate.toLocaleDateString("id-ID", {
          day : "numeric",
          month : "long"
        })
        return validDate
      }

    useEffect(() => {
        const fetchDataCard = async () => {
            try {
                if(slug){
                    const response = await fetch(`https://lomba-backend.vercel.app/competition/${slug}`, {
                        method : "GET",
                        credentials : "include"
                    })
                    if(!response.ok) throw new Error("Gagal memuat data")
                    const data = await response.json()
                    console.log(data)
                    setCard(data)
                    setLoading(false)
                }
            } catch (err : unknown) {
                if(err instanceof Error){
                    setError(err.message)
                }else{
                    setError("Gagal memuat data, mohon coba beberapa saat lagi")
                }
            }
        }
        fetchDataCard()
    }, [slug])


    const handleReimburese = () => {
        router.push(`/lomba/${card?.id}/reimburse`)
    }
    const handleTeam = () => {
        router.push(`/lomba/${card?.id}/reimburse`)
    }

    if(error) return(router.push("/lomba"))

    return (
        <div className="relative flex flex-col min-h-[100vh] justify-start items-start w-full px-4">
            <NavbarLogin></NavbarLogin>
            
            <div className="flex flex-col justify-start items-start py-4 gap-2 mt-24 w-full">
                <div className="bg-white w-full rounded-md px-4 py-6 flex flex-col justify-start items-start gap-2">
                    {!card ? 
                        <div className="font-poppinsBold text-lg w-3/5 bg-[#F1F2F6] text-[#F1F2F6]">p</div> :
                        <h1 className="text-normalText font-poppinsBold text-lg">
                            {card.title}
                        </h1>
                    }
                    
                    <div className="w-full overflow-hidden rounded-lg aspect-video">
                        <Image
                            src={`${card?.imagePoster || "/imgs/dashboard-imgs/Contoh-Gambar_1.png"}`}
                            alt="Poster Image"
                            width={16}
                            height={9}
                            layout="responsive"
                        />
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1 my-1">
                        <div className={`flex justify-center items-center rounded-3xl ${card ? "bg-blueSec" : "bg-[#F1F2F6]"} ${card ? "text-white" : "text-[#F1F2F6]"} font-poppinsRegular text-xs px-4 py-2`}>{card?.type || "Waiting"}</div>
                        <div className={`flex justify-center items-center rounded-3xl ${card ? "bg-blueSec" : "bg-[#F1F2F6]"} ${card ? "text-white" : "text-[#F1F2F6]"} font-poppinsRegular text-xs px-4 py-2`}>{card?.level || "Level"}</div>
                        <div className={`flex justify-center items-center rounded-3xl ${card ? "bg-blueSec" : "bg-[#F1F2F6]"} ${card ? "text-white" : "text-[#F1F2F6]"} font-poppinsRegular text-xs px-4 py-2`}>{handleDate(card?.endDate || null) || "31 Desember"}</div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        {loading ? 
                            <div className="text-sm my-2 font-poppinsRegular w-full h-24 bg-[#F1F2F6] text-[#F1F2F6]">p</div> :
                            <p className="text-normalText opacity-70 text-justify text-sm font-poppinsRegular my-2">
                                {card!.description}
                            </p>
                        }
                        {/* LINK DAFTAR */}
                        <div className="w-full">
                            {loading ? 
                                <div className="w-full bg-[#F1F2F6] text-[#F1F2F6] font-poppinsMedium text-sm">p</div> :
                                <Link
                                    href={card!.linkPendaftaran}
                                    className="flex flex-row justify-start items-center gap-1 text-blueSec font-poppinsMedium text-sm"
                                >
                                    Link Pendaftaran
                                    <div className="w-4">
                                        <Image
                                            src={'/imgs/dashboard-imgs/RightUp.svg'}
                                            alt="Right Up Icon"
                                            width={20}
                                            height={20}
                                            layout="responsive"
                                        />
                                    </div>
                                </Link>
                            }
                        </div>
                        {/* LINK GUIDEBOOK */}
                        <div className="w-full">
                            {loading ? 
                                <div className="w-full bg-[#F1F2F6] text-[#F1F2F6] font-poppinsMedium text-sm">p</div> :
                                <Link
                                    href={card!.linkGuidebook}
                                    className="flex flex-row justify-start items-center gap-1 text-blueSec font-poppinsMedium text-sm"
                                >
                                    Link Guidebook
                                    <div className="w-4">
                                        <Image
                                            src={'/imgs/dashboard-imgs/RightUp.svg'}
                                            alt="Right Up Icon"
                                            width={20}
                                            height={20}
                                            layout="responsive"
                                        />
                                    </div>
                                </Link>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full">
                        <Button onClick={handleReimburese} isDisabled={loading}>Ajukan Reimburse</Button>
                        <Button 
                            className="bg-[#F1F2F6] text-normalText"
                            style={{backgroundColor: `#F1F2F6`, color: `#767676`}}
                            onClick={handleTeam}
                            isDisabled={loading}
                        >
                            Cari Tim
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
  }