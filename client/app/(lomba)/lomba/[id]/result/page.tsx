"use client";

import Button from "@/components/Button";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";

export default function CompetitionForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [participantsFile, setParticipantsFile] = useState<File | null>(null);

  useEffect(() => {
    const getSlug = async () => {
      const data = (await params).id;
      setSlug(data);
    };
    getSlug();
  }, [params]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
    } else {
      setError("Hanya file PDF yang diperbolehkan!");
    }
  };

  const handleSubmit = async () => {
    if (!result || !proofFile || !participantsFile) {
      setError("Semua field wajib diisi!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    if (user && user.id) {
      formData.append("userId", user.id);
      formData.append("result", result);
      formData.append("evidence", participantsFile);
      formData.append("certificate", proofFile);
    }

    try {
      const response = await fetch(
        `https://lomba-backend.vercel.app/competitions/${slug}/upload-result`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        setError("Gagal mengirim data");
        throw new Error("Gagal mengirim data!");
      }

      setProofFile(null);
      setParticipantsFile(null);
      setResult("");
      setSuccess("Data berhasil dikirim!");
    } catch (err: unknown) {
      console.error(
        err instanceof Error
          ? err.message
          : "Terjadi error yang tidak diketahui"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-[100vh] justify-start items-center w-full max-h-screen overflow-hidden max-w-5xl sm:max-h-none md:min-h-0">
      <NavbarBackTitled>Hasil Perlombaan</NavbarBackTitled>

      <div className="flex flex-col justify-start items-start p-6 py-8 gap-2 mt-24 w-full bg-[#F1F2F6] min-h-screen rounded-3xl z-50 md:bg-white md:min-h-0">
        <div className="w-full mt-2">
          <label className="text-normalText font-poppinsSemiBold text-md">
            Hasil Perlombaan
          </label>
          <select
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blueSec font-poppinsRegular"
          >
            <option value="">Pilih Hasil</option>
            <option value="Juara 1">Juara 1</option>
            <option value="Juara 2">Juara 2</option>
            <option value="Juara 3">Juara 3</option>
            <option value="Finalis">Finalis</option>
            <option value="Peserta">Peserta</option>
          </select>
        </div>

        <div className="w-full mt-2">
          <label className="text-normalText font-poppinsSemiBold text-md">
            Bukti Hasil (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, setProofFile)}
            className="w-full mt-2 p-3 border rounded-lg outline-none font-poppinsRegular bg-white"
          />
        </div>

        <div className="w-full mt-2">
          <label className="text-normalText font-poppinsSemiBold text-md">
            Daftar Peserta (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, setParticipantsFile)}
            className="w-full mt-2 p-3 border rounded-lg outline-none font-poppinsRegular bg-white"
          />
        </div>

        {error && (
          <p className="text-red-500 font-poppinsRegular text-sm my-1">
            *{error}
          </p>
        )}
        {success && (
          <p className="text-green-600 font-poppinsRegular text-sm my-1">
            *{success}
          </p>
        )}

        <div className="fixed bottom-4 left-0 p-6 w-full md:p-0 md:bottom-0 md:relative">
          <Button
            onClick={handleSubmit}
            className={`${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blueSec"
            }`}
            isDisabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2 w-full justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Mengunggah...
              </div>
            ) : (
              "Kirim"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
