import Container from "../components/Container";
import Layout from "../components/Layouts"
import Hero from "../components/Hero";
import Features from "@/components/Features";
import SocialMedia from "@/components/SocialMedia";

export default function Home() {
    return (
        <Layout>
            <Container>
                <Hero />
                <Features />
                <SocialMedia />
            </Container>
        </Layout>
    );
}
