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
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState();
  const [err, setErr] = useState();

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
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
      setErr(error);
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/admin/empcode`, {
        employeeNumber: code,
      });
      if (response.data.ok === true) {
        setModalOpen(false);
        setCode(null);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErr(error);
      setIsLoading(false);
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
                <button onClick={handleSubmitCode}>
                  {isLoading ? "adding..." : "add"}
                </button>
              </div>
            ) : (
              <button onClick={generateEmployeeCode}>
                {isGeneratng ? "generating..." : "generate employee number"}
              </button>
            )}
            {err && <p className="error">{err}</p>}
          </dialog>
        </div>
      </main>
    </div>
  );
};

export default Employees;
