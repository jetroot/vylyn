import { useState, useEffect } from "react";

// Icons
import { TfiReload } from "react-icons/tfi";
import { AiOutlineBug } from "react-icons/ai";
import { GiShieldcomb } from "react-icons/gi";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { BiLoaderAlt } from "react-icons/bi";
import axios from "axios";

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
    const [queryResponse, setQueryResponse] = useState({
        data: "",
        loading: 2, // 2: don't show anything, 1: data is loading, 0: data loaded
    });

    useEffect(() => {
        // When we change our query
        // hide the old query response
        if (campaignShouldBeAssessed.loading) {
            setQueryResponse({
                ...queryResponse,
                loading: 2,
            });
        }
    }, [campaignShouldBeAssessed, annotated]);

    const generateResponseForQuery = async (
        question: string,
        type: string,
        campaignData: any
    ) => {
        if (type === "queries") {
            const q = question.substring(3);
            // console.log(`q: ${q}  type: ${annotated}`);

            setQueryResponse({
                ...queryResponse,
                loading: 1,
            });

            const response = await axios.post("/api/ad_campaign", {
                _type: "_GRFQ", // Stands for Generate Response For Query
                campaign_should_assessed: campaignData,
                question: q,
            });

            if (response.data.data.success) {
                setQueryResponse({
                    loading: 0,
                    data: response.data.data.data,
                });
            }
        }
    };

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
                        {generatedData.map((item: any, index: any) => (
                            <div
                                key={index}
                                onClick={() => {
                                    generateResponseForQuery(
                                        item,
                                        annotated,
                                        campaignShouldBeAssessed.campaignData
                                    );
                                }}
                                className={`${style} hover:border-slate-500 hover:border ${
                                    annotated === 'queries' && "cursor-pointer"
                                } flex-col w-1/4 rounded-lg p-4 bg-[#282828] shadow-[0_1_0_5px_#5d5d5d]`}
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

            {/* // 2: don't show anything, 1: data is loading, 0: data loaded */}
            {/* <h1 className="text-white"> loa{campaignShouldBeAssessed.loading}</h1> */}
            {annotated === "queries" && (
                <>
                    {queryResponse.loading === 0 && (
                        <div className="border border-slate-500 text-slate-300 p-3 rounded-md">
                            {queryResponse.data.split("\n").map((el, index) => (
                                <h1 key={index}>
                                    {el !== "" ? (
                                        <>
                                            {el} <br />
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </h1>
                            ))}
                        </div>
                    )}
                    {queryResponse.loading === 1 && (
                        <BiLoaderAlt className="animate-spin text-slate-300" />
                    )}
                </>
            )}
        </div>
    );
};

export default CampaignCard;
