// import { CampaignObjectives, CampaignStatus } from "@/types";
// import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

// const CampaignSchema = new mongoose.Schema(
//     {
//         campaign_status: {
//             type: String,
//             enum: CampaignStatus,
//         },
//         campaign_title: { type: String, maxlength: 77 },
//         campaign_objective: {
//             type: String,
//             enum: CampaignObjectives,
//         },
//         user_id: String,
//     },
//     { timestamps: true }
// );

// // paginate with this plugin
// CampaignSchema.plugin(mongoosePaginate);

// const Campaign = mongoose.model("Campaign", CampaignSchema);

// export default Campaign;

// =====================================================================

// import mongoose, { Schema, Document } from "mongoose";
// import paginate from "mongoose-paginate-v2";

// // Declare the interface representing your schema
// interface CampaignData {
//     name: string;
// }

// // Declare your schema
// const campaignSchema: Schema<CampaignDocument> = new Schema<CampaignDocument>({
//     name: String,
// });

// // Paginate with the plugin
// campaignSchema.plugin(paginate);

// // Declare a mongoose document based on the interface representing your schema
// interface CampaignDocument extends Document, CampaignData {}

// // Create the paginated model
// const Campaign = mongoose.model<
//     CampaignDocument,
//     mongoose.PaginateModel<CampaignDocument>
// >("Campaigns", campaignSchema, "campaigns");

// export default Campaign;

// ========================================================
import { CampaignObjectives, CampaignStatus } from "@/types";
import mongoose, { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface ICampaign extends Document {
    campaign_status: {
        type: String;
        enum: CampaignStatus;
    };
    campaign_title: { type: String; maxlength: 77 };
    campaign_objective: {
        type: String;
        enum: CampaignObjectives;
    };
    user_id: String;
}

const CampaignSchema: Schema<ICampaign> = new Schema(
    {
        campaign_status: {
            type: String,
            enum: CampaignStatus,
        },
        campaign_title: {
            type: String,
            maxlength: 77,
        },
        campaign_objective: {
            type: String,
            enum: CampaignObjectives,
        },
        user_id: String,
    },
    { timestamps: true }
);

CampaignSchema.plugin(mongoosePaginate);

const Campaign = mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", CampaignSchema);

export default Campaign;
