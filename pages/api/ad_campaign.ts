import { FullAdCampaignSchema } from "@/components/Form/schema";
import { OpenAiConfiguration, ResponseStatusCodes } from "@/config";
import {
    checkLimits,
    createNewAdCampaign,
    getAdCampaigns,
    updateLimitAdCampaignsNumber,
    updateLimitRequests,
} from "@/services";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import NextCors from "nextjs-cors";
import { OpenAIApi } from "openai";

export default async function createAdCampaign(
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
    const { _type, campaign_should_assessed, query } = req.body;

    // generate ad campaign assessment
    if (method === "POST" && _type === "_GACA") {
        try {
            const isLimitReached = await checkLimits(
                token.sub!,
                "limitRequests"
            );

            if (isLimitReached) {
                res.status(ResponseStatusCodes.LIMIT_REACHED.status).json({
                    data: {
                        success: false,
                        msg: ResponseStatusCodes.LIMIT_REACHED.msg,
                        data: [],
                    },
                });
                return;
            }

            const openai = new OpenAIApi(OpenAiConfiguration);

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${query}\n` + campaign_should_assessed,
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            // update limit requests
            await updateLimitRequests(token.sub!);

            res.status(ResponseStatusCodes.OK.status).json({
                data: {
                    success: true,
                    data: response.data,
                },
            });
            return;
        } catch (error) {
            res.status(ResponseStatusCodes.ERROR.status).json({
                data: {
                    msg: ResponseStatusCodes.ERROR.msg,
                    success: false,
                    data: null,
                },
            });
            return;
        }
    }

    // generate queries or problems || solutions
    if (method === "POST" && _type === "_G.Q.P.S") {
        try {
            const isLimitReached = await checkLimits(
                token.sub!,
                "limitRequests"
            );

            if (isLimitReached) {
                res.status(ResponseStatusCodes.LIMIT_REACHED.status).json({
                    data: {
                        success: false,
                        msg: ResponseStatusCodes.LIMIT_REACHED.msg,
                        data: [],
                    },
                });
                return;
            }

            const openai = new OpenAIApi(OpenAiConfiguration);
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${query}\n` + JSON.stringify(campaign_should_assessed),
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            // convert open ai response into array & Filter out empty elements
            const splittedData = response.data.choices[0].text?.split("\n");
            const trimmedArray = splittedData?.filter((item) => {
                return Array.isArray(item) ? item.length > 0 : item !== "";
            });

            // update limit requests
            await updateLimitRequests(token.sub!);

            res.status(ResponseStatusCodes.OK.status).json({
                data: {
                    success: true,
                    data: trimmedArray,
                },
            });

            return;
        } catch (error) {
            res.status(ResponseStatusCodes.ERROR.status).json({
                data: {
                    msg: ResponseStatusCodes.ERROR.msg,
                    success: false,
                    data: [],
                },
            });
            return;
        }
    }

    // Generate response for query
    if (method === "POST" && _type === "_GRFQ") {
        const isLimitReached = await checkLimits(token.sub!, "limitRequests");

        if (isLimitReached) {
            res.status(ResponseStatusCodes.LIMIT_REACHED.status).json({
                data: {
                    msg: ResponseStatusCodes.LIMIT_REACHED.msg,
                    success: false,
                    data: [],
                },
            });
            return;
        }

        const { question } = req.body;

        // console.log("q", question);
        // console.log("campaign data", campaign_should_assessed);
        // console.log("_type", _type);

        try {
            const openai = new OpenAIApi(OpenAiConfiguration);
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt:
                    `${question}\n` + JSON.stringify(campaign_should_assessed),
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            if (response.status === 200) {
                // update limit requests
                await updateLimitRequests(token.sub!);
                res.status(ResponseStatusCodes.OK.status).json({
                    // question,
                    // _type,
                    // campaign_should_assessed,
                    // data: response.data.choices[0].text,
                    // success: true,
                    data: {
                        success: true,
                        data: response.data.choices[0].text,
                    },
                });

                return;
            }

            return;
        } catch (error) {
            res.status(ResponseStatusCodes.ERROR.status).json({
                data: {
                    msg: ResponseStatusCodes.ERROR.msg,
                    success: false,
                    data: "",
                },
            });

            return;
        }
    }

    // Create new ad campaign
    if (method === "POST") {
        const isLimitReached = await checkLimits(
            token.sub!,
            "limitAdCampaigns"
        );

        if (isLimitReached) {
            res.status(ResponseStatusCodes.ERROR.status).json({
                data: {
                    msg: "You have reached your limits in creating new ad campaigns",
                    success: false,
                },
            });
            return;
        }

        // Create new ad campaign
        // get data
        const data = req.body;

        // is data from client valid
        const isValidated = await FullAdCampaignSchema.isValid(data.values);

        if (!isValidated && !data.campaign_id) {
            res.status(400).json({
                data: {
                    msg: ResponseStatusCodes.BAD_REQUEST.msg,
                    success: false,
                },
            });
            return;
        }

        // create new campaign
        let isAdCampaignSaved = await createNewAdCampaign(
            data.values,
            data.campaign_id
        );

        if (isAdCampaignSaved) {
            // Update limit ad campaigns number
            await updateLimitAdCampaignsNumber(token.sub!);
            res.status(ResponseStatusCodes.CREATED.status).json({
                data: {
                    msg: ResponseStatusCodes.CREATED.msg,
                    success: true,
                },
            });

            return;
        }

        res.status(ResponseStatusCodes.ERROR.status).json({
            data: { msg: ResponseStatusCodes.ERROR.msg, success: false },
        });
    }

    // Get Ad campaigns
    if (method === "GET") {
        // get data
        // const data = req.body;
        const { campaign_id, p } = req.headers;

        // Send ad campaigns
        const adCampaigns = await getAdCampaigns(`${campaign_id}`, parseInt(p?.toString()!));

        if (adCampaigns) {
            res.status(ResponseStatusCodes.OK.status).json({
                data: {
                    adCampaigns,
                    success: true,
                },
            });
        } else {
            res.status(ResponseStatusCodes.OK.status).json({
                data: {
                    adCampaigns,
                    success: false,
                },
            });
        }
    }
}
