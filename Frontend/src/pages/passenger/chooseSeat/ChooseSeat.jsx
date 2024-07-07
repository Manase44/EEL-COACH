import "./ChooseSeat.css";
import { useNavigate } from "react-router-dom";
import chosenRouteStore from "../../../store/routeId.store";

const ChooseSeat = () => {
  const routeId = chosenRouteStore((state) => state.chosenRouteId);

  const navigate = useNavigate();
  const handleChooseSeat = () => {
    navigate("/payments");
  };
  return (
    <section className="choose-seat-section">
      <h1 className="section-title">choose seat</h1>
      <main className="choose-seat-content">
        <div className="seats-arrangement-model"></div>
        <div className="content-side-division">
          <div className="key">
            <p>availble seat</p>
            <p>accupied seat</p>
            <p>selected seat</p>
          </div>
          <div className="seats-selected">
            <p>you selected seat number:</p>
            <span>4, 10</span>
            <button onClick={handleChooseSeat}>choose seat</button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ChooseSeat;
