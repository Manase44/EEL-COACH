import "../Portal.css";
import Aside from "../../../../components/aside/Aside";
import AdminHeader from "../../../../components/adminHeader/AdminHeader";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import axios from "axios";

const Employees = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [modalOpen, setModalOpen] = useState(false);
  const [isGeneratng, setIsGenerating] = useState(false);
  const [code, setCode] = useState();

  const handleModalToggle = () => {
    if (modalOpen) {
      setModalOpen(false);
      setCode(null);
    } else {
      setModalOpen(true);
    }
  };

  const generateEmployeeCode = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.get(`${serverUrl}/admin/empcode/generator`);
      setCode(response.data.code);
      setIsGenerating(false);
    } catch (error) {
      console.log(error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="portal-container">
      <Aside />
      <AdminHeader />
      <main className="portal-main-content">
        <div className="main-content-label">
          <h2 className="main-content-title">employees</h2>
          <div className="label-cta">
            <button onClick={handleModalToggle} disabled={modalOpen}>
              add employee
            </button>
          </div>
          <dialog open={modalOpen} className="adding-employee">
            <div className="adding-employee-header">
              <h3>adding employee</h3>
              <span onClick={handleModalToggle}>
                <IoMdCloseCircleOutline />
              </span>
            </div>
            {code ? (
              <div className="employee-number">
                <span className="number">{code}</span>
                <button>add</button>
              </div>
            ) : (
              <button onClick={generateEmployeeCode}>
                {isGeneratng ? "generating..." : "generate employee number"}
              </button>
            )}
          </dialog>
        </div>
      </main>
    </div>
  );
};

export default Employees;
