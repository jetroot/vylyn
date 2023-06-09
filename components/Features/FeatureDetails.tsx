import { data } from "autoprefixer";
import SectionContainer from "../Layouts/SectionContainer";

interface Props {
    sectionTitle: string;
    sectionSubtitle: string;
    data: any;
    cardStyle: string;
}

const SocialMedia = (props: Props) => {
    return (
        <SectionContainer>
            <h1 className="text-typography-body-dark text-xl leading-8">
                {props.sectionTitle}
            </h1>

            <div
                className="text-slate-400 text-[13px] max-w-lg mt-4"
                dangerouslySetInnerHTML={{
                    __html: props.sectionSubtitle,
                }}
            />
            <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-16 mt-10 mx-auto">
                {props.data.map((item: any, index: string) => (
                    <div
                        key={index}
                        className={`${props.cardStyle} h-52 flex justify-center items-center bg-[#232323] rounded-lg`}
                    >
                        <p className="w-[90%] text-typography-body-dark text-center text-sm">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default SocialMedia;
