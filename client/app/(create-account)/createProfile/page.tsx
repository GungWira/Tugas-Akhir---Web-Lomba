"use client"

import NavbarBack from "@/components/NavbarBack"
import Button from "@/components/Button"
import { useState } from "react"


export default function CreateProfile() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [frontName, setFrontName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [gender, setGender] = useState<string>('')

    const handleImageUpload = (event : React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0]
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.result){
                    setSelectedImage(reader.result as string)
                }
            }

            reader.readAsDataURL(file)
        }
    }

    const isFormValid = frontName && lastName && gender
    
    return (
        <div className="relative flex flex-col h-screen w-screen overflow-hidden">
            <NavbarBack href={'/otp'}></NavbarBack>
            {/* FORM */}
            <form action="" className="w-full flex flex-col px-6 py-8 pt-32 justify-between items-center h-screen">
                <div className="flex flex-col justify-center items-center gap-6">
                    <div className="relative">
                        <img 
                            src={selectedImage || `imgs/create-account-imgs/default-img.svg`} 
                            alt="img profile preview" 
                            className="w-40 h-40 object-cover border rounded-full"
                        />
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            name="img" 
                            id="img" 
                            className="absolute top-0 left-0 h-full opacity-0 cursor-pointer"
                        />
                        <img 
                            src="imgs/create-account-imgs/img.svg" 
                            alt="img icon" 
                            className="absolute bottom-0 right-0 w-[48px]"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h1 className="text-xl font-poppinsSemiBold text-blueSec text-center">User Profile</h1>
                        <p className="text-sm font-poppinsRegular text-normalText text-center">Atur profil dan preferensi Anda untuk pengalaman yang lebih personal.</p>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full gap-3">
                        <input 
                            type="text" 
                            name="firstName" 
                            id="firstName"
                            value={frontName} 
                            onChange={(e) => setFrontName(e.target.value)}
                            className="w-full bg-white p-3 rounded-lg pl-10 text-sm font-poppinsRegular text-normalText"
                            placeholder="Nama Depan"
                            style={
                                {
                                    backgroundImage: "url('/imgs/create-account-imgs/icon-front-last-name.svg')",
                                    backgroundSize: "16px",
                                    backgroundRepeat : "no-repeat",
                                    backgroundPositionY: "center",
                                    backgroundPositionX : "12px",
                                    outlineColor: "#1DCAD3"
                                }
                            }
                        />
                        <input 
                            type="text" 
                            name="lastName" 
                            id="lastName"
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-white p-3 rounded-lg pl-10 text-sm font-poppinsRegular text-normalText"
                            placeholder="Nama Belakang"
                            style={
                                {
                                    backgroundImage: "url('/imgs/create-account-imgs/icon-front-last-name.svg')",
                                    backgroundSize: "16px",
                                    backgroundRepeat : "no-repeat",
                                    backgroundPositionY: "center",
                                    backgroundPositionX : "12px",
                                    outlineColor: "#1DCAD3"
                                }
                            }
                        />
                        <select 
                            name="gender" 
                            id="gender"
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full bg-white p-3 rounded-lg pl-10 text-sm font-poppinsRegular text-normalText"
                            style={
                                {
                                    backgroundImage: "url('/imgs/create-account-imgs/icon-gender.svg')",
                                    backgroundSize: "20px",
                                    backgroundRepeat : "no-repeat",
                                    backgroundPositionY: "center",
                                    backgroundPositionX : "12px",
                                    outlineColor: "#1DCAD3"
                                }
                            }
                        >
                            <option value="" disabled>
                                Gender
                            </option>
                            <option value="Pria">
                                Pria
                            </option>
                            <option value="Wanita">
                                Wanita
                            </option>
                        </select>
                    </div>
                </div>
                <Button 
                    className={`${!isFormValid ? 'bg-[#CBCBCB]' : 'bg-blueSec'}`}
                    isDisabled={!isFormValid}
                >
                    Selesai
                </Button>
            </form>
        </div>
    )
}