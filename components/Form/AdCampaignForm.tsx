import { useFormik } from "formik";
import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";

import { DynamicAdCampaignSchema } from "./schema";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const initialValues = {
    budget: "",
    amount_spent: "",

    target_gender: "",
    target_countries: "",

    results: "",
    cost_per_result: "",

    reach: "",
    impressions: "",
    frequency: '',

    cpc: "",
    cpm: "",
    ctr: "",
    link_clicks: "",
};

const AdCampaignForm = ({ toggle, toggleModel, fetchData }: any) => {
    // to move between slides
    const [slideID, setSlideID] = useState(0);
    const LAST_SLIDE_ID = 4;

    const router = useRouter();

    // user session
    const session = useSession();

    // campaign response data
    const [isCampaignCreated, setIsCampaignCreated] = useState({
        showMessage: false,
        success: false,
        msg: ""
    });

    const { campaign_id } = router.query;
    // console.log("campaign_id", campaign_id);

    const submitForm = async (values: any, actions: any) => {
        if (slideID >= LAST_SLIDE_ID) {
            // console.log("Creating ad campaign ...");
            // console.log("values", values);
            try {
                const response = await axios.post(
                    "/api/ad_campaign",
                    {
                        values,
                        campaign_id,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                // console.log("res", response.data);
                // console.log("q", router.query);

                if (response?.data.data.success) {
                    setIsCampaignCreated({
                        showMessage: true,
                        success: true,
                        msg: response?.data.data.msg
                    });

                    fetchData(true);
                    actions.resetForm();
                    setSlideID(0);
                }
            } catch (error: any) {
                setIsCampaignCreated({
                    showMessage: true,
                    success: false,
                    msg: error?.response.data.data.msg,
                });
            }
        } else {
            // keep moving between slides
            setSlideID((prevSlide) => prevSlide + 1);
            // console.log("slideID", slideID);
        }
    };

    useEffect(() => {}, [slideID]);

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
        validationSchema: DynamicAdCampaignSchema(slideID),
        onSubmit: submitForm,
    });

    return (
        <>
            <div className="relative z-10">
                <div className="fixed inset-0 bg-primary-background bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative w-full max-w-screen-2xl bg-secondary-background flex flex-col">
                            <div className="py-2 px-10 relative">
                                <h1 className="text-left text-[#6f6f6f] absolute mt-3 font-medium text-lg">
                                    Create Ad Campaign
                                </h1>
                                {isCampaignCreated.showMessage && (
                                    <div
                                        className={`text-white w-full flex justify-center`}
                                    >
                                        <div
                                            className={`max-w-xs w-full rounded-lg p-0.5 ${
                                                isCampaignCreated.success
                                                    ? "bg-brandPaltte-400"
                                                    : "bg-red-400"
                                            }`}
                                        >
                                            {isCampaignCreated.msg}
                                        </div>
                                    </div>
                                )}
                                <h2 className="font-medium text-md mt-5 text-[#6f6f6f]">
                                    Campaign {slideID === 0 && "Budgeting"}
                                    {slideID === 1 && "Targeting"}
                                    {slideID === 2 && "Results"}
                                    {slideID === 3 && "Metrics"}
                                    {slideID === 4 && "Performance"}
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => {
                                        window.document.body.style.overflow =
                                            "scroll";
                                        toggleModel(!toggle);
                                    }}
                                    className="absolute right-0 top-0 text-[#6f6f6f] py-2 px-4 m-2 rounded-md hover:bg-alt-background"
                                >
                                    <AiOutlineClose size={23} />
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <div className="flex p-16 w-full max-w-4xl">
                                    <div className="w-full">
                                        <form
                                            className="w-full flex flex-col gap-10"
                                            onSubmit={handleSubmit}
                                        >
                                            {/* For slide 1 */}
                                            {slideID === 0 && (
                                                <>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="budget"
                                                            id="budget"
                                                            value={
                                                                values.budget
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                                errors.budget &&
                                                                touched.budget
                                                                    ? "border-[#c74b4b]"
                                                                    : "border-[#5d5d5d]"
                                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                            placeholder="Specify your campaign budget in USD ?"
                                                            disabled={
                                                                isSubmitting
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <div className="flex justify-between mx-1 mt-2">
                                                            <p className="text-red-400">
                                                                {errors.budget}
                                                            </p>
                                                            {/* <span className="text-typography-body-dark text-[12px] mt-1">
                                                                {77 -
                                                                    values
                                                                        .budget
                                                                        .length}{" "}
                                                                Characters
                                                            </span> */}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="amount_spent"
                                                            id="amount_spent"
                                                            value={
                                                                values.amount_spent
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                                errors.amount_spent &&
                                                                touched.amount_spent
                                                                    ? "border-[#c74b4b]"
                                                                    : "border-[#5d5d5d]"
                                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                            placeholder="Amount spent from your campaign budget in USD ?"
                                                            disabled={
                                                                isSubmitting
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <div className="flex justify-between mx-1 mt-2">
                                                            <p className="text-red-400">
                                                                {
                                                                    errors.amount_spent
                                                                }
                                                            </p>
                                                            {/* <span className="text-typography-body-dark text-[12px] mt-1">
                                                                {77 -
                                                                    values
                                                                        .amount_spent
                                                                        .length}{" "}
                                                                Characters
                                                            </span> */}
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* For slide 2 */}
                                            {slideID === 1 && (
                                                <>
                                                    <div>
                                                        <select
                                                            name="target_gender"
                                                            id="target_gender"
                                                            value={
                                                                values.target_gender
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            disabled={
                                                                isSubmitting
                                                                    ? true
                                                                    : false
                                                            }
                                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                                errors.target_gender &&
                                                                touched.target_gender
                                                                    ? "border-[#c74b4b]"
                                                                    : "border-[#5d5d5d]"
                                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                        >
                                                            <option
                                                                value="Select Capmaign Targeted Gender"
                                                                hidden
                                                            >
                                                                Select capmaign
                                                                targeted gender
                                                            </option>
                                                            <option
                                                                value="FEMALE"
                                                                className="text-[#5d5d5d] text-md font-semibold"
                                                            >
                                                                Female
                                                            </option>
                                                            <option
                                                                value="MALE"
                                                                className="text-[#5d5d5d] text-md font-semibold"
                                                            >
                                                                Male
                                                            </option>
                                                            <option
                                                                value="BOTH"
                                                                className="text-[#5d5d5d] text-md font-semibold"
                                                            >
                                                                Both
                                                            </option>
                                                        </select>
                                                        <p className="text-red-400 w-full text-left mt-1">
                                                            {
                                                                errors.target_gender
                                                            }
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="target_countries"
                                                            id="target_countries"
                                                            value={
                                                                values.target_countries
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                                errors.target_countries &&
                                                                touched.target_countries
                                                                    ? "border-[#c74b4b]"
                                                                    : "border-[#5d5d5d]"
                                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                            placeholder="Write targeted countries separated by comma ? eg: US, UK"
                                                            disabled={
                                                                isSubmitting
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <div className="flex justify-between mx-1 mt-2">
                                                            <p className="text-red-400">
                                                                {
                                                                    errors.target_countries
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* For slide 3 */}
                                            {slideID === 2 && (
                                                <>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="results"
                                                            id="results"
                                                            value={
                                                                values.results
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                                errors.results &&
                                                                touched.results
                                                                    ? "border-[#c74b4b]"
                                                                    : "border-[#5d5d5d]"
                                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                            placeholder="Results"
                                                            disabled={
                                                                isSubmitting
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <div className="flex justify-between mx-1 mt-2">
                                                            <p className="text-red-400">
                                                                {errors.results}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="cost_per_result"
                                                            id="cost_per_result"
                                                            value={
                                                                values.cost_per_result
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                                errors.cost_per_result &&
                                                                touched.cost_per_result
                                                                    ? "border-[#c74b4b]"
                                                                    : "border-[#5d5d5d]"
                                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                            placeholder="Cost per result in USD"
                                                            disabled={
                                                                isSubmitting
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <div className="flex justify-between mx-1 mt-2">
                                                            <p className="text-red-400">
                                                                {
                                                                    errors.cost_per_result
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* For slide 4 */}
                                            {slideID === 3 && (
                                                <>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="reach"
                                                            id="reach"
                                                            value={values.reach}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                                errors.reach &&
                                                                touched.reach
                                                                    ? "border-[#c74b4b]"
                                                                    : "border-[#5d5d5d]"
                                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                            placeholder="How many people your ad campaign reach until now ? e.g. 3k"
                                                            disabled={
                                                                isSubmitting
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <div className="flex justify-between mx-1 mt-2">
                                                            <p className="text-red-400">
                                                                {errors.reach}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="impressions"
                                                            id="impressions"
                                                            value={
                                                                values.impressions
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                                errors.impressions &&
                                                                touched.impressions
                                                                    ? "border-[#c74b4b]"
                                                                    : "border-[#5d5d5d]"
                                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                            placeholder="Impressions ? e.g. 4k"
                                                            disabled={
                                                                isSubmitting
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <div className="flex justify-between mx-1 mt-2">
                                                            <p className="text-red-400">
                                                                {
                                                                    errors.impressions
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="frequency"
                                                            id="frequency"
                                                            value={
                                                                values.frequency
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                            className={`w-full p-3 bg-transparent border-[1px] ${
                                                                errors.frequency &&
                                                                touched.frequency
                                                                    ? "border-[#c74b4b]"
                                                                    : "border-[#5d5d5d]"
                                                            } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                            placeholder="Your ad campaign frequency"
                                                            disabled={
                                                                isSubmitting
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <div className="flex justify-between mx-1 mt-2">
                                                            <p className="text-red-400">
                                                                {
                                                                    errors.frequency
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* For slide 5 */}
                                            {slideID === 4 && (
                                                <div className="flex justify-around items-center gap-4 h-auto">
                                                    <div className="w-full">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="cpc"
                                                                id="cpc"
                                                                value={
                                                                    values.cpc
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`w-full p-3 bg-transparent border-[1px] ${
                                                                    errors.cpc &&
                                                                    touched.cpc
                                                                        ? "border-[#c74b4b]"
                                                                        : "border-[#5d5d5d]"
                                                                } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                                placeholder="CPC in USD ? e.g. 0.5"
                                                                disabled={
                                                                    isSubmitting
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            <div className="flex justify-between mx-1 my-3">
                                                                <p className="text-red-400">
                                                                    {errors.cpc}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="cpm"
                                                                id="cpm"
                                                                value={
                                                                    values.cpm
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`w-full p-3 bg-transparent border-[1px] ${
                                                                    errors.cpm &&
                                                                    touched.cpm
                                                                        ? "border-[#c74b4b]"
                                                                        : "border-[#5d5d5d]"
                                                                } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                                placeholder="CPM in USD ? e.g. 5"
                                                                disabled={
                                                                    isSubmitting
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            <div className="flex justify-between mx-1 my-3">
                                                                <p className="text-red-400">
                                                                    {errors.cpm}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div className="bg-[#5d5d5d] rounded-full w-2 h-40"></div> */}

                                                    <div className="w-full">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="ctr"
                                                                id="ctr"
                                                                value={
                                                                    values.ctr
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`w-full p-3 bg-transparent border-[1px] ${
                                                                    errors.ctr &&
                                                                    touched.ctr
                                                                        ? "border-[#c74b4b]"
                                                                        : "border-[#5d5d5d]"
                                                                } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                                placeholder="CTR of this ad campaign ? e.g. 2.4"
                                                                disabled={
                                                                    isSubmitting
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            <div className="flex justify-between mx-1 my-3">
                                                                <p className="text-red-400">
                                                                    {errors.ctr}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                name="link_clicks"
                                                                id="link_clicks"
                                                                value={
                                                                    values.link_clicks
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                className={`w-full p-3 bg-transparent border-[1px] ${
                                                                    errors.link_clicks &&
                                                                    touched.link_clicks
                                                                        ? "border-[#c74b4b]"
                                                                        : "border-[#5d5d5d]"
                                                                } rounded-md outline-none placeholder:text-[#5d5d5d] text-sm px-4 text-[#d6d6d6]`}
                                                                placeholder="Link clicks "
                                                                disabled={
                                                                    isSubmitting
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            <div className="flex justify-between mx-1 my-3">
                                                                <p className="text-red-400">
                                                                    {
                                                                        errors.link_clicks
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {!isSubmitting ? (
                                                <button
                                                    type="submit"
                                                    className={`bg-brandPaltte-500 p-4 rounded-md text-typography-body-dark mt-10 outline-none flex justify-center items-center gap-1`}
                                                >
                                                    {slideID === 4
                                                        ? "Create Ad Campaign"
                                                        : "Next"}
                                                </button>
                                            ) : (
                                                <div
                                                    className={`bg-alt-background text-zinc-400 p-4 rounded-md  mt-10 outline-none flex justify-center items-center gap-1`}
                                                >
                                                    <BiLoader
                                                        className="animate-spin"
                                                        size={20}
                                                    />
                                                    Next
                                                </div>
                                            )}
                                            <span className="my-[-30px] text-[#757575] text-[13px]">
                                                All this data should be filled
                                                from your ad manager
                                            </span>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Slider Points */}
                            <div className="text-white flex justify-center gap-6 mb-7 rounded-full max-w-sm mx-auto">
                                <div
                                    className={`${
                                        slideID === 0
                                            ? "bg-zinc-500"
                                            : "bg-alt-background "
                                    } h-4 w-4 rounded-full`}
                                ></div>
                                <div
                                    className={`${
                                        slideID === 1
                                            ? "bg-zinc-500"
                                            : "bg-alt-background "
                                    } h-4 w-4 rounded-full`}
                                ></div>
                                <div
                                    className={`${
                                        slideID === 2
                                            ? "bg-zinc-500"
                                            : "bg-alt-background "
                                    } h-4 w-4 rounded-full`}
                                ></div>
                                <div
                                    className={`${
                                        slideID === 3
                                            ? "bg-zinc-500"
                                            : "bg-alt-background "
                                    } h-4 w-4 rounded-full`}
                                ></div>
                                <div
                                    className={`${
                                        slideID === 4
                                            ? "bg-zinc-500"
                                            : "bg-alt-background "
                                    } h-4 w-4 rounded-full`}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdCampaignForm;
