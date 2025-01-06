"use client";
import NavbarBack from "@/components/NavbarBackTitledAdmin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

interface UserReimburse {
  cardNumber: string;
  competition: {
    id: string;
    title: string;
    leader: {
      id: string;
      student_id: string;
      profile: string;
      name: string;
    };
    members: [
      {
        id: string;
        name: string;
        profile: string;
        student_id: string;
      }
    ];
  };
  competitionId: string;
  createdAt: string;
  id: string;
  name: string;
  receiptUrl: string;
  status: string;
  bankName: string;
  updatedAt: string;
  userId: string;
}

export default function ReimbursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useUser();
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [reimburseData, setReimburseData] = useState<UserReimburse | null>(
    null
  );

  useEffect(() => {
    const getSlug = async () => {
      const data = (await params).id;
      setSlug(data);
    };
    getSlug();
  }, [params]);

  useEffect(() => {
    const getReimburse = async () => {
      try {
        if (slug) {
          const response = await fetch(
            `https://lomba-backend.vercel.app/admin/reimburse/${slug}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await response.json();
          console.log(data);
          setReimburseData(data);
          setStatus(data.status);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    getReimburse();
  }, [slug]);

  useEffect(() => {
    const getReimburse = async () => {
      try {
        if (slug && status && status == "PENDING") {
          const response = await fetch(
            `https://lomba-backend.vercel.app/admin/reimburse/${slug}/process`,
            {
              method: "POST",
              credentials: "include",
            }
          );
          if (!response.ok) throw new Error("Gagal process");
          setStatus("PROCESS");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    getReimburse();
  }, [slug, status]);

  if (user?.role == "UNROLE") {
    router.push("/");
  }

  const handleApprove = async () => {
    try {
      const response = await fetch(
        `https://lomba-backend.vercel.app/admin/reimburse/${slug}/approve`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Gagal approve");
      setStatus("APPROVED");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(
        `https://lomba-backend.vercel.app/admin/reimburse/${slug}/reject`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Gagal reject");
      setStatus("REJECTED");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <NavbarBack>Ajuan Reimburse</NavbarBack>
      <div className="w-full min-h-screen pt-24 flex max-w-6xl justify-center items-center">
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
                    reimburseData?.competition.leader.profile ||
                    reimburseData?.competition.members[0].profile ||
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
                  {reimburseData?.competition.leader.name ||
                    reimburseData?.competition.members[0].name ||
                    "User"}
                </p>
                <p className="font-poppinsMedium text-xs text-normalText opacity-80">
                  {reimburseData?.competition.leader.student_id ||
                    reimburseData?.competition.leader.student_id ||
                    "User Student ID"}
                </p>
              </div>
            </div>
          </div>
          {/* COMPETITION */}
          <Link
            href={`/admin/competition/${reimburseData?.competitionId}`}
            className="flex flex-col justify-start items-start w-full gap-1"
          >
            <p className="font-poppinsSemiBold text-base text-normalText">
              Lomba yang Diikuti
            </p>
            <div className="w-full border border-[#DDDDDD] rounded-lg px-6 py-3 flex flex-row justify-start items-center gap-1">
              <p className="font-poppinsMedium text-sm text-blueSec">
                {reimburseData?.competition.title}
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
            {reimburseData?.competition.members.map((member, index) => (
              <div
                key={index}
                className="w-full rounded-lg border border-[#DDDDDD] flex flex-row justify-between items-center px-4 py-2"
              >
                <div className="flex flex-row justify-start items-center gap-2">
                  <div className="w-10 aspect-square rounded-full overflow-hidden">
                    <Image
                      src={
                        reimburseData.competition.members[index].profile ||
                        "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                      }
                      alt="Profile"
                      width={100}
                      height={100}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-0">
                    <p className="font-poppinsSemiBold text-sm text-normalText">
                      {member.name}
                    </p>
                    <p className="font-poppinsMedium text-xs text-normalText opacity-80">
                      {member.student_id}
                    </p>
                  </div>
                </div>
                {index === 0 && (
                  <div className="w-6 aspect-square overflow-hidden">
                    <Image
                      src={"/imgs/dashboard-imgs/crown.svg"}
                      alt="Icon"
                      width={100}
                      height={100}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ))}
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
                  {reimburseData?.name}
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
                  {reimburseData?.bankName}
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
                  {reimburseData?.cardNumber}
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
                  src={
                    reimburseData?.receiptUrl ||
                    "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                  }
                  alt="Evidence"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {/* BUTTON */}
          <div
            className={`w-full flex flex-row justify-end items-center gap-2 ${
              status ? "flex" : "hidden"
            }`}
          >
            <Button
              onClick={handleApprove}
              className={`${
                status == "PENDING" || status == "PROCESS" ? "flex" : "hidden"
              } flex justify-center items-center`}
            >
              Setujui
            </Button>
            <Button
              onClick={handleReject}
              className={`bg-[#F1F2F6] text-normalText ${
                status == "PENDING" || status == "PROCESS" ? "flex" : "hidden"
              } flex justify-center items-center`}
              style={{ backgroundColor: "#F1F2F6", color: "#101010" }}
            >
              Tolak
            </Button>
            <Button
              className={`${
                status ? (status == "APPROVED" ? "" : "hidden") : "hidden"
              } bg-green-700 flex justify-center items-center`}
              isDisabled={true}
            >
              Disetujui
            </Button>
            <Button
              className={`${
                status ? (status == "REJECTED" ? "" : "hidden") : "hidden"
              } bg-red-700 flex justify-center items-center`}
              isDisabled={true}
            >
              Ditolak
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
