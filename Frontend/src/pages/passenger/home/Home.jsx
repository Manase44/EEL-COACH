import "./Home.css";
import homeBusPicture from "../../../assets/home_bus.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/book");
  };
  return (
    <section className="main-page">
      <picture>
        <source srcSet={homeBusPicture} />
        <img src={homeBusPicture} alt="animated passenger bus" width={150} />
      </picture>
      <h1 className="main-page-title">eel coach</h1>
      <button onClick={handleGetStarted}>get started</button>
    </section>
  );
};

export default Home;
