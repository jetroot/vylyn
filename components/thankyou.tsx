import React from "react";

interface Props {
    msg: string;
    subMessage: string;
}

const Thankyou = ({ msg, subMessage }: Props) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden text-9xl font-bold flex flex-col justify-center items-center text-center bg-black text-white">
            {msg}
            <small className="max-md:mx-2 text-[15px] text-slate-300 leading-[1.4rem] my-10 max-w-[35rem]">{subMessage}</small>
        </div>
    );
};

export default Thankyou;
