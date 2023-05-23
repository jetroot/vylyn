import { connectToDb } from "@/config";
import Campaign from "@/schema/CampaignSchema";

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
            console.log("campaigns", campaigns);
            data.push(campaigns);
        });
    } catch (error) {
        console.log("err", error);
    } finally {
        return data;
    }
};
