import { useFormik } from "formik";
import axios from "axios";

import { AiOutlineClose } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";

import { CreateCampaignSchema } from "./schema";
import { useEffect, useState } from "react";

const initialValues = {
    campaign_status: "",
    campaign_title: "",
    campaign_objective: "",
};

const FormModel = ({ toggle, toggleModel, fetchData }: any) => {
    // campaign response data
    const [isCampaignCreated, setIsCampaignCreated] = useState({
        showMessage: false,
        success: false,
        msg: "",
    });

    const submitForm = async (values, actions) => {
        // console.log("values", values);
        // console.log("actions", actions);
        try {
            const response = await axios.post("/api/campaign", values, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // console.log("res", response.data);
            setIsCampaignCreated({
                showMessage: true,
                success: response.data.data.success,
                msg: response.data.data.msg,
            });

            // fetch data
            fetchData(true);

            // reset form
            actions.resetForm();
        } catch (error: any) {
            const { data } = error?.response.data;
            // console.log("err - isCampaignCreated", isCampaignCreated);
            setIsCampaignCreated({
                showMessage: true,
                success: data.success,
                msg: data.msg,
            });
        }

        // toggleModel(false);
    };

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
    } = useFormik({
        initialValues,
        validationSchema: CreateCampaignSchema,
        onSubmit: submitForm,
    });

    useEffect(() => {}, [isCampaignCreated]);

    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-primary-background bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative w-full max-w-screen-2xl bg-secondary-background flex flex-col">
                        <div className="py-2 px-10 relative">
                            <h1 className="text-left text-[#6f6f6f] absolute mt-3 font-medium text-lg">
                                Create Campaign
                            </h1>
                            <button
                                type="button"
                                onClick={() => toggleModel(!toggle)}
                                className="absolute right-0 top-0 text-[#6f6f6f] py-2 px-4 m-2 rounded-md hover:bg-alt-background"
                            >
                                <AiOutlineClose size={23} />
                            </button>
                        </div>

                        <div className="flex p-16">
                            <div className="w-full">
                                <form
                                    className="w-full flex flex-col gap-10"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <select
                                            name="campaign_status"
                                            id="campaign_status"
                                            value={values.campaign_status}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                errors.campaign_status &&
                                                touched.campaign_status
                                                    ? "border-[#c74b4b]"
                                                    : "border-[#5d5d5d]"
                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                        >
                                            <option
                                                value="Select Capmaign Status"
                                                hidden
                                            >
                                                Select Capmaign Status
                                            </option>
                                            <option
                                                value="ACTIVE"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                ACTIVE
                                            </option>
                                            <option
                                                value="PAUSED"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                PAUSED
                                            </option>
                                        </select>
                                        <p className="text-red-400 w-full text-left mt-1">
                                            {errors.campaign_status}
                                        </p>
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            name="campaign_title"
                                            id="campaign_title"
                                            value={values.campaign_title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                errors.campaign_title &&
                                                touched.campaign_title
                                                    ? "border-[#c74b4b]"
                                                    : "border-[#5d5d5d]"
                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                            placeholder="What’s your campaign title ?"
                                        />
                                        <div className="flex justify-between mx-1">
                                            <p className="text-red-400">
                                                {errors.campaign_title}
                                            </p>
                                            <span className="text-typography-body-dark text-[12px] mt-1">
                                                {77 -
                                                    values.campaign_title
                                                        .length}{" "}
                                                Characters
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <select
                                            name="campaign_objective"
                                            id="campaign_objective"
                                            value={values.campaign_objective}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                errors.campaign_objective &&
                                                touched.campaign_objective
                                                    ? "border-[#c74b4b]"
                                                    : "border-[#5d5d5d]"
                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                        >
                                            <option
                                                value="Select Capmaign Objective"
                                                hidden
                                            >
                                                Select Capmaign Objective
                                            </option>
                                            <option
                                                value="REACH"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                Reach
                                            </option>
                                            <option
                                                value="ENGAGEMENT"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                Engagements
                                            </option>
                                            <option
                                                value="FOLLOWERS"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                Followers
                                            </option>
                                            <option
                                                value="TRAFFIC"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                Traffic
                                            </option>
                                            <option
                                                value="AWARENESS"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                Awareness
                                            </option>
                                            <option
                                                value="APP_INSTALL"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                App Install
                                            </option>
                                            <option
                                                value="CONVERSION"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                Conversion
                                            </option>
                                            <option
                                                value="LEADS"
                                                className="text-[#5d5d5d] text-md font-semibold"
                                            >
                                                Leads
                                            </option>
                                        </select>
                                        <p className="text-red-400 w-full text-left mt-1">
                                            {errors.campaign_objective}
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`${
                                            !isSubmitting
                                                ? "bg-brandPaltte-500"
                                                : "bg-alt-background text-zinc-400"
                                        } p-4 rounded-md text-typography-body-dark mt-10 outline-none flex justify-center items-center gap-1`}
                                    >
                                        {isSubmitting && (
                                            <BiLoader
                                                className="animate-spin"
                                                size={20}
                                            />
                                        )}
                                        Save Campaign
                                    </button>
                                </form>
                            </div>

                            <div className="h-auto w-40 flex justify-center mx-8">
                                <div className="bg-[#5d5d5d] w-1 h-full rounded-full"></div>
                            </div>

                            <div className="w-full h-auto mt-2">
                                <div className="flex justify-between">
                                    <h1 className="text-left text-[#5d5d5d] font-semibold">
                                        Campaign Preview
                                    </h1>
                                    {isCampaignCreated.showMessage && (
                                        <div
                                            className={`capitalize ${
                                                isCampaignCreated.success
                                                    ? "bg-brandPaltte-500"
                                                    : "bg-red-500"
                                            } rounded-full text-typography-body-dark px-3 mr-6`}
                                        >
                                            {isCampaignCreated.msg}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full max-w-xl shadow-[0_-1px_0_0_#5d5d5d,0_2px_0_1px_#161616] flex flex-col h-72 p-6 rounded-lg mt-8 ml-4 px-10">
                                    <div className="uppercase text-[#5d5d5d] text-right font-medium ">
                                        {values.campaign_status
                                            ? values.campaign_status
                                            : "Status"}
                                    </div>
                                    <div className="capitalize overflow-hidden text-2xl leading-10 text-left text-[#cdcdcd] py-14 max-w-md">
                                        {values.campaign_title
                                            ? values.campaign_title
                                            : "Your campaign title will preview here when you start typing."}
                                    </div>
                                    <div className="capitalize flex justify-between w-full text-[#5d5d5d]">
                                        <div className="">
                                            {values.campaign_objective
                                                ? values.campaign_objective
                                                : "Objective"}
                                        </div>
                                        <div>
                                            {new Date(Date.now())
                                                .toDateString()
                                                .substring(4)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormModel;
