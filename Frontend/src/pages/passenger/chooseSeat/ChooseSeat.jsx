import "./ChooseSeat.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import chosenRouteStore from "../../../store/routeId.store";
import seatNumberStore from "../../../store/seatsNumber.store";
import { MdChair } from "react-icons/md";

const ChooseSeat = () => {
  const routeId = chosenRouteStore((state) => state.chosenRouteId);
  const selectedSeat = seatNumberStore((state) => state.seatNumber);
  const setSelectedSeat = seatNumberStore((state) => state.setSeatNumber);
  const navigate = useNavigate();

  const handleValue = (seatNumber) => {
    const newSelectedSeats = selectedSeat.includes(seatNumber)
      ? selectedSeat.filter((seat) => seat !== seatNumber)
      : [...selectedSeat, seatNumber];
    setSelectedSeat(newSelectedSeats);
  };

  const rowSeats = 10;

  const handleChooseSeat = () => {
    navigate("/payments");
  };

  return (
    <section className="choose-seat-section">
      <h1 className="section-title">choose seat</h1>
      <main className="choose-seat-content">
        <div className="seats-arrangement-model">
          <div className="seat-row">
            {Array.from({ length: rowSeats }).map((_, i) => {
              const seatNumber = i + 1;
              return (
                <div
                  className="bus-seat"
                  key={i}
                  onClick={() => handleValue(seatNumber)}
                >
                  <MdChair
                    className={
                      selectedSeat.includes(seatNumber) ? "seat-selected" : ""
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="content-side-division">
          <div className="seat-selection-key">
            <h2 className="mini-title">selection key</h2>
            <div className="key-element">
              <MdChair />
              <p>availble seat</p>
            </div>
            <div className="key-element">
              <MdChair className="seat-selected" />
              <p>selected seat</p>
            </div>
            <div className="key-element">
              <MdChair className="seat-occupied" />
              <p>accupied seat</p>
            </div>
          </div>
          {selectedSeat.length > 0 && (
            <div className="seats-selected">
              <h2 className="mini-title">selection summary</h2>
              <p>seats selected:</p>
              <span>{selectedSeat.join(", ")}</span>
              <button onClick={handleChooseSeat}>choose seat</button>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default ChooseSeat;
