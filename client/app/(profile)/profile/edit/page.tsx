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

export default function EditProfile() {
  const { user } = useUser();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith("image/")) {
        setError("File yang diunggah harus berupa gambar.");
        return;
      }
      setSelectedImage(file);
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

  useEffect(() => {
    // Tambahkan initial values dari user data
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setMajor(user.major || "");
      setLoading(false);
    }
  }, [user]);

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Validasi input
      if (!firstName || !lastName || !major || !password) {
        throw new Error("Semua field harus diisi");
      }

      // Implementasi logic update profile
      const formData = new FormData();
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("major", major);
      formData.append("password", password);

      // Tambahkan API call untuk update profile
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal mengupdate profil");
      }

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
                accept="image/*"
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
                htmlFor="firstName"
                className="font-poppinsMedium text-normalText text-base"
              >
                Nama Depan
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white p-3 rounded-lg text-sm font-poppinsRegular text-normalText"
                placeholder="Nama Depan"
              />
            </div>
            {/* LAST NAME */}
            <div className="flex flex-col w-full justify-start items-start gap-2">
              <label
                htmlFor="lastName"
                className="font-poppinsMedium text-normalText text-base"
              >
                Nama Belakang
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                value={major}
                onChange={(e) => setMajor(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white p-3 rounded-lg text-sm font-poppinsRegular text-normalText"
                placeholder="Konfirmasi Password"
              />
            </div>
            <Button type="submit" isDisabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
