import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { SessionProvider } from "next-auth/react";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
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

            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    );
}
