import "./Aside.css";
import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <aside>
      <div className="aside-header">
        <h1>eel coach</h1>
      </div>
      <ul className="aside-menu">
        <li className="aside-items">
          <Link to={"/admin/dashboard"}>dashboard</Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/bookings"}>bookings</Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/buses"}>buses</Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/employees"}>employees</Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/offices"}>offices</Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/payments"}>payments</Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/routes"}>routes</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
