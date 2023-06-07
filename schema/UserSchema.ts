import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        // userId: String,
        // email: {
        //     type: String,
        // },
        // plan: {
        //     type: String,
        //     default: null,
        // },
        // expired: {
        //     type: Boolean,
        //     default: false,
        // },
        // limitRequests: {
        //     type: Number,
        //     default: 5,
        // },
        // paidAt: {
        //     type: Date,
        //     default: null,
        // },
        // expiresIn: {
        //     type: Date,
        //     default: null,
        // },

        // New
        userId: String,
        email: {
            type: String,
        },
        plan: {
            type: String,
            default: "Free",
        },
        limitRequests: {
            type: Number,
            default: 9,
        },
        limitCampaigns: {
            type: Number,
            default: 1,
        },
        limitAdCampaigns: {
            type: Number,
            default: 2,
        },
        paidAt: {
            type: Date,
            default: null,
        },
        expiredAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
