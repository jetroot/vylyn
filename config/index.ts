import mongoose from "mongoose";

import { Configuration } from "openai";

// Sign in & Sign up Uri
export const SIGN_IN_URI = "/sign-in";
export const SIGN_UP_URI = "/sign-up";

// database connection
export const connectToDb = () => {
    return mongoose.connect(process.env.MONGO_DB_URI!, {
        dbName: process.env.MONGO_DB_NAME,
    });
};

// Custom response
export const ResponseStatusCodes = {
    OK: {
        status: 200,
        msg: "OK!",
    },
    CREATED: {
        status: 201,
        msg: "Created Successfully!",
    },
    BAD_REQUEST: {
        status: 400,
        msg: "Bad Request",
    },
    UNAUTHORIZED: {
        status: 401,
        msg: "Unauthorized request!",
    },
    ERROR: {
        status: 500,
        msg: "Something went wrong!",
    },
    USER_ALREADY_EXISTS: {
        status: 600,
        msg: "User Already Exists!",
    },
    LIMIT_REACHED: {
        status: 700,
        msg: 'You have reached your limits!'
    }
};

// Open AI Configuration
export const OpenAiConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});