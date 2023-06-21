import Container from "../components/Container";
import Layout from "../components/Layouts";
import Hero from "../components/Hero";
import Features from "@/components/Features";
import FeatureDetails from "@/components/Features/FeatureDetails";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
    return (
        <Layout>
            <Container>
                <Hero />
                <Features />
                <HowItWorks />
                <FeatureDetails
                    sectionTitle={"AI Generated Queries"}
                    cardStyle="border border-[#8181d1]"
                    sectionSubtitle={
                        "Ai Generated Questions based on your ad campaigns. Get the Perfect Answers with <strong>ChatGPT</strong>! Say goodbye to brainstorming ad campaigns. Let our AI do the work for you, generating queries that guarantee results. Your data-driven success story starts here!"
                    }
                    data={[
                        "How can we increase our conversions while keeping  our budget $300?",
                        "How can we optimize our targeting so that we get maximum reach?",
                        "Is there any way to lower CPC (Cost Per Click)?",
                        "What should adjust to increase CTR (Click Through Rate) ?",
                    ]}
                />
                <FeatureDetails
                    sectionTitle={"Why my ad is not converting?"}
                    cardStyle="border border-[#9a6666]"
                    sectionSubtitle={
                        "Our AI will show you, why your ad is not converting and what's the problem with your ad campaign"
                    }
                    data={[
                        "Link clicks are low, potential to invest in other CTA’s",
                        "Target  countries & gender are broad, limit to specific demographics for more sucess.",
                        "Reach & Impressions numbers indicate  low frequency.",
                        "High CPC (Cost Per Click) and CPR (Cost Per Result).",
                    ]}
                />
                <FeatureDetails
                    sectionTitle={"How to optimize my ad?"}
                    sectionSubtitle={
                        "AI will scan your campaign and will list some solution to optimize your ad"
                    }
                    cardStyle="border border-[#4e9774]"
                    data={[
                        "Use retargeting campaigns to reach out to people who have already shown an interest in the product, to get them to reengage.",
                        "Increasing budget may help to bring more reach and impressions, leading to more engagement",
                        "Check competitor's campaigns for ideas or insights and see how to adapt your ads.",
                        "Focus on creating more engaging content to increase the link clicks and the results from the campaigns.",
                    ]}
                />
            </Container>
        </Layout>
    );
}
