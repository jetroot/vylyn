import AuthNav from "@/components/Nav/AuthNav";
import { OpenAiConfiguration, SIGN_IN_URI } from "@/config";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { BiLoaderAlt } from "react-icons/bi";
import { RiInformationFill } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import ThWIthToolTip from "./ThWIthToolTip";
import CampaignCard from "@/components/Card/CampaignCard";

import { AiOutlineBug } from "react-icons/ai";
import { GiShieldcomb } from "react-icons/gi";
import AdCampaignForm from "@/components/Form/AdCampaignForm";

import { useRouter } from "next/router";
import { doesCampaignExists } from "@/services";
import axios from "axios";

import { BiLoader } from "react-icons/bi";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import Pricing from "@/pages/pricing";
import Link from "next/link";

interface AdCampaignAssessment {
    data: string | null;
    campaignId: string;
    loading?: boolean;
}

// Queries, Problems, Solutions
interface CampaignShoulBeAssessed {
    campaignData?: Object;
    type?: "queries" | "problems" | "solutions" | null;
    loading: boolean;
}

const Ads = () => {
    const { data }: any = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [adCampaignAssessment, setAdCampaignAssessment] =
        useState<AdCampaignAssessment>({
            data: null,
            campaignId: "",
            loading: false,
        });

    const [showCreateAdModal, setshowCreateAdModal] = useState(false);

    const [adCampaigns, setAdCampaigns] = useState<any>([]);
    const [loadingAdCampaigns, setLoadingAdCampaigns] = useState(true);
    const [canFetchData, setCanFetchData] = useState(true);
    const [upgradeButtonClicked, setUpgradeButtonClicked] = useState(false);

    const [campaignShouldBeAssessed, setCampaignShouldBeAssessed] =
        useState<CampaignShoulBeAssessed>({
            campaignData: {
                amount_spent: "",
                budget: "",
                campaign_objective: "",
                cost_per_result: "",
                cpc: "",
                cpm: "",
                ctr: "",
                frequency: "",
                impressions: "",
                link_clicks: "",
                reach: "",
                results: "",
                target_countries: "",
                target_gender: "",
            },
            type: null,
            loading: false,
        });

    const router = useRouter();
    const { campaign_id } = router.query;
    let { p }: any = router.query;

    // check if param p is exists
    if (!(p && /^\d$/.test(p?.toString()))) {
        p = 1;
    }

    const [generatedData, setGeneratedData] = useState([]);

    const getAdCampaigns = async () => {
        try {
            // get ad campaigns data
            const response = await axios.get(`/api/ad_campaign`, {
                withCredentials: true,
                headers: {
                    campaign_id: campaign_id,
                    p,
                },
            });

            if (response.data.data.success) {
                setAdCampaigns(response.data.data.adCampaigns);
                setLoadingAdCampaigns(false);
                setCanFetchData(false);
            }
        } catch (error) {}
    };

    useEffect(() => {
        if (data?.user) {
            setIsLoading(false);
        }

        canFetchData && getAdCampaigns();
    }, [isLoading, loadingAdCampaigns, canFetchData, p]);

    // generate campaign assessment
    const generateAdCampaignAssessment = async (
        data: any,
        campaignId: string
    ) => {
        try {
            // campaign that will be assessed
            // cuting 3 properties from the original ad campaign
            const campaign_should_assessed = {
                "amount spent": `$${data.amount_spent}`,
                budget: `$${data.budget}`,
                "campaign objective":
                    data.campaign[0].campaign_objective?.toLowerCase(),
                "cost per result": `$${data.cost_per_result}`,
                cpc: `$${data.cpc}`,
                cpm: `$${data.cpm}`,
                ctr: data.ctr,
                frequency: data.frequency,
                impressions: data.impressions,
                "link clicks": data.link_clicks,
                reach: data.reach,
                results: data.results,
                "target countries": data.target_countries,
                "target gender": data.target_gender?.toLowerCase(),
            };

            setAdCampaignAssessment({
                data: "",
                campaignId,
                loading: true,
            });

            const response = await axios.post("/api/ad_campaign", {
                _type: "_GACA", // _GACA stands for GenerateAdCampaignAssessment
                campaign_should_assessed,
                query: "assess & analyze this campaign based on it's & objective in 100 characters",
            });

            if (response.data.data.success && response.status === 200) {
                setAdCampaignAssessment({
                    data: response.data.data.data.choices[0].text,
                    campaignId,
                    loading: false,
                });
            } else {
                setAdCampaignAssessment({
                    data: "",
                    campaignId,
                    loading: false,
                });
            }
        } catch (error: any) {
            // console.log('Err: ', error)
            if (error?.response.status === 700) {
                setUpgradeButtonClicked(true);
                setAdCampaignAssessment({
                    ...adCampaignAssessment,
                    loading: false,
                });
            }
        }
    };

    useEffect(() => {
        getAdCampaigns();
    }, [p]);

    useEffect(() => {}, [campaignShouldBeAssessed]);

    // campaign should be assessed
    // Are we selecting the queries or problems or solutions
    // Type: must be either queries || problems || solutions
    const handleCampaignShouldBeAssessed = async (
        data: any,
        type: "queries" | "problems" | "solutions",
        query: string
    ) => {
        setCampaignShouldBeAssessed({
            campaignData: {
                amount_spent: `$${data.amount_spent}`,
                budget: `$${data.budget}`,
                campaign_objective:
                    data.campaign[0].campaign_objective?.toLowerCase(),
                cost_per_result: `$${data.cost_per_result}`,
                cpc: `$${data.cpc}`,
                cpm: `$${data.cpm}`,
                ctr: data.ctr,
                frequency: data.frequency,
                impressions: data.impressions,
                link_clicks: data.link_clicks,
                reach: data.reach,
                results: data.results,
                target_countries: data.target_countries,
                target_gender: data.target_gender,
            },
            type,
            loading: true,
        });

        try {
            const response = await axios.post("/api/ad_campaign", {
                _type: "_G.Q.P.S", // _G.Q.P.S stands for Generate.Queries.Problems.Solutions
                campaign_should_assessed: campaignShouldBeAssessed.campaignData,
                query,
            });

            // console.log('local cmp', data)
            if (response.data.data.success) {
                setGeneratedData(response.data.data.data);
                setCampaignShouldBeAssessed({
                    campaignData: {
                        amount_spent: `$${data.amount_spent}`,
                        budget: `$${data.budget}`,
                        campaign_objective:
                            data.campaign[0].campaign_objective?.toLowerCase(),
                        cost_per_result: `$${data.cost_per_result}`,
                        cpc: `$${data.cpc}`,
                        cpm: `$${data.cpm}`,
                        ctr: data.ctr,
                        frequency: data.frequency,
                        impressions: data.impressions,
                        link_clicks: data.link_clicks,
                        reach: data.reach,
                        results: data.results,
                        target_countries: data.target_countries,
                        target_gender: data.target_gender,
                    },
                    type,
                    loading: false,
                });
            }
        } catch (error: any) {
            if (error?.response.status === 700) {
                setUpgradeButtonClicked(true);
                setCampaignShouldBeAssessed({
                    ...campaignShouldBeAssessed,
                    loading: false,
                });
            }
            // console.log('err', error)
        }
    };

    return (
        <>
            {!isLoading && (
                <AuthNav
                    setUpgradeButtonClicked={setUpgradeButtonClicked}
                    upgradeButtonClicked={upgradeButtonClicked}
                    user={data?.user}
                />
            )}

            {/* {upgradeButtonClicked && <Pricing showNav={false} />} */}

            {!upgradeButtonClicked &&
            !(
                data?.user?.limitRequests === 0 &&
                data?.user.limitCampaigns === 0 &&
                data?.user.limitAdCampaigns === 0
            ) ? (
                <>
                    <div className="max-w-screen-2xl w-full mx-auto mt-6 px-3">
                        <div className="max-w-screen-2xl w-full mx-auto mt-6 px-3">
                            <div className="flex justify-between w-full">
                                <div>
                                    <p className="text-white text-md">
                                        Your Ad Campaigns
                                    </p>

                                    {!loadingAdCampaigns &&
                                        !(adCampaigns[0]?.docs.length > 0) && (
                                            <p className="text-[#5d5d5d] text-[12px] mt-5">
                                                No campaigns yet!
                                            </p>
                                        )}
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            window.document.body.style.overflow =
                                                "hidden";
                                            setshowCreateAdModal(true);
                                        }}
                                        className="bg-alt-background text-typography-body-dark text-[13px] py-2 px-3 rounded-md"
                                    >
                                        Create Ad
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!loadingAdCampaigns && adCampaigns[0]?.docs.length > 0 && (
                        <div className="max-w-screen-2xl w-full mx-auto mt-6 px-3">
                            <div className=" max-h-96 h-full overflow-auto">
                                {!loadingAdCampaigns ? (
                                    <table className="relative w-full table-fixed">
                                        <thead className="bg-primary-background sticky top-0">
                                            <tr>
                                                <ThWIthToolTip
                                                    columnHeader="Campaign Objective"
                                                    cId={0}
                                                />
                                                <ThWIthToolTip
                                                    columnHeader="Budget"
                                                    cId={1}
                                                />
                                                <ThWIthToolTip
                                                    columnHeader="Amount Spent"
                                                    cId={2}
                                                />

                                                <ThWIthToolTip
                                                    columnHeader="Targeted Gender"
                                                    cId={3}
                                                />
                                                <ThWIthToolTip
                                                    columnHeader="Targeted Countries"
                                                    cId={4}
                                                />

                                                <ThWIthToolTip
                                                    columnHeader="Results"
                                                    cId={5}
                                                />
                                                <ThWIthToolTip
                                                    columnHeader="Cost per Result"
                                                    cId={6}
                                                />

                                                <ThWIthToolTip
                                                    columnHeader="Frequency"
                                                    cId={7}
                                                />
                                                <ThWIthToolTip
                                                    columnHeader="Reach"
                                                    cId={8}
                                                />
                                                <ThWIthToolTip
                                                    columnHeader="Impressions"
                                                    cId={9}
                                                />

                                                <ThWIthToolTip
                                                    columnHeader="CPC (cost per link click)"
                                                    cId={10}
                                                />
                                                <ThWIthToolTip
                                                    columnHeader="CPM (cost per 1,000 impressions)"
                                                    cId={11}
                                                />
                                                <ThWIthToolTip
                                                    columnHeader="CTR (link click-through rate)"
                                                    cId={12}
                                                />

                                                <ThWIthToolTip
                                                    columnHeader="Link Clicks"
                                                    cId={13}
                                                />

                                                <ThWIthToolTip
                                                    columnHeader="Campaign Assessment"
                                                    cId={14}
                                                />
                                                <ThWIthToolTip
                                                    columnHeader="Actions"
                                                    cId={15}
                                                />
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {adCampaigns[0].docs?.map(
                                                (
                                                    adCampaign: any,
                                                    index: any
                                                ) => (
                                                    <tr
                                                        key={adCampaign._id}
                                                        className="tr text-center"
                                                    >
                                                        <td className="td">
                                                            {
                                                                adCampaign
                                                                    .campaign[0]
                                                                    .campaign_objective
                                                            }
                                                        </td>
                                                        <td className="td">
                                                            {adCampaign.budget}
                                                        </td>
                                                        <td className="td">
                                                            {
                                                                adCampaign.amount_spent
                                                            }
                                                        </td>

                                                        <td className="td">
                                                            {
                                                                adCampaign.target_gender
                                                            }
                                                        </td>
                                                        <td className="td">
                                                            {
                                                                adCampaign.target_countries
                                                            }
                                                        </td>

                                                        <td className="td">
                                                            {adCampaign.results}
                                                        </td>
                                                        <td className="td">
                                                            {
                                                                adCampaign.cost_per_result
                                                            }
                                                        </td>
                                                        <td className="td">
                                                            {
                                                                adCampaign.frequency
                                                            }
                                                        </td>
                                                        <td className="td">
                                                            {adCampaign.reach}
                                                        </td>
                                                        <td className="td">
                                                            {
                                                                adCampaign.impressions
                                                            }
                                                        </td>
                                                        <td className="td">
                                                            {adCampaign.cpc}
                                                        </td>
                                                        <td className="td">
                                                            {adCampaign.cpm}
                                                        </td>
                                                        <td className="td">
                                                            {adCampaign.ctr}
                                                        </td>
                                                        <td className="td">
                                                            {
                                                                adCampaign.link_clicks
                                                            }
                                                        </td>
                                                        <td className="td">
                                                            {!(
                                                                adCampaign._id ===
                                                                adCampaignAssessment.campaignId
                                                            ) ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        generateAdCampaignAssessment(
                                                                            adCampaign,
                                                                            adCampaign._id
                                                                        )
                                                                    }
                                                                    className="shadow shadow-alt-background bg-zinc-700 py-1 px-2 text-[12px] text-white rounded-md"
                                                                >
                                                                    Generate
                                                                </button>
                                                            ) : (
                                                                <span className="flex flex-col justify-center items-center gap-2">
                                                                    {/* <TfiReload
                                                        onClick={() =>
                                                            generateAdCampaignAssessment(
                                                                adCampaign,
                                                                adCampaign._id
                                                            )
                                                        }
                                                        className="font-bold text-slate-300 cursor-pointer"
                                                        size={14}
                                                    />
                                                    {adCampaignAssessment.data} */}
                                                                    {adCampaignAssessment.loading ? (
                                                                        <BiLoaderAlt className="animate-spin" />
                                                                    ) : (
                                                                        <>
                                                                            <TfiReload
                                                                                onClick={() =>
                                                                                    generateAdCampaignAssessment(
                                                                                        adCampaign,
                                                                                        adCampaign._id
                                                                                    )
                                                                                }
                                                                                className="font-bold text-slate-300 cursor-pointer"
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                            {
                                                                                adCampaignAssessment.data
                                                                            }
                                                                        </>
                                                                    )}
                                                                </span>
                                                            )}

                                                            {/* {adCampaignAssessment.loading ===
                                                0 &&
                                                adCampaign._id ===
                                                    adCampaignAssessment.campaignId && (
                                                    <span className="flex flex-col justify-center items-center gap-2">
                                                        <TfiReload
                                                            onClick={() =>
                                                                generateAdCampaignAssessment(
                                                                    adCampaign,
                                                                    adCampaign._id
                                                                )
                                                            }
                                                            className="font-bold text-slate-300 cursor-pointer"
                                                            size={14}
                                                        />
                                                        {
                                                            adCampaignAssessment.data
                                                        }
                                                    </span>
                                                )}
                                            {adCampaignAssessment.loading ===
                                                1 &&
                                                adCampaign._id ===
                                                    adCampaignAssessment.campaignId && (
                                                    <span className="flex justify-center">
                                                        <BiLoaderAlt className="animate-spin" />
                                                    </span>
                                                )}
                                            {adCampaignAssessment.loading ===
                                                2 &&
                                                !(
                                                    adCampaign._id ===
                                                    adCampaignAssessment.campaignId
                                                ) && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            generateAdCampaignAssessment(
                                                                adCampaign,
                                                                adCampaign._id
                                                            )
                                                        }
                                                        className="shadow shadow-alt-background bg-zinc-700 py-1 px-2 text-[12px] text-white rounded-md"
                                                    >
                                                        Generate
                                                    </button>
                                                )} */}
                                                        </td>
                                                        <td className="flex items-center justify-center gap-1 td">
                                                            <button
                                                                title="Generate queries for this ad"
                                                                className="flex flex-col items-center justify-center bg-white text-gray-700 p-0.5 text-[12px] rounded-2xl px-2"
                                                                onClick={() =>
                                                                    handleCampaignShouldBeAssessed(
                                                                        adCampaigns[0]
                                                                            .docs[
                                                                            index
                                                                        ],
                                                                        "queries",
                                                                        "generate 5 short prompts that start w/ question to help improve&scale this campaign"
                                                                    )
                                                                }
                                                            >
                                                                <HiOutlineSquare2Stack />
                                                                Queries
                                                            </button>
                                                            <button
                                                                title="Find problems with this ad"
                                                                className="flex flex-col items-center justify-center bg-white text-gray-700 p-0.5 text-[12px] rounded-2xl px-2"
                                                                onClick={() =>
                                                                    handleCampaignShouldBeAssessed(
                                                                        adCampaigns[0]
                                                                            .docs[
                                                                            index
                                                                        ],
                                                                        "problems",
                                                                        "analyze & generate 5 problems w/ this campaign in 350 characters"
                                                                    )
                                                                }
                                                            >
                                                                <AiOutlineBug />
                                                                Problems
                                                            </button>
                                                            <button
                                                                title="Optimize your ad"
                                                                className="flex flex-col items-center justify-center bg-white text-gray-700 p-0.5 text-[12px] rounded-2xl px-2"
                                                                onClick={() =>
                                                                    handleCampaignShouldBeAssessed(
                                                                        adCampaigns[0]
                                                                            .docs[
                                                                            index
                                                                        ],
                                                                        "solutions",
                                                                        "generate 5 solution with suggestion to improve and make this campaign successful"
                                                                    )
                                                                }
                                                            >
                                                                <GiShieldcomb />
                                                                Solutions
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="w-full flex items-center justify-center gap-2 p-5">
                                        <BiLoader
                                            size={22}
                                            className="animate-spin text-slate-300 flex "
                                        />
                                        <span className="text-gray-300 text-[13px]">
                                            loading data...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {!loadingAdCampaigns && adCampaigns[0]?.docs.length > 0 && (
                        <>
                            <CampaignCard
                                componentTitle="Generated Queries"
                                componentSubtitle="This is a generated queries based on selected ad"
                                style="border border-slate-700"
                                annotated="queries"
                                campaignShouldBeAssessed={
                                    campaignShouldBeAssessed
                                }
                                generatedData={generatedData}
                            />

                            <CampaignCard
                                componentTitle="Problems in Your Ad"
                                componentSubtitle="This is the problems your ad is facing based on the selected ad"
                                style="border border-[#87585b]"
                                annotated="problems"
                                campaignShouldBeAssessed={
                                    campaignShouldBeAssessed
                                }
                                generatedData={generatedData}
                            />

                            <CampaignCard
                                componentTitle="Optimizing Your Ad"
                                componentSubtitle="Try optimizing your ad by applying these solutions."
                                style="border border-[#5c795c]"
                                annotated="solutions"
                                campaignShouldBeAssessed={
                                    campaignShouldBeAssessed
                                }
                                generatedData={generatedData}
                            />
                        </>
                    )}

                    {showCreateAdModal && (
                        <AdCampaignForm
                            toggle={showCreateAdModal}
                            toggleModel={setshowCreateAdModal}
                            fetchData={setCanFetchData}
                        />
                    )}
                </>
            ) : (
                <Pricing showNav={false} />
            )}

            {/* Pagination */}
            {!loadingAdCampaigns &&
                !(
                    data?.user.limitRequests === 0 &&
                    data?.user.limitCampaigns === 0 &&
                    data?.user.limitAdCampaigns === 0
                ) &&
                adCampaigns[0].totalPages > 1 && (
                    <div className="text-white flex justify-center max-w-md w-full mx-auto my-12">
                        {adCampaigns[0].hasPrevPage && (
                            <Link
                                href={`/auth/campaign/${campaign_id}?p=${adCampaigns[0].prevPage}`}
                                className="hover:bg-slate-400 rounded-full py-2 px-10"
                            >
                                Previous
                            </Link>
                        )}

                        {adCampaigns[0].hasNextPage && (
                            <Link
                                href={`/auth/campaign/${campaign_id}?p=${adCampaigns[0].nextPage}`}
                                className="hover:bg-slate-400 rounded-full py-2 px-10"
                            >
                                Next
                            </Link>
                        )}
                    </div>
                )}
        </>
    );
};

export default Ads;

export const getServerSideProps = async (ctx: any) => {
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: SIGN_IN_URI,
                permanent: false,
            },
        };
    }

    // is campaign exists in db
    const { campaign_id } = ctx.query;
    const isCampaignExists = await doesCampaignExists(campaign_id);

    if (!isCampaignExists) {
        return {
            notFound: true,
        };
    }

    return {
        props: { session },
    };
};
