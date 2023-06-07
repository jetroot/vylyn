import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

import axios from "axios";
import Link from "next/link";

import { BiLoader } from "react-icons/bi";
import { RiLoader3Fill } from "react-icons/ri";

import AuthNav from "@/components/Nav/AuthNav";
import { SIGN_IN_URI } from "@/config";
import FormModel from "@/components/Form/FormModel";
import Pricing from "../pricing";
import { useRouter } from "next/router";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [campaigns, setCampaigns] = useState<any>([]);
    const [canFetchData, setCanFetchData] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isMovingToAdCampaigns, setIsMovingToAdCampaigns] = useState(false);
    const [upgradeButtonClicked, setUpgradeButtonClicked] = useState(false);

    const { data }: any = useSession();
    const router = useRouter();
    let { p }: any = router.query;

    if (!p) {
        p = 1;
    }

    const getCampaigns = async () => {
        try {
            setIsLoadingData(true);
            // get campaigns data
            const response = await axios.get(`/api/campaign?p=${p}`, {
                withCredentials: true,
            });

            // console.log("res", response.data.data?.campaigns[0].docs);
            setCampaigns(response.data.data?.campaigns[0]);
            // console.log("res", response.data.data.campaigns[0]);
            // console.log("p", p);

            setCanFetchData(false);
            setIsLoadingData(false);
        } catch (error) {
            console.log("err");
        }
    };

    useEffect(() => {
        if (data?.user) {
            setIsLoading(false);
        }

        canFetchData && getCampaigns();
    }, [isLoading, canFetchData]);

    useEffect(() => {
        getCampaigns();
    }, [p]);

    return !isLoading ? (
        <>
            {isMovingToAdCampaigns && (
                <div className="overflow-hidden w-screen">
                    <div className="bg-brandPaltte-400 h-[3px] w-1/2 animate-wiggle"></div>
                </div>
            )}
            <AuthNav
                setUpgradeButtonClicked={setUpgradeButtonClicked}
                upgradeButtonClicked={upgradeButtonClicked}
                user={data?.user}
            />

            {upgradeButtonClicked && <Pricing showNav={false} />}

            {!upgradeButtonClicked && (
                <div className="max-w-screen-2xl w-full mx-auto mt-6 px-3">
                    <div className="flex justify-between w-full">
                        {!(
                            data?.user.limitRequests === 0 &&
                            data?.user.limitCampaigns === 0 &&
                            data?.user.limitAdCampaigns === 0
                        ) && (
                            <div>
                                <p className="text-white text-md">
                                    Your Ad Campaigns
                                </p>

                                {!isLoadingData &&
                                    campaigns.docs.length === 0 && (
                                        <p className="text-[#5d5d5d] text-[12px] mt-5">
                                            No campaigns yet!
                                        </p>
                                    )}
                            </div>
                        )}

                        {!(
                            data?.user.limitRequests === 0 &&
                            data?.user.limitCampaigns === 0 &&
                            data?.user.limitAdCampaigns === 0
                        ) ? (
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setShowModel(true)}
                                    className="bg-alt-background text-typography-body-dark text-[13px] py-2 px-3 rounded-md"
                                >
                                    Create Campaign
                                </button>
                            </div>
                        ) : (
                            <Pricing showNav={false} />
                        )}
                    </div>

                    {/* Start */}
                    {!isLoadingData &&
                        !(
                            data?.user.limitRequests === 0 &&
                            data?.user.limitCampaigns === 0 &&
                            data?.user.limitAdCampaigns === 0
                        ) && (
                            <div className="grid grid-cols-3 place-items-center gap-x-4 max-md:grid-cols-1 max-md:mx-auto">
                                {campaigns.docs.map((campaign: any) => (
                                    <div
                                        className="w-full h-auto mt-2 mb-6"
                                        key={campaign._id}
                                    >
                                        <Link
                                            onClick={() =>
                                                setIsMovingToAdCampaigns(true)
                                            }
                                            href={`/auth/campaign/${campaign._id}`}
                                            className="w-full max-w-xl shadow-[0_-1px_0_0_#5d5d5d,0_2px_0_2px_#161616] flex flex-col h-72 p-6 rounded-lg mt-8 "
                                        >
                                            <div className="uppercase text-[#5d5d5d] text-right font-medium ">
                                                {campaign.campaign_status}
                                            </div>
                                            <div className="capitalize overflow-hidden text-2xl leading-10 text-left text-[#cdcdcd] py-14 max-w-md">
                                                {campaign.campaign_title}
                                            </div>
                                            <div className="capitalize flex justify-between w-full text-[#5d5d5d]">
                                                <div className="">
                                                    {
                                                        campaign.campaign_objective
                                                    }
                                                </div>
                                                <div>
                                                    {new Date(
                                                        campaign.createdAt
                                                    )
                                                        .toDateString()
                                                        .substring(4)}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                    {isLoadingData && (
                        <div className="w-full flex justify-center items-center">
                            <RiLoader3Fill
                                size={30}
                                className="text-slate-300 animate-spin text-center"
                            />
                        </div>
                    )}
                    {/* End */}

                    {/* Pagination */}
                    {!isLoadingData &&
                        !(
                            data?.user.limitRequests === 0 &&
                            data?.user.limitCampaigns === 0 &&
                            data?.user.limitAdCampaigns === 0
                        ) &&
                        campaigns.totalPages > 1 && (
                            <div className="text-white flex justify-center max-w-md w-full mx-auto my-12">
                                {campaigns.hasPrevPage && (
                                    <Link
                                        href={`/auth/dashboard?p=${campaigns.prevPage}`}
                                        className="hover:bg-slate-400 rounded-full py-2 px-10"
                                    >
                                        Previous
                                    </Link>
                                )}

                                {campaigns.hasNextPage && (
                                    <Link
                                        href={`/auth/dashboard?p=${campaigns.nextPage}`}
                                        className="hover:bg-slate-400 rounded-full py-2 px-10"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        )}

                    {showModel && (
                        <FormModel
                            toggle={showModel}
                            toggleModel={setShowModel}
                            fetchData={setCanFetchData}
                        />
                    )}
                </div>
            )}
        </>
    ) : (
        <div className="flex flex-col justify-center items-center w-screen h-screen overflow-hidden">
            <BiLoader className="animate-spin" color="white" />
            <p className="text-typography-body-dark text-[12px]">
                Checking User...
            </p>
        </div>
    );
};

export default Dashboard;

export const getServerSideProps = async (ctx: any) => {
    const session = await getSession(ctx);
    // console.log("sess", session);

    if (!session) {
        return {
            redirect: {
                destination: SIGN_IN_URI,
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};
