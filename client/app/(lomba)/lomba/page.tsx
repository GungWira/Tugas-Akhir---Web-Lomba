"use client";

import NavbarBackTitled from "@/components/NavbarBackTitled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import CompetitionCard from "@/components/CompetitionCard";
import Footer from "@/components/Footer";

interface Card {
  id: string;
  title: string;
  imagePoster: string;
  category: string;
  type: string;
  date: string;
  description: string;
  endDate: Date;
}

export default function Lomba() {
  const router = useRouter();
  const [isTim, setIsTim] = useState<boolean | null>(null);
  const [competitionCards, setCompetitionCards] = useState<Card[]>([]);
  const [selectedOption, setSelectedOption] = useState("semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const currentDate = new Date();
    const fetchData = async () => {
      try {
        const responseCompetition = await fetch(
          "https://lomba-backend.vercel.app/competitions",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!responseCompetition.ok) {
          setCompetitionCards([]);
          throw new Error("Failed to fetch lomba cards");
        }
        const dataCompetition = await responseCompetition.json();
        const filteredCompetitions = dataCompetition.filter(
          (competition: Card) => {
            const endDate = new Date(competition.endDate);
            return endDate > currentDate;
          }
        );
        if (filteredCompetitions.length == 0) {
          router.push("/");
          return;
        }
        setCompetitionCards(filteredCompetitions);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan, mohon coba lagi nanti");
        }
      }
    };
    fetchData();
  }, []);

  const handleLomba = (id: string) => {
    router.push(`lomba/${id}`);
  };

  // Filter competitions based on user selection (mobile or desktop)
  const filteredCompetitions = competitionCards.filter((card) => {
    if (selectedOption === "semua") return true;
    return selectedOption === "individu"
      ? card.type === "Individu"
      : card.type === "Team";
  });

  if (error) return router.push("/");

  return (
    <div className="relative flex flex-col min-h-[100vh] justify-start items-center w-full">
      <NavbarBackTitled>Competition</NavbarBackTitled>

      <div className="flex flex-col justify-start items-start py-12 pt-0 gap-2 mt-24 w-full px-4 max-w-6xl">
        {/* TITLE */}
        <div className="flex flex-row justify-between items-center gap-4 w-full">
          <div className="flex flex-col justify-start items-start gap-1 mb-4">
            <p className="text-base font-poppinsSemiBold md:text-xl">
              Semua Lomba
            </p>
            <p className="text-xs font-poppinsRegular md:text-sm">
              Temukan berbagai kompetisi menarik disini!
            </p>
          </div>
          {/* SELECT OPTION SEMUA, INDIVIDU, TEAM */}
          <div className="hidden sm:flex">
            <select
              value={selectedOption}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedOption(value);
                setIsTim(value === "team"); // Sinkronkan state isTim
              }}
              className="px-6 py-2 border rounded-xl text-sm md:text-base font-poppinsRegular outline-none"
            >
              <option value="semua">Semua</option>
              <option value="individu">Individu</option>
              <option value="team">Team</option>
            </select>
          </div>
        </div>

        {/* KATEGORI MOBILE */}
        <div className="flex flex-row p-1 rounded-full bg-white w-full justify-between items-center sm:hidden">
          <button
            type="button"
            className={`w-1/2 py-2 rounded-full text-sm font-poppinsMedium ${
              isTim === false
                ? "bg-blueSec text-white"
                : "bg-transparent text-normalText opacity-60"
            }`}
            onClick={() => {
              setIsTim(false);
              setSelectedOption("individu");
            }}
          >
            Individu
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 rounded-full text-sm font-poppinsMedium ${
              isTim === true
                ? "bg-blueSec text-white"
                : "bg-transparent text-normalText opacity-60"
            }`}
            onClick={() => {
              setIsTim(true);
              setSelectedOption("team");
            }}
          >
            Team
          </button>
        </div>

        {/* CARD */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-start items-start gap-4 min-h-[70vh]">
          {(loading ? Array.from({ length: 6 }) : filteredCompetitions).map(
            (card, index) => {
              if (loading) {
                // Skeleton card
                return (
                  <div
                    key={index}
                    className="card w-full rounded-xl overflow-hidden flex flex-col bg-white"
                  >
                    <div className="w-full relative overflow-hidden rounded-lg aspect-video flex justify-center items-center">
                      <Image
                        src="/imgs/competition/default-poster.svg"
                        alt="Image Poster"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <div className="detail w-full px-4 py-5 gap-2 justify-start items-start">
                      <div className="text-base font-poppinsMedium w-3/5 bg-[#F1F2F6] text-[#F1F2F6]">
                        Title
                      </div>
                      <div className="text-sm font-poppinsRegular mt-2 w-full text-[#F1F2F6] bg-[#F1F2F6] h-24">
                        Description
                      </div>
                    </div>
                  </div>
                );
              }

              // Gunakan as Card untuk mengatasi 'card' sebagai unknown
              const competition = card as Card;

              return (
                <CompetitionCard
                  key={competition.id}
                  id={competition.id}
                  title={competition.title}
                  description={competition.description}
                  urlPoster={competition.imagePoster}
                  category={competition.category}
                  type={competition.type}
                  endDate={formatDate(competition.endDate)}
                  onClick={() => handleLomba(competition.id)}
                  style={
                    selectedOption === "semua"
                      ? "flex"
                      : selectedOption === "individu"
                      ? competition.type === "Individu"
                        ? "flex"
                        : "hidden"
                      : competition.type === "Team"
                      ? "flex"
                      : "hidden"
                  }
                />
              );
            }
          )}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
