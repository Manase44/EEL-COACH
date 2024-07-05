import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";

const Offices = () => {
  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <main className="portal-main-content">
        <div className="main-content-label">
          <h2 className="main-content-title">available Offices</h2>
          <div className="label-cta">
            <button>register office</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Offices;
