// import React from "react";
import { useFormik } from "formik";
import { basicSchema } from "./schema";
import axios from "axios";
import { useState } from "react";
import Thankyou from "../thankyou";

interface Props {
    email: string;
}

interface Response {
    msg: string;
    subMessage?: any,
    status: number;
}

const Index = () => {
    const [response, setResponse] = useState<Response>({
        msg: "",
        status: -1,
    });

    // console.log(process.env.NEXT_PUBLIC_APP_URL);
    const onSubmit = async (values: Props, actions: any) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/join`,
                {
                    email: values.email,
                }
            );

            // store response
            setResponse({
                status: res.status,
                msg: res.data.msg,
                subMessage: res.data.subMessage,
            });

            // reset form
            actions.resetForm();
        } catch (err: any) {
            setResponse({
                status: err.response.status,
                msg: err.response.data.msg,
            });
        }
    };

    const {
        values,
        errors,
        isSubmitting,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik<Props>({
        initialValues: {
            email: "",
        },
        validationSchema: basicSchema,
        onSubmit,
    });

    return (
        <>
            {response && response.status === 500 && (
                <h1
                    className={`text-center text-red-400 container max-w-sm mx-auto rounded-sm px-4 py-2 my-2 font-semibold`}
                >
                    {response.msg}
                </h1>
            )}
            {response.status === 201 && (
                <Thankyou msg={response.msg} subMessage={response.subMessage} />
            )}

            {response.status !== 201 && (
                <>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex justify-center items-center"
                    >
                        <div className="relative max-w-sm w-full flex items-center max-md:px-2">
                            <input
                                autoComplete="none"
                                className={`appearance-none bg-transparent w-full border-2 ${
                                    errors.email && touched.email
                                        ? "border-red-400"
                                        : "border-brandPaltte-500"
                                }  ${
                                    isSubmitting
                                        ? "text-gray-300"
                                        : "text-slate-100"
                                } text-[12px] placeholder:text-[12px] py-3 px-5 leading-tight focus:outline-none rounded-full`}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your email"
                                aria-label="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                disabled={isSubmitting}
                                // required
                            />
                            <button
                                className={`absolute ${
                                    isSubmitting
                                        ? "cursor-default"
                                        : "cursor-pointer"
                                } max-md:mr-2 right-0 flex justify-center items-center flex-shrink-0 bg-gradient-to-r from-brandPaltte-600 bg-pink-600 border-none font-semibold text-sm text-white py-3 px-3 rounded-full`}
                                type={`${isSubmitting ? "button" : "submit"}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            viewBox="0 0 16 16"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            className="hds-flight-icon--animation-loading animate-spin px-1 h-4"
                                        >
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                            ></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <g
                                                    fill="#fff"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                >
                                                    {" "}
                                                    <path
                                                        d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                                                        opacity=".2"
                                                    ></path>{" "}
                                                    <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path>{" "}
                                                </g>{" "}
                                            </g>
                                        </svg>
                                        <small className="text-slate-200">
                                            {" "}
                                            Joining beta
                                        </small>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-4 h-4 mr-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                                            />
                                        </svg>
                                        Join beta
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    <small className="container text-center text-red-400 pt-2">
                        {errors.email && touched.email && errors.email}
                    </small>
                </>
            )}
        </>
    );
};

export default Index;
