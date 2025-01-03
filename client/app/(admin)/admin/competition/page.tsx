"use client";

import Alert from "@/components/Alert";
import Button from "@/components/Button";
import CompetitionCardAdmin from "@/components/CompetitionCardAdmin";
import NavbarLogin from "@/components/NavbarLogin";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Competition {
  id: string;
  title: string;
  description: string;
  imagePoster: string;
  category: string;
  type: string;
  endDate: string;
}

export default function AdminCompetitionPage() {
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<{
    id: string;
    title: string;
  }>({ id: "", title: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lomba-backend.vercel.app/admin/competition",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Gagal memuat data lomba");
        const data = await response.json();
        setCompetition(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://lomba-backend.vercel.app/admin/competition/${selectedCompetition.id}/delete`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Gagal menghapus lomba");

      // Update state competition dengan menghapus data yang dihapus
      setCompetition((prevCompetition) =>
        prevCompetition.filter((comp) => comp.id !== selectedCompetition.id)
      );

      setAlertOpen(false);
      setSelectedCompetition({ id: "", title: "" });
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handlerCancel = () => {
    setAlertOpen(false);
    setSelectedCompetition({ id: "", title: "" });
  };

  return (
    <div className="flex min-h-screen bg-[#F1F2F6] w-full">
      <NavbarLogin
        isAdmin={true}
        onClick={() => setIsOpen(!isOpen)}
      ></NavbarLogin>
      <div className="min-h-screen w-full flex pt-24 flex-col justify-start items-start gap-4 px-4">
        {/* INFORMASI LOMBA */}
        <div className="w-full flex flex-col justify-start items-start gap-4 ">
          <div className="flex flex-col justify-start items-start gap-1 w-full">
            <h1 className="font-poppinsBold text-base text-normalText">
              Informasi Lomba
            </h1>
            <p className="font-poppinsMedium text-xs text-normalText opacity-80">
              Informasi lomba Primakara University
            </p>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div className="w-full flex flex-col justify-start items-start gap-1 p-4 bg-white rounded-lg">
              <p className="font-poppinsMedium text-xs text-normalText opacity-80">
                Lomba yang tersedia
              </p>
              <p className="font-poppinsSemiBold text-base text-normalText">
                {competition.length || 0}
              </p>
            </div>
            <Button
              style={{ marginTop: 0 }}
              className="text-sm flex justify-center items-center gap-2 py-3"
              onClick={() => {
                router.push("/admin/competition/create");
              }}
            >
              <div className="w-3 aspect-square overflow-hidden flex justify-center items-center gap-2">
                <Image
                  src="/imgs/admin/addition.svg"
                  alt="plus"
                  width={20}
                  height={20}
                />
              </div>
              Tambah Lomba
            </Button>
          </div>
        </div>
        {/* DATA LOMBA */}
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <div className="w-full flex flex-col justify-start items-start gap-1 mb-2">
            <p className="font-poppinsSemiBold text-base text-normalText">
              Lomba yang tersedia
            </p>
          </div>
          {isLoading ? (
            <CompetitionCardAdmin
              id="1"
              title="Nama Lomba"
              description="Deskripsi lomba user"
              urlPoster="/imgs/competition/default-poster.svg"
              category="Nasional"
              type="Tim"
              endDate="31 Desember"
            />
          ) : error ? (
            <p className="font-poppinsMedium text-xs text-normalText opacity-80">
              Gagal memuat data lomba, mohon refresh halaman
            </p>
          ) : (
            competition.map((card, index: number) => {
              return (
                <CompetitionCardAdmin
                  key={card.id + index}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  urlPoster={card.imagePoster}
                  category={card.category}
                  type={card.type}
                  endDate={new Date(card.endDate).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                  })}
                  onClick={() => {
                    setAlertOpen(true);
                    setSelectedCompetition({ id: card.id, title: card.title });
                  }}
                />
              );
            })
          )}
        </div>
      </div>
      <Alert
        description={`Apakah anda yakin menonaktifkan kompetisi "${selectedCompetition.title}"?`}
        onConfirm={handleDelete}
        onReject={handlerCancel}
        isOpen={alertOpen}
      >
        Nonaktifkan Kompetisi?
      </Alert>
      <SideBar
        isAdmin={true}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      ></SideBar>
    </div>
  );
}
