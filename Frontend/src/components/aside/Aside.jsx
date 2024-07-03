import "./Aside.css";
import { Link } from "react-router-dom";
import { TbBrandBooking } from "react-icons/tb";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsBusFront } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { MdOutlinePayments } from "react-icons/md";
import { FaRoute } from "react-icons/fa";

const Aside = () => {
  return (
    <aside>
      <div className="aside-header">
        <Link to={"/"}>
          <h1>eel coach</h1>
        </Link>
      </div>
      <ul className="aside-menu">
        <li className="aside-items">
          <Link to={"/admin/dashboard"}>
            <TbLayoutDashboardFilled />
            <span>dashboard</span>
          </Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/bookings"}>
            <TbBrandBooking />
            <span>bookings</span>
          </Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/buses"}>
            <BsBusFront />
            <span>buses</span>
          </Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/employees"}>
            <GrUserWorker />
            <span>employees</span>
          </Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/offices"}>
            <PiBuildingOfficeBold />
            <span>offices</span>
          </Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/payments"}>
            <MdOutlinePayments />
            <span>payments</span>
          </Link>
        </li>
        <li className="aside-items">
          <Link to={"/admin/routes"}>
            <FaRoute />
            <span>route</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
