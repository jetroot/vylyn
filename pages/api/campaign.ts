import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import NextCors from "nextjs-cors";

import { ResponseStatusCodes } from "@/config";
import {
    checkLimits,
    createNewCampaign,
    getCampaigns,
    updateLimitCampaignsNumber,
} from "@/services";

export default async function createCampaign(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Nextjs-cors
    await NextCors(req, res, {
        // Options
        methods: ["GET", "PUT", "POST", "DELETE"],
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000/",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    // verify the token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Invalid token
    if (!token) {
        res.status(ResponseStatusCodes.UNAUTHORIZED.status).json({
            data: { msg: ResponseStatusCodes.UNAUTHORIZED.msg, success: false },
        });

        return;
    }

    // Get request method
    const { method } = req;
    const { p } = req.query;
    // console.log("query", req.query);
    // console.log("method", method);

    // Create new campaign
    if (method === "POST") {
        
        const isLimitReached = await checkLimits(token.sub!, "limitCampaigns");

        if (isLimitReached) {
            res.status(ResponseStatusCodes.ERROR.status).json({
                data: {
                    msg: "You have reached your limits in creating new campaigns",
                    success: false,
                },
            });
            return;
        }

        // Get data
        const { campaign_status, campaign_title, campaign_objective } =
            req.body;

        // check if data exists
        if (!campaign_status && !campaign_title && !campaign_objective) {
            res.status(ResponseStatusCodes.ERROR.status).json({
                data: { msg: ResponseStatusCodes.ERROR.msg, success: false },
            });

            return;
        }

        // create new campaign
        let isCampaignSaved = await createNewCampaign(
            campaign_status,
            campaign_title,
            campaign_objective,
            token.sub!
        );

        if (isCampaignSaved) {
            // update limit campaigns number in db
            try {
                await updateLimitCampaignsNumber(token.sub!);

                res.status(ResponseStatusCodes.CREATED.status).json({
                    data: {
                        msg: ResponseStatusCodes.CREATED.msg,
                        success: true,
                    },
                });

                return;
            } catch (error) {
                res.status(ResponseStatusCodes.ERROR.status).json({
                    data: {
                        msg: ResponseStatusCodes.ERROR.msg,
                        success: false,
                    },
                });
            }
        }
    }

    // Get campaigns
    if (method === "GET") {
        const campaigns = await getCampaigns(token.sub!, p);
        // console.log('camps', campaigns)
        res.status(ResponseStatusCodes.OK.status).json({
            data: {
                campaigns,
            },
        });
        return;
    }
}
