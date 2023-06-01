// User Object
export type UserType = {
    id: string | undefined;
    email: string | undefined;
    fullName: string | undefined;
    avatarUrl: string | undefined;
};

// Campaign Status
export enum CampaignStatus {
    ACTIVE,
    PAUSED,
}

// Campaign Objectives
export enum CampaignObjectives {
    REACH,
    ENGAGEMENT,
    FOLLOWERS,
    TRAFFIC,
    AWARENESS,
    APP_INSTALL,
    CONVERSION,
    LEADS,
}

// Gender
export enum Gender {
    FEMALE, MALE, BOTH
}