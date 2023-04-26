import React from "react";
import _Features from "@/data/Features";
import SectionContainer from "../Layouts/SectionContainer";
import ProductIcon from "../ProductIcon";

interface Props {
    icon: string;
    name: string;
    description: string;
}

const IconSection = (props: Props) => {
    const { icon, name, description } = props;

    return (
        <div className="mb-10 space-y-4 md:mb-0">
            <div className="flex items-center">
                <ProductIcon icon={icon} />
                <div className="text-white ml-4 flex flex-row xl:flex-col">
                    {name}
                </div>
            </div>

            <p className="text-[#bbb] text-sm">{description}</p>

            {/* <div className="text-[#bbb] text-sm flex items-center gap-1">
                Learn more{" "}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sbui-icon "
                >
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>{" "}
            </div> */}
        </div>
    );
};

const Features = () => {
    return (
        <SectionContainer className="space-y-16 pb-0">
            <h3 className="text-gray-200 text-xl leading-8">
                Scale faster and focus on your customers
            </h3>
            <div className="grid grid-cols-1 gap-y-4  sm:grid-cols-2 md:grid-cols-2 md:gap-16 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-24">
                {_Features.map(({ icon, name, description }, index) => (
                    <IconSection
                        key={`${name}-${index}`}
                        name={name}
                        icon={icon}
                        description={description}
                    />
                ))}
            </div>
        </SectionContainer>
    );
};

export default Features;
