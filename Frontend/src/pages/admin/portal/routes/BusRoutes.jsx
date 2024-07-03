import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";

const BusRoutes = () => {
  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <main className="portal-main-content">
        <div className="main-content-label">
          <h2 className="main-content-title">
            These are the registered routes
          </h2>
          <div className="label-cta">
            <button>add route</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>route no.</th>
              <th> from</th>
              <th>to</th>
              <th>depature time</th>
              <th>arrival time</th>
              <th>passenger arrival time</th>
              <th>bus id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ERMN/001</td>
              <td>malindi</td>
              <td>nairobi</td>
              <td>7.00pm</td>
              <td>5.30am</td>
              <td>6.30pm</td>
              <td>EBS-23G4</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default BusRoutes;
