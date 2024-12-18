import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";


const poppinsRegular = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins-regular",
  weight: "100 900",
})
const poppinsMedium = localFont({
  src: "./fonts/Poppins-Medium.ttf",
  variable: "--font-poppins-medium",
  weight: "100 900",
})
const poppinsSemiBold = localFont({
  src: "./fonts/Poppins-SemiBold.ttf",
  variable: "--font-poppins-semi-bold",
  weight: "100 900",
})
const poppinsBold = localFont({
  src: "./fonts/Poppins-Bold.ttf",
  variable: "--font-poppins-bold",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Website Lomba Gemilang Primakara",
  description: "Dibuat oleh mahasiswa Primakara angkatan 12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          `${poppinsRegular.variable}
           ${poppinsMedium.variable}
           ${poppinsSemiBold.variable} 
           ${poppinsBold.variable} 
           antialiased`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
