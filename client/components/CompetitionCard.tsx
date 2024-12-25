import React from "react";
import Image from "next/image";

type CompetitionCardProps = {
  id: string;
  title : string;
  description : string;
  urlPoster : string;
  category : string;
  type : string;
  endDate : string | undefined;
  onClick : () => void;
  style? : string;
};


const CompetitionCard: React.FC<CompetitionCardProps> = ({
    id,
    title,
    description,
    urlPoster,
    category,
    type,
    endDate,
    onClick,
    style = {}
}) => {
  return (
    <div 
        className={`card w-full rounded-xl overflow-hidden flex flex-col bg-white ${style}`}
        key={id} 
        onClick={onClick}>
        <div className="w-full relative overflow-hidden rounded-lg aspect-video">
        <Image
            src={urlPoster}
            alt="Image Poster"
            width={1}
            height={1}
            layout="responsive"
        />
        <div className="flex absolute top-2 left-2 w-full flex-row gap-1 justify-start items-center my-2">
            <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">{type}</div>
            <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">{category}</div>
            <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">{endDate}</div>
        </div>
        </div>
        <div className="detail w-full px-4 py-5 gap-2 justify-start items-start">
        <h2 className="text-base font-poppinsMedium">{title}</h2>
        
        <p className="text-sm font-poppinsRegular text-secText">
            {description}
        </p>
        </div>
    </div>
  );
};

export default CompetitionCard;
