import SectionContainer from "../Layouts/SectionContainer";
import { TiSocialLinkedin } from "react-icons/ti";

const Index = () => {
    return (
        <SectionContainer>
            <div className="border-[#4d4d4d] border-t container mx-auto">
                <div className="my-5 flex justify-between">
                    <div>
                        <a
                            href="https://www.linkedin.com/company/vylyn/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <TiSocialLinkedin
                                className="text-slate-300 bg-blue-400 rounded-full"
                                size={20}
                            />
                        </a>
                    </div>
                    <small className="text-gray-500 text-[12px]">
                        © Vylyn - {new Date().getFullYear()}
                    </small>
                </div>
            </div>
        </SectionContainer>
    );
};

export default Index;
