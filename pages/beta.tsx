import React from "react";
import Form from "../components/Form";
import Head from "next/head";
import Logo from '../components/Logo'

const Beta = () => {

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.png" />
                <title>Vylyn - 10x better campaigns</title>
                <meta property="description" content="10x better campaigns" />
            </Head>
            <div className="w-screen h-screen overflow-hidden bg-primary-background">
                <div className="relative container mx-auto h-full flex flex-col items-stretch justify-around">
                    <header className="pt-5 pl-5">
                        <Logo />
                    </header>
                    <div>
                        <h1 className="text-center text-transparent text-9xl max-xs:text-7xl max-md:text-8xl bg-clip-text bg-gradient-to-r from-brandPaltte-500 to-pink-600">
                            10x Better Campaigns
                        </h1>
                    </div>
                    <div className="flex flex-col">
                        <Form />
                    </div>
                    <small className="pb-2 text-slate-500 font-sans text-[12px] text-center">
                        &copy;Vylyn - {new Date().getFullYear()}
                    </small>
                </div>
            </div>
        </>
    );
};

export default Beta;
