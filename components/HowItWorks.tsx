import React from "react";
import SectionContainer from "./Layouts/SectionContainer";
import Image from "next/image";

const HowItWorks = () => {
    return (
        <SectionContainer className="pb-0">
            <h3 className="text-gray-200 text-xl leading-8">How it works</h3>

            <div className="">
                <Image
                    src={"/howworks.png?v1.0"}
                    alt="How vylyn works"
                    width={1920}
                    height={1080}
                />
            </div>
        </SectionContainer>
    );
};

export default HowItWorks;
