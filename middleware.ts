import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_NAME_IN_COOKIES } from "./config";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/auth")) {
        const url = request.nextUrl;

        // If secret keys match, allow access
        if (url.searchParams.has("tk") && url.searchParams.has("rt")) {
            // Getting Data from params
            const rt = url.searchParams.get("rt");
            const tk = url.searchParams.get("tk")!;

            // response
            let res = NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/${rt}`
            );

            // Set the cookie in the response
            res.cookies.set(ACCESS_TOKEN_NAME_IN_COOKIES, tk, {
                maxAge: 3600, // Maximum age of the cookie in seconds (1 hour)
                path: "/",
                secure: true, // Set to true for HTTPS only
                sameSite: "strict",
            });

            return res;
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/auth/:path*",
};
