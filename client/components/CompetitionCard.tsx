import React from "react";
import Image from "next/image";

type CompetitionCardProps = {
  id: string;
  title : string;
  description : string;
  urlPoster : string;
  category : "Individu" | "Team";
  type : "Web Design" | "Poster" | "Software Development" | "Business Proposal" | "Hackathon" | "General";
  endDate : Date;
  onClick : () => void;
//   startDate : Date;
//   registerLink : string;
//   guideBooklink? : string;
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
}) => {
  const formattedDate = endDate.toLocaleDateString("id-ID", { 
    day: "numeric", 
    month: "long" 
  });
  return (
    <div 
        className="card w-full rounded-xl overflow-hidden flex flex-col bg-white" 
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
            <div className="flex justify-center items-center rounded-3xl bg-white text-normalText font-poppinsRegular text-xs px-4 py-2">{formattedDate}</div>
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
