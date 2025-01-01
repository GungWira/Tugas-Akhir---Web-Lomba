"use client";
import NavbarBack from "@/components/NavbarBackTitledAdmin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
export default function ReimbursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useUser();
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const getSlug = async () => {
      const data = (await params).id;
      setSlug(data);
    };
    getSlug();
  }, [params]);

  if (user?.role == "UNROLE") {
    router.push("/");
  }

  return (
    <div className="w-full h-screen flex justify-start items-start">
      <NavbarBack>Ajuan Reimburse</NavbarBack>
      <div className="w-full min-h-screen pt-24 flex">
        <div
          className="flex flex-col justify-start items-start w-full bg-white px-4 py-6 min-h-full gap-6"
          style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
        >
          {/* PENGAJU REIMBURSE */}
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <p className="font-poppinsSemiBold text-base text-normalText">
              Oleh
            </p>
            <div className="flex flex-row justify-start items-center gap-3">
              <div className="w-12 aspect-square rounded-full overflow-hidden">
                <Image
                  src={
                    user?.imageUrl ||
                    "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                  }
                  alt="Profile"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-0">
                <p className="font-poppinsSemiBold text-base text-normalText">
                  Suta Radit
                </p>
                <p className="font-poppinsMedium text-xs text-normalText opacity-80">
                  {user?.nim}
                </p>
              </div>
            </div>
          </div>
          {/* COMPETITION */}
          <Link
            href={`/admin/competition/${slug}`}
            className="flex flex-col justify-start items-start w-full gap-1"
          >
            <p className="font-poppinsSemiBold text-base text-normalText">
              Lomba yang Diikuti
            </p>
            <div className="w-full border border-[#DDDDDD] rounded-lg px-6 py-3 flex flex-row justify-start items-center gap-1">
              <p className="font-poppinsMedium text-sm text-blueSec">
                Nama Lomba
              </p>
              <div className="w-4 aspect-square overflow-hidden flex justify-center items-center">
                <Image
                  src={"/imgs/team/right-up.svg"}
                  alt="Icon"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
            </div>
          </Link>
          {/* TEAM */}
          <div className="flex flex-col justify-start items-start w-full gap-2">
            {/* NAMA TEAM */}
            <div className="flex flex-col justify-start items-start w-full gap-1">
              <p className="font-poppinsSemiBold text-base text-normalText">
                Anggota Team
              </p>
            </div>
            {/* CARD ANGGOTA TEAM */}
            <div className="w-full rounded-lg border border-[#DDDDDD] flex flex-row justify-between items-center px-4 py-2">
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="w-10 aspect-square rounded-full overflow-hidden">
                  <Image
                    src={"/imgs/dashboard-imgs/Default-Profile-Img.svg"}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-0">
                  <p className="font-poppinsSemiBold text-sm text-normalText">
                    Suta Radit
                  </p>
                  <p className="font-poppinsMedium text-xs text-normalText opacity-80">
                    {user?.nim}
                  </p>
                </div>
              </div>
              <div className="w-6 aspect-square overflow-hidden">
                <Image
                  src={"/imgs/dashboard-imgs/crown.svg"}
                  alt="Icon"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {/* BANK DATA */}
          <div className="flex flex-col justify-start items-start w-full gap-4">
            {/* ATAS NAMA */}
            <div className="flex flex-col justify-start items-start w-full gap-1">
              <p className="font-poppinsSemiBold text-base text-normalText">
                Atas Nama
              </p>
              <div className="w-full border border-[#DDDDDD] rounded-lg px-6 py-3 flex flex-row justify-start items-center gap-1">
                <p className="font-poppinsMedium text-sm text-normalText">
                  Suta Radit
                </p>
              </div>
            </div>
            {/* BANK */}
            <div className="flex flex-col justify-start items-start w-full gap-1">
              <p className="font-poppinsSemiBold text-base text-normalText">
                Bank
              </p>
              <div className="w-full border border-[#DDDDDD] rounded-lg px-6 py-3 flex flex-row justify-start items-center gap-1">
                <p className="font-poppinsMedium text-sm text-normalText">
                  BNI
                </p>
              </div>
            </div>
            {/* NO REKENING */}
            <div className="flex flex-col justify-start items-start w-full gap-1">
              <p className="font-poppinsSemiBold text-base text-normalText">
                No Rekening
              </p>
              <div className="w-full border border-[#DDDDDD] rounded-lg px-6 py-3 flex flex-row justify-start items-center gap-1">
                <p className="font-poppinsMedium text-sm text-normalText">
                  1234567890
                </p>
              </div>
            </div>

            {/* BUKTI TRANSFER */}
            <div className="flex flex-col justify-start items-start w-full gap-1">
              <p className="font-poppinsSemiBold text-base text-normalText">
                Bukti Pembayaran
              </p>
              <div className="w-full border border-[#DDDDDD] rounded-lg flex flex-row justify-start items-center gap-1 aspect-video overflow-hidden">
                <Image
                  src={"/imgs/dashboard-imgs/Default-Profile-Img.svg"}
                  alt="Evidence"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {/* BUTTON */}
          <div className="w-full flex flex-row justify-end items-center gap-2">
            <Button>Setujui</Button>
            <Button
              className="bg-[#F1F2F6] text-normalText"
              style={{ backgroundColor: "#F1F2F6", color: "#101010" }}
            >
              Tolak
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
