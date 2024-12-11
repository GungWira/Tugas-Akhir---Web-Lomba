"use client"

import NavbarBack from "@/components/NavbarBack"
import { useState, useRef } from "react"


export default function OTPVerification() {
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // Hanya angka atau kosong yang diterima
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Pindah ke field berikutnya jika ada dan angka sudah diisi
        if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
        }

        // Jalankan fungsi jika semua field terisi
        if (index === otp.length - 1 && newOtp.every((digit) => digit !== "")) {
        console.log("OK"); // Ganti dengan fungsi yang diinginkan
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
        // Pindah ke field sebelumnya jika Backspace ditekan dan field kosong
        inputRefs.current[index - 1].focus();
        }
    };
    return (
        <div className="relative flex flex-col h-screen w-screen overflow-hidden">
            <NavbarBack href={'/createAccount'}></NavbarBack>
            {/* FORM */}
            <form action="" className="w-full rounded-lg min-h-screen flex flex-col items-center">
                {/* BODY OTP */}
                <div className="w-full h-screen bg-[#F1F2F6] px-6 relative rounded-2xl bottom-8 min-h-screen flex flex-col items-center justify-center">
                    <img src="./imgs/create-account-imgs/otp.svg" alt="otp" className="w-[96px]" />
                    <h2 className="text-xl text-blueSec font-poppinsMedium">Verifikasi Email</h2>
                    <p className="w-[80%] mt-1 text-center opacity-60 text-[#101010] text-sm font-poppinsRegular">
                        Silakan masukkan kode OTP untuk 
                        memverifikasi email Anda untuk login.
                    </p>
                    {/* OTP BOX */}
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

                    <div className="flex flex-col justify-center items-center">
                        <p className="w-full mt-1 text-center opacity-60 text-[#101010] text-sm font-poppinsRegular">Kode OTP tidak diterima?</p>
                        <p className="w-full mt-1 text-center text-blueSec text-sm font-poppinsRegular underline">Kirim ulang OTP</p>
                    </div>
                </div>
            </form>
        </div>
    )
}