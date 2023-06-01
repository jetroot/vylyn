import { useState, useEffect } from "react";

// Icons
import { TfiReload } from "react-icons/tfi";
import { AiOutlineBug } from "react-icons/ai";
import { GiShieldcomb } from "react-icons/gi";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { BiLoaderAlt } from "react-icons/bi";

interface Props {
    componentTitle: string;
    componentSubtitle: string;
    style: string;
    annotated: string;
    campaignShouldBeAssessed: any;
    generatedData: any;
}

const CampaignCard = ({
    componentTitle,
    componentSubtitle,
    style,
    annotated,
    campaignShouldBeAssessed,
    generatedData,
}: Props) => {
    useEffect(() => {
    }, [campaignShouldBeAssessed, annotated]);

    return (
        <div className="max-w-screen-2xl w-full mx-auto mt-16 px-3 text-white">
            <div className="flex justify-between">
                <div>
                    <h1 className="capitalize text-2xl flex gap-2 items-center text-typography-body-dark">
                        {annotated.toLocaleLowerCase() === "solutions" && (
                            <GiShieldcomb />
                        )}
                        {annotated.toLocaleLowerCase() === "problems" && (
                            <AiOutlineBug size={21} />
                        )}
                        {annotated.toLocaleLowerCase() === "queries" && (
                            <HiOutlineSquare2Stack />
                        )}
                        {componentTitle}
                    </h1>
                    <p className="text-slate-300 my-2 text-sm">
                        {componentSubtitle}
                    </p>
                </div>
                {/* <div>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-1 bg-[#282828] py-2 px-3 text-[12px] rounded-md"
                    >
                        <TfiReload />
                        Re-generate
                    </button>
                </div> */}
            </div>

            {!campaignShouldBeAssessed.loading &&
                campaignShouldBeAssessed.type === annotated && (
                    <div className="flex gap-3 my-10 overflow-auto">
                        {generatedData.map((item, index) => (
                            <div
                                key={index}
                                className={`${style} flex-col w-1/4 rounded-lg p-4 bg-[#282828] shadow-[0_1_0_5px_#5d5d5d]`}
                            >
                                <div className="flex justify-end">
                                    <span className="bg-[#3e3e3e] p-2 rounded-md text-[12px]">
                                        Generated
                                    </span>
                                </div>
                                <div className="w-full flex items-center p-4 text-gray-300 text-md">
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            {campaignShouldBeAssessed.type === annotated &&
                campaignShouldBeAssessed.loading && (
                    <BiLoaderAlt className="animate-spin text-slate-300" />
                )}
        </div>
    );
};

export default CampaignCard;
