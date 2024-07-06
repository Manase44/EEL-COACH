import "./AdminHeader.css";
import { MdOutlineNotificationsNone, MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import adminProfile from "../../assets/admin.jpg";

const AdminHeader = () => {
  return (
    <header>
      <div className="header-left-content">
        <h1 className="header-welcome-text">welcome!</h1>
        <p className="header-small-text">this is the admin portal</p>
      </div>
      <div className="header-right-content">
        <div className="header-icons-container">
          <MdOutlineSearch />
          <MdOutlineNotificationsNone />
        </div>
        <Link className="admin-profile">
          <div className="admin-details">
            <span className="admin-name">manase gunga</span>
            <span className="admin-position">office admin</span>
          </div>
          <div className="admin-picture">
            <picture>
              <source />
              <img src={adminProfile} alt="admin profile" />
            </picture>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
