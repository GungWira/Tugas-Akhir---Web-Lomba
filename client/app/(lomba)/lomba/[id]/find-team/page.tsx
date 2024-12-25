"use client";

import Button from "@/components/Button";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";

export default function FindTeam({
  params,
}: {
  params: Promise<{ id: string; namaLomba: string }>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [namaLomba, setNamaLomba] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    namaTim: "",
    namaKetua: user?.name || "Collecting Account Name...",
    nimKetua: user?.nim || "Collecting Account NIM...",
    deskripsi: "",
    sisaSlot: "",
    tanggalTerakhir: "",
  });

  // Fetch `slug` dan `namaLomba` dari parameter URL
  useEffect(() => {
    const fetchParams = async () => {
      const data = await params;
      setSlug(data.id);
      setNamaLomba(data.namaLomba);
    };
    fetchParams();
  }, [params]);

  // Update formData saat user diubah
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        namaKetua: user.name || "Collecting Account Name...",
        nimKetua: user.nim || "Collecting Account NIM...",
      }));
    }
  }, [user]);

  // Handle perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { namaTim, deskripsi, sisaSlot, tanggalTerakhir } = formData;

    // Validasi input
    if (!namaTim || !deskripsi || !sisaSlot || !tanggalTerakhir) {
      setError("Harap isi semua field yang wajib diisi!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const postData = {
      name: namaTim,
      leaderId: user?.id || "unknown_leader_id",
      members: [],
      description: deskripsi,
      openSlots: parseInt(sisaSlot),
      endDate: new Date(tanggalTerakhir).toISOString(),
    };

    try {
      if (slug) {
        const response = await fetch(
          `https://lomba-backend.vercel.app/competitions/${slug}/team`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );

        console.log(postData);

        if (!response.ok) {
          const error = await response.json();
          setError(`Gagal mengirim data: ${error.message}`);
          return;
        }

        setSuccess("Data berhasil dikirim!");
        setFormData({
          namaTim: "",
          namaKetua: user?.name || "",
          nimKetua: user?.nim || "",
          deskripsi: "",
          sisaSlot: "",
          tanggalTerakhir: "",
        });
        router.push(`/lomba/${slug}`);
      } // Redirect ke halaman lomba
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Terjadi kesalahan, silakan coba lagi.");
      } else {
        setError("Terjadi kesalahan pada server, coba beberapa saat lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-start items-start w-full min-h-screen overflow-hidden">
      <NavbarBackTitled>Cari Anggota Tim</NavbarBackTitled>

      <div className="flex flex-col justify-start items-start p-6 py-8 gap-2 mt-24 w-full bg-[#F1F2F6] min-h-screen rounded-3xl z-50">
        {error ? (
          <p className="text-red-600 font-poppinsRegular text-sm">*{error}</p>
        ) : (
          ""
        )}
        {success ? (
          <p className="text-green-600 font-poppinsRegular text-sm">
            *{success}
          </p>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Nama Lomba */}
          <div className="mb-4">
            <label
              htmlFor="namaLomba"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Nama Lomba
            </label>
            <input
              type="text"
              id="namaLomba"
              name="namaLomba"
              value={namaLomba ? namaLomba : "-"}
              disabled
              className="mt-1 block w-full px-3 py-2 bg-white rounded-md font-poppinsRegular text-base text-[#A6A6A6]"
            />
          </div>
          {/* Nama Tim */}
          <div className="mb-4">
            <label
              htmlFor="namaTim"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Nama Tim
            </label>
            <input
              type="text"
              id="namaTim"
              name="namaTim"
              value={formData.namaTim}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Nama Ketua */}
          <div className="mb-4">
            <label
              htmlFor="namaKetua"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Nama Ketua
            </label>
            <input
              type="text"
              id="namaKetua"
              name="namaKetua"
              value={formData.namaKetua}
              disabled
              className="mt-1 block w-full px-3 py-2 bg-white rounded-md font-poppinsRegular text-base text-[#A6A6A6]"
            />
          </div>

          {/* NIM Ketua */}
          <div className="mb-4">
            <label
              htmlFor="nimKetua"
              className="block text-base font-poppinsMedium text-normalText"
            >
              NIM Ketua
            </label>
            <input
              type="text"
              id="nimKetua"
              name="nimKetua"
              value={formData.nimKetua}
              disabled
              className="mt-1 block w-full px-3 py-2 bg-white rounded-md font-poppinsRegular text-base text-[#A6A6A6]"
            />
          </div>

          {/* Deskripsi */}
          <div className="mb-4">
            <label
              htmlFor="deskripsi"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              maxLength={300}
              required
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.deskripsi.length}/300 karakter
            </p>
          </div>

          {/* Sisa Slot Anggota */}
          <div className="mb-4">
            <label
              htmlFor="sisaSlot"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Sisa Slot Anggota
            </label>
            <input
              type="number"
              id="sisaSlot"
              name="sisaSlot"
              value={formData.sisaSlot}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Tanggal Terakhir */}
          <div className="mb-6">
            <label
              htmlFor="tanggalTerakhir"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Tanggal Terakhir
            </label>
            <input
              type="date"
              id="tanggalTerakhir"
              name="tanggalTerakhir"
              value={formData.tanggalTerakhir}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Tombol Submit */}
          <Button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg text-white ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blueSe"
            } transition`}
            isDisabled={isLoading}
          >
            {isLoading ? "Mengirim..." : "Kirim"}
          </Button>
        </form>
      </div>
    </div>
  );
}
