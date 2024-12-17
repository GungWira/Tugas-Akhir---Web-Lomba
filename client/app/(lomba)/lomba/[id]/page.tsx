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
    imgUrl: string;
    link: string;
    category: string;
    type: string;
    date: string;
    description: string;
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

    useEffect(() => {
        const getSlug = async () => {
            const data = (await params).id
            setSlug(data)
        }
        getSlug()
    }, [params])

    useEffect(() => {
        const fetchDataCard = async () => {
            try {
                const response = await fetch(`https://lomba-backend.vercel.app/competition/${slug}`, {
                    method : "GET",
                    credentials : "include"
                })
                if(!response.ok) throw new Error("Gagal memuat data")
                const data = await response.json()
                setCard(data)
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
        router.push(`/lomba/${card?.id}/reimburese`)
    }

    // if(error) return(router.push("/lomba"))

    return (
        <div className="relative flex flex-col min-h-[100vh] justify-start items-start w-full px-4">
            <NavbarLogin></NavbarLogin>
            
            <div className="flex flex-col justify-start items-start py-4 gap-2 mt-24 w-full">
                <div className="bg-white w-full rounded-md px-4 py-6 flex flex-col justify-start items-start gap-2">
                    <h1 className="text-normalText font-poppinsBold text-lg">
                        {slug}
                    </h1>
                    
                    <div className="w-full overflow-hidden rounded-lg aspect-video">
                        <Image
                            src={'/imgs/dashboard-imgs/Contoh-Gambar_1.png'}
                            alt="Poster Image"
                            width={16}
                            height={9}
                            layout="responsive"
                        />
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1 my-1">
                    <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">Web Design</div>
                          <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">Tim</div>
                          <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">21 Okt</div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <p className="text-normalText opacity-70 text-justify text-sm my-2">
                            halo halo aku wiradarma pembuat lomba, gaskan join cok!
                        </p>
                        {/* LINK DAFTAR */}
                        <Link
                            href={'https://youtube.com'}
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
                        {/* LINK GUIDEBOOK */}
                        <Link
                            href={'https://youtube.com'}
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
                    </div>
                    <div className="flex flex-col justify-start items-start w-full">
                        <Button onClick={handleReimburese}>Ajukan Reimburse</Button>
                        <Button 
                            className="bg-[#F1F2F6] text-normalText"
                            style={{backgroundColor: `#F1F2F6`, color: `#767676`}}
                        >
                            Cari Tim
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
  }