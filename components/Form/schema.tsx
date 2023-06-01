import { CampaignObjectives, Gender } from "@/types";
import { CampaignStatus } from "@/types";
import * as yup from "yup";

// Beta Email sign up schema
export const basicSchema = yup.object().shape({
    email: yup
        .string()
        // .email("Please enter a valid email")
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please use a valid email"
        )
        .required("Required"),
});

// Create Campaign Schema
const campaignStatus = Object.values(CampaignStatus);
const campaignObjectives = Object.values(CampaignObjectives);
export const CreateCampaignSchema = yup.object().shape({
    campaign_status: yup
        .mixed()
        .oneOf(campaignStatus, "Campaign status is incorrect")
        .required("Required"),
    campaign_title: yup
        .string()
        .required("Required")
        .max(77, "Campaign title must be at most 77 characters"),
    campaign_objective: yup
        .mixed()
        .oneOf(campaignObjectives, "Campaign objective is incorrect")
        .required("Required"),
});

const GENDER = Object.values(Gender);
export const FullAdCampaignSchema = yup.object().shape({
    budget: yup.string().required("Required"),
    amount_spent: yup.string().required("Required"),

    target_gender: yup
        .mixed()
        .oneOf(GENDER, "Gender is invalid")
        .required("Required"),
    target_countries: yup.string().required("Required"),

    results: yup.string().required("Required"),
    cost_per_result: yup.string().required("Required"),

    reach: yup.string().required("Required"),
    impressions: yup.string().required("Required"),
    frequency: yup.string().required("Required"),

    cpc: yup.string().required("Required"),
    cpm: yup.string().required("Required"),
    ctr: yup.string().required("Required"),
    link_clicks: yup.string().required("Required"),
});

// Dynamic Ad Campaign Schema
export const DynamicAdCampaignSchema = (slideID: number) => {
    switch (slideID) {
        case 0:
            return yup.object().shape({
                budget: yup.string().required("Required"),
                amount_spent: yup.string().required("Required"),
            });
        case 1:
            return yup.object().shape({
                target_gender: yup
                    .mixed()
                    .oneOf(GENDER, "Gender is invalid")
                    .required("Required"),
                target_countries: yup.string().required("Required"),
            });
        case 2:
            return yup.object().shape({
                results: yup.string().required("Required"),
                cost_per_result: yup.string().required("Required"),
            });
        case 3:
            return yup.object().shape({
                reach: yup.string().required("Required"),
                impressions: yup.string().required("Required"),
                frequency: yup.string().required("Required"),
            });
        case 4:
            return yup.object().shape({
                cpc: yup.string().required("Required"),
                cpm: yup.string().required("Required"),
                ctr: yup.string().required("Required"),
                link_clicks: yup.string().required("Required"),
            });

        default:
            return FullAdCampaignSchema;
    }
};
