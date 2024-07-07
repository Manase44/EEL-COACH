import "./Book.css";
import { useNavigate } from "react-router-dom";
import { FaRoute, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { date, number, object, string } from "yup";
import axios from "axios";
import chosenRouteStore from "../../../store/routeId.store";
import numberOfSeatsStore from "../../../store/numberOfSeats.store";
import travellingDateStore from "../../../store/date.store";

const Book = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [obtainedRoute, setObtainedRoute] = useState(false);
  const [errorObtainingRoute, setErrorObtainingRoute] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busRoutes, setBusRoutes] = useState([]);
  const setRoute = chosenRouteStore((state) => state.setChosenRouteId);
  const setNumberOfSeats = numberOfSeatsStore(
    (state) => state.setNumberOfSeats,
  );
  const setTravellingDate = travellingDateStore(
    (state) => state.setTravellingDate,
  );

  const navigate = useNavigate();

  const validate = object({
    route: string().required("please select a route"),
    noOfSeats: number()
      .required("this field is required")
      .min(1, "must be atleast one")
      .positive(),
    date: date()
      .required("this field is required")
      .min(new Date(), "date must be in the future"),
  });

  const formHandling = useFormik({
    initialValues: {
      noOfSeats: "1",
      date: "",
      route: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      setIsLoading(true);
      setRoute(data.route);
      setNumberOfSeats(data.noOfSeats);
      setTravellingDate(data.date);
      navigate("/chooseseat");
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
      <h1 className="section-title">travelling details</h1>

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
            <fieldset className="available-routes-container">
              {busRoutes.map((route, i) => (
                <div className="choosing-route" key={i}>
                  <div>
                    <input
                      type="radio"
                      name="route"
                      id={`route${i}`}
                      onChange={formHandling.handleChange}
                      value={route.routeid}
                    />
                  </div>
                  <label htmlFor={`route${i}`}>
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
              {formHandling.errors.route && (
                <p className="error">{formHandling.errors.route}</p>
              )}
            </fieldset>
          )}

          {errorObtainingRoute && (
            <p className="error">{errorObtainingRoute}</p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "give us a minute..." : "book"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Book;
