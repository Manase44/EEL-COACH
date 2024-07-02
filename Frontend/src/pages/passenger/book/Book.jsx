import "./Book.css";
import { useNavigate } from "react-router-dom";
import { FaRoute, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { useFormik } from "formik";

const Book = () => {
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (values.noOfSeats < 1) {
      errors.noOfSeats = "Seats must be atleast one";
    }
  };
  const formHandling = useFormik({
    initialValues: {
      from: "",
      to: "",
      noOfSeats: "",
      date: "",
    },
    validate,
    onSubmit: (values) => {
      JSON.stringify(values);
    },
  });
  const handleBook = () => {
    navigate("/chooseseat");
  };
  return (
    <section className="booking-details-section">
      <div className="booking-details-section-input-container">
        <form className="booking-details-form">
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
            </div>
          </div>
        </form>

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
        <button onClick={handleBook}>book</button>
      </div>
    </section>
  );
};

export default Book;
