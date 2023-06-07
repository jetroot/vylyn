import Link from "next/link";
import { useState } from "react";

const SuccessPayment = () => {
    const [isMovingToDashboard, setIsMovingToDashboard] = useState(false);

    return (
        <div className="w-screen h-screen overflow-hidden">
            {isMovingToDashboard && (
                <div className="overflow-hidden w-screen">
                    <div className="bg-red-400 h-[3px] w-1/2 animate-wiggle"></div>
                </div>
            )}
            <div className="w-screen h-screen bg-brandPaltte-600 overflow-hidden flex justify-center items-center">
                <div className="max-w-md flex flex-col">
                    <p className="text-slate-100 text-2xl">
                        <span className="font-semibold">Congratulations!</span> Your payment has been
                        successfully processed. We look forward to helping you
                        achieve your goals.
                    </p>
                    <div className="my-7">
                        <Link
                            onClick={() => setIsMovingToDashboard(true)}
                            href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/dashboard`}
                            className="bg-brandPaltte-700 text-slate-200 rounded-lg p-3"
                        >
                            Go to dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPayment;
