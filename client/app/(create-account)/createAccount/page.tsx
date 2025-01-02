"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CreateAccount() {
  const router = useRouter();
  const [majorList, setMajorList] = useState<
    [{ major: string; id: string }] | []
  >([]);
  const [error, setError] = useState<string | null>(null);

  // ANGKATAN
  const currentYear = new Date().getFullYear();
  const angkatanList = Array.from({ length: 4 }, (_, i) => currentYear - i);
  // FORM
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [major, setMajor] = useState("");
  const [cohort, setCohort] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  async function handlerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      if (
        email &&
        name &&
        nim &&
        major &&
        cohort &&
        password &&
        passwordConfirm
      ) {
        if (isTermsAccepted) {
          if (password == passwordConfirm) {
            if (nim.length != 10) {
              setError("NIM tidak valid ");
              setLoading(false);
              return;
            }
            if (password.length <= 9) {
              setError("Password harus lebih dari 9 karakter");
              setLoading(false);
              return;
            }
            const response = await fetch(
              "https://lomba-backend.vercel.app/auth/signup",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  password,
                  cohort,
                  nim,
                  major,
                }),
                credentials: "include",
              }
            );
            if (!response.ok) {
              setLoading(false);

              throw new Error("Gagal membuat akun, mohon mencoba kembali");
            } else {
              setLoading(false);

              localStorage.setItem("nim", btoa(nim));
              router.push("/otp");
            }
          } else {
            setLoading(false);

            setError("Password dan konfirmasi password berbeda");
          }
        } else {
          setLoading(false);
          setError(
            "Anda harus menyetujui persyaratan layanan & kebijakan privasi"
          );
          return;
        }
      } else {
        setLoading(false);
        setError("Field tidak boleh kosong");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan, mohon coba beberapa saat lagi");
      }
    }
  }
  // JURUSAN LIST
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

  return (
    <div className="container relative max-w-base min-h-screen flex justify-start items-start bg-bluePrimary flex-col overflow-scroll pb-0 md:flex-row md:max-w-none md:overflow-hidden">
      <div className="w-full hidden h-screen md:h-auto justify-center items-center md:flex md:flex-3 md:px-12 xl:px-24 md:bg-bluePrimary">
        <div className="w-full md:max-w-[400px] lg:max-w-[512px] opacity-0 h-screen">
          <Image
            src="/imgs/create-account-imgs/avatar.svg"
            alt="Avatar Vector"
            width={1}
            height={1}
            layout="responsive"
          />
        </div>
        <div className="w-full md:max-w-[400px] lg:max-w-[512px] fixed">
          <Image
            src="/imgs/create-account-imgs/avatar.svg"
            alt="Avatar Vector"
            width={1}
            height={1}
            layout="responsive"
          />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-2 md:justify-center md:items-start min-h-screen md:px-12 xl:px-24 bg-[#F1F2F6]">
        <div className="px-6 flex flex-col">
          <h1 className="text-blueFade text-4xl mt-16 mb-4 font-bold font-poppinsSemiBold">
            Register
          </h1>
          <p className="text-sm mb-4 font-poppinsRegular text-blueFade">
            Daftar akun anda disini!
          </p>
          {error ? (
            <div className="text-sm mb-4 font-poppinsRegular text-red-600">
              * {error}
            </div>
          ) : null}
        </div>

        <form
          onSubmit={handlerSubmit}
          className="coverForm md:max-w-[512px] flex flex-col justify-start items-start w-full gap-2 p-6 bg-[#F1F2F6] rounded-2xl pt-8"
        >
          {/* EMAIL */}
          <div className="itemForm w-full flex flex-col gap-1">
            <label htmlFor="email" className="font-poppinsMedium text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 w-full bg-white rounded-md font-poppinsRegular text-xs text-[#1d1d1d]"
              placeholder="Masukkan Email"
              style={{ outline: "none" }}
              required
              autoComplete="off"
            />
          </div>
          {/* NAMA */}
          <div className="itemForm w-full flex flex-col gap-1">
            <label htmlFor="name" className="font-poppinsMedium text-sm">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="p-2 w-full bg-white rounded-md font-poppinsRegular text-xs text-[#1d1d1d]"
              placeholder="Masukkan Nama"
              style={{ outline: "none" }}
              required
              autoComplete="off"
            />
          </div>
          {/* NIM */}
          <div className="itemForm w-full flex flex-col gap-1">
            <label htmlFor="nim" className="font-poppinsMedium text-sm">
              NIM
            </label>
            <input
              type="number"
              name="nim"
              id="nim"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="p-2 w-full bg-white rounded-md font-poppinsRegular text-xs text-[#1d1d1d]"
              placeholder="Masukkan NIM"
              style={{ outline: "none" }}
              required
              autoComplete="off"
            />
          </div>
          {/* JURUSAN */}
          <div className="itemForm w-full flex flex-col gap-1">
            <label htmlFor="jurusan" className="font-poppinsMedium text-sm">
              Jurusan
            </label>
            <select
              name="jurusan"
              id="jurusan"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="p-2 w-full bg-white rounded-md font-poppinsRegular text-xs"
              style={{ outline: "none" }}
              required
              autoComplete="off"
            >
              <option value="" disabled>
                Pilih Jurusan
              </option>
              {majorList.map((item, index) => (
                <option value={item.major} key={index}>
                  {item.major}
                </option>
              ))}
            </select>
          </div>
          {/* ANGKATAN */}
          <div className="itemForm w-full flex flex-col gap-1">
            <label htmlFor="angkatan" className="font-poppinsMedium text-sm">
              Angkatan
            </label>
            <select
              name="angkatan"
              id="angkatan"
              defaultValue={cohort}
              onChange={(e) => setCohort(e.target.value)}
              className="p-2 w-full bg-white rounded-md font-poppinsRegular text-xs"
              style={{ outline: "none" }}
              required
              autoComplete="off"
            >
              <option value="" disabled>
                Pilih Angkatan
              </option>
              {angkatanList.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* PASSWORD */}
          <div className="itemForm w-full flex flex-col gap-1 mt-2">
            <label htmlFor="password" className="font-poppinsMedium text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 w-full bg-white rounded-md font-poppinsRegular text-xs text-[#1d1d1d]"
              placeholder="Masukkan Password"
              style={{ outline: "none" }}
              required
              autoComplete="off"
            />
          </div>
          {/* PASSWORD */}
          <div className="itemForm w-full flex flex-col gap-1 mt-2">
            <label
              htmlFor="passwordConfirm"
              className="font-poppinsMedium text-sm"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="p-2 w-full bg-white rounded-md font-poppinsRegular text-xs text-[#1d1d1d]"
              placeholder="Masukkan Kembali Password"
              style={{ outline: "none" }}
              required
              autoComplete="off"
            />
          </div>
          <div className="flex w-full gap-1 justify-start items-center mt-2">
            <input
              type="checkbox"
              name="syarat"
              id="syarat"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            />
            <label
              htmlFor="syarat"
              className="text-black opacity-80 font-poppinsRegular text-xs"
            >
              Persyaratan layanan & kebijakan Privasi.
            </label>
          </div>
          <button
            className={`bg-blueSec w-full flex flex-row justify-center items-center gap-2 p-2 text-white font-poppinsMedium mt-4 rounded-lg ${
              loading ? "opacity-70" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Loading..." : "Buat Akun"}
          </button>
          <p className="font-poppinsRegular text-sm text-[#1d1d1d] text-center mt-2 w-full">
            Sudah punya akun?
            <Link href="/" className="text-blueSec underline">
              {" "}
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
