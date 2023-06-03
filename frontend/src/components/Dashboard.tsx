import Overview from "./Overview";

const Dashboard = () => {
    return (
        <div className="md:w-full md:min-h-screen md:flex md:flex-row md:gap-3 hidden z-10 ">
            {/* <SideBar showPage={(x) => showPage(x)} /> */}
            <Overview />
        </div>)
}

export default Dashboard;