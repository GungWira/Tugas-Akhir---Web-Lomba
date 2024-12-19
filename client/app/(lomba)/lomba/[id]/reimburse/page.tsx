"use client"

import Button from "@/components/Button";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Reimburse({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [slug, setSlug] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getSlug = async () => {
            const data = (await params).id
            setSlug(data)
        }
        getSlug()
    }, [params])


    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const maxSize = 1 * 1024 * 1024; // 1MB
            if (file.size <= maxSize) {
                setSelectedImage(file);
                setPreviewUrl(URL.createObjectURL(file)); // Create temporary URL for preview
                return;
            }else{
                setError("Ukuran file tidak boleh lebih dari 1MB!");
            }
        } else {
            setError("Hanya file gambar yang diperbolehkan!")
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!selectedImage) {
            setError("Silahkah upload gambar terlebih dahulu")
        return;
        }
        console.log(selectedImage)
        setIsLoading(true);

        // Simulasi unggah ke API
        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
        const response = await fetch("/reimburse", {
            method: "POST",
            body: formData,
            credentials : "include"
        });

        if (!response.ok) {
            setError("Gagal menggunggah gambar")
            throw new Error("Gagal mengunggah gambar!");
        }

        setSelectedImage(null);
        setPreviewUrl(null);
        setSuccess("Gambar berhasil diunggah!")
        } catch (err : unknown) {
            if(err instanceof Error){
                console.log(err.message);
            }else{
                console.log("Terjadi error yang tidak diketahui")
            }
        } finally {
            setIsLoading(false);
        }
    };

    // if(error) return(router.push(`/lomba/${slug}`))

    return (
        <div className="relative flex flex-col min-h-[100vh] justify-start items-start w-full max-h-screen overflow-hidden">
            <NavbarBackTitled href={`/lomba/${slug}`}>Ajukan Reiumburse</NavbarBackTitled>
            
            <div className="flex flex-col justify-start items-start p-6 py-8 gap-2 mt-24 w-full bg-[#F1F2F6] min-h-screen rounded-3xl z-50">
                <div className="w-full">
                    <label htmlFor="file-upload" className="text-normalText font-poppinsSemiBold text-md">Bukti Pembayaran</label>
                    {error ? 
                        <p className="text-red-500 font-poppinsRegular text-sm my-1">*{error}</p> :
                        ""
                    }
                    {success ? 
                        <p className="text-green-600 font-poppinsRegular text-sm my-1">*{success}</p> :
                        ""
                    }
                    <label
                        htmlFor="file-upload"
                        className="aspect-video overflow-hidden w-full mt-2 bg-white border-2 border-dashed border-[#DDDDDD] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                        >
                        {!previewUrl ? (
                            <>
                            <Image
                                src="/imgs/competition/upload.svg"
                                alt="Upload Icon"
                                width={24}
                                height={24}
                            />
                            <p className="mt-2 text-sm font-poppinsRegular text-gray-500">Upload File</p>
                            </>
                        ) : (
                            // Tampilkan preview gambar
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
                        {/* Hidden Input File */}
                        <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        />
                </div>
                <div className="fixed bottom-4 left-0 p-6 w-full">
                    <Button 
                        onClick={handleUpload}
                        className={`${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blueSec"}`}
                        isDisabled={isLoading}
                    >
                        {isLoading ? 
                            <div className="flex items-center gap-2 w-full justify-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Mengunggah...
                            </div>
                          :
                          "Submit"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
  }