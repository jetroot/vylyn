import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import NextCors from "nextjs-cors";
import paypal from "paypal-rest-sdk";

import { ResponseStatusCodes } from "@/config";
import { getPlanFeatures } from "@/data/pricing";
import { paySubscription, updateLimitCampaignsNumber } from "@/services";

export default async function payWithPaypal(
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

    // get method
    const { method } = req;
    const { returnResult } = req.query;
    const { userId, plan } = req.body;

    // console.log("method", method);
    // console.log("returnResult", returnResult);
    // console.log("userId", userId);
    // console.log("plan", plan);
    // console.log("planFeatures", planFeatures);

    // Execute payment when user approve the payment
    if (method === "GET" && returnResult === "success") {
        const { PayerID } = req.query;
        const { paymentId } = req.query;

        // Get price
        const { pe } = req.query;
        const returnedPrice = pe?.toString().substring(3);

        console.log("q", req.query);
        console.log("returnedPrice", returnedPrice);

        // is there a price
        if (!pe && !returnedPrice) {
            res.redirect("/payment/cancel");
            return;
        }

        const execute_payment_json = {
            payer_id: PayerID,
            transactions: [
                {
                    amount: {
                        currency: "USD",
                        total: `${returnedPrice}`,
                    },
                },
            ],
        };

        paypal.payment.execute(
            paymentId,
            execute_payment_json,
            async function (error, payment) {
                if (error) {
                    res.redirect("/payment/cancel");
                } else {
                    try {
                        // get custom properties e.g.
                        // userId , plan , price
                        const custom = JSON.parse(
                            payment.transactions[0].custom!
                        );

                        // check if user didn't change price in param url
                        if (
                            !(
                                returnedPrice?.toString() ===
                                custom.price.toString()
                            )
                        ) {
                            // console.log(`returnedPrice `)
                            throw new Error(ResponseStatusCodes.ERROR.msg);
                        }

                        // save data
                        await paySubscription(custom?.userId, custom?.plan);
                        res.redirect("/payment/success");

                    } catch (error) {
                        console.log("err.2 - execute", error);
                        res.redirect("/payment/cancel");
                    }
                    return;
                }
            }
        );
    }

    // When user cancel payment
    if (method === "GET" && returnResult === "cancel") {
        // res.send("cancel");
        res.redirect("/payment/cancel");
        return;
    }

    // redirect user to paypal payment
    if (method === "POST") {
        // is there a plan
        if (!userId || !plan) {
            res.redirect("/payment/cancel");
            return;
        }

        // get plan features
        const planFeatures = getPlanFeatures(plan);

        paypal.configure({
            mode: process.env.PAYPAL_SANDBOX_MODE!, //sandbox or live
            client_id: process.env.PAYPAL_CLIENT_ID!,
            client_secret: process.env.PAYPAL_CLIENT_SECRET!,
        });

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment?returnResult=success&pe=PE-${planFeatures?.price}`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment?returnResult=cancel`,
            },
            transactions: [
                {
                    amount: {
                        currency: "USD",
                        total: `${planFeatures?.price}`,
                    },
                    custom: JSON.stringify({
                        userId: `${userId}`,
                        plan: `${planFeatures?.plan}`,
                        price: `${planFeatures?.price}`,
                    }),
                },
            ],
        };

        paypal.payment.create(create_payment_json, async function (error, payment) {
            if (error) {
                console.log("err", JSON.stringify(error));
                throw error;
            } else {
                console.log("Create Payment Response");

                try {
                    // await updateLimitCampaignsNumber(token.sub!);
                    payment.links?.forEach(async (pay) => {
                        if (pay.rel === "approval_url") {
                            res.status(ResponseStatusCodes.OK.status).json({
                                success: true,
                                data: {
                                    forwardLink: pay.href,
                                },
                            });
                            return;
                        }
                    });
                } catch (error) {
                    res.redirect("/payment/cancel");
                    return;
                }
            }
        });
    }
}
