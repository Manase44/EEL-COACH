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
  const [obtainedRoute, setObtainedRoute] = useState(false);
  const [errorObtainingRoute, setErrorObtainingRoute] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [busRoutes, setBusRoutes] = useState([]);
  const navigate = useNavigate();

  /*
  debbug
  yup validation
  managing the global states
  picking the route id
  adding the price--- this is after additting the database models(
  re-configure the relaationship between the employee and employee number models
  add fiels to bus(status(full/remaining seats), wifi, adjustable seats, ac, sockets, )
  add fields to route(status(full/remaining seats))
  )
  remove the console logs
  add header and footer
  handle submission
  handle redirect
  REACT TESTING
  RESPONSSIVENESS
  */

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
      noOfSeats: "1",
      date: "",
    },
    // validationSchema: validate,
    onSubmit: (data) => {
      setIsLoading(true);
      console.log(data);
      setIsLoading(false);
    },
  });

  const handleFindRoute = async (e) => {
    try {
      if (from && to) {
        const response = await axios.get(
          `${serverUrl}/admin/routes/${from.toLowerCase()}/${to.toLowerCase()}`,
        );
        if (response.data.ok) {
          setBusRoutes(response.data.specificRoute);
          setObtainedRoute(true);
          setErrorObtainingRoute(false);
        }
      }
    } catch (error) {
      setErrorObtainingRoute(error.response.data.message);
      setObtainedRoute(false);
    }
  };
  useEffect(() => {
    handleFindRoute();
  }, [from, to]);

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
                onChange={(e) => {
                  setFrom(e.target.value);
                }}
                value={from}
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
                onChange={(e) => {
                  setTo(e.target.value);
                }}
                value={to}
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

          {obtainedRoute && (
            <fieldset
              className="available-routes-container"
              id="route"
              label="route"
            >
              {busRoutes.map((route, i) => (
                <div className="choosing-route" key={i}>
                  <div>
                    <input
                      type="radio"
                      name="route"
                      id="routeId"
                      value={route.routeId}
                    />
                  </div>
                  <label htmlFor="routeId">
                    <p className="route-header">
                      Regular (Ksh. <span>1, 200</span>)
                    </p>
                    <div className="route-details">
                      <div className="from-location">
                        <span className="time">{route.departureTime}</span>
                        <span className="location">{route.from}</span>
                      </div>
                      <div className="route-icon">
                        <FaRoute />
                      </div>
                      <div className="to-location">
                        <p className="time"> {route.arrivalTime}</p>
                        <span className="location">{route.to}</span>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </fieldset>
          )}

          {errorObtainingRoute && (
            <p className="error">{errorObtainingRoute}</p>
          )}

          <button type="submit">
            {isLoading ? "give us a minute..." : "book"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Book;
