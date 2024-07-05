import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";

const Buses = () => {
  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <div className="portal-main-content">
        <div className="main-content-label">
          <h2 className="main-content-title">available buses</h2>
          <div className="label-cta">
            <button>add bus</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buses;
