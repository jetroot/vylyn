import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { UserContextProvider } from "@/context";

export default function App({ Component, pageProps }: AppProps) {

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

            <UserContextProvider>
                <Component {...pageProps} />
            </UserContextProvider>
        </>
    );
}
