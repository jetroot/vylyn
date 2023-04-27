import SectionContainer from "@/components/Layouts/SectionContainer";
import React from "react";
import PricingCard from "./PricingCard";

const Pricing = () => {
    const pricesData = [
        {
            plan: "Free",
            planDescription: "Perfect for passion projects & simple websites.",
            price: 0,
            priceDescription: "per month per project",
            planFeatures: ["Feature #1", "Feature #2", "Feature #3"],
        },
        {
            plan: "starter",
            planDescription: "Perfect for passion projects & simple websites.",
            price: 0,
            priceDescription: "per month per project",
            planFeatures: ["Feature #1", "Feature #2", "Feature #3"],
        },
        {
            plan: "pro",
            planDescription: "Perfect for passion projects & simple websites.",
            price: 0,
            priceDescription: "per month per project",
            planFeatures: ["Feature #1", "Feature #2", "Feature #3"],
        },
        {
            plan: "unlimited",
            planDescription: "Perfect for passion projects & simple websites.",
            price: 0,
            priceDescription: "per month per project",
            planFeatures: ["Feature #1", "Feature #2", "Feature #3"],
        },
    ];
    return (
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

            <div className="max-w-6xl mx-auto grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 gap-4 my-14 p-2">
                {pricesData.map(
                    ({
                        plan,
                        planDescription,
                        price,
                        priceDescription,
                        planFeatures,
                    }) => (
                        <div
                            className={`${
                                plan === "starter" &&
                                "border-2 border-brandPaltte-500 rounded-md"
                            }`}
                        >
                            {plan === "starter" ? (
                                <div className="p-3 h-10 bg-brandPaltte-500 text-white text-center text-[0.8rem]">
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
    );
};

export default Pricing;
