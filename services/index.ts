import { OpenAiConfiguration, connectToDb } from "@/config";
import AdCampaign from "@/schema/AdCampaignSchema";
import Campaign from "@/schema/CampaignSchema";
// import mongoose from "mongoose";
import { OpenAIApi } from "openai";
// import aggregatePaginate from "mongoose-aggregate-paginate-v2";

// Create new campaign
export const createNewCampaign = async (
    campaign_status: string,
    campaign_title: string,
    campaign_objective: string,
    user_id: string
): Promise<boolean> => {
    let isCampaignSaved = false;

    try {
        await connectToDb()
            .then(async () => {
                const newCampaign = await new Campaign({
                    campaign_status,
                    campaign_title,
                    campaign_objective,
                    user_id,
                });

                await newCampaign.save();
                isCampaignSaved = true;
            })
            .catch((err) => {
                isCampaignSaved = false;
            });
    } catch (error) {
        isCampaignSaved = false;
    } finally {
        return isCampaignSaved;
    }
};

// Get all campaigns
export const getCampaigns = async (
    userId: string,
    page: number
): Promise<any> => {
    let data: any = [];

    try {
        await connectToDb().then(async () => {
            const campaigns = await Campaign.paginate(
                { user_id: userId },
                { page }
            );
            data.push(campaigns);
        });
    } catch (error) {
        console.log("err", error);
    } finally {
        return data;
    }
};

// Create new ad campaign\
export const createNewAdCampaign = async (data: any, campaign_id: string) => {
    let isAdCampaignSaved = false;

    try {
        await connectToDb()
            .then(async () => {
                const newAdCampaign = await new AdCampaign({
                    ...data,
                    campaign_id,
                });

                await newAdCampaign.save();
                isAdCampaignSaved = true;
            })
            .catch((err) => {
                isAdCampaignSaved = false;
            });
    } catch (error) {
        isAdCampaignSaved = false;
    } finally {
        return isAdCampaignSaved;
    }
};

// Get campaign by id
export const getCampaignById = async (
    campaign_id: string
): Promise<boolean> => {
    let isCampaignExists = false;

    try {
        await connectToDb()
            .then(async () => {
                const campaign = await Campaign.findOne({
                    _id: campaign_id,
                });

                if (campaign) {
                    isCampaignExists = true;
                } else {
                    isCampaignExists = false;
                }
            })
            .catch((err) => {
                isCampaignExists = false;
            });
    } catch (error) {
        isCampaignExists = false;
    } finally {
        return isCampaignExists;
    }
};

// Get all campaigns
export const getAdCampaigns = async (
    campaignId: string,
    page: number
): Promise<any> => {
    let data: any = [];

    try {
        await connectToDb().then(async () => {

            const adCampaign = AdCampaign.aggregate();
            adCampaign.lookup({
                from: "campaigns", // The collection name for the related model
                localField: "campaign_id", // Foreign key field in the current collection (AdCampaign)
                foreignField: "_id", // Primary key field in the related collection (Campaign)
                as: "campaign", // Alias for the populated user document
            });

            const options = {
                page,
            };

            await AdCampaign.aggregatePaginate(adCampaign, options)
                .then(function (results: any) {

                    results.docs.map((result) => {

                        if (result.campaign_id.toString() === campaignId) {
                            data.push(result);
                        }
                    });
                })
                .catch(function (err: any) {
                    console.log("err", err);
                });
        });
    } catch (error) {
        console.log("err", error);
    } finally {
        return data;
    }
};