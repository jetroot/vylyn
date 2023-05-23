import { CampaignObjectives } from "@/types";
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
