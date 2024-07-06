import "./Book.css";
import { useNavigate } from "react-router-dom";
import { FaRoute, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { date, number, object, string } from "yup";
import axios from "axios";

const Book = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const navigate = useNavigate();

  const validate = object({
    from: string().required("this field is required").trim(),
    to: string().required("this field is required").trim,
    noOfSeats: number().required("this field is required").min(1),
    date: date().required("this field is required"),
  });
  const formHandling = useFormik({
    initialValues: {
      from: "",
      to: "",
      noOfSeats: "",
      date: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      setIsLoading(true);
      console.log(data);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    try {
      const response = axios.get(`${serverUrl}/admin/routes/${from}/${to}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [from]);
  return (
    <section className="booking-details-section">
      <div className="booking-details-section-input-container">
        <form
          className="booking-details-form"
          onSubmit={formHandling.handleSubmit}
        >
          <div className="form-input">
            <label htmlFor="from">from:</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="from"
                id="from"
                onChange={formHandling.handleChange}
                value={formHandling.values.from}
              />
              <div className="input-icon">
                <MdOutlineLocationOn />
              </div>
            </div>
            {formHandling.errors.from && (
              <p className="error">{formHandling.errors.from}</p>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="to">to:</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="to"
                id="to"
                placeholder="to"
                onChange={formHandling.handleChange}
                value={formHandling.values.to}
              />
              <div className="input-icon">
                <MdOutlineLocationOn />
              </div>
            </div>
            {formHandling.errors.to && (
              <p className="error">{formHandling.errors.to}</p>
            )}
          </div>
          <div className="seat-date">
            <div className="form-input seat">
              <label htmlFor="noOfSeats">Seats: </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="noOfSeats"
                  id="noOfSeats"
                  onChange={formHandling.handleChange}
                  value={formHandling.values.noOfSeats}
                />
                <div className="input-icon">
                  <TbUserQuestion />
                </div>
              </div>
              {formHandling.errors.noOfSeats && (
                <p className="error">{formHandling.errors.noOfSeats}</p>
              )}
            </div>
            <div className="form-input date">
              <label htmlFor="date">date:</label>
              <input
                type="date"
                name="date"
                id="date"
                onChange={formHandling.handleChange}
                value={formHandling.values.date}
              />
              {formHandling.errors.date && (
                <p className="error">{formHandling.errors.date}</p>
              )}
            </div>
          </div>
          <div className="available-routes-container">
            <div className="route">
              <p className="route-header">
                Regular (Ksh. <span>1, 200</span>)
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
          </div>
          <button type="submit">
            {isLoading ? "give us a minute..." : "book"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Book;
