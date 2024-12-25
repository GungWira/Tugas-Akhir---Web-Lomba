"use client";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

export default function Profile() {
  const router = useRouter();
  const { user } = useUser();

  // LOGOUT
  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to logout");
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Terjadi error yang tidak diketahui");
      }
    }
  };
  return (
    <div className="relative flex flex-col min-h-[100vh] justify-start items-start w-full max-h-screen overflow-hidden">
      <div className="w-full p-6 pb-3 flex flex-row justify-between items-center bg-blueFade left-0">
        <Link href={"/"} className="w-[36px]">
          <Image
            src={"/imgs/create-account-imgs/back-btn.svg"}
            alt="Back Button"
            width={1}
            height={1}
            layout="responsive"
          />
        </Link>
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
          <div className="text-blueSec font-poppinsMedium text-md w-full">
            {user && user.name ? (
              "Lihat Profile"
            ) : (
              <div className="w-3/5 bg-bluePrimary text-bluePrimary">pp</div>
            )}
          </div>
        </div>
        <div className="flex aspect-square rounded-lg border-white w-20 overflow-hidden">
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
          <div className="w-full font-poppinsRegular text-md">
            {user && user.name ? (
              <Link href={"/profile/on-going"}>
                <div className="text-normalText bg-white rounded-md p-3 w-full flex justify-between items-center">
                  <p>On Going</p>
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
          <div className="w-full font-poppinsRegular text-md">
            {user && user.name ? (
              <Link href={"/profile/history"}>
                <div className="text-normalText bg-white rounded-md p-3 w-full flex justify-between items-center">
                  <p>History</p>
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
  );
}
