"use client";

import Button from "@/components/Button";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Footer from "@/components/Footer";

interface Team {
  id: string;
  name: string;
  openSlots: number;
  description: string;
  leader: {
    id: string;
    name: string;
    profile: string;
  };
  member: [
    {
      name: string;
      id: string;
      profile: string;
    }
  ];
  competition: {
    title: string;
    id: string;
    endDate: string;
    category: string;
  };
}

interface Notification {
  id: string;
  senderId: string;
  senderUser: {
    id: string;
    name: string;
    profile: string;
  };
}

interface Member {
  id: string;
  name: string;
  profile: string;
}

export default function DetailTeam({
  params,
}: {
  params: Promise<{ idTeam: string }>;
}) {
  const router = useRouter();
  const { user } = useUser();
  const [slug, setSlug] = useState<string | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [leader, setLeader] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(true);
  const [notificationList, setNotificationList] = useState<[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSlug = async () => {
      const data = (await params).idTeam;
      setSlug(data);
    };
    getSlug();
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const response = await fetch(
            `https://lomba-backend.vercel.app/teams/${slug}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!response.ok) router.back();
          const data = await response.json();
          console.log(data);
          setLoading(false);
          setTeam(data.team);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    fetchData();
  }, [slug, router]);

  useEffect(() => {
    try {
      if (user && team) {
        if (user.id == team.leader.id) {
          setLeader(true);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, [team, user]);

  useEffect(() => {
    const fetchNotification = async () => {
      if (leader && user) {
        try {
          const response = await fetch(
            `https://lomba-backend.vercel.app/notification/${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          if (!response.ok) throw new Error("Gagal mengambil data notifikasi");
          const data = await response.json();
          console.log(data);
          setNotificationList(data.notifications);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          }
        }
      }
    };
    fetchNotification();
  }, [leader, user]);

  const handleDate = (date: string | null) => {
    if (!date) return;

    const newDate = new Date(date);
    const validDate = newDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
    });
    return validDate;
  };

  const handlerJoin = async () => {
    try {
      if (user && slug) {
        const response = await fetch(
          `https://lomba-backend.vercel.app/teams/${slug}/join`,
          {
            method: "POST",
            body: JSON.stringify({
              userId: user.id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.status == 400) {
          throw new Error(
            "Gagal mengikuti tim. Anda sudah berpartisipasi pada tim lain!"
          );
        } else if (!response.ok) {
          throw new Error(
            "Gagal mengikuti tim. Mohon mencoba beberapa saat lagi"
          );
        }
        router.refresh();
      } else {
        setError("Gagal mengikuti tim. Mohon mencoba beberapa saat lagi");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handlerAccept = async (memberId: string) => {
    try {
      if (user && slug) {
        const response = await fetch(
          `https://lomba-backend.vercel.app/teams/${slug}/members`,
          {
            method: "PATCH",
            body: JSON.stringify({
              leaderId: user.id,
              memberId: memberId,
              action: "approve",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok)
          throw new Error(
            "Gagal menambahkan anggota. Mohon mencoba beberapa saat lagi"
          );
        const data = await response.json();
        setTeam(data.updatedTeam);

        const responses = await fetch(
          `https://lomba-backend.vercel.app/notification/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!responses.ok) throw new Error("Gagal mengambil data notifikasi");
        const datas = await responses.json();
        setNotificationList(datas.notifications);
      } else {
        setError("Gagal mengikuti tim. Mohon mencoba beberapa saat lagi");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handlerReject = async (memberId: string) => {
    try {
      if (user && slug) {
        const response = await fetch(
          `https://lomba-backend.vercel.app/teams/${slug}/members`,
          {
            method: "PATCH",
            body: JSON.stringify({
              leaderId: user.id,
              memberId: memberId,
              action: "reject",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok)
          throw new Error(
            "Gagal menambahkan anggota. Mohon mencoba beberapa saat lagi"
          );
        // FETCH ULANG DATA USER
        const responses = await fetch(
          `https://lomba-backend.vercel.app/notification/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!responses.ok) throw new Error("Gagal mengambil data notifikasi");
        const data = await responses.json();
        setNotificationList(data.notifications);
      } else {
        setError("Gagal mengikuti tim. Mohon mencoba beberapa saat lagi");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handlerUnpublish = async () => {
    try {
      if (user && slug) {
        const response = await fetch(
          `https://lomba-backend.vercel.app/teams/${slug}/stopPublication`,
          {
            method: "POST",
            body: JSON.stringify({
              leaderId: user.id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok)
          throw new Error(
            "Gagal menghentikan tim. Mohon mencoba beberapa saat lagi"
          );
        const data = await response.json();
        return data;
      } else {
        setError("Gagal menghentikan tim. Mohon mencoba beberapa saat lagi");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="relative flex flex-col min-h-[100vh] justify-start items-center w-full">
      <NavbarBackTitled>Detail Tim</NavbarBackTitled>
      <div className="flex flex-row justify-between items-start gap-4 mt-24 w-full max-w-6xl md:min-h-[70vh]">
        {/* DESKTOP USER */}
        <div className="min-w-80 hidden md:flex justify-start items-start flex-col gap-4">
          {/* NORMAL USER */}
          <div className="flex flex-col justify-start items-start w-full bg-white rounded-xl p-4 gap-2">
            <div className="flex flex-col justify-start items-start gap-3">
              <div
                className={`${
                  team?.openSlots || 0 > 0 ? "hidden" : "flex"
                } flex-row justify-start items-center gap-2 mb-3`}
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={`/imgs/team/accept.svg`}
                    alt="Accept"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="text-blueSec font-poppinsSemiBold text-base">
                  Tim Siap!
                </p>
              </div>
              <p className="text-base text-normalText font-poppinsBold">
                Anggota
              </p>
            </div>
            {/* LEADER */}
            <div className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-[#E7E7E7] ">
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="w-10 aspect-square rounded-full overflow-hidden">
                  <Image
                    src={`${
                      team
                        ? team.leader.profile ||
                          "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                        : "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                    }`}
                    alt="User Profile"
                    width={1}
                    height={1}
                    layout="responsive"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <p
                    className={`leader_name font-poppinsMedium text-normalText text-base`}
                  >
                    {leader ? "Anda" : team ? team.leader.name : "Ketua Tim"}
                  </p>
                  <p className="leader_title font-poppinsMedium text-normalText text-xs opacity-60">
                    Ketua Tim
                  </p>
                </div>
              </div>
              <div className="w-5 aspect-square overflow-hidden">
                <Image
                  src={`/imgs/dashboard-imgs/Crown.svg`}
                  alt="CrownIcon"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
            </div>
            {/* ANGGOTA FILLED*/}
            {loading ? (
              <div className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-dashed border-[#E7E7E7] ">
                <div className="flex flex-row justify-start items-center gap-2">
                  <div className="w-10 aspect-square rounded-full overflow-hidden">
                    <Image
                      src={`/imgs/dashboard-imgs/Default-Profile-Img.svg`}
                      alt="User Profile"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <p className="participant_name font-poppinsMedium text-normalText text-base">
                      Anggota 1
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {team?.member.slice(1).map((member: Member, index: number) => (
                  <div
                    className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-[#E7E7E7] "
                    key={member.id + index}
                  >
                    <div className="flex flex-row justify-start items-center gap-2">
                      <div className="w-10 aspect-square rounded-full overflow-hidden">
                        <Image
                          src={
                            member.profile ||
                            "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                          }
                          alt="User Profile"
                          width={1}
                          height={1}
                          layout="responsive"
                          className="w-full"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-start">
                        <p className="participant_name font-poppinsMedium text-normalText text-base">
                          {member.id == user?.id ? "Anda" : member.name}
                        </p>
                        <p className="participant_title font-poppinsMedium text-normalText text-xs opacity-60">
                          Anggota
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {/* ANGGOTA UNFILLED*/}
            {loading ? (
              <div className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-dashed border-[#E7E7E7] ">
                <div className="flex flex-row justify-start items-center gap-2">
                  <div className="w-10 aspect-square rounded-full overflow-hidden">
                    <Image
                      src={`/imgs/dashboard-imgs/Default-Profile-Img.svg`}
                      alt="User Profile"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <p className="participant_name font-poppinsMedium text-normalText text-base">
                      Anggota 2
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {Array.from({ length: team?.openSlots || 0 }).map(
                  (_, index) => (
                    <div
                      className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-dashed border-[#E7E7E7] "
                      key={index}
                    >
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div className="w-10 aspect-square rounded-full overflow-hidden">
                          <Image
                            src={`/imgs/dashboard-imgs/Default-Profile-Img.svg`}
                            alt="User Profile"
                            width={1}
                            height={1}
                            layout="responsive"
                            className="w-full"
                          />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                          <p className="participant_name font-poppinsMedium text-normalText text-base">
                            Anggota
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>
          {/* LEADER ONLY */}
          <div className="flex flex-col justify-start items-start gap-2 mt-2 w-full">
            {notificationList.map((notif: Notification) => (
              <div
                className="card_participant w-full bg-white px-4 py-3 rounded-md flex flex-row justify-between items-center gap-3"
                key={notif.id}
              >
                <div className="flex flex-row justify-start items-center w-full gap-2">
                  <div className="w-10 aspect-square overflow-hidden rounded-full">
                    <Image
                      src={
                        notif.senderUser.profile ||
                        `/imgs/dashboard-imgs/Default-Profile-Img.svg`
                      }
                      alt="User Profile"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="w-full"
                    />
                  </div>
                  <p className="text-normalText font-poppinsSemiBold text-base">
                    {notif.senderUser.name}
                  </p>
                </div>
                <div className="flex flex-row justify-end items-center gap-2">
                  <button className="w-8 aspect-square rounded-full overflow-hidden">
                    <Image
                      src={`/imgs/team/accept.svg`}
                      alt="Bell Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="w-full"
                      onClick={() => {
                        handlerAccept(notif.senderUser.id);
                      }}
                    />
                  </button>
                  <button className="w-8 aspect-square rounded-full overflow-hidden">
                    <Image
                      src={`/imgs/team/reject.svg`}
                      alt="Bell Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="w-full"
                      onClick={() => {
                        handlerReject(notif.senderUser.id);
                      }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* MAIN ALL */}
        <div className="flex flex-col justify-start items-start px-6 pb-8  gap-2 w-full bg-[#F1F2F6] rounded-3xl z-50 max-w-6xl md:px-0 md:gap-0">
          {/* INFORMATION LEADER ONLY */}
          <div
            className={`flex flex-col w-full justify-start items-start gap-2 mb-4 md:mb-0 ${
              leader ? (team?.openSlots || 0 > 0 ? "flex" : "hidden") : "hidden"
            }`}
          >
            <div
              className={`notification w-full border border-[#FFB703] bg-[#FDCA4E] p-4 rounded-xl flex-row gap-4 justify-between items-center mb-2 ${
                notification ? "flex" : "hidden"
              }`}
            >
              <div className="flex flex-row justify-start items-start gap-2">
                <div className="w-10 aspect-square overflow-hidden">
                  <Image
                    src={`/imgs/team/bell.svg`}
                    alt="Bell Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                  <p className="text-white font-poppinsMedium text-md">
                    Pemberitahuan!
                  </p>
                  <p className="text-white font-poppinsRegular text-sm">
                    {`Anda memiliki ${notificationList.length} calon anggota baru`}
                  </p>
                </div>
              </div>
              <button
                className="flex justify-center items-center w-4 aspect-square overflow-hidden"
                onClick={() => setNotification(false)}
              >
                <Image
                  src={`/imgs/team/close.svg`}
                  alt="Bell Icon"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </button>
            </div>
            {/* CARD HIRING */}
            {notificationList.map((notif: Notification) => (
              <div
                className={`card_participant w-full bg-white px-4 py-3 rounded-md flex flex-row justify-between items-center gap-3 md:hidden`}
                key={notif.id}
              >
                <div className="flex flex-row justify-start items-center w-full gap-2">
                  <div className="w-10 aspect-square overflow-hidden rounded-full">
                    <Image
                      src={
                        notif.senderUser.profile ||
                        `/imgs/dashboard-imgs/Default-Profile-Img.svg`
                      }
                      alt="User Profile"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="w-full"
                    />
                  </div>
                  <p className="text-normalText font-poppinsSemiBold text-base">
                    {notif.senderUser.name}
                  </p>
                </div>
                <div className="flex flex-row justify-end items-center gap-2">
                  <button className="w-8 aspect-square rounded-full overflow-hidden">
                    <Image
                      src={`/imgs/team/accept.svg`}
                      alt="Bell Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="w-full"
                      onClick={() => {
                        handlerAccept(notif.senderUser.id);
                      }}
                    />
                  </button>
                  <button className="w-8 aspect-square rounded-full overflow-hidden">
                    <Image
                      src={`/imgs/team/reject.svg`}
                      alt="Bell Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="w-full"
                      onClick={() => {
                        handlerReject(notif.senderUser.id);
                      }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* MAIN */}
          <div className="bg-white w-full rounded-md px-4 py-6 flex flex-col justify-start items-start gap-2">
            <div
              className={`${
                team?.openSlots || 0 > 0 ? "hidden" : "flex"
              } flex-row justify-start items-center gap-2 mb-3 md:hidden`}
            >
              <div className="w-6 aspect-square overflow-hidden">
                <Image
                  src={`/imgs/team/accept.svg`}
                  alt="Accept"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <p className="text-blueSec font-poppinsSemiBold text-base">
                Tim Siap!
              </p>
            </div>
            <div className="w-full">
              {loading ? (
                <div className="w-4/5 bg-[#F1F2F6] text-[#F1F2F6] font-poppinsBold text-xl mb-1">
                  p
                </div>
              ) : (
                <h1 className="font-poppinsBold text-xl text-normalText mb-1">
                  {team!.name}
                </h1>
              )}
            </div>
            {/* TAG */}
            <div className="flex flex-row justify-start items-start gap-1">
              <div
                className={`tag py-1 px-6 rounded-full font-poppinsRegular text-sm  ${
                  loading
                    ? "bg-[#F1F2F6] text-[#F1F2F6]"
                    : "bg-blueSec text-white"
                }`}
              >
                {team ? team.competition.category : "Web"}
              </div>
              <div
                className={`tag py-1 px-6 rounded-full font-poppinsRegular text-sm  ${
                  loading
                    ? "bg-[#F1F2F6] text-[#F1F2F6]"
                    : "bg-blueSec text-white"
                }`}
              >
                {team ? handleDate(team.competition.endDate) : "31 Desember"}
              </div>
            </div>
            {/* TEAM */}
            <div className="flex flex-col w-full gap-2 justify-start items-start mt-4">
              {/* LEADER */}
              <div className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-[#E7E7E7] md:hidden">
                <div className="flex flex-row justify-start items-center gap-2">
                  <div className="w-10 aspect-square rounded-full overflow-hidden">
                    <Image
                      src={`${
                        team?.leader.profile ||
                        "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                      }`}
                      alt="User Profile"
                      width={1}
                      height={1}
                      layout="responsive"
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <p
                      className={`leader_name font-poppinsMedium text-normalText text-base`}
                    >
                      {leader ? "Anda" : team ? team.leader.name : "Ketua Tim"}
                    </p>
                    <p className="leader_title font-poppinsMedium text-normalText text-xs opacity-60">
                      Ketua Tim
                    </p>
                  </div>
                </div>
                <div className="w-5 aspect-square overflow-hidden">
                  <Image
                    src={`/imgs/dashboard-imgs/Crown.svg`}
                    alt="CrownIcon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
              </div>
              {/* ANGGOTA FILLED*/}
              {loading ? (
                <div className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-dashed border-[#E7E7E7] md:hidden">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <div className="w-10 aspect-square rounded-full overflow-hidden">
                      <Image
                        src={`/imgs/dashboard-imgs/Default-Profile-Img.svg`}
                        alt="User Profile"
                        width={1}
                        height={1}
                        layout="responsive"
                        className="w-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <p className="participant_name font-poppinsMedium text-normalText text-base">
                        Anggota 1
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {team?.member
                    .slice(1)
                    .map((member: Member, index: number) => (
                      <div
                        className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-[#E7E7E7] md:hidden"
                        key={member.id + index}
                      >
                        <div className="flex flex-row justify-start items-center gap-2">
                          <div className="w-10 aspect-square rounded-full overflow-hidden">
                            <Image
                              src={
                                member.profile ||
                                "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                              }
                              alt="User Profile"
                              width={1}
                              height={1}
                              layout="responsive"
                              className="w-full"
                            />
                          </div>
                          <div className="flex flex-col justify-center items-start">
                            <p className="participant_name font-poppinsMedium text-normalText text-base">
                              {member.id == user?.id ? "Anda" : member.name}
                            </p>
                            <p className="participant_title font-poppinsMedium text-normalText text-xs opacity-60">
                              Anggota
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
              {/* ANGGOTA UNFILLED*/}
              {loading ? (
                <div className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-dashed border-[#E7E7E7] md:hidden">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <div className="w-10 aspect-square rounded-full overflow-hidden">
                      <Image
                        src={`/imgs/dashboard-imgs/Default-Profile-Img.svg`}
                        alt="User Profile"
                        width={1}
                        height={1}
                        layout="responsive"
                        className="w-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <p className="participant_name font-poppinsMedium text-normalText text-base">
                        Anggota 2
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {Array.from({ length: team?.openSlots || 0 }).map(
                    (_, index) => (
                      <div
                        className="flex flex-row w-full justify-between items-center py-2 px-4 rounded-md border border-dashed border-[#E7E7E7] md:hidden"
                        key={index}
                      >
                        <div className="flex flex-row justify-start items-center gap-2">
                          <div className="w-10 aspect-square rounded-full overflow-hidden">
                            <Image
                              src={`/imgs/dashboard-imgs/Default-Profile-Img.svg`}
                              alt="User Profile"
                              width={1}
                              height={1}
                              layout="responsive"
                              className="w-full"
                            />
                          </div>
                          <div className="flex flex-col justify-center items-start">
                            <p className="participant_name font-poppinsMedium text-normalText text-base">
                              Anggota
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
              {/* DESCRIPTION */}
              <div className="flex flex-col w-full justify-start items-start gap-2 mt-4 md:mt-0">
                <p className="text-normalText font-poppinsSemiBold text-lg md:hidden">
                  Deskripsi
                </p>
                <div className="w-full">
                  {loading ? (
                    <div className="w-full bg-[#F1F2F6] text-[#F1F2F6] font-poppinsRegular text-sm h-24">
                      p
                    </div>
                  ) : (
                    <p className="text-normalText font-poppinsRegular text-sm opacity-70">
                      {team ? team.description : "Deskripsi"}
                    </p>
                  )}
                </div>
              </div>
              {/* COMPETITION */}
              <div className="flex flex-col w-full justify-start items-start gap-2 mt-4">
                <p className="text-normalText font-poppinsSemiBold text-lg">
                  Lomba yang Diikuti
                </p>
                <Link
                  href={`/lomba/${team?.competition.id}`}
                  className="text-blueSec font-poppinsMedium text-sm px-4 py-3 border border-[#E7E7E7] w-full flex flex-row justify-start items-center gap-1 rounded-md"
                >
                  {team ? team.competition.title : "Competition"}
                  <div className="w-4 aspect-square overflow-hidden flex justify-center items-center">
                    <Image
                      src={`/imgs/team/right-up.svg`}
                      alt="Right Up Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                    />
                  </div>
                </Link>
              </div>
              {/* ACTION INGAT PADA LEADER, CALL LEADER TIDAK ADA*/}
              <div
                className={`flex-col justify-start items-start gap-1 w-full mt-4 ${
                  loading ? "hidden" : leader ? "hidden" : "flex"
                }`}
              >
                <Link
                  href={``}
                  className="flex flex-row justify-center items-center gap-1 text-blueSec font-poppinsMedium text-md mb-1"
                >
                  Hubungi Ketua Tim
                  <div className="w-4 aspect-square overflow-hidden flex justify-center items-center">
                    <Image
                      src={`/imgs/team/right-up.svg`}
                      alt="Right Up Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                    />
                  </div>
                </Link>
              </div>
              {loading ? (
                <div className=""></div>
              ) : (
                <div className="w-full flex flex-col">
                  <Button
                    className={`mt-0 ${
                      leader
                        ? team?.openSlots || 0 > 0
                          ? ""
                          : "hidden"
                        : "hidden"
                    }`}
                    onClick={handlerUnpublish}
                  >
                    Stop Unggahan
                  </Button>
                  <Button
                    className={`mt-0 ${
                      leader
                        ? "hidden"
                        : team?.openSlots || 0 > 0
                        ? team?.member.some((member) => member.id === user?.id)
                          ? "hidden"
                          : ""
                        : "hidden"
                    }`}
                    onClick={handlerJoin}
                  >
                    Ikuti Tim
                  </Button>
                  <p className="text-red-500 font-poppinsRegular text-sm mt-2">
                    {error}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
