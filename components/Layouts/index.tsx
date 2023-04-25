import { ReactNode } from "react";

import Nav from "../Nav";
import Footer from "../Footer";

type Props = {
    children: ReactNode;
};

const Index = ({ children }: Props) => {
    return (
        <>
            <Nav />
            <div className="min-h-screen">
                <main>{children}</main>
            </div>
            <Footer />
        </>
    );
};

export default Index;
