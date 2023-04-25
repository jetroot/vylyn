import SectionContainer from "../Layouts/SectionContainer";

const Index = () => {
    return (
        <SectionContainer>
            <div className="border-[#4d4d4d] border-t container mx-auto">
                <div className="my-5 flex justify-between">
                    <small className="text-gray-500">© Vylyn Ltd</small>
                    <div className="text-gray-500">
                        {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

export default Index;
