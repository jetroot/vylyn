import Link from "next/link";
import { useState } from "react";

const CancelPayment = () => {
    const [isMovingToDashboard, setIsMovingToDashboard] = useState(false);

    return (
        <div className="w-screen h-screen overflow-hidden">
            {isMovingToDashboard && (
                <div className="overflow-hidden w-screen">
                    <div className="bg-red-100 h-[3px] w-1/2 animate-wiggle"></div>
                </div>
            )}
            <div className="w-screen h-screen bg-red-400 overflow-hidden flex justify-center items-center">
                <div className="max-w-md flex flex-col">
                    <p className="text-slate-100 text-xl">
                        We regret to inform you that your payment could not be
                        processed. We apologize for any inconvenience caused and
                        kindly request you to review your payment details and
                        try again. <br /> Thank you.
                    </p>
                    <div className="my-7">
                        <Link
                            onClick={() => setIsMovingToDashboard(true)}
                            href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/dashboard`}
                            className="bg-red-700 text-slate-200 rounded-lg p-3"
                        >
                            Go to dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelPayment;
