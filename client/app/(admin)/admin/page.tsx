"use client";

import NavbarLogin from "@/components/NavbarLogin";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
interface Notification {
  id: number;
  name: string;
  description: string;
  date: string;
  status: string;
}

export default function AdminPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");
        const data = await response.json();
        setNotifications(data);
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
    <div className="flex flex-col min-h-screen bg-[#F1F2F6] w-full justify-start items-start">
      <NavbarLogin></NavbarLogin>
      <div className="mt-24 flex flex-col justify-start items-start px-4 w-full gap-5">
        {/* TITLE */}
        <div className="flex flex-col justify-start items-start gap-1">
          <h1 className="font-poppinsSemiBold text-base text-normalText">
            Dashboard Admin
          </h1>
          <p className="font-poppinsRegular text-xs text-normalText opacity-80">
            Satu platform untuk mengelola lomba Primakara University
          </p>
        </div>
        {/* CARDS */}
        <div className="flex flex-col justify-start items-start w-full gap-3">
          {/* DETAIL CARD REIMBURSE*/}
          <div className="w-full rounded-md bg-blueSec flex flex-col justify-start items-start gap-1 p-4">
            <p className="font-poppinsRegular text-xs text-white opacity-80">
              Total Pengajuan Reimburse
            </p>
            <h2 className="font-poppinsSemiBold text-lg text-white">100</h2>
          </div>
          {/* DETAIL CARD REIMBURSE APPROVED*/}
          <div className="w-full rounded-md bg-white flex flex-col justify-start items-start gap-1 p-4">
            <p className="font-poppinsRegular text-xs text-normalText opacity-80">
              Total Pengajuan Reimburse yang Disetujui
            </p>
            <h2 className="font-poppinsSemiBold text-lg text-normalText">29</h2>
          </div>
          {/* DETAIL CARD REIMBURSE REJECTED*/}
          <div className="w-full rounded-md bg-white flex flex-col justify-start items-start gap-1 p-4">
            <p className="font-poppinsRegular text-xs text-normalText opacity-80">
              Total Pengajuan Reimburse yang Ditolak
            </p>
            <h2 className="font-poppinsSemiBold text-lg text-normalText">1</h2>
          </div>
        </div>
        {/* NOTIFICATIONS */}
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <h1 className="font-poppinsSemiBold text-base text-normalText">
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
          ) : (
            <div className="w-full flex flex-col justify-start items-center gap-3 bg-white rounded-md p-4 aspect-video">
              {/* CARD REIMBURSE */}
              {notifications.map((notification, index) => (
                <Link
                  href={`/admin/reimburse/${notification.id}`}
                  className="w-full border border-[#DDDDDD] rounded-md flex flex-row justify-between items-center px-4 py-3"
                  key={index}
                >
                  <div className="flex flex-col justify-start items-start gap-0">
                    <h3 className="font-poppinsSemiBold text-sm text-normalText">
                      {notification.name}
                    </h3>
                    <p className="font-poppinsRegular text-xs text-normalText opacity-80">
                      {notification.description}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div className="w-2 aspect-square rounded-full bg-blueSec"></div>
                    <p className="font-poppinsRegular text-xs text-normalText opacity-80">
                      {notification.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
