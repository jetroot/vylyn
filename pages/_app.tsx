import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { UserContextProvider } from "@/context";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

import { useState } from "react";
import { ACCESS_TOKEN_NAME_IN_COOKIES } from "@/config";

export default function App({
    Component,
    pageProps,
}: AppProps<{ initialSession: Session }>) {
    // Create a new supabase browser client on every first render.
    const [supabaseClient] = useState(() =>
        createBrowserSupabaseClient({
            cookieOptions: {
                name: ACCESS_TOKEN_NAME_IN_COOKIES,
            },
        })
    );

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.png" />
                <title>Vylyn - 10x better campaigns</title>
                <meta
                    property="description"
                    content="10x better campaigns using AI"
                />
            </Head>

            <SessionContextProvider
                supabaseClient={supabaseClient}
                initialSession={pageProps.initialSession}
            >
                <UserContextProvider>
                    <Component {...pageProps} />
                </UserContextProvider>
            </SessionContextProvider>
        </>
    );
}
