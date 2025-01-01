"use client";

import Button from "@/components/Button";
import CompetitionCardAdmin from "@/components/CompetitionCardAdmin";
import NavbarLogin from "@/components/NavbarLogin";
import Image from "next/image";

export default function AdminCompetitionPage() {
  return (
    <div className="flex min-h-screen bg-[#F1F2F6] w-full">
      <NavbarLogin></NavbarLogin>
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
                100
              </p>
            </div>
            <Button
              style={{ marginTop: 0 }}
              className="text-sm flex justify-center items-center gap-2 py-3"
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
          <CompetitionCardAdmin
            id="1"
            title="Lomba 1"
            description="Lomba 1"
            urlPoster="/imgs/competition/default-poster.svg"
            category="Lomba 1"
            type="Lomba 1"
            endDate="2024-01-01"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
