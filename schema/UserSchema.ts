import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        userId: String,
        email: {
            type: String,
        },
        plan: {
            type: String,
            default: null,
        },
        expired: {
            type: Boolean,
            default: false,
        },
        limitRequests: {
            type: Number,
            default: 5,
        },
        paidAt: {
            type: Date,
            default: null,
        },
        expiresIn: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
