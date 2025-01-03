"use client";
import NavbarBackTitledDark from "@/components/NavbarBackTitledDark";
import Image from "next/image";

import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import Button from "@/components/Button";

interface Major {
  major: string;
  id: string;
}

// Tambahkan interface untuk form data
interface FormData {
  id: string;
  firstname: string;
  lastname: string;
  major: string;
  password: string;
  profile: File | null;
}

export default function EditProfile() {
  const { user, update } = useUser();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Tambahkan state untuk form
  const [formData, setFormData] = useState<FormData>({
    id: "",
    firstname: "",
    lastname: "",
    major: "",
    password: "",
    profile: null,
  });

  // Handler untuk perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update handler profile upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith("profile/")) {
        setError("File yang diunggah harus berupa gambar.");
        return;
      }
      setSelectedImage(file);
      setFormData((prev) => ({
        ...prev,
        profile: file,
      }));
      setError(null);
    }
  };

  useEffect(() => {
    async function fetchMajor() {
      try {
        const response = await fetch("https://lomba-backend.vercel.app/major");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setMajorList(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan yang tidak diketahui");
        }
      }
    }
    fetchMajor();
  }, []);

  useEffect(() => {
    // Mendeteksi ukuran layar md (768px)
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        router.push("/profile");
      }
    };

    // Cek ukuran layar saat komponen dimount
    handleResize();

    // Tambahkan event listener untuk perubahan ukuran layar
    window.addEventListener("resize", handleResize);

    // Cleanup event listener saat komponen unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  // Update useEffect untuk initial values
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || "",
        firstname: user.firstName || "",
        lastname: user.lastName || "",
        major: user.major || "",
        password: "",
        profile: null,
      });
      setLoading(false);
    }
  }, [user]);

  // Update handler submit
  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (
        !formData.id ||
        !formData.firstname ||
        !formData.lastname ||
        !formData.major ||
        !formData.password
      ) {
        throw new Error("Semua field harus diisi");
      }

      // Kirim data ke context update
      await update({
        id: formData.id,
        firstname: formData.firstname,
        lastname: formData.lastname,
        major: formData.major,
        password: formData.password,
        profile: formData.profile,
      });

      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative bg-blueFade min-h-screen">
      <NavbarBackTitledDark className="pb-6">Edit Profil</NavbarBackTitledDark>
      <div className="flex pt-24 min-h-screen">
        <div
          className="bg-[#F1F2F6] w-full min-h-full rounded-3xl p-6 flex flex-col gap-3"
          style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
        >
          <form
            method="POST"
            action=""
            onSubmit={handlerSubmit}
            className="flex flex-col justify-center items-center gap-4"
          >
            {error && (
              <div className="w-full p-3 bg-red-100 text-red-600 rounded-lg">
                {error}
              </div>
            )}
            {/* PROFILE */}
            <div className="relative overflow-hidden">
              <div className="w-36 h-36 object-cover border rounded-full overflow-hidden">
                <Image
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : `/imgs/create-account-imgs/default-img.svg`
                  }
                  alt="Image Profile Preview"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <input
                type="file"
                accept="profile/*"
                onChange={handleImageUpload}
                name="img"
                id="img"
                className="absolute top-0 left-0 h-full opacity-0 cursor-pointer"
              />
              <div className="absolute bottom-0 right-0 w-[48px] overflow-hidden">
                <Image
                  src={`/imgs/create-account-imgs/img.svg`}
                  alt="Image Profile Preview Icon"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
            </div>
            {/* FIRST NAME */}
            <div className="flex flex-col w-full justify-start items-start gap-2">
              <label
                htmlFor="firstname"
                className="font-poppinsMedium text-normalText text-base"
              >
                Nama Depan
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full bg-white p-3 rounded-lg text-sm font-poppinsRegular text-normalText"
                placeholder="Nama Depan"
              />
            </div>
            {/* LAST NAME */}
            <div className="flex flex-col w-full justify-start items-start gap-2">
              <label
                htmlFor="lastname"
                className="font-poppinsMedium text-normalText text-base"
              >
                Nama Belakang
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full bg-white p-3 rounded-lg text-sm font-poppinsRegular text-normalText"
                placeholder="Nama Belakang"
              />
            </div>
            {/* JURUSAN */}
            <div className="flex flex-col w-full justify-start items-start gap-2">
              <label
                htmlFor="major"
                className="font-poppinsMedium text-normalText text-base"
              >
                Jurusan
              </label>
              <select
                name="major"
                id="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full bg-white p-3 rounded-lg text-sm font-poppinsRegular text-normalText"
                required
              >
                <option value="" disabled>
                  Pilih Jurusan
                </option>
                {majorList.map((item: Major, index) => (
                  <option value={item.major} key={index}>
                    {item.major}
                  </option>
                ))}
              </select>
            </div>
            {/* PASSWORD */}
            <div className="flex flex-col w-full justify-start items-start gap-2">
              <label
                htmlFor="password"
                className="font-poppinsMedium text-normalText text-base"
              >
                Konfirmasi Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white p-3 rounded-lg text-sm font-poppinsRegular text-normalText"
                placeholder="Konfirmasi Password"
              />
            </div>
            <Button
              type="submit"
              isDisabled={loading}
              className={`${loading ? "opacity-70" : ""}`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  <span>Menyimpan...</span>
                </div>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
