import React from "react";
import SectionContainer from "../Layouts/SectionContainer";
import Button from "../Button";
import { useRouter } from "next/router";
import Link from "next/link";
// import { FiBookOpen } from "react-icons/fi";
import Image from "next/image";

const Index = () => {
    const { basePath } = useRouter();

    return (
        <div className="overflow-hidden">
            <SectionContainer className="pb-0 pt-24">
                <div className="relative">
                    <main className="">
                        <div className="mx-auto">
                            <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                                <div className="md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                                    <div className="space-y-12 sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full">
                                        <div>
                                            <h1 className=" text-2xl sm:text-3xl sm:leading-none lg:text-4xl xl:text-5xl">
                                                <span className="block text-white">
                                                    Launch in seconds.
                                                </span>
                                                <span className="text-brandPaltte-500 block md:ml-0">
                                                    Scale to 10x.
                                                </span>
                                            </h1>
                                            <div>
                                                <p className=" mt-1.5 text-sm sm:mt-5 sm:text-base lg:text-lg text-gray-400">
                                                    Vylyn is an open source
                                                    marketing project. launch
                                                    your campaign in a seconds,
                                                    scale it to 10x using ai
                                                    suggestions, analyzing
                                                    performance and tips.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link href="#">
                                                <Button className="text-white bg-brandColor border-[0.1px] outline-0 border-brandPaltte-400 py-1">
                                                    Analyze your campaign
                                                </Button>
                                            </Link>
                                            {/* <Link href="#">
                                                <Button
                                                    icon={<FiBookOpen />}
                                                    className="bg-alt-background text-white"
                                                >
                                                    Documentation
                                                </Button>
                                            </Link> */}
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <small className="small text-xs text-gray-500">
                                                backed by
                                            </small>
                                            <div className="w-full sm:max-w-lg lg:ml-0">
                                                <div className="flex flex-wrap items-center justify-start gap-y-8 sm:flex-nowrap">
                                                    {/* <Image
                                                        className="h-8 pr-5 sm:h-8 md:pr-10"
                                                        src={`${basePath}/images/logos/yc--grey.png`}
                                                        alt="Y Combinator"
                                                        width={32}
                                                        height={32}
                                                    /> */}
                                                    <span className="text-zinc-300 font-semibold text-sm pr-5">
                                                        Founder
                                                    </span>
                                                    <span className="text-zinc-300 font-semibold text-sm">
                                                        Contributors
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-16 flex content-center sm:mt-24 lg:absolute lg:-right-80 lg:col-span-6 lg:mt-0 lg:w-9/12 xl:relative xl:right-0 xl:w-full">
                                    <div className="relative flex w-full flex-col items-center justify-center rounded-md">
                                        <div className="bg-scale-400 flex h-5 w-full items-center justify-start rounded-t-md px-2">
                                            <div className="bg-alt-background mr-2 h-2 w-2 rounded-full" />
                                            <div className="bg-alt-background mr-2 h-2 w-2 rounded-full" />
                                            <div className="bg-alt-background mr-2 h-2 w-2 rounded-full" />
                                        </div>
                                        <div
                                            className="bg-alt-background relative w-full rounded-b-md shadow-lg"
                                            style={{ padding: "56.25% 0 0 0" }}
                                        >
                                            {/* <iframe
                                                title="Demo video showcasing vylyn"
                                                className="absolute h-full w-full rounded-b-md"
                                                src="#"
                                                style={{ top: 0, left: 0 }}
                                                frameBorder="0"
                                                allow="autoplay; modestbranding; encrypted-media"
                                            /> */}
                                            <Image
                                                src={"/s1.png?v1"}
                                                width={800}
                                                height={600}
                                                style={{top: 0, left: 0}}
                                                className="absolute h-full w-full rounded-b-md"
                                                alt="vylyn | connect your social media ads"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </SectionContainer>
        </div>
    );
};

export default Index;
