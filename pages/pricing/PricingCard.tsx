import PaypalButtonProvider from "@/components/Payment/paypalButtonProvider";
import { BsCheckLg } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SIGN_UP_URI } from "@/config";

interface Props {
    plan: string;
    planDescription: string;
    price: number;
    priceDescription: string;
    planFeatures: Array<string>;
}

const PricingCard = (props: Props) => {
    const session: any = useSession();

    return (
        <div
            className={`bg-secondary-background pb-6 h-full relative ${
                props.plan === "starter" &&
                "border-2 border-brandPaltte-500 rounded-b-md"
            }`}
        >
            <div className="p-8">
                <h1 className="uppercase text-brandPaltte-700 text-xl">
                    {props.plan}
                </h1>
                <p className="text-typography-body-secondary-dark py-3 max-w-xs">
                    {props.planDescription}
                </p>

                <div className="w-full px-10">
                    <div className="h-[1px] bg-alt-background my-2"></div>
                </div>

                <div className="">
                    <span className="text-typography-body-faded-dark text-[0.72rem]">
                        Starting from
                    </span>
                    <h1 className="text-5xl text-white py-2">${props.price}</h1>
                    <p className="text-typography-body-faded-dark text-[0.72rem]">
                        {props.priceDescription}
                    </p>
                </div>

                <div className="w-full px-10 py-5">
                    <div className="h-[1px] bg-alt-background my-2"></div>
                </div>

                <div>
                    <span className="text-typography-body-secondary-dark text-[0.7rem]">
                        Getting started with:
                    </span>

                    {props.planFeatures &&
                        props.planFeatures.map((planFeature: any, index) => (
                            <div
                                key={`${planFeature.price}-${index}`}
                                className="flex items-center gap-x-2 py-2 mt-2"
                            >
                                <span className="text-brandPaltte-500">
                                    <BsCheckLg size={20} fontWeight={"bold"} />
                                </span>
                                <span className="text-typography-body-dark text-[0.8rem]">
                                    {planFeature}
                                </span>
                            </div>
                        ))}

                </div>
            </div>

            <div className="w-full mx-auto flex justify-center absolute bottom-5">

                {props.plan && !(props.plan.toLowerCase() === "free") && (
                    <div className="bg-brandColor border-brandPaltte-500 w-10/12 text-center rounded-md text-white text-sm border-[1.5px]">
                        <PaypalButtonProvider plan={props.plan} />
                    </div>
                )}

                {props.plan.toLowerCase() === "free" && !session.data?.user && (
                    <Link
                        href={SIGN_UP_URI}
                        className="bg-alt-background w-10/12 p-1.5 rounded-md text-center text-white text-sm border border-slate-600"
                    >
                        Getting Started
                    </Link>
                )}

            </div>
        </div>
    );
};

export default PricingCard;
