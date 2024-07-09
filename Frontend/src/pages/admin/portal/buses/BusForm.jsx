import { useFormik } from "formik";
import { bool, number, object, string } from "yup";
import { CiShoppingTag } from "react-icons/ci";
import { MdChair } from "react-icons/md";
import { GoRows } from "react-icons/go";
import { IoMdWifi } from "react-icons/io";
import { TbAirConditioning, TbBrandSocketIo } from "react-icons/tb";
import { LuPlugZap } from "react-icons/lu";
import { BsFillLuggageFill } from "react-icons/bs";
import { PiSeatBold } from "react-icons/pi";
import axios from "axios";
import { useState } from "react";
import doneSubmittingStore from "../../../../store/doneSubmitting.store";

const BusForm = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const setDoneSubmitting = doneSubmittingStore(
    (state) => state.setDoneSubmitting,
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const submitBus = async (busData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/admin/buses`, busData);
      if (response.data.ok) {
        setMessage(response.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };
  const validation = object({
    busNumber: string().required("this field is required").uppercase(),
    numberOfSeats: number()
      .required("this field is required")
      .min(14, "must number must  be at least 14"),
    rearSeat: number()
      .required("this field is required")
      .min(4, "must be atleast 4"),
    numberOfRows: number()
      .required("this field is required")
      .min(3, "must be atleast 3"),
    wifi: bool(),
  });
  const handleBusForm = useFormik({
    initialValues: {
      busNumber: "",
      numberOfSeats: "",
      rearSeat: "",
      numberOfRows: "",
      wifi: false,
      adjustableSeat: false,
      ac: false,
      sockets: false,
      luggageCompartment: false,
    },
    validationSchema: validation,
    onSubmit: (data) => {
      console.log(data);
      submitBus(data);
      setDoneSubmitting(true);
    },
  });
  return (
    <div>
      <form onSubmit={handleBusForm.handleSubmit}>
        <div className="form-input">
          <label htmlFor="busNumber">bus number</label>
          <div className="input-wrapper">
            <input
              type="text"
              name="busNumber"
              id="busNumber"
              onChange={handleBusForm.handleChange}
              value={handleBusForm.values.busNumber}
            />
            <div className="input-icon">
              <CiShoppingTag />
            </div>
          </div>
          {handleBusForm.errors.busNumber && (
            <p className="error">{handleBusForm.errors.busNumber}</p>
          )}
        </div>
        <div className="form-input">
          <label htmlFor="noOfSeats">number of seats</label>
          <div className="input-wrapper">
            <input
              type="number"
              name="numberOfSeats"
              id="noOfSeats"
              onChange={handleBusForm.handleChange}
              value={handleBusForm.values.numberOfSeats}
            />
            <div className="input-icon">
              <MdChair />
            </div>
          </div>
          {handleBusForm.errors.numberOfSeats && (
            <p className="error">{handleBusForm.errors.numberOfSeats}</p>
          )}
        </div>
        <div className="form-input">
          <label htmlFor="noOfRows">number of rows</label>
          <div className="input-wrapper">
            <input
              type="number"
              name="numberOfRows"
              id="noOfRows"
              onChange={handleBusForm.handleChange}
              value={handleBusForm.values.numberOfRows}
            />
            <div className="input-icon">
              <GoRows />
            </div>
          </div>
          {handleBusForm.errors.numberOfRows && (
            <p className="error">{handleBusForm.errors.numberOfRows}</p>
          )}
        </div>
        <div className="form-input">
          <label htmlFor="rearSeat">number of rear seats</label>
          <div className="input-wrapper">
            <input
              type="number"
              name="rearSeat"
              id="rearSeat"
              onChange={handleBusForm.handleChange}
              value={handleBusForm.values.rearSeat}
            />
            <div className="input-icon">
              <MdChair />
            </div>
          </div>
          {handleBusForm.errors.rearSeat && (
            <p className="error">{handleBusForm.errors.rearSeat}</p>
          )}
        </div>
        <fieldset className="amenities">
          <legend>amenities</legend>
          <div className="form-input" title="Wifi">
            <label htmlFor="wifi">
              <IoMdWifi className="amenities-icon" />
            </label>
            <div className="input-wrapper">
              <input
                type="checkbox"
                name="wifi"
                id="wifi"
                onChange={handleBusForm.handleChange}
                checked={handleBusForm.values.wifi}
              />
            </div>
          </div>
          <div className="form-input" title="Adjustable seats">
            <label htmlFor="adjustableSeat">
              <PiSeatBold className="amenities-icon" />
            </label>
            <div className="input-wrapper">
              <input
                type="checkbox"
                name="adjustableSeat"
                id="adjustableSeat"
                onChange={handleBusForm.handleChange}
                checked={handleBusForm.values.adjustableSeat}
              />
            </div>
          </div>
          <div className="form-input" title="Air conditioner">
            <label htmlFor="ac">
              <TbAirConditioning className="amenities-icon" />
            </label>
            <div className="input-wrapper">
              <input
                type="checkbox"
                name="ac"
                id="ac"
                onChange={handleBusForm.handleChange}
                checked={handleBusForm.values.ac}
              />
            </div>
          </div>
          <div className="form-input" title="Power source">
            <label htmlFor="sockets">
              <LuPlugZap className="amenities-icon" />
            </label>
            <div className="input-wrapper">
              <input
                type="checkbox"
                name="sockets"
                id="sockets"
                onChange={handleBusForm.handleChange}
                checked={handleBusForm.values.sockets}
              />
            </div>
          </div>
          <div className="form-input" title="Luggage compartment">
            <label htmlFor="luggageCompartment">
              <BsFillLuggageFill className="amenities-icon" />
            </label>
            <div className="input-wrapper">
              <input
                type="checkbox"
                name="luggageCompartment"
                id="luggageCompartment"
                onChange={handleBusForm.handleChange}
                checked={handleBusForm.values.luggageCompartment}
              />
            </div>
          </div>
        </fieldset>
        {error && <p className="error">{error}</p>}
        <button type="submit">
          {isLoading ? "adding the bus..." : "add"}{" "}
        </button>
      </form>
    </div>
  );
};

export default BusForm;
