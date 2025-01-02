"use client";

import Button from "@/components/Button";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import Image from "next/image";
import { useEffect, useState } from "react";
import bankList from "@/utils/bank-list/bank.json";
import { useUser } from "@/contexts/UserContext";

export default function Reimburse({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [recipientName, setRecipientName] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");

  useEffect(() => {
    const getSlug = async () => {
      const data = (await params).id;
      setSlug(data);
    };
    getSlug();
  }, [params]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const maxSize = 1 * 1024 * 1024; // 1MB
      if (file.size <= maxSize) {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file)); // Create temporary URL for preview
        return;
      } else {
        setError("Ukuran file tidak boleh lebih dari 1MB!");
      }
    } else {
      setError("Hanya file gambar yang diperbolehkan!");
    }
  };

  // Handle form submission
  const handleUpload = async () => {
    if (!recipientName || !selectedBank || !accountNumber) {
      setError("Semua field wajib diisi!");
      return;
    }

    if (!selectedImage) {
      setError("Silahkah upload gambar terlebih dahulu");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    if (user && user.id) {
      console.log(recipientName);
      formData.append("userId", user.id);
      formData.append("image", selectedImage);
      formData.append("name", recipientName);
      formData.append("bank", selectedBank);
      formData.append("cardnumber", accountNumber);
    }

    try {
      const response = await fetch(
        `https://lomba-backend.vercel.app/competitions/${slug}/reimburse`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        setError("Gagal menggunggah data");
        throw new Error("Gagal menggunggah data!");
      }

      setSelectedImage(null);
      setPreviewUrl(null);
      setRecipientName("");
      setSelectedBank("");
      setAccountNumber("");
      setSuccess("Data berhasil diunggah!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Terjadi error yang tidak diketahui");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-[100vh] justify-start items-center w-full max-h-screen sm:max-h-none sm:overflow-scroll md:min-h-0 overflow-hidden">
      <NavbarBackTitled>Ajukan Reiumburse</NavbarBackTitled>

      <div className="flex flex-col justify-start items-start p-6 py-8 gap-2 mt-24 w-full bg-[#F1F2F6] min-h-screen md:min-h-0 rounded-3xl z-50 max-w-5xl md:bg-white">
        <div className="w-full">
          <label className="text-normalText font-poppinsSemiBold text-md">
            Nama Penerima
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blueSec focus:border-blueSec font-poppinsRegular"
            placeholder="Masukkan nama penerima"
          />
        </div>

        <div className="w-full mt-1">
          <label className="text-normalText font-poppinsSemiBold text-md">
            Bank
          </label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blueSec focus:border-blueSec font-poppinsRegular"
          >
            <option value="">Pilih Bank</option>
            {bankList.map((bank) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mt-1">
          <label className="text-normalText font-poppinsSemiBold text-md">
            Nomor Rekening
          </label>
          <input
            type="number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blueSec focus:border-blueSec font-poppinsRegular"
            placeholder="Masukkan nomor rekening"
          />
        </div>

        <div className="w-full mt-1">
          <label
            htmlFor="file-upload"
            className="text-normalText font-poppinsSemiBold text-md"
          >
            Bukti Pembayaran
          </label>
          {error ? (
            <p className="text-red-500 font-poppinsRegular text-sm my-1">
              *{error}
            </p>
          ) : (
            ""
          )}
          {success ? (
            <p className="text-green-600 font-poppinsRegular text-sm my-1">
              *{success}
            </p>
          ) : (
            ""
          )}
          <label
            htmlFor="file-upload"
            className="aspect-video md:aspect-auto md:h-72 overflow-hidden w-full mt-2 bg-white border-2 border-dashed border-[#DDDDDD] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
          >
            {!previewUrl ? (
              <>
                <Image
                  src="/imgs/competition/upload.svg"
                  alt="Upload Icon"
                  width={24}
                  height={24}
                />
                <p className="mt-2 text-sm font-poppinsRegular text-gray-500">
                  Upload File
                </p>
              </>
            ) : (
              <div className="w-full">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="fixed bottom-4 left-0 p-6 w-full sm:relative sm:mt-8 sm:p-0 sm:bottom-0">
          <Button
            onClick={handleUpload}
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
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
