// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Join from "./schema";
import NextCors from "nextjs-cors";

type Response = {
    msg: string | any;
    subMessage: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000/",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        const { email } = req.body;
        const mongoDbUrl: any = process.env.MONGO_DB_URI;

        if (req.method === "POST" && email) {
            mongoose
                .connect(mongoDbUrl)
                .then(async () => {
                    //search for emails related to this person
                    let subscribedEmail: any = await Join.findOne({
                        email: email,
                    }).exec();
                    if (subscribedEmail)
                        res.status(500).json({
                            msg: "You have already joined!",
                            subMessage: "",
                        });
                    // Create new user
                    const newSubscirbe = new Join({
                        email,
                    });
                    await newSubscirbe.save();

                    res.status(201).json({
                        msg: "Thank you",
                        subMessage:
                            "We appreciate your patience while we finalize the details.",
                    });
                })
                .catch((err) =>
                    res
                        .status(500)
                        .json({ msg: "Something went wrong!", subMessage: "" })
                );
        }
    } catch (error) {
        res.status(500).json({ msg: error, subMessage: "" });
    }
}
