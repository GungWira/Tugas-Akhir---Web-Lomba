"use client";

import Button from "@/components/Button";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";

export default function FindTeam() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { user } = useUser();

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
    type: "Team",
    description: "",
    level: "Provinsi",
    endDate: "",
    linkPendaftaran: "",
    linkGuidebook: "",
    poster: null as File | null,
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

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      title,
      category,
      type,
      description,
      level,
      endDate,
      linkPendaftaran,
      linkGuidebook,
      poster,
    } = formData;

    // Validasi input termasuk poster
    if (
      !title ||
      !category ||
      !type ||
      !description ||
      !level ||
      !endDate ||
      !linkPendaftaran ||
      !linkGuidebook ||
      !poster
    ) {
      setError("Harap isi semua field yang wajib diisi!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Buat FormData object
    const formDataObj = new FormData();
    formDataObj.append("title", title);
    formDataObj.append("category", category);
    formDataObj.append("type", type);
    formDataObj.append("description", description);
    formDataObj.append("level", level);
    formDataObj.append("startDate", new Date().toISOString());
    formDataObj.append("endDate", new Date(endDate).toISOString());
    formDataObj.append("linkPendaftaran", linkPendaftaran);
    formDataObj.append("linkGuidebook", linkGuidebook);
    formDataObj.append("poster", poster);

    try {
      const response = await fetch(
        `https://lomba-backend.vercel.app/admin/competition/create`,
        {
          method: "POST",
          body: formDataObj,
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        setError(`Gagal mengirim data: ${error.message}`);
        return;
      }

      setSuccess("Data berhasil dikirim!");
      setFormData({
        title: "",
        category: "",
        type: "Team",
        description: "",
        level: "Provinsi",
        endDate: "",
        linkPendaftaran: "",
        linkGuidebook: "",
        poster: null,
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
      <NavbarBackTitled>Publish Lomba</NavbarBackTitled>

      <div className="flex flex-col justify-start items-start p-6 py-8 gap-2 mt-24 w-full bg-[white] min-h-screen md:min-h-0 md:bg-white rounded-3xl z-50 max-w-6xl">
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
              id="title"
              name="title"
              placeholder="Nama Lomba"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Kategori Lomba */}
          <div className="mb-4">
            <label
              htmlFor="kategoriLomba"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Kategori Lomba
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Kategori Lomba"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Tipe Lomba */}
          <div className="mb-4">
            <label
              htmlFor="tipeLomba"
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
              htmlFor="deskripsi"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              name="description"
              placeholder="Deskripsi"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 rounded-md font-poppinsRegular text-base bg-[#F1F2F6] text-normalText focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={8}
              required
            />
          </div>

          {/* Tanggal Terakhir */}
          <div className="mb-4">
            <label
              htmlFor="tanggalTerakhir"
              className="block text-base font-poppinsMedium text-normalText"
            >
              Tanggal Terakhir
            </label>
            <input
              type="date"
              id="endDate"
              placeholder="Tanggal Terakhir"
              name="endDate"
              value={formData.endDate}
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
                required
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
            {formData.poster && (
              <div className="mt-2 w-full max-w-sm flex justify-center items-center">
                <Image
                  src={URL.createObjectURL(formData.poster)}
                  alt="Preview poster"
                  className="w-full h-auto rounded-md"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>

          {/* Tombol Submit */}
          <Button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg text-white ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blueSe"
            } transition`}
            isDisabled={isLoading}
          >
            {isLoading ? "Memuat Data..." : "Publish Lomba"}
          </Button>
        </form>
      </div>
    </div>
  );
}
