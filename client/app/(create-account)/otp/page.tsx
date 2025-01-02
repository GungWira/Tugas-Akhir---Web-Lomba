"use client";

import NavbarBack from "@/components/NavbarBack";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [nim, setNim] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const [countdown, setCountdown] = useState(59);

  // Dekripsi nim dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedNim = localStorage.getItem("nim");
    if (storedNim) {
      try {
        const decryptedNim = atob(storedNim); // Dekripsi Base64
        setNim(decryptedNim);
      } catch {
        setError("NIM tidak valid");
        localStorage.removeItem("nim");
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Hanya angka atau kosong yang diterima
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (index === otp.length - 1 && newOtp.every((digit) => digit !== "")) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async (otpValue: string) => {
    if (!nim) return;
    try {
      const response = await fetch(
        "https://lomba-backend.vercel.app/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nim, otp: otpValue }),
        }
      );

      if (!response.ok) {
        throw new Error("Kode OTP salah. Silakan coba lagi.");
      }

      //   localStorage.removeItem("nim");
      const validasiCode = btoa(nim + "LolosOtpSAW");
      localStorage.setItem("token", validasiCode);
      router.push("/createProfile");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setOtp(["", "", "", ""]);
      inputRefs.current[0].focus();
    }
  };

  const resendOtp = async () => {
    if (!nim) return;
    try {
      const response = await fetch(
        "https://lomba-backend.vercel.app/auth/request-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nim }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengirim ulang OTP.");
      }

      setCountdown(59);
      setIsResendVisible(false);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!nim) return;
      try {
        const response = await fetch(
          "https://lomba-backend.vercel.app/auth/reset-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nim }),
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mereset OTP.");
        }

        setIsResendVisible(true);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      }
    }, 60000);

    return () => clearTimeout(timer);
  }, [nim]);

  useEffect(() => {
    if (!isResendVisible) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isResendVisible]);

  return (
    <div className="container relative max-w-base min-h-screen flex justify-start items-start flex-col overflow-scroll pb-0 md:flex-row md:max-w-none md:overflow-hidden">
      <div className="hidden w-full h-screen justify-center items-center md:flex md:flex-3 md:px-12 xl:px-24 md:bg-bluePrimary">
        <div className="w-full max-w-lg">
          <Image
            src="/imgs/create-account-imgs/avatar.svg"
            alt="otp hero image"
            width={1}
            height={1}
            layout="responsive"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-2 min-h-screen md:px-12 xl:px-24">
        <NavbarBack href={"/createAccount"} className="md:relative md:px-0" />
        <form className="w-full flex-1 rounded-lg flex flex-col items-center justify-center">
          <div className="w-full h-full bg-[#F1F2F6] px-4 sm:px-6 relative rounded-2xl -mt-8 flex flex-col items-center justify-center">
            <div className="w-[96px] md:w-[120px] lg:w-[140px]">
              <Image
                src={"/imgs/create-account-imgs/otp.svg"}
                alt="otp image"
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
            <h2 className="text-xl md:text-2xl text-blueSec font-poppinsMedium">
              Verifikasi Email
            </h2>
            <p className="w-[90%] md:w-[100%] mt-1 text-center opacity-60 text-[#101010] text-sm md:text-base font-poppinsRegular">
              Silakan masukkan kode OTP untuk memverifikasi email Anda untuk
              login.
            </p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex flex-row justify-center items-center gap-2 sm:gap-3 w-full max-w-md px-4 overflow-hidden my-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  ref={(el) => {
                    inputRefs.current[index] = el!;
                  }}
                  className="bg-white rounded-xl p-2 sm:p-4 text-base sm:text-lg font-poppinsSemiBold text-center font-bold color-[#1d1d1d] aspect-[3/4] w-[48px] sm:w-[56px]"
                  style={{ outline: "none" }}
                />
              ))}
            </div>
            {!isResendVisible ? (
              <p className="text-gray-500 text-sm md:text-base font-poppinsRegular">
                Kirim ulang OTP dalam{" "}
                <span className="font-poppinsMedium">{countdown}</span> detik
              </p>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  resendOtp();
                }}
                className="text-blueSec text-sm md:text-base font-poppinsRegular underline"
              >
                Kirim ulang OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
