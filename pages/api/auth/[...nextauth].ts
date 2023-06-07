import NextAuth from "next-auth/next";
import { encode } from "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

import { connectToDb } from "@/config";
import User from "@/schema/UserSchema";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({
            user,
            account,
            profile,
            email,
            credentials,
        }): Promise<string | boolean> {
            // is user authenticated
            let isAuthenticate: boolean = false;

            if (user.id) {
                try {
                    // encode the token
                    const tk = await encode({
                        token: user as any,
                        secret: process.env.NEXTAUTH_SECRET!,
                    });

                    // send the request to
                    // create new user
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/register`,
                        {
                            email: user.email,
                            userId: user.id,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${tk}`,
                            },
                        }
                    );

                    // authenticate the user
                    if (res.status === 201 || res.status === 200) {
                        isAuthenticate = true;
                    }
                } catch (error) {
                    isAuthenticate = false;
                } finally {
                    return isAuthenticate;
                }
            } else {
                return false;
            }
        },
        async session({ session, token, user }: any) {
            // get user plan from db
            await connectToDb().then(async () => {
                //search for emails related to this person
                let userExists: any = await User.findOne({
                    userId: token.sub,
                }).exec();

                // Send user properties to the client
                if (userExists) {
                    session.user.id = token.sub;
                    session.user.plan = userExists.plan;
                    session.user.limitRequests = userExists.limitRequests;
                    session.user.limitCampaigns = userExists.limitCampaigns;
                    session.user.limitAdCampaigns = userExists.limitAdCampaigns;
                }
            });

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        error: "/error",
    },
});
