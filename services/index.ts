import { ResponseStatusCodes, connectToDb } from "@/config";
import { getPlanFeatures } from "@/data/pricing";
import AdCampaign from "@/schema/AdCampaignSchema";
import Campaign from "@/schema/CampaignSchema";
import User from "@/schema/UserSchema";
import mongoose from "mongoose";

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

// Check if campaign exists
export const doesCampaignExists = async (
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

            adCampaign.match({
                campaign_id: new mongoose.Types.ObjectId(campaignId),
            });

            const options = {
                page,
            };

            await AdCampaign.aggregatePaginate(adCampaign, options)
                .then(function (results: any) {
                    // results.docs.map((result: any) => {
                    //     if (result.campaign_id.toString() === campaignId) {
                    //         data.push(result);
                    //     }
                    // });

                    // console.log("results", results);
                    data.push(results);
                })
                .catch(function (err: any) {
                    // console.log("err", err);
                });
        });
    } catch (error) {
        // console.log("err", error);
    } finally {
        return data;
    }
};

// Update limit ad campaigns number
export const updateLimitAdCampaignsNumber = async (userId: string) => {
    try {
        await connectToDb()
            .then(async () => {
                await User.findOneAndUpdate(
                    { userId, limitAdCampaigns: { $gt: 0 } },
                    {
                        $inc: {
                            limitAdCampaigns: -1,
                        },
                    }
                );
            })
            .catch(() => {
                // console.log("1. err");
                throw new Error(ResponseStatusCodes.ERROR.msg);
            });
    } catch (error) {
        // console.log("2. err", error);
        throw new Error(ResponseStatusCodes.ERROR.msg);
    }
};

// Update limit campaigns number
export const updateLimitCampaignsNumber = async (userId: string) => {
    try {
        await connectToDb()
            .then(async () => {
                await User.findOneAndUpdate(
                    { userId, limitCampaigns: { $gt: 0 } },
                    {
                        $inc: {
                            limitCampaigns: -1,
                        },
                    }
                );
            })
            .catch(() => {
                // console.log("1. err");
                throw new Error(ResponseStatusCodes.ERROR.msg);
            });
    } catch (error) {
        // console.log("2. err", error);
        throw new Error(ResponseStatusCodes.ERROR.msg);
    }
};

// Update limit requests number
export const updateLimitRequests = async (userId: string) => {
    try {
        await connectToDb()
            .then(async () => {
                await User.findOneAndUpdate(
                    { userId, limitRequests: { $gt: 0 } },
                    {
                        $inc: {
                            limitRequests: -1,
                        },
                    }
                );
            })
            .catch(() => {
                // console.log("1. err");
                throw new Error(ResponseStatusCodes.ERROR.msg);
            });
    } catch (error) {
        // console.log("2. err", error);
        throw new Error(ResponseStatusCodes.ERROR.msg);
    }
};

// Pay subscription
export const paySubscription = async (userId: string, plan: string) => {
    try {
        // paidAt and expiredAt properties
        const paidAt = Date.now();
        const expiredAt = new Date();
        expiredAt.setMonth(expiredAt.getMonth() + 1);

        // get plan features
        const planFeatures = getPlanFeatures(plan);
        // console.log("plan__", planFeatures?.plan);

        // return;
        // data that should be updated
        const data = {
            plan,
            limitRequests: planFeatures?.limitRequests,
            limitCampaigns: planFeatures?.limitCampaigns,
            limitAdCampaigns: planFeatures?.limitAdCampaigns,
            paidAt,
            expiredAt,
        };

        // check if there data
        if (
            !plan &&
            !planFeatures?.plan &&
            !planFeatures?.limitRequests &&
            !planFeatures?.limitCampaigns &&
            !planFeatures?.limitAdCampaigns
        ) {
            throw new Error("data cannot be null");
        }

        await connectToDb()
            .then(async () => {
                await User.findOneAndUpdate(
                    // Query condition to find the document
                    { userId },

                    // Update object with the new values
                    data
                )
                    .then((updatedUser) => {
                        // console.log("updatedUser", updatedUser);
                    })
                    .catch(() => {
                        throw new Error("something went wrong");
                    });
            })
            .catch(() => {
                throw new Error("something went wrong");
            });
    } catch (error) {
        throw new Error("something went wrong");
    }
};

// Check limits of requests, campaigns, adcampaigns
export const checkLimits = async (
    userId: string,
    type: string
): Promise<boolean> => {
    let isLimitReached = false;

    try {
        await connectToDb()
            .then(async () => {
                const data = await User.findOne({ userId });
                // console.log("data", data);

                // console.log("type", type);
                // console.log(`data[${type}]`, data[`${type}`]);
                // console.log(`data[${type}] > 0`, data[`${type}`] > 0);

                if (!(parseInt(data[`${type}`]) === 0)) {
                    // console.log("inside");
                    isLimitReached = false;
                    return isLimitReached;
                }

                isLimitReached = true;
            })
            .catch(() => {
                isLimitReached = false;
            });
    } catch (error) {
        isLimitReached = false;
    } finally {
        // console.log("isLimitReached", isLimitReached);
        return isLimitReached;
    }
};
