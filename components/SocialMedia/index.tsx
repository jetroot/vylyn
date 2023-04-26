import React from "react";
import SectionContainer from "../Layouts/SectionContainer";
import Image from "next/image";
import SocialMediaData from "@/data/SocialMedia";
import SocialCard from "./SocialCard";

const SocialMedia = () => {
    return (
        <SectionContainer>
            <h1 className="text-typography-body-dark text-xl leading-8">
                Analyze your ads wherever they are
            </h1>
            <div className="grid grid-cols-2 max-sm:grid-cols-1">
                <div className="w-full">
                    <Image
                        src={"/social_media.png"}
                        width={500}
                        height={500}
                        alt="connect social media ads to vylyn"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="max-w-lg">
                        <h1 className="text-typography-body-dark text-xl leading-8">
                            Connect your ads
                        </h1>
                        <p className="text-typography-body-secondary-dark py-4">
                            Connect your social media ads from platforms like
                            Facebook, Instagram, Tiktok ...
                        </p>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-y-12 gap-x-4 my-10">
                        {SocialMediaData.map(({icon, company, description, color}) => (
                            <SocialCard
                                Icon={icon}
                                company={company}
                                description={description}
                                color={color}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

export default SocialMedia;
