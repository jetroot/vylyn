import { Gender } from "@/types";
import mongoose, { Schema,  } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const AdCampaignSchema = new Schema(
    {
        budget: String,
        amount_spent: String,
        target_gender: {
            type: String,
            enum: Gender,
        },
        target_countries: String,
        results: String,
        cost_per_result: String,
        frequency: String,
        reach: String,
        impressions: String,
        cpc: String,
        cpm: String,
        ctr: String,
        link_clicks: String,
        campaign_id: {
            type: Schema.Types.ObjectId,
            ref: "Campaign",
        },
    },
    { timestamps: true }
);

AdCampaignSchema.plugin(aggregatePaginate);

const AdCampaign =
    mongoose.models.AdCampaign ||
    mongoose.model("AdCampaign", AdCampaignSchema);

export default AdCampaign;
