"use client";

import NavbarLogin from "@/components/NavbarLogin";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";

interface Notification {
  id: number;
  name: string;
  updatedAt: string;
  status: string;
}

interface Reimburse {
  approvedReimburses: { count: number; data: [] };
  rejectedReimburses: { count: number; data: [] };
  totalReimburses: number;
}

export default function AdminPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [reimburseData, setReimburseData] = useState<Reimburse>();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://lomba-backend.vercel.app/admin", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setReimburseData(data);
        console.log(data);
        setNotifications(data.latestReimburses.data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(true);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    };
    if (user) {
      if (user?.role === "ADMIN") {
        fetchNotifications();
      } else {
        router.push("/");
      }
    }
  }, [user, router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F1F2F6] w-full justify-start items-center">
      <NavbarLogin
        isAdmin={true}
        onClick={() => setIsOpen(!isOpen)}
      ></NavbarLogin>
      <div className="mt-24 flex flex-col justify-start items-start px-4 w-full gap-5 max-w-6xl lg:px-0">
        {/* TITLE */}
        <div className="flex flex-col justify-start items-start gap-1">
          <h1 className="font-poppinsSemiBold text-base md:text-xl text-normalText">
            Dashboard Admin
          </h1>
          <p className="font-poppinsRegular text-xs md:text-sm text-normalText opacity-80">
            Satu platform untuk mengelola lomba Primakara University
          </p>
        </div>
        {/* CARDS */}
        <div className="flex flex-col justify-start items-start w-full gap-3">
          {/* DETAIL CARD REIMBURSE*/}
          <div className="w-full rounded-md bg-blueSec flex flex-col justify-start items-start gap-1 p-4">
            <p className="font-poppinsRegular text-xs text-white opacity-80 md:text-sm">
              Total Pengajuan Reimburse
            </p>
            <h2 className="font-poppinsSemiBold text-lg text-white md:text-xl">
              {reimburseData ? reimburseData.totalReimburses : 0}
            </h2>
          </div>
          {/* DETAIL CARD REIMBURSE APPROVED*/}
          <div className="w-full rounded-md bg-white flex flex-col justify-start items-start gap-1 p-4">
            <p className="font-poppinsRegular text-xs text-normalText opacity-80 md:text-sm">
              Total Pengajuan Reimburse yang Disetujui
            </p>
            <h2 className="font-poppinsSemiBold text-lg text-normalText md:text-xl">
              {reimburseData ? reimburseData.approvedReimburses.count : 0}
            </h2>
          </div>
          {/* DETAIL CARD REIMBURSE REJECTED*/}
          <div className="w-full rounded-md bg-white flex flex-col justify-start items-start gap-1 p-4">
            <p className="font-poppinsRegular text-xs text-normalText opacity-80 md:text-sm">
              Total Pengajuan Reimburse yang Ditolak
            </p>
            <h2 className="font-poppinsSemiBold text-lg text-normalText md:text-xl">
              {reimburseData ? reimburseData.rejectedReimburses.count : 0}
            </h2>
          </div>
        </div>
        {/* NOTIFICATIONS */}
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <h1 className="font-poppinsSemiBold text-base text-normalText md:text-xl">
            Notifikasi
          </h1>
          {loading ? (
            <div className="w-full flex flex-col justify-center items-center gap-3 bg-white rounded-md p-4 aspect-video">
              <div className="w-12 aspect-square overflow-hidden">
                <Image
                  src="/imgs/dashboard-imgs/No-Data-White.svg"
                  alt="loading"
                  width={100}
                  height={100}
                  layout="responsive"
                />
              </div>
              <p className="font-poppinsRegular text-xs text-normalText opacity-80">
                Mengambil data...
              </p>
            </div>
          ) : error ? (
            <div className="w-full flex flex-col justify-center items-center gap-3 bg-white rounded-md p-4 aspect-video">
              <div className="w-12 aspect-square overflow-hidden">
                <Image
                  src="/imgs/dashboard-imgs/No-Data-White.svg"
                  alt="loading"
                  width={100}
                  height={100}
                  layout="responsive"
                />
              </div>
              <p className="font-poppinsRegular text-xs text-normalText opacity-80">
                Terjadi kesalahan saat mengambil data
              </p>
            </div>
          ) : notifications.length != 0 ? (
            <div className="w-full flex flex-col justify-start items-center gap-3 bg-white rounded-md p-4 aspect-video">
              {/* CARD REIMBURSE */}
              {notifications.map((notification, index) => (
                <Link
                  href={`/admin/${notification.id}`}
                  className="w-full border border-[#DDDDDD] rounded-md flex flex-row justify-between items-center px-4 py-3"
                  key={index}
                >
                  <div className="flex flex-col justify-start items-start gap-0">
                    <h3 className="font-poppinsSemiBold text-sm text-normalText">
                      {notification.name}
                    </h3>
                    <p className="font-poppinsRegular text-xs text-normalText opacity-80">
                      Mengajukan reimburse
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div
                      className={`w-2 aspect-square rounded-full ${
                        notification.status == "PENDING"
                          ? "bg-blueSec"
                          : notification.status == "APPROVED"
                          ? "bg-green-600"
                          : notification.status == "REJECTED"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <p className="font-poppinsRegular text-xs text-normalText opacity-80">
                      {(() => {
                        const now = new Date();
                        const updated = new Date(notification.updatedAt);
                        const diff = now.getTime() - updated.getTime();
                        const minutes = Math.floor(diff / 60000);
                        const hours = Math.floor(minutes / 60);
                        const days = Math.floor(hours / 24);
                        const months = Math.floor(days / 30);
                        const years = Math.floor(months / 12);

                        if (minutes < 1) return "baru saja";
                        if (minutes < 60) return `${minutes}m`;
                        if (hours < 24) return `${hours}h`;
                        if (days < 30) return `${days}d`;
                        if (months < 12) return `${months}mo`;
                        return `${years}y`;
                      })()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-3 bg-white rounded-md p-4 aspect-video">
              <div className="w-12 aspect-square overflow-hidden">
                <Image
                  src="/imgs/dashboard-imgs/No-Data-White.svg"
                  alt="loading"
                  width={100}
                  height={100}
                  layout="responsive"
                />
              </div>
              <p className="font-poppinsRegular text-xs text-normalText opacity-80">
                Belum ada pengajuan reimburse
              </p>
            </div>
          )}
        </div>
      </div>
      <SideBar
        isAdmin={true}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      ></SideBar>
    </div>
  );
}
