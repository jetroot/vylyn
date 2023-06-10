import {
    createNewAdCampaign,
    createNewCampaign, doesCampaignExists, getAdCampaigns,
    getCampaigns, updateLimitAdCampaignsNumber,
} from "@/services";

// Campaign Test
describe("Campaign Tests", () => {
    // Data
    const USER_ID = "101362803703965227509";
    const CAMPAIGN_ID = "1";

    it("Should create a new campaign", async () => {
        const data = {
            campaign_status: "1",
            campaign_title: "2",
            campaign_objective: "3",
            user_id: USER_ID,
        };

        for (let i = 0; i < 20; i++) {
            const isCampaignCreated = await createNewCampaign(
                data.campaign_status,
                data.campaign_title,
                data.campaign_objective,
                data.user_id
            );

            expect(isCampaignCreated).toBeTruthy();
        }
    });

    it("Should return first 10 campaigns", async () => {
        const campaigns = await getCampaigns(USER_ID, 1);
        expect(campaigns[0].docs.length).toBeLessThanOrEqual(10);
        expect(campaigns[0].totalDocs).toBeLessThanOrEqual(20);
    });

    it("Should return empty array when the campaign have a fake user id", async () => {
        const campaigns = await getCampaigns(`${USER_ID}.`, 1);

        const empty: any = [];
        expect(campaigns[0].docs).toStrictEqual(empty);
    });

    it("Should create new ad campaign", async () => {
        const data = {
            amount_spent: "amount",
            campaign_objective: "object",
            cost_per_result: "cost per result",
            cpc: "cpc",
            cpm: "cpm",
            ctr: "ctr",
            frequency: "freq",
            impressions: "impress",
            link_clicks: "link",
            reach: "reach",
            results: "result",
            target_countries: "country",
            target_gender: "FEMALE",
        };
        const campId = '648436a95355dba5dbf423ea'

        for (let i = 0; i < 20; i++) {
            const isAdCampaignCreated = await createNewAdCampaign({...data, budget: i,}, campId);
            expect(isAdCampaignCreated).toBeTruthy();
        }
    });

    it("Does this campaign exists", async () => {
        const isCampaignExists = await doesCampaignExists(CAMPAIGN_ID);
        expect(isCampaignExists).toBeFalsy();
    })

    it('Should return an empty list of ad campaigns', async function () {
        const page = 1;

        const adCampaigns = await getAdCampaigns(CAMPAIGN_ID, page);

        expect(adCampaigns.length).toBeLessThanOrEqual(0);
    });
});

