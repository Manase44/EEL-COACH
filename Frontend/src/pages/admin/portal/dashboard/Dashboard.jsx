import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";

const Dashboard = () => {
  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <main className="portal-main-content"></main>
    </div>
  );
};

export default Dashboard;
