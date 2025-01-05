"use client";

import NavbarBack from "@/components/NavbarBack";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateProfile() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const nim = localStorage.getItem("nim");
    const token = localStorage.getItem("token");
    console.log(token);

    if (!nim || !token) {
      router.push("/");
    } else {
      const decodedToken = atob(token);
      if (!decodedToken.includes("LolosOtpSAW")) {
        router.push("/");
      }
    }
  }, [router]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith("image/")) {
        setError("File yang diunggah harus berupa gambar.");
        return;
      }

      // Pemeriksaan ukuran file (3MB = 3 * 1024 * 1024 bytes)
      const maxSize = 3 * 1024 * 1024; // 3MB dalam bytes
      if (file.size > maxSize) {
        setError("Ukuran file tidak boleh lebih dari 3MB.");
        return;
      }

      setSelectedImage(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!firstName) {
      setError("Nama depan tidak boleh kosong.");
      setIsLoading(false);
      return;
    }

    if (!lastName) {
      setError("Nama belakang tidak boleh kosong.");
      setIsLoading(false);
      return;
    }

    if (!gender) {
      setError("Silakan pilih gender Anda.");
      setIsLoading(false);
      return;
    }

    const nim = localStorage.getItem("nim");

    if (!nim) {
      router.push("/");
      return;
    }

    try {
      // Membuat FormData untuk mengirim data
      const decodedNim = atob(nim);
      const formData = new FormData();

      // Menambahkan key profile (file) dengan content type otomatis
      if (selectedImage) {
        formData.append("profile", selectedImage);
      }

      // Menambahkan data text secara manual dengan text/plain
      formData.append("nim", decodedNim);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("gender", gender);

      // Mengirim request ke API menggunakan fetch
      const response = await fetch(
        "https://lomba-backend.vercel.app/auth/image-profile",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image profile");
      }

      const result = await response.json();
      if (!result.success) throw new Error("Failed to update profile");

      localStorage.removeItem("nim");
      localStorage.removeItem("token");
      localStorage.setItem("logedin", "true");
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setIsLoading(false);
    }
  };

  const isFormValid = firstName && lastName && gender && selectedImage;

  return (
    <div className="container relative max-w-base min-h-screen flex justify-start items-start flex-col overflow-scroll pb-0 md:flex-row md:max-w-none md:overflow-hidden">
      {/* Bagian Kiri - Desktop */}
      <div className="hidden w-full h-screen justify-center items-center md:flex md:flex-3 md:px-12 xl:px-24 md:bg-bluePrimary">
        <div className="w-full max-w-lg">
          <Image
            src="/imgs/create-account-imgs/avatar.svg"
            alt="profile hero image"
            width={1}
            height={1}
            layout="responsive"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Bagian Kanan - Form */}
      <div className="w-full flex flex-col md:flex-2 min-h-screen md:px-12 xl:px-24">
        <NavbarBack href={"/otp"} className="md:relative md:px-0" />

        <form
          onSubmit={handleSubmit}
          className="w-full flex-1 flex flex-col px-6 py-8 justify-center items-center"
        >
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="relative">
              <div className="w-40 h-40 object-cover border rounded-full overflow-hidden">
                <Image
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : `imgs/create-account-imgs/default-img.svg`
                  }
                  alt="Image Profile Preview"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                name="img"
                id="img"
                className="absolute top-0 left-0 h-full opacity-0 cursor-pointer"
              />
              <div className="absolute bottom-0 right-0 w-[48px] overflow-hidden">
                <Image
                  src={`imgs/create-account-imgs/img.svg`}
                  alt="Image Profile Preview Icon"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="text-xl font-poppinsSemiBold text-blueSec text-center">
                User Profile
              </h1>
              <p className="text-sm font-poppinsRegular text-normalText text-center">
                Atur profil dan preferensi Anda untuk pengalaman yang lebih
                personal.
              </p>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex flex-col justify-start items-start w-full gap-3">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white p-3 rounded-lg pl-10 text-sm font-poppinsRegular text-normalText"
                placeholder="Nama Depan"
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-white p-3 rounded-lg pl-10 text-sm font-poppinsRegular text-normalText"
                placeholder="Nama Belakang"
              />
              <select
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-white p-3 rounded-lg pl-10 text-sm font-poppinsRegular text-normalText"
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className={`${
              !isFormValid ? "bg-[#CBCBCB]" : "bg-blueSec"
            } relative`}
            isDisabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="inline-flex items-center">
                  Membuat Profile...
                  <svg
                    className="animate-spin ml-2 h-5 w-5 text-white opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              </>
            ) : (
              "Selesai"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
