"use client";

import NavbarBackTitledDark from "@/components/NavbarBackTitledDark";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Reimburse {
  id: string;
  name: string;
  status: string;
  receiptUrl: string;
  competitionId: string;
  competition: {
    title: string;
  };
}

export default function DetailTeam({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);
  const [content, setContent] = useState<Reimburse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSlug = async () => {
      const data = (await params).id;
      setSlug(data);
    };
    getSlug();
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const response = await fetch(
            `https://lomba-backend.vercel.app/profile/reimburses/${slug}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!response.ok) {
            setLoading(false);
            throw new Error("Gagal mengambil data tim");
          }
          const data = await response.json();
          console.log(data);
          setContent(data);
          setLoading(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    fetchData();
  }, [slug]);

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

  if (error) {
    router.back();
  }

  return (
    <div className="w-full relative flex flex-col justify-start items-center bg-blueFade md:bg-[#F1F2F6] min-h-screen">
      <NavbarBackTitledDark className="pb-6 md:hidden">
        Detail Reimburse
      </NavbarBackTitledDark>
      <NavbarBackTitled className="pb-6 md:flex hidden bg-white">
        Detail Reimburse
      </NavbarBackTitled>
      <div className="flex pt-24 min-h-screen md:min-h-fit md:px-4 max-w-6xl w-full">
        <div
          className="bg-[#F1F2F6] w-full min-h-full md:min-h-fit rounded-3xl p-6 md:rounded-xl flex flex-col gap-3 md:bg-white md: mt-4"
          style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
        >
          {loading ? (
            <div className="flex flex-col justify-start items-start gap-3">
              {/* STATUS SKELETON */}
              <div className="bg-[#f1f2f7] w-32 h-8 rounded-full animate-pulse"></div>

              {/* COMPETITION SKELETON */}
              <div className="flex flex-col gap-2 justify-start items-start w-full mt-2">
                <div className="bg-[#f1f2f7] w-40 h-6 rounded-md animate-pulse"></div>
                <div className="bg-[#f1f2f7] w-full h-12 rounded-md animate-pulse"></div>
              </div>

              {/* EVIDENCE SKELETON */}
              <div className="flex flex-col justify-start items-start w-full gap-2 aspect-video max-w-80">
                <div className="bg-[#f1f2f7] w-40 h-6 rounded-md animate-pulse"></div>
                <div className="bg-[#f1f2f7] w-full aspect-video rounded-md animate-pulse"></div>
              </div>
            </div>
          ) : content ? (
            <div className="flex flex-col justify-start items-start gap-3">
              {/* STATUS */}
              <div
                className={`status px-5 py-1 rounded-full flex flex-row justify-center items-center gap-2 top-4 left-4 border ${handleBorder(
                  content.status
                )} ${handleColor(content.status)}`}
              >
                <div className="w-4 aspect-square overflow-hidden">
                  <Image
                    src={handleIcon(content.status)}
                    alt="Icon Card"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p
                  className={`font-poppinsRegular text-sm ${handleColorText(
                    content.status
                  )}`}
                >
                  {handleText(content.status)}
                </p>
              </div>
              {/* COMPETITION */}
              <div className="flex flex-col gap-2 justify-start items-start w-full mt-2">
                <p className="font-poppinsSemiBold text-base text-normalText">
                  Lomba yang diikuti
                </p>
                <Link
                  href={`/lomba/${content.competitionId}`}
                  className="bg-white px-4 py-3 rounded-md flex flex-row justify-start items-start gap-2 border border-[#E7E7E7] w-full"
                >
                  <p className="font-poppinsRegular text-sm text-normalText">
                    {content.competition.title}
                  </p>
                  <div className="w-4 aspect-square overflow-hidden flex justify-center items-center">
                    <Image
                      src={"/imgs/profile/expand.svg"}
                      alt="Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                    />
                  </div>
                </Link>
              </div>
              {/* EVIDENCE */}
              <div className="flex flex-col justify-start items-start w-full gap-2">
                <p className="font-poppinsSemiBold text-base text-normalText">
                  Bukti Pembayaran
                </p>
                <div className="w-full aspect-video max-w-80 overflow-hidden flex justify-center items-center rounded-md">
                  <Image
                    src={
                      content.receiptUrl ||
                      "/imgs/competition/default-poster.svg"
                    }
                    alt="Bukti Pembayaran"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 w-full py-8">
              <div className="w-20 aspect-square overflow-hidden">
                <Image
                  src="/imgs/profile/dizzy.svg"
                  alt="Error Icon"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <p className="font-poppinsSemiBold text-normalText text-base text-center">
                Uuups...
              </p>
              <p className="font-poppinsRegular text-normalText text-sm opacity-70 text-center">
                Gagal mengambil data reimbursement. Silahkan coba beberapa saat
                lagi!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
