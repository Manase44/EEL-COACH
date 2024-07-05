import "./Home.css";
import homeBusPicture from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const testing = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/employees");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetStarted = () => {
    navigate("/book");
  };
  return (
    <section className="main-page">
      <picture>
        <source srcSet={homeBusPicture} />
        <img src={homeBusPicture} alt="animated passenger bus" width={250} />
      </picture>
      <button onClick={testing}>get started</button>
    </section>
  );
};

export default Home;
