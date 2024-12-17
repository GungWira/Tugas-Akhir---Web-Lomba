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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async (otpValue: string) => {
    if (!nim) return;
    try {
      const response = await fetch("https://lomba-backend.vercel.app/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim, otp: otpValue }),
      });

      if (!response.ok) {
        throw new Error("Kode OTP salah. Silakan coba lagi.");
      }

    //   localStorage.removeItem("nim");
      const validasiCode = btoa(nim + "LolosOtpSAW")
      localStorage.setItem("token", validasiCode)
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
      const response = await fetch("https://lomba-backend.vercel.app/auth/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim ulang OTP.");
      }

      setError("Kode OTP telah dikirim ulang.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!nim) return;
      try {
        const response = await fetch("https://lomba-backend.vercel.app/auth/reset-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nim }),
        });

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

  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden">
      <NavbarBack href={'/createAccount'}></NavbarBack>
      <form action="" className="w-full rounded-lg min-h-screen flex flex-col items-center">
        <div className="w-full h-screen bg-[#F1F2F6] px-6 relative rounded-2xl bottom-8 min-h-screen flex flex-col items-center justify-center">
          <div className="w-[96px]">
            <Image
                src={'/imgs/create-account-imgs/otp.svg'}
                alt="otp image"
                width={1}
                height={1}
                layout="responsive"
            />
          </div>
          <h2 className="text-xl text-blueSec font-poppinsMedium">Verifikasi Email</h2>
          <p className="w-[80%] mt-1 text-center opacity-60 text-[#101010] text-sm font-poppinsRegular">
            Silakan masukkan kode OTP untuk memverifikasi email Anda untuk login.
          </p>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          <div className="flex flex-row justify-center items-center gap-3 w-[80%] overflow-hidden my-6">
            {otp.map((digit, index) => (
              <input 
                key={index}
                type="text"  
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                ref={(el) => {inputRefs.current[index] = el!;}}
                className="bg-white rounded-xl p-4 text-lg text-center font-bold color-[#1d1d1d] aspect-[3/4] w-[56px]" 
                style={{outline: 'none'}} 
              />
            ))}
          </div>
          {isResendVisible && (
            <button
                onClick={(e) => {
                    e.preventDefault();
                    resendOtp();
                }}
              className="text-blueSec text-sm font-poppinsRegular underline"
            >
              Kirim ulang OTP
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
