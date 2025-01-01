"use client";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import NavbarLogin from "@/components/NavbarLogin";
import { useEffect, useState } from "react";

interface Major {
  major: string;
  id: string;
}

export default function Profile() {
  const router = useRouter();
  const { user, update, logout } = useUser();
  const [majorList, setMajorList] = useState<[]>([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    major: "",
    profileImage: "",
    password: "",
  });
  const [newImage, setNewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // State untuk loading tombol submit
  const [submitStatus, setSubmitStatus] = useState<string | null>(null); // State untuk status submit
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstName || "",
        lastname: user.lastName || "",
        major: user.major || "",
        profileImage: user.imageUrl || "",
        password: "",
      });
    } else {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setNewImage(fileURL); // Update preview gambar baru
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.password) {
      setSubmitStatus("Password harus diisi untuk konfirmasi perubahan.");
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await update({
        firstname: formData.firstname,
        lastname: formData.lastname,
        major: formData.major,
        profileImage: formData.profileImage,
        password: formData.password,
      });

      if (!response.ok) throw new Error("Gagal memperbarui data.");
      setSubmitStatus("Data berhasil diperbarui!");
    } catch (err) {
      console.error("Error updating user:", err);
      setSubmitStatus("Gagal memperbarui data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    console.log("Logout");
    try {
      await logout();
      console.log("Log sukses");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Terjadi error yang tidak diketahui");
      }
    }
  };

  const handleBack = () => {
    if (router) {
      router.back();
    }
  };

  const handleEdit = () => {
    if (router) {
      router.push("/profile/edit");
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

  if (error) console.log(error);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative flex flex-col min-h-[100vh] justify-start items-start w-full max-h-screen overflow-hidden md:hidden">
        <div className="w-full p-6 pb-3 flex flex-row justify-between items-center bg-blueFade left-0">
          <button
            onClick={handleBack}
            className="w-8 overflow-hidden aspect-square"
          >
            <Image
              src={"/imgs/create-account-imgs/back-btn.svg"}
              alt="Back Button"
              width={1}
              height={1}
              layout="responsive"
            />
          </button>
          <div className="text-white text-center font-poppinsSemiBold text-xl"></div>
          <div className="flex flex-row justify-between items-center  rounded-full w-[36px] bg-blueFade">
            <div className="w-[24px]">
              <Image
                src={"/imgs/indonesia-flag-rounded.svg"}
                alt="Indonesian Flag"
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
          </div>
        </div>
        <div className="w-full p-6 flex row justify-between items-start gap-2 bg-blueFade relative -top-1">
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="text-white font-poppinsMedium text-xl w-full">
              {user && user.name ? (
                user.name
              ) : (
                <div className="w-3/5 bg-bluePrimary text-bluePrimary">pp</div>
              )}
            </div>
            <div
              className="text-blueSec font-poppinsMedium text-md w-full"
              onClick={handleEdit}
            >
              {user && user.name ? (
                "Edit Profile"
              ) : (
                <div className="w-3/5 bg-bluePrimary text-bluePrimary">pp</div>
              )}
            </div>
          </div>
          <div className="flex aspect-square rounded-xl border border-white w-20 overflow-hidden">
            <Image
              src={
                user && user.imageUrl
                  ? user.imageUrl
                  : "/imgs/dashboard-imgs/Default-Profile-Img.svg"
              }
              alt="User Photo Profile"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
        </div>

        <div className="w-full relative -top-2 bg-blueFade h-full">
          <div className="w-full bg-[#F1F2F6] p-6 mt-4 rounded-3xl min-h-screen flex flex-col justify-start items-start gap-4">
            {/* COMPETITION */}
            <div className="w-full font-poppinsRegular text-md">
              {user && user.name ? (
                <Link href={"/profile/competition"}>
                  <div className="text-normalText bg-white rounded-md p-3 w-full flex justify-between items-center">
                    <p>Competition</p>
                    <div className="w-5 overflow-hidden">
                      <Image
                        src={"/imgs/profile/next.svg"}
                        alt="Next Icon"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-[#ECECEC] w-full rounded-md p-3 text-[#ECECEC]">
                  p
                </div>
              )}
            </div>
            {/* TEAMS */}
            <div className="w-full font-poppinsRegular text-md">
              {user && user.name ? (
                <Link href={"/profile/team"}>
                  <div className="text-normalText bg-white rounded-md p-3 w-full flex justify-between items-center">
                    <p>Teams</p>
                    <div className="w-5 overflow-hidden">
                      <Image
                        src={"/imgs/profile/next.svg"}
                        alt="Next Icon"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-[#ECECEC] w-full rounded-md p-3 text-[#ECECEC]">
                  p
                </div>
              )}
            </div>
            {/* REIMBURSE */}
            <div className="w-full font-poppinsRegular text-md">
              {user && user.name ? (
                <Link href={"/profile/reimburse"}>
                  <div className="text-normalText bg-white rounded-md p-3 w-full flex justify-between items-center">
                    <p>Reimburse</p>
                    <div className="w-5 overflow-hidden">
                      <Image
                        src={"/imgs/profile/next.svg"}
                        alt="Next Icon"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-[#ECECEC] w-full rounded-md p-3 text-[#ECECEC]">
                  p
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="fixed bottom-8 px-6 w-full">
          <Button
            className={`${user && user.name ? "bg-red-500" : "bg-slate-300"}`}
            onClick={handleLogout}
            isDisabled={user && user.name ? false : true}
          >
            Log Out
          </Button>
        </div>
      </div>

      <div className="hidden md:flex px-4 xl:px-0 max-w-6xl w-full">
        <NavbarLogin></NavbarLogin>

        {/* USER */}
        <div className="flex flex-row justify-start items-start w-full gap-4 mt-24">
          {/* USER PROFILE */}
          <div className="flex flex-col justify-start items-start rounded-xl bg-white w-full max-w-80 p-4">
            {/* USER DETAIL */}
            <div className="flex flex-row justify-between items-center gap-4 w-full">
              <div className="flex flex-row justify-start items-center gap-2 w-full">
                <div className="w-16 aspect-square overflow-hidden rounded-full">
                  <Image
                    src={
                      user
                        ? user.imageUrl ||
                          "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                        : "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                    }
                    alt="User Profile"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                  <p className="text-normalText font-poppinsSemiBold text-base">
                    {user ? user.name : "Username"}
                  </p>
                  <p className="text-normalText font-poppinsRegular opacity-80 text-sm">
                    {user ? user.nim : "User NIM"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-12 aspect-square overflow-hidden"
              >
                <Image
                  src={"/imgs/profile/logout.svg"}
                  alt="Logout"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </button>
            </div>
            {/* USER NAVIGATION */}
            <div className="flex flex-col justify-start items-start w-full gap-4 mt-7 mb-3">
              <Link
                href={"/profile/edit"}
                className="flex flex-row justify-start items-center w-full gap-3"
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={"/imgs/profile/edit-blue.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-blueSec">
                  Edit Profil
                </p>
              </Link>
              <Link
                href={"/profile/competition"}
                className="flex flex-row justify-start items-center w-full gap-3"
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={"/imgs/profile/competition.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-normalText opacity-80">
                  Kompetisi
                </p>
              </Link>
              <Link
                href={"/profile/team"}
                className="flex flex-row justify-start items-center w-full gap-3"
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={"/imgs/profile/team.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-normalText opacity-80">
                  Tim Saya
                </p>
              </Link>
              <Link
                href={"/profile/reimburse"}
                className="flex flex-row justify-start items-center w-full gap-3"
              >
                <div className="w-6 aspect-square overflow-hidden">
                  <Image
                    src={"/imgs/profile/reimburse.svg"}
                    alt="Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <p className="font-poppinsMedium text-base text-normalText opacity-80">
                  Reimburse
                </p>
              </Link>
            </div>
          </div>
          {/* BOX EDIT */}
          <div className="flex flex-col justify-start items-start w-full p-6 rounded-xl gap-4 bg-white">
            <div className="flex flex-col justify-start items-start gap-1 w-full">
              <p className="text-normalText font-poppinsSemiBold text-xl">
                Edit Profil
              </p>
              <p className="text-normalText font-poppinsRegular text-sm opacity-80">
                Perbarui informasi profil Anda
              </p>
            </div>
            <form
              action=""
              method="POST"
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-start items-start gap-3"
            >
              <div className="flex flex-row gap-2 justify-start items-start w-full">
                {/* FIRSTNAME */}
                <div className="flex flex-col justify-start items-start gap-1 w-full">
                  <p className="text-normalText font-poppinsSemiBold text-base">
                    Nama Depan
                  </p>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData.firstname}
                    placeholder="Nama Depan"
                    className="font-poppinsRegular text-sm text-normalText border border-[#DDDDDD] p-3 rounded-md w-full outline-none"
                  />
                </div>
                {/* LASTNAME */}
                <div className="flex flex-col justify-start items-start gap-1 w-full">
                  <p className="text-normalText font-poppinsSemiBold text-base">
                    Nama Belakang
                  </p>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData.lastname}
                    placeholder="Nama Belakang"
                    className="font-poppinsRegular text-sm text-normalText border border-[#DDDDDD] p-3 rounded-md w-full outline-none"
                  />
                </div>
              </div>
              {/* PHOTO */}
              <div className="flex flex-col gap-1 relative w-full">
                <p className="font-poppinsSemiBold text-base">Foto Profile</p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="opacity-0 z-10 absolute w-full h-full cursor-pointer"
                />
                <div className="flex justify-center items-center border rounded-md p-3">
                  <Image
                    src="/imgs/profile/upload.svg"
                    alt="Upload Icon"
                    width={20}
                    height={20}
                  />
                  <span className="ml-2">Upload File</span>
                </div>
              </div>
              <div className="flex justify-start items-center gap-4">
                {/* Gambar sebelum diubah */}
                <div className="w-16 h-16 overflow-hidden rounded-full border">
                  <Image
                    src={
                      newImage ||
                      user?.imageUrl ||
                      "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                    }
                    alt="Profile Picture"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {newImage ? "Preview Gambar Baru" : "Gambar Profil Saat Ini"}
                </p>
              </div>
              {/* MAJOR */}
              <div className="flex flex-col gap-1 w-full font-poppinsSemiBold text-base">
                <p className="font-poppinsSemiBold text-base">Jurusan</p>
                <select
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="font-poppinsRegular text-sm border rounded-md p-3 outline-none"
                >
                  <option value="" disabled>
                    Pilih Jurusan
                  </option>
                  {majorList.map((item: Major) => (
                    <option key={item.id} value={item.major}>
                      {item.major}
                    </option>
                  ))}
                </select>
              </div>
              {/* PASSWORD */}
              <div className="flex flex-col justify-start items-start gap-1 w-full">
                <p className="text-normalText font-poppinsSemiBold text-base">
                  Konfirmasi Password
                </p>
                <input
                  type="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Masukkan Password  untuk Konfirmasi"
                  className="font-poppinsRegular text-sm text-normalText border border-[#DDDDDD] p-3 rounded-md w-full outline-none"
                />
              </div>
              {/* SAVE BUTTON */}
              <Button
                type="submit"
                className="flex items-center justify-center"
              >
                {loading ? "Loading..." : "Simpan Perubahan"}
              </Button>
              {submitStatus && (
                <p className="text-sm text-red-500 mt-2">{submitStatus}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
