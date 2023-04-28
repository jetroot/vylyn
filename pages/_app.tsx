import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import Layouts from "../components/Layouts";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
    const { route } = useRouter();

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.png" />
                <title>Vylyn - 10x better campaigns</title>
                <meta property="description" content="10x better campaigns using AI" />
            </Head>

            {route === "/" ? (
                <Component {...pageProps} />
            ) : (
                <Layouts>
                    <Component {...pageProps} />
                </Layouts>
            )}
        </>
    );
}
