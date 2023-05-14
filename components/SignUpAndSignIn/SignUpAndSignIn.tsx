import { useState } from "react";

import { RiGoogleFill, RiFacebookFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface IProps {
    provider: "google" | "facebook";
    text: string;
    isSubmittingText?: string;
}

const SignUpAndSignIn = ({ provider, text, isSubmittingText }: IProps) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const supabaseClient = useSupabaseClient();

    const handleSignUpAndSignIn = async () => {
        try {
            setIsSubmitted(true);

            const { error } = await supabaseClient.auth.signInWithOAuth({
                provider: `${provider}`,
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/dashboard`,
                },
            });

            if (error) {
                setIsSubmitted(false);
                return;
            }
        } catch (error) {
            setIsSubmitted(false);
        }
    };

    return (
        <button
            type="submit"
            onClick={handleSignUpAndSignIn}
            className={`flex justify-center items-center gap-3 text-typography-body-dark rounded-md text-center px-4 py-2 outline-none w-full ${
                isSubmitted
                    ? "bg-zinc-700 opacity-40 cursor-default"
                    : "bg-alt-background cursor-pointer"
            }`}
            disabled={isSubmitted}
        >
            {!isSubmitted ? (
                <span>
                    {provider === "google" ? (
                        <RiGoogleFill size={18} />
                    ) : (
                        <RiFacebookFill size={18} />
                    )}
                </span>
            ) : (
                <span className="animate-spin">
                    <AiOutlineLoading3Quarters size={14} />
                </span>
            )}

            <span className="text-sm">
                {isSubmitted ? isSubmittingText : text}
            </span>
        </button>
    );
};

export default SignUpAndSignIn;
