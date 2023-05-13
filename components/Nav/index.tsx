import { useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";

import Announcement from "./Announcement";
import Logo from "../Logo";
import Link from "next/link";

const Index = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            // Prevent scrolling on mount
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    return (
        <>
            <Announcement />
            <div
                className="sticky top-0 z-40 transform"
                style={{ transform: "translate3d(0,0,999px)" }}
            >
                <nav
                    className={`border-[#282828] border-b bg-primary-background transition-opacity`}
                >
                    <div className="relative justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20 text-white hidden lg:flex">
                        <div className="flex justify-between gap-10 items-center">
                            <Link href={"/"}>
                                <Logo />
                            </Link>

                            <Link href="/about">
                                <span className="hover:text-[#65d9a5] cursor-pointer items-center text-sm font-medium">
                                    About
                                </span>
                            </Link>

                            <Link href={"/pricing"}>
                                <span className="hover:text-[#65d9a5] cursor-pointer items-center text-sm font-medium">
                                    Pricing
                                </span>
                            </Link>
                        </div>
                        <div className="flex justify-between gap-3 items-center">
                            <a
                                href="https://github.com/jetroot/vylyn"
                                target="_blank"
                                className="text-[0.75rem] gap-1 hover:bg-alt-background cursor-pointer py-1 rounded-md"
                            >
                                <span
                                    style={{ fontWeight: 300 }}
                                    className="flex gap-1 px-1 items-center w-full h-full hover:text-slate-300"
                                >
                                    <AiOutlineStar className="text-sm" />
                                    Star us on Github
                                </span>
                            </a>

                            <Link href={"/sign-in"}>
                                <div className="bg-alt-background relative cursor-pointer text-center font-regular rounded outline-0 shadow-sm text-xs px-4 py-1.5 text-white">
                                    Sign in
                                </div>
                            </Link>

                            <Link href={"/sign-up"}>
                                <div className="bg-brandColor border-[#65d9a5] border-[0.1px] relative cursor-pointer px-4 text-center font-regular rounded outline-0 shadow-sm text-xs py-1 text-white">
                                    Sign up Now
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="relative h-16 mx-auto lg:container lg:px-16 xl:px-20 text-white hidden max-lg:flex items-center justify-start">
                        <div
                            className="hover:bg-alt-background cursor-pointer px-2 py-2 rounded flex justify-center ml-2"
                            onClick={() => setOpen(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-zinc-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </div>
                        <Logo className="w-full z-[-1] justify-center flex" />
                    </div>
                    {open && (
                        <div className="w-full h-screen overflow-hidden bg-secondary-background absolute inset-0 flex-col lg:hidden">
                            <div className="flex justify-between h-16 border-gray-800 border-b mx-6 items-center">
                                <Link href={"/"}>
                                    <Logo />
                                </Link>

                                <button
                                    className="cursor-pointer px-1.5 py-1.5 rounded hover:bg-alt-background text-slate-400"
                                    onClick={() => setOpen(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-col mx-10 text-white font-semibold">
                                <Link href={"sign-in"}>
                                    <p className="hover:bg-alt-background rounded-lg py-2 px-2 mt-2 text-sm">
                                        Sign in
                                    </p>
                                </Link>

                                <Link href={"sign-up"}>
                                    <p className="hover:bg-alt-background rounded-lg py-2 px-2 text-sm">
                                        Sign up
                                    </p>
                                </Link>
                                <Link href={"pricing"}>
                                    <p className="hover:bg-alt-background rounded-lg py-2 px-2 text-sm">
                                        Pricing
                                    </p>
                                </Link>
                                <Link href={"about"}>
                                    <p className="hover:bg-alt-background rounded-lg py-2 px-2 text-sm">
                                        About
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Index;
