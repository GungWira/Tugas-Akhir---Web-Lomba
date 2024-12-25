"use client";

import Button from "@/components/Button";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import { useUser } from "@/contexts/UserContext";
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
    const fetchDataCard = async () => {
      try {
        if (slug) {
          const response = await fetch(
            `https://lomba-backend.vercel.app/competition/${slug}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) throw new Error("Gagal memuat data");
          const data = await response.json();
          setCard(data);
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

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleCompetition = () => {
    // router.push(`/lomba/${card?.id}/reimburse`)
    router.push(`/lomba/`);
  };

  if (error) return router.push("/lomba");

  return (
    <div className="relative bg-blueFade items-start w-full min-h-screen">
      <NavbarBackTitled
        className="pb-6 rounded-xl"
        style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
      >
        Team Detail
      </NavbarBackTitled>

      <div className="flex pt-24 min-h-screen gap-2 w-full">
        <div
          className="bg-[#F1F2F6] w-full min-h-full rounded-3xl px-4 py-8 flex flex-col justify-start items-start gap-2"
          onClick={() => handleCompetition()}
        >
          <div className="bg-white rounded-xl w-full p-4 py-6 flex flex-col gap-2">
            <h1 className="text-normalText font-poppinsSemiBold text-lg">
              Nama Kompetisi
            </h1>
            <div className="w-full overflow-hidden rounded-lg aspect-video">
              <Image
                src={"/imgs/dashboard-imgs/Contoh-Gambar_1.png"}
                alt="Poster Image"
                width={16}
                height={9}
                layout="responsive"
              />
            </div>
            <div className="flex flex-row justify-start items-center gap-1 my-1">
              <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">
                Web Design
              </div>
              <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">
                Tim
              </div>
              <div className="flex justify-center items-center rounded-3xl bg-blueSec text-white font-poppinsRegular text-xs px-4 py-2">
                21 Okt
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <p className="text-normalText opacity-70 text-justify text-sm my-2">
                halo halo aku wiradarma pembuat lomba, gaskan join cok!
              </p>
              {/* LINK DAFTAR */}
              <Link
                href={"https://youtube.com"}
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
              {/* LINK GUIDEBOOK */}
              <Link
                href={"https://youtube.com"}
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
            </div>
          </div>

          {/* CARD */}
          <div className="w-full rounded-xl bg-white flex flex-col gap-4 p-4 py-6 mt-3">
            <div className="flex flex-col justify-start items-start gap-4 w-full">
              {loading ? (
                <div className="bg-[#F1F2F6] text-[#F1F2F6] w-3/5 h-6"></div>
              ) : (
                <div className="flex flex-row justify-start items-center gap-2">
                  <div className="w-6 min-w-6 overflow-hidden">
                    <Image
                      src={"/imgs/profile/ready.svg"}
                      alt="Ready Icon"
                      width={1}
                      height={1}
                      layout="responsive"
                    />
                  </div>
                  <p className="text-blueSec text-base font-poppinsMedium">
                    Tim Siap
                  </p>
                </div>
              )}
              <div className="w-full">
                {user && user.imageUrl ? (
                  <p className="font-poppinsSemiBold text-normalText text-lg">
                    Tim maba
                  </p>
                ) : (
                  <div className="w-3/5 bg-[#F1F2F6] text-[#F1F2F6] text-lg">
                    p
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-1 w-full">
              <div className="w-full bg-white border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                <div className="min-w-10 max-w-10 w-10 aspect-square rounded-full border overflow-hidden">
                  <Image
                    src={
                      !loading
                        ? user!.imageUrl
                        : "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                    }
                    alt="Image Profile Leader"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-0 w-full">
                  <div className="w-full">
                    {loading ? (
                      <div className="font-poppinsMedium text-sm w-3/5 bg-[#F1F2F6] text-[#F1F2F6]">
                        p
                      </div>
                    ) : (
                      <p className="text-normalText font-poppinsMedium text-sm">
                        {user && user.name ? user.name : ""}
                      </p>
                    )}
                  </div>

                  <div className="w-full mt-1">
                    {loading ? (
                      <div className="font-poppinsMedium text-xs w-3/5 bg-[#F1F2F6] text-[#F1F2F6]">
                        p
                      </div>
                    ) : (
                      <p className="font-poppinsRegular text-xs text-normalText opacity-40">
                        Ketua tim
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full">
                  <Image
                    src={"/imgs/dashboard-imgs/Crown.svg"}
                    alt="Crown Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                    className="w-6 h-6 rounded-full"
                  />
                </div>
              </div>
              <div className="w-full border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                <div className="min-w-10 min-h-10 rounded-full border overflow-hidden">
                  <Image
                    src={"/imgs/dashboard-imgs/Default-Profile-Img.svg"}
                    alt="Image Profile Leader"
                    width={1}
                    height={1}
                    layout="responsive"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-0 w-full">
                  <div className="w-full mt-1">
                    {loading ? (
                      <div className="font-poppinsMedium text-sm w-3/5 bg-[#F1F2F6] text-[#F1F2F6]">
                        p
                      </div>
                    ) : (
                      <p className="text-normalText font-poppinsMedium text-sm">
                        1 Slot Tersisa
                      </p>
                    )}
                  </div>
                  <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
                </div>
              </div>
            </div>
          </div>
          {/* CARD */}
          {card ? "" : ""}
          <div className="flex flex-col justify-start items-start w-full">
            <Button onClick={() => {}}>Ajukan Reimburse</Button>
            <Button
              className="bg-[#F1F2F6] text-normalText border-gray-300 border"
              style={{
                backgroundColor: `#F1F2F6`,
                color: `#767676`,
                marginTop: "12px",
              }}
              onClick={() => {}}
            >
              Stop Unggahan Tim
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
