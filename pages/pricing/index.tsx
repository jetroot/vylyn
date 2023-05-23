import SectionContainer from "@/components/Layouts/SectionContainer";

import PricingCard from "./PricingCard";
import Nav from "../../components/Nav";

const Pricing = ({ showNav = true }: any) => {
    const pricesData = [
        {
            plan: "Free",
            planDescription: "Perfect for passion projects & simple websites.",
            price: 0,
            priceDescription: "No credit card required",
            planFeatures: ["1 campaign", "5 requests", "No stored cloud data"],
        },
        {
            plan: "starter",
            planDescription: "Perfect for passion projects & simple websites.",
            price: 0,
            priceDescription: "per month per campaign",
            planFeatures: ["3 campaigns", "100 requests", "No stored cloud data"],
        },
        {
            plan: "pro",
            planDescription: "Perfect for passion projects & simple websites.",
            price: 0,
            priceDescription: "per month per project",
            planFeatures: ["10 campaigns", "200 requests", "Sync cloud data"],
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
                        ({
                            plan,
                            planDescription,
                            price,
                            priceDescription,
                            planFeatures,
                        }) => (
                            <div>
                                {plan === "starter" ? (
                                    <div className="p-3 h-10 bg-brandPaltte-500 rounded-t-md text-white text-center text-[0.8rem]">
                                        Most Popular
                                    </div>
                                ) : (
                                    <div className="h-10"></div>
                                )}
                                <PricingCard
                                    key={`${plan}-${price}`}
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
