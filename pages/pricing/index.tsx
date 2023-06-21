import SectionContainer from "@/components/Layouts/SectionContainer";

import PricingCard from "./PricingCard";
import Nav from "../../components/Nav";
import { PricingData } from "@/data/pricing";

const Pricing = ({ showNav = true }: any) => {
    const pricesData = [
        {
            plan: "Free",
            planDescription: "Perfect for hobby marketers & simple testers.",
            price: PricingData.free.price,
            priceDescription: "No credit card required",
            planFeatures: [
                "1 Campaign",
                "2 Ad campaigns",
                "9 Requests",
                "Sync cloud data",
            ],
        },
        {
            plan: "starter",
            planDescription: "Perfect for passion marketers & ecom owners.",
            price: PricingData.starter.price,
            priceDescription: "per month per plan",
            planFeatures: [
                "5 Campaigns",
                "10 Ad Campaigns",
                "100 Requests",
                "New Features",
                "Sync cloud data",
            ],
        },
        {
            plan: "pro",
            planDescription: "Perfect for pro marketers & business owners.",
            price: PricingData.pro.price,
            priceDescription: "per month per plan",
            planFeatures: [
                "10 Campaigns",
                "100 Ad campaigns",
                "300 Requests",
                "New Features",
                "Sync cloud data",
            ],
        },
    ];
    return (
        <>
            {showNav && <Nav />}
            <SectionContainer>
                <div className="flex flex-col items-center w-full gap-4">
                    <h4 className="text-brandPaltte-400 text-center text-md">
                        Pricing
                    </h4>
                    <h1 className="text-center text-typography-body-dark text-4xl ">
                        Predictable pricing, no surprises
                    </h1>
                    <p className="text-center text-lg text-typography-body-secondary-dark max-w-xl">
                        Choose an affordable plan that’s packed with the best
                        features for engaging your audience, creating customer
                        loyalty, and driving sales.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 gap-4 my-14 p-2">
                    {pricesData.map(
                        (
                            {
                                plan,
                                planDescription,
                                price,
                                priceDescription,
                                planFeatures,
                            },
                            index
                        ) => (
                            <div key={plan}>
                                {plan === "starter" ? (
                                    <div className="p-3 h-10 bg-brandPaltte-500 rounded-t-md text-white text-center text-[0.8rem]">
                                        Most Popular
                                    </div>
                                ) : (
                                    <div className="h-10"></div>
                                )}
                                <PricingCard
                                    plan={plan}
                                    planDescription={planDescription}
                                    price={price}
                                    priceDescription={priceDescription}
                                    planFeatures={planFeatures}
                                />
                            </div>
                        )
                    )}
                </div>
            </SectionContainer>
        </>
    );
};

export default Pricing;
