"use client";
import NavbarBackTitled from "@/components/NavbarBackTitled";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

export default function Team() {
  const { user } = useUser();
  const router = useRouter();

  const handleDetail = (idTeam: string) => {
    if (idTeam) {
      router.push(`/profile/team/${idTeam}`);
    }
  };
  return (
    <div className="w-full relative bg-blueFade min-h-screen">
      <NavbarBackTitled className="pb-6">Team</NavbarBackTitled>
      <div className="flex pt-24 min-h-screen">
        <div
          className="bg-[#F1F2F6] w-full min-h-full rounded-3xl p-6 flex flex-col gap-3"
          style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
        >
          {/* CARD */}
          <div
            className="w-full rounded-xl bg-white flex flex-col gap-4 p-4 py-6"
            onClick={() => {
              handleDetail("id");
            }}
          >
            <div className="flex flex-row justify-between items-center">
              <div className="w-full">
                {user && user.imageUrl ? (
                  <p className="font-poppinsSemiBold text-normalText text-base">
                    Tim maba
                  </p>
                ) : (
                  <div className="w-3/5 bg-[#F1F2F6] text-[#F1F2F6]">p</div>
                )}
              </div>
              <div className="w-5">
                <Image
                  src={"/imgs/profile/next.svg"}
                  alt="More Icon"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-1 w-full">
              <div className="w-full bg-white border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                <div className="min-w-10 max-w-10 w-10 aspect-square rounded-full border overflow-hidden">
                  <Image
                    src={
                      user && user.imageUrl
                        ? user.imageUrl
                        : "/imgs/dashboard-imgs/Default-Profile-Img.svg"
                    }
                    alt="Image Profile Leader"
                    width={1}
                    height={1}
                    layout="responsive"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-0 w-full">
                  <p className="text-normalText font-poppinsMedium text-sm">
                    {user && user.name ? user.name : ""}
                  </p>
                  <p className="font-poppinsRegular text-xs text-normalText opacity-40">
                    Ketua tim
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full">
                  <Image
                    src={"/imgs/dashboard-imgs/Crown.svg"}
                    alt="Crown Icon"
                    width={1}
                    height={1}
                    layout="responsive"
                    className="w-6 h-6 rounded-full"
                  />
                </div>
              </div>
              <div className="w-full border px-3 py-1 rounded-md flex flex-row justify-between gap-2 items-center">
                <div className="min-w-10 min-h-10 rounded-full border overflow-hidden">
                  <Image
                    src={"/imgs/dashboard-imgs/Default-Profile-Img.svg"}
                    alt="Image Profile Leader"
                    width={1}
                    height={1}
                    layout="responsive"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-0 w-full">
                  <p className="text-normalText font-poppinsMedium text-sm">
                    1 Slot Tersisa
                  </p>
                  <p className="font-poppinsRegular text-xs text-normalText opacity-40"></p>
                </div>
              </div>
            </div>
          </div>
          {/* CARD */}
        </div>
      </div>
    </div>
  );
}
