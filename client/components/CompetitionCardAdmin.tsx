import React from "react";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";

type CompetitionCardProps = {
  id: string;
  title: string;
  description: string;
  urlPoster: string;
  category: string;
  type: string;
  endDate: string | undefined;
  style?: string;
  onClick?: () => void;
};

const CompetitionCardAdmin: React.FC<CompetitionCardProps> = ({
  id,
  title,
  description,
  urlPoster,
  category,
  type,
  endDate,
  style = {},
  onClick,
}) => {
  const router = useRouter();

  return (
    <div
      className={`card w-full rounded-xl overflow-hidden flex flex-col bg-white ${style}`}
      key={id}
    >
      <div
        className="w-full relative overflow-hidden rounded-lg aspect-video"
        onClick={() => {
          router.push(`/admin/competition/${id}`);
        }}
      >
        <Image
          src={urlPoster}
          alt="Image Poster"
          width={1}
          height={1}
          layout="responsive"
        />
        <div className="flex absolute top-2 left-2 w-full flex-row gap-1 justify-start items-center my-2">
          <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">
            {type}
          </div>
          <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">
            {category}
          </div>
          <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">
            {endDate}
          </div>
        </div>
      </div>
      <div className="detail w-full px-4 py-5 gap-2 justify-start items-start">
        <h2 className="text-base font-poppinsMedium">{title}</h2>

        <p
          className="text-sm font-poppinsRegular text-secText line-clamp-3 mt-1"
          style={{ WebkitLineClamp: 3 }}
        >
          {description}
        </p>
        <div className="w-full flex flex-row justify-between items-center gap-2 mt-2">
          <Button
            className="mt-0 w-full"
            style={{ marginTop: 0 }}
            onClick={() => {
              router.push(`/admin/competition/${id}/edit`);
            }}
          >
            Edit
          </Button>
          <Button
            className="mt-0 w-fit max-w-fit bg-transparent border border-[#C2C2C2]"
            style={{ marginTop: 0 }}
            onClick={onClick}
          >
            <div className="w-6 aspect-square overflow-hidden">
              <Image
                src="/imgs/admin/trash.svg"
                alt="Trash"
                width={1}
                height={1}
                layout="responsive"
              />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompetitionCardAdmin;
