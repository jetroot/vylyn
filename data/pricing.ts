// ⚠️ Don't change this
export const PricingData = {
    free: {
        plan: "Free",
        price: 0,
        limitRequests: 10,
        limitCampaigns: 1,
        limitAdCampaigns: 3,
    },
    starter: {
        plan: "Starter",
        price: 30.00,
        limitRequests: 100,
        limitCampaigns: 5,
        limitAdCampaigns: 10,
    },
    pro: {
        plan: "Pro",
        price: 79.00,
        limitRequests: 300,
        limitCampaigns: 10,
        limitAdCampaigns: 100,
    },
};

export const getPlanFeatures = (plan: string) => {
    // No plan
    if (!plan || plan === "") return null;

    // check plan properties
    switch (plan.toLocaleLowerCase()) {
        case PricingData.starter.plan.toLocaleLowerCase():
            return PricingData.starter;

        case PricingData.pro.plan.toLocaleLowerCase():
            return PricingData.pro;

        default:
            return null;
    }
};
