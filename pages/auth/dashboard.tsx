import { UserContext } from "@/context";
import { useContext, useEffect } from "react";

const Dashboard = () => {
    const userContext = useContext(UserContext);

    useEffect(() => {
        console.log("id", userContext.user?.id);
    }, []);

    return <div>Dashboard</div>;
};

export default Dashboard;
