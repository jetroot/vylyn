import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import User from "@/schema/UserSchema";
import { ResponseStatusCodes, connectToDb } from "@/config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // get data
    // const { userId, email } = req.body;

    // verify the token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

    // Invalid token
    if (!token) {
        res.status(ResponseStatusCodes.UNAUTHORIZED.status).json({
            data: { msg: ResponseStatusCodes.UNAUTHORIZED.msg },
        });

        return;
    }

    // there is a token
    try {
        await connectToDb()
            .then(async () => {
                // user already signed up
                const userExists: any = await User.findOne({
                    userId: token.id,
                    email: token.email
                });

                // user already exists in db
                if (userExists) {
                    res.status(
                        ResponseStatusCodes.OK.status
                    ).json({
                        data: {
                            msg: ResponseStatusCodes.OK.msg,
                        },
                    });

                    return;
                }

                // Create new user & save it
                const newSubscirbe = await new User({
                    email: token.email,
                    userId: token.id,
                });
                await newSubscirbe.save();
                res.status(ResponseStatusCodes.CREATED.status).json({
                    data: {
                        msg: ResponseStatusCodes.CREATED.msg,
                    },
                });
            })
            .catch((err) => {
                res.status(ResponseStatusCodes.ERROR.status).json({
                    data: {
                        msg: ResponseStatusCodes.ERROR.msg,
                    },
                });
            });
    } catch (error) {
        res.status(ResponseStatusCodes.ERROR.status).json({
            data: {
                msg: ResponseStatusCodes.ERROR.msg,
            },
        });
    }
};
