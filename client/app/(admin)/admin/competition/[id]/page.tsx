"use client";

import Button from "@/components/Button";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Footer from "@/components/Footer";

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
  linkGuidebook: string;
  linkPendaftaran: string;
}

export default function DetailLomba({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { user } = useUser();
  const [card, setCard] = useState<Card | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSlug = async () => {
      const data = (await params).id;
      setSlug(data);
    };
    getSlug();
  }, [params]);

  useEffect(() => {
    if (user) {
      if (user.role !== "ADMIN") {
        router.push("/");
      }
    }
  }, [user, router]);

  const handleDate = (date: Date | null) => {
    if (!date) return;

    const newDate = new Date(date);
    const validDate = newDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
    });
    return validDate;
  };

  useEffect(() => {
    const fetchDataCard = async () => {
      try {
        if (slug) {
          const response = await fetch(
            `https://lomba-backend.vercel.app/competitions/${slug}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) throw new Error("Gagal memuat data");
          const data = await response.json();

          setCard(data);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Gagal memuat data, mohon coba beberapa saat lagi");
        }
      }
    };
    fetchDataCard();
  }, [slug]);

  if (error && !card) return router.push("/lomba");

  return (
    <div className="relative flex flex-col min-h-[100vh] justify-start items-center w-full">
      <NavbarBackTitled>Detail Lomba</NavbarBackTitled>
      <div className="flex flex-row w-full justify-start items-start mt-24 md:px-4 xl:px-0 md:gap-6 max-w-6xl md:min-h-[70vh]">
        <div className="hidden md:flex flex-col justify-start items-start bg-white rounded-xl overflow-hidden w-full min-w-72 max-w-96 mb-8">
          <div className="w-full overflow-hidden min-w-72 max-w-96 max-h-[60vh]">
            <Image
              src={`${
                !loading
                  ? card?.imagePoster || "/imgs/competition/default-poster.svg"
                  : "/imgs/competition/default-poster.svg"
              }`}
              alt="Poster Image"
              width={9}
              height={16}
              layout="responsive"
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-0 p-4 w-full">
            {/* LINK DAFTAR */}
            <div className="w-full mb-3">
              {loading ? (
                <div className="w-full bg-[#F1F2F6] text-[#F1F2F6] font-poppinsMedium text-sm">
                  p
                </div>
              ) : (
                <Link
                  href={card?.linkPendaftaran || "/"}
                  className="flex flex-row justify-start items-center gap-1 text-blueSec font-poppinsMedium text-sm"
                >
                  Link Pendaftaran
                  <div className="w-4">
                    <Image
                      src={"/imgs/dashboard-imgs/RightUp.svg"}
                      alt="Right Up Icon"
                      width={20}
                      height={20}
                      layout="responsive"
                    />
                  </div>
                </Link>
              )}
            </div>
            {/* LINK GUIDEBOOK */}
            <div className="w-full">
              {loading ? (
                <div className="w-full bg-[#F1F2F6] text-[#F1F2F6] font-poppinsMedium text-sm">
                  p
                </div>
              ) : (
                <Link
                  href={card?.linkGuidebook || "/"}
                  className="flex flex-row justify-start items-center gap-1 text-blueSec font-poppinsMedium text-sm"
                >
                  Link Guidebook
                  <div className="w-4">
                    <Image
                      src={"/imgs/dashboard-imgs/RightUp.svg"}
                      alt="Right Up Icon"
                      width={20}
                      height={20}
                      layout="responsive"
                    />
                  </div>
                </Link>
              )}
            </div>
            {loading ? (
              <div className=""></div>
            ) : (
              <div className={`flex flex-col justify-start items-start w-full`}>
                <Button>Edit Lomba</Button>
                <Button>Hapus Lomba</Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3 w-full">
          <div className="flex flex-col justify-start items-start py-4 md:px-0 pt-0 gap-2  w-full px-4 max-w-6xl">
            <div className="bg-white w-full rounded-md px-4 py-6 flex flex-col justify-start items-start gap-2">
              {/* TITLE */}
              {loading ? (
                <div className="font-poppinsSemiBold text-lg md:text-2xl w-3/5 bg-[#F1F2F6] text-[#F1F2F6]">
                  p
                </div>
              ) : (
                <h1 className="text-normalText font-poppinsSemiBold text-lg md:text-2xl">
                  {card?.title}
                </h1>
              )}
              {/* TITLE */}
              {/* IMAGE */}
              <div
                className={`w-full overflow-hidden rounded-lg aspect-video flex justify-center md:hidden ${
                  !loading ? "items-start" : "items-center"
                }`}
              >
                <Image
                  src={`${
                    !loading
                      ? card?.imagePoster ||
                        "/imgs/competition/default-poster.svg"
                      : "/imgs/competition/default-poster.svg"
                  }`}
                  alt="Poster Image"
                  width={16}
                  height={9}
                  layout="responsive"
                />
              </div>
              {/* IMAGE */}
              <div className="flex flex-row justify-start items-center gap-1 my-1">
                <div
                  className={`flex justify-center items-center rounded-3xl ${
                    !loading ? "bg-blueSec" : "bg-[#F1F2F6]"
                  } ${
                    !loading ? "text-white" : "text-[#F1F2F6]"
                  } font-poppinsRegular text-xs px-4 py-2`}
                >
                  {card?.type || "Waiting"}
                </div>
                <div
                  className={`flex justify-center items-center rounded-3xl ${
                    !loading ? "bg-blueSec" : "bg-[#F1F2F6]"
                  } ${
                    !loading ? "text-white" : "text-[#F1F2F6]"
                  } font-poppinsRegular text-xs px-4 py-2`}
                >
                  {card?.level || "Level"}
                </div>
                <div
                  className={`flex justify-center items-center rounded-3xl ${
                    !loading ? "bg-blueSec" : "bg-[#F1F2F6]"
                  } ${
                    !loading ? "text-white" : "text-[#F1F2F6]"
                  } font-poppinsRegular text-xs px-4 py-2`}
                >
                  {handleDate(card?.endDate || null) || "31 Desember"}
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                {loading ? (
                  <div className="text-sm my-2 font-poppinsRegular w-full h-24 bg-[#F1F2F6] text-[#F1F2F6]">
                    p
                  </div>
                ) : (
                  <p className="text-normalText opacity-70 text-justify text-sm font-poppinsRegular my-2">
                    {card?.description}
                  </p>
                )}
                {/* LINK DAFTAR */}
                <div className="w-full md:hidden">
                  {loading ? (
                    <div className="w-full bg-[#F1F2F6] text-[#F1F2F6] font-poppinsMedium text-sm">
                      p
                    </div>
                  ) : (
                    <Link
                      href={card?.linkPendaftaran || "/"}
                      className="flex flex-row justify-start items-center gap-1 text-blueSec font-poppinsMedium text-sm"
                    >
                      Link Pendaftaran
                      <div className="w-4">
                        <Image
                          src={"/imgs/dashboard-imgs/RightUp.svg"}
                          alt="Right Up Icon"
                          width={20}
                          height={20}
                          layout="responsive"
                        />
                      </div>
                    </Link>
                  )}
                </div>
                {/* LINK GUIDEBOOK */}
                <div className="w-full md:hidden">
                  {loading ? (
                    <div className="w-full bg-[#F1F2F6] text-[#F1F2F6] font-poppinsMedium text-sm">
                      p
                    </div>
                  ) : (
                    <Link
                      href={card?.linkGuidebook || "/"}
                      className="flex flex-row justify-start items-center gap-1 text-blueSec font-poppinsMedium text-sm"
                    >
                      Link Guidebook
                      <div className="w-4">
                        <Image
                          src={"/imgs/dashboard-imgs/RightUp.svg"}
                          alt="Right Up Icon"
                          width={20}
                          height={20}
                          layout="responsive"
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                {error ? (
                  <p className="text-xs text-red-600 font-poppinsRegular">
                    {error}
                  </p>
                ) : (
                  ""
                )}
                {loading ? (
                  <div className=""></div>
                ) : (
                  <div
                    className={`flex flex-col justify-start items-start w-full md:hidden`}
                  >
                    <Button>Edit Lomba</Button>
                    <Button>Hapus Lomba</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
