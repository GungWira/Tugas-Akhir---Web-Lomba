"use client";

import Button from "@/components/Button";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";

// Tambahkan interface
interface Competition {
  title: string;
  category: string;
  type: string;
  level: string;
  description: string;
  endDate: string;
  linkPendaftaran: string;
  linkGuidebook: string;
  poster?: string;
  imagePoster: string;
}

export default function EditCompetition() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { user } = useUser();
  const params = useParams();
  const competitionId = params.id;

  useEffect(() => {
    if (user) {
      if (user.role !== "ADMIN") {
        router.push("/login");
      }
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    level: "",
    description: "",
    endDate: "",
    linkPendaftaran: "",
    linkGuidebook: "",
    poster: null as File | null,
    imagePoster: "",
  });

  // Handle perubahan input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Tambahkan useEffect untuk fetch data
  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://lomba-backend.vercel.app/admin/competition/${competitionId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data lomba");
        }

        const data: Competition = await response.json();

        // Set form data dengan data yang diambil
        setFormData({
          title: data.title,
          category: data.category,
          type: data.type,
          level: data.level,
          description: data.description,
          endDate: data.endDate,
          linkPendaftaran: data.linkPendaftaran,
          linkGuidebook: data.linkGuidebook,
          poster: null, // Poster perlu penanganan khusus karena berbentuk File
          imagePoster: data.imagePoster,
        });
      } catch {
        setError("Gagal mengambil data lomba");
      } finally {
        setIsLoading(false);
      }
    };

    if (competitionId) {
      fetchCompetitionData();
    }
  }, [competitionId]);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      title,
      category,
      type,
      level,
      description,
      endDate,
      linkPendaftaran,
      linkGuidebook,
      poster,
    } = formData;

    // Validasi input
    if (
      !title ||
      !category ||
      !type ||
      !level ||
      !description ||
      !endDate ||
      !linkPendaftaran ||
      !linkGuidebook
    ) {
      setError("Harap isi semua field yang wajib diisi!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formDataFix = new FormData();
    formDataFix.append("title", title);
    formDataFix.append("category", category);
    formDataFix.append("type", type);
    formDataFix.append("level", level);
    formDataFix.append("description", description);
    formDataFix.append("endDate", endDate);
    formDataFix.append("linkPendaftaran", linkPendaftaran);
    formDataFix.append("linkGuidebook", linkGuidebook);

    if (poster) {
      formDataFix.append("poster", poster);
    }

    try {
      const response = await fetch(
        `https://lomba-backend.vercel.app/admin/competition/${competitionId}/edit`,
        {
          method: "PATCH",
          credentials: "include",
          body: formDataFix,
        }
      );

      if (!response.ok) {
        setError(`Gagal mengirim data, mohon coba beberapa saat lagi`);
        return;
      }

      setSuccess("Data berhasil dikirim!");
      setFormData({
        title: "",
        category: "",
        type: "",
        level: "",
        description: "",
        endDate: "",
        linkPendaftaran: "",
        linkGuidebook: "",
        poster: null,
        imagePoster: "",
      });
      router.push(`/admin/competition`);
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
    <div className="relative flex flex-col justify-start items-center w-full min-h-screen md:min-h-0 overflow-hidden">
      <NavbarBackTitled>Edit Lomba</NavbarBackTitled>

      <div className="flex flex-col justify-start items-start p-6 py-8 gap-2 mt-24 w-full bg-[white] min-h-screen md:min-h-0 md:bg-white rounded-3xl z-50">
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
              htmlFor="title"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Nama Lomba
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Nama Lomba"
              value={formData.title || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Kategori Lomba */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Kategori Lomba
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Kategori Lomba"
              value={formData.category || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Tipe Lomba */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Tipe Lomba
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Team">Team</option>
              <option value="Individu">Individu</option>
            </select>
          </div>

          {/* Level Lomba */}
          <div className="mb-4">
            <label
              htmlFor="level"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Level Lomba
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Provinsi">Provinsi</option>
              <option value="Nasional">Nasional</option>
              <option value="Internasional">Internasional</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Deskripsi"
              value={formData.description || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={8}
              required
            />
          </div>

          {/* Tanggal Terakhir */}
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Tanggal Terakhir
            </label>
            <input
              type="date"
              id="endDate"
              placeholder="Tanggal Terakhir"
              name="endDate"
              value={
                formData.endDate
                  ? new Date(formData.endDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Link Pendaftaran */}
          <div className="mb-4">
            <label
              htmlFor="linkPendaftaran"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Link Pendaftaran
            </label>
            <input
              type="url"
              id="linkPendaftaran"
              name="linkPendaftaran"
              placeholder="Link Pendaftaran"
              value={formData.linkPendaftaran}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Link Guidebook */}
          <div className="mb-6">
            <label
              htmlFor="linkGuidebook"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Link Guidebook
            </label>
            <input
              type="url"
              id="linkGuidebook"
              name="linkGuidebook"
              placeholder="Link Guidebook"
              value={formData.linkGuidebook}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Upload Poster */}
          <div className="mb-4 w-full">
            <label
              htmlFor="poster"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Poster Lomba
            </label>
            <div className="w-full relative h-auto">
              <input
                type="file"
                id="poster"
                name="poster"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({
                      ...prev,
                      poster: file,
                    }));
                  }
                }}
                className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular relative z-10 opacity-0 text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="w-full h-full absolute top-0 left-0 bg-[#F1F2F6] rounded-md flex justify-center items-center gap-2">
                <div className="w-4 aspect-square overflow-hidden flex justify-center items-start">
                  <Image
                    src="/imgs/admin/upload.svg"
                    alt="Upload"
                    width={16}
                    height={16}
                  />
                </div>
                <p className="text-center text-sm font-poppinsRegular opacity-70 text-normalText">
                  {formData.poster ? "File Uploaded" : "Upload Poster"}
                </p>
              </div>
            </div>
            <div className="mt-2 w-full max-w-sm flex justify-center items-center">
              <Image
                src={
                  formData.poster
                    ? URL.createObjectURL(formData.poster)
                    : formData.imagePoster ||
                      "/imgs/competition/default-poster.svg"
                }
                alt="Preview poster"
                className="w-full h-auto rounded-md"
                width={100}
                height={100}
              />
            </div>
          </div>

          {/* Tombol Submit */}
          <Button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg text-white ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blueSe"
            } transition`}
            isDisabled={isLoading}
          >
            {isLoading ? "Loading Data..." : "Update Lomba"}
          </Button>
        </form>
      </div>
    </div>
  );
}
