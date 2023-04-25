import mongoose from "mongoose";

const joinSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
);

const Join = mongoose.models.Join || mongoose.model("Join", joinSchema);

export default Join;
