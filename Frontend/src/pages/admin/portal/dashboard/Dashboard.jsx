import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";

const Dashboard = () => {
  return (
    <>
      <Aside />
      <AdminHeader />
      <div className="dashboard-content"></div>
    </>
  );
};

export default Dashboard;
