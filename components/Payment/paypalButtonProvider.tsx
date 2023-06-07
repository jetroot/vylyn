import {useEffect, useState} from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { BsPaypal } from "react-icons/bs";
import {BiLoaderAlt} from 'react-icons/bi'
import Link from "next/link";
import { SIGN_IN_URI } from "@/config";
import { useRouter } from "next/router";

interface Props {
    plan: string;
}

const PaypalButtonProvider = ({ plan }: Props) => {
    const session: any = useSession();
    const router = useRouter();

    const [paypalButtonClicked, setPaypalButtonClicked] = useState(false)

    const handlePay = async (userId: string, plan: string) => {
        // console.log(`pay for userId ${userId} with plan ${plan}`);
        setPaypalButtonClicked(true);
        try {
            const response = await axios.post(
                "/api/payment",
                {
                    plan,
                    userId,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                router.replace(response.data.data.forwardLink);
                // console.log("redirect");
            }
        } catch (error) {
            console.log('err', error)
        }
    };

    useEffect(() => {
        // console.log("session", session.data?.user);
    }, [session]);

    return (
        <>
            {session.data ? (
                paypalButtonClicked  ? <div className={"p-1.5 flex justify-center"}><BiLoaderAlt className={'animate-spin'} /></div> : <button
                    type="button"
                    onClick={() => {
                        handlePay(session.data?.user?.id, plan);
                    }}
                    className="w-full flex justify-center items-center gap-2 text-md p-1.5"
                >
                    <BsPaypal />
                    Pay with PayPal
                </button>

            ) : (
                <Link
                    href={SIGN_IN_URI}
                    className="flex items-center justify-center gap-2 text-md"
                >
                    <BsPaypal />
                    Pay with Paypal
                </Link>
            )}
        </>
    );
};

export default PaypalButtonProvider;
