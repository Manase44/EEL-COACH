import "./Pay.css";
import mpesaLogo from "../../../assets/mpesa.png";
import paypalLogo from "../../../assets/paypal.png";
import mastercardLogo from "../../../assets/mastercard.png";
import { FaRoute, FaRegCalendarAlt } from "react-icons/fa";

import { useFormik } from "formik";

const Pay = () => {
  const handleForm = useFormik({
    initialValues: {
      name: "",
      idNumber: "",
      phoneNumber: "",
    },
  });
  return (
    <section className="payment-section">
      <h1 className="section-title">payment details</h1>
      <div className="payment-section-content">
        <div className="payment-details">
          <div>
            <h2 className="mini-title">payment options</h2>
            <div className="payment-methods">
              <div className="method mpesa">
                <img src={mpesaLogo} alt="mpesa" />
              </div>
              <div className="method">
                <img src={paypalLogo} alt="paypal" />
              </div>
              <div className="method">
                <img src={mastercardLogo} alt="mastercard" />
              </div>
            </div>
          </div>
          <form className="payment-form">
            <h2 className="mini-title">traveller details</h2>
            <div className="form-input pay">
              <label htmlFor="name">name:</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleForm.handleChange}
                  value={handleForm.values.name}
                />
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="idNumber">ID Number:</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="idNumber"
                  id="idNumber"
                  onChange={handleForm.handleChange}
                  values={handleForm.values.idNumber}
                />
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={handleForm.handleChange}
                  values={handleForm.values.phoneNumber}
                />
              </div>
            </div>

            <button>pay</button>
          </form>
        </div>

        <div className="amount-summary">
          <h2 className="mini-title">book summary</h2>
          <div className="summary">
            <p className="book-summary-date">
              <FaRegCalendarAlt /> 17/2/2025
            </p>
            <div className="route-details">
              <div className="from-location">
                <span className="time">7.00pm</span>
                <span className="location">malindi</span>
              </div>
              <div className="route-icon">
                <FaRoute />
              </div>
              <div className="to-location">
                <p className="time"> 5.30am</p>
                <span className="location">nairobi</span>
              </div>
            </div>
          </div>
          <h2 className="mini-title">payment summary</h2>
          <div className="summary">
            <div className="summary-item">
              <span>price:</span>
              <span>Ksh. 1, 200</span>
            </div>
            <div className="summary-item">
              <span>seats:</span>
              <span>1 Seat</span>
            </div>
            <div className="summary-item total">
              <span>Total Fare:</span>
              <span>Ksh. 1, 200</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pay;
