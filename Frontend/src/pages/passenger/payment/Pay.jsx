import "./Pay.css";
import mpesaLogo from "../../../assets/mpesa.png";
import paypalLogo from "../../../assets/paypal.png";
import mastercardLogo from "../../../assets/mastercard.png";
import { FaRoute, FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import travellingDateStore from "../../../store/date.store";
import numberOfSeatsStore from "../../../store/numberOfSeats.store";
import chosenRouteStore from "../../../store/routeId.store";
import seatNumberStore from "../../../store/seatsNumber.store";
import { useFormik } from "formik";
import { number, object, string } from "yup";
import PhoneInput from "react-phone-number-input/input";
import { useState } from "react";

const Pay = () => {
  const route = chosenRouteStore((state) => state.chosenRouteId);
  const numberOfSeats = numberOfSeatsStore((state) => state.numberOfSeats);
  const travellingDate = travellingDateStore((state) => state.travellngDate);
  const selectedSeats = seatNumberStore((state) => state.seatNumber);

  const navigate = useNavigate();

  const validation = object({
    name: string().required("this field is required").lowercase(),
    idNumber: string()
      .required("this field is required")
      .matches(/^\d+$/, "invalid ID"),
    phoneNumber: string()
      .required("this field is required")
      .min(13, "ID Number must be at least 9 digits")
      .max(13, "ID Number must be at most 10 digits"),
  });

  const handleForm = useFormik({
    initialValues: {
      name: "",
      idNumber: "",
      phoneNumber: "",
      routeId: "",
      noOfSeats: "",
      selectedSeats: "",
      travellingDate: "",
    },
    validationSchema: validation,
    onSubmit: (data) => {
      console.log(data);
      data.routeId = route;
      data.noOfSeats = numberOfSeats;
      data.selectedSeats = selectedSeats;
      data.travellingDate = travellingDate;

      navigate("/done");
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
          <form className="payment-form" onSubmit={handleForm.handleSubmit}>
            <h2 className="mini-title">traveller details</h2>
            <div className="form-input pay">
              <label htmlFor="name">name:</label>
              <div className="input-wrapper">
                <input
                  placeholder="e.g Manase Gunga"
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleForm.handleChange}
                  value={handleForm.values.name}
                />
              </div>
              {handleForm.errors.name && (
                <p className="error">{handleForm.errors.name}</p>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="idNumber">ID Number:</label>
              <div className="input-wrapper">
                <input
                  placeholder="e.g 14763923"
                  type="number"
                  name="idNumber"
                  id="idNumber"
                  onChange={handleForm.handleChange}
                  values={handleForm.values.idNumber}
                />
              </div>
              {handleForm.errors.idNumber && (
                <p className="error">{handleForm.errors.idNumber}</p>
              )}
            </div>
            <div className="form-input">
              <div className="input-wrapper">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <PhoneInput
                  placeholder="e.g 0711223344"
                  country="KE"
                  value={handleForm.values.phoneNumber}
                  onChange={(value) =>
                    handleForm.setFieldValue("phoneNumber", value)
                  }
                />
              </div>
              {handleForm.errors.phoneNumber && (
                <p className="error">{handleForm.errors.phoneNumber}</p>
              )}
            </div>

            <button type="submit">pay fare</button>
          </form>
        </div>

        <div className="amount-summary">
          <h2 className="mini-title">book summary</h2>
          <div className="summary">
            <p className="book-summary-date">
              <FaRegCalendarAlt /> {travellingDate}
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
              <span>
                {numberOfSeats} {numberOfSeats > 1 ? "seats" : "seat"}
              </span>
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
