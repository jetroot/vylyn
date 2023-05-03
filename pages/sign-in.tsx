import Link from "next/link";
import React from "react";
import Logo from "../components/Logo";
import { RiDoubleQuotesL } from "react-icons/ri";
import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import SignUpAndSignIn from "@/components/SignUpAndSignIn/SignUpAndSignIn";


const SignIn = () => {
    return (
        <>
            {/* <div>
            <Logo />
        </div> */}
            <div className="relative flex flex-1 h-screen">
                <Link
                    href={"/"}
                    className="cursor-pointer absolute z-10 top-7 left-10"
                >
                    <Logo />
                </Link>

                <a
                    href="https://github.com/jetroot/vylyn"
                    target="_blank"
                    className="z-10 absolute top-7 right-10 text-[0.75rem] bg-alt-background cursor-pointer py-1 px-2 rounded-md hover:shadow-gray-500 hover:shadow-sm"
                >
                    <span
                        style={{ fontWeight: 300 }}
                        className="flex gap-1 px-1 items-center w-full h-full text-slate-300"
                    >
                        <AiFillGithub className="text-sm" size={16} />
                        Join us on Github
                    </span>
                </a>

                <div className="relative bg-primary-background flex-1 px-5 pt-16 pb-8 border-r-[0.1px] border-gray-800">
                    <div className="flex flex-col h-full justify-center">
                        <div className="w-full max-w-sm mx-auto">
                            <div className="mb-10">
                                <h1 className="mt-8 mb-2 text-2xl lg:text-3xl text-typography-body-dark">
                                    Welcome back
                                </h1>
                                <p className="text-sm text-zinc-400">
                                    Sign in to your account
                                </p>
                            </div>

                            <div className="max-w-sm flex flex-col gap-4 mx-4">
                                <SignUpAndSignIn
                                    provider="google"
                                    text={"Sign in with Google"}
                                    isSubmittingText="Signing..."
                                />
                                <SignUpAndSignIn
                                    provider="facebook"
                                    text={"Sign in with Facebook"}
                                    isSubmittingText="Signing..."
                                />
                            </div>
                        </div>

                        <div className="bg-gray-500 h-[1px] max-w-sm mx-auto my-10"></div>

                        <div className="flex mx-auto max-w-sm gap-2">
                            <span className="text-typography-body-faded-light">
                                Don't have an account?
                            </span>

                            <Link href="/sign-up">
                                <span className="underline text-typography-body-dark text-[0.9rem]">
                                    Sign Up Now
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <small className="max-w-sm mx-auto px-8 w-full text-center absolute bottom-6 text-gray-500 text-[0.7rem]">
                            By continuing, you agree to Vylyn's Terms of Service
                            and Privacy Policy, and to receive periodic emails
                            with updates.
                        </small>
                    </div>
                </div>
                <aside className="bg-bg-primary-dark md:flex flex-1 basis-1/4 hidden justify-center items-center">
                    <div className="flex flex-col">
                        <RiDoubleQuotesL className="text-typography-body-dark text-6xl " />
                        <p className="max-w-md text-white text-lg">
                            In real open source, you have the right to control
                            your own destiny.
                        </p>
                        <div className="my-3 flex items-center gap-2">
                            <Image
                                src={"/linus.png"}
                                width={30}
                                height={30}
                                className="rounded-full"
                                alt="quote Linus Torvalds"
                            />
                            <span className="text-slate-400">
                                Linus Torvalds
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default SignIn;
