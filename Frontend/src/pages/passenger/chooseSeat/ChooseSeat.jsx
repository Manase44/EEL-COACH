import "./ChooseSeat.css";
import { useNavigate } from "react-router-dom";
const ChooseSeat = () => {
  const navigate = useNavigate();
  const handleChooseSeat = () => {
    navigate("/payments");
  };
  return (
    <section className="choose-seat-section">
      <div className="key"></div>
      <button onClick={handleChooseSeat}>choose seat</button>
    </section>
  );
};

export default ChooseSeat;
