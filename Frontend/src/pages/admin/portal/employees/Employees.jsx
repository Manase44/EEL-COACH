import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";

const Employees = () => {
  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <main className="portal-main-content">
        <div className="main-content-label">
          <h2 className="main-content-title">employees</h2>
          <div className="label-cta">
            <button>add employee</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Employees;
