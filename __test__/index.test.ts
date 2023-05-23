import { getCampaigns } from "@/services";

// Campaign Test
describe("Campaign Tests", () => {
    it("should return first 10 campaigns", async () => {
        const FAKE_USER_ID = "101362803703965227509";
        const campaigns = await getCampaigns(FAKE_USER_ID, 1);

        expect(campaigns[0].docs.length).toBeLessThanOrEqual(8);
    });

    it("should return empty array", async () => {
        const FAKE_USER_ID = "";
        const campaigns = await getCampaigns(FAKE_USER_ID, 1);

        const empty:any = [];
        expect(campaigns[0].docs).toStrictEqual(empty)
    });
});


