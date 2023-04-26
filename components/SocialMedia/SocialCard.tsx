import { IconType } from "react-icons/lib";

interface Props {
    Icon: IconType;
    company: string;
    description: string;
    color: string;
}

const SocialCard = ({ Icon, company, description, color }: Props) => {
    return (
        <div className="flex flex-col">
            <div className="flex gap-2 items-center">
                <div className="bg-white rounded-md w-8 h-8 flex justify-center items-center">
                    <Icon className="w-6 h-6" color={color} />
                </div>
                <span className="text-typography-body-dark leading-8 text-lg">
                    {company}
                </span>
            </div>

            <span className="text-typography-body-secondary-dark text-md mt-4 max-w-sm">
                {description}
            </span>
        </div>
    );
};

export default SocialCard;
