import { DashboardContent } from "@components";
import { capEach } from "@utils";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <DashboardContent title="Dashboard" description="Your personal dashboard">
            <h1>Welcome, {capEach(user.name)}</h1>
        </DashboardContent>
    )
}

export default Dashboard;
