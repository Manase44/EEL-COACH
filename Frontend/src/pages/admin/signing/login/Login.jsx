import "../Signing.css";
import logo from "../../../../assets/favicon.png";
import googleLogo from "../../../../assets/google.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";

const Login = () => {
  const signingFormHandling = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });
  return (
    <section className="signing-section">
      <div className="main-signing-container">
        <div className="signing-container-header">
          <Link to={"/"}>
            <picture className="signing-header-logo">
              <source />
              <img src={logo} alt="eel coach logo" />
            </picture>
          </Link>
          <h1 className="signing-header-title">eel coach</h1>
          <h1 className="signing-header-text">login to your account</h1>
        </div>
        <form className="signing-form">
          <div className="form-input">
            <label htmlFor="email">email address</label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                id="email"
                onChange={signingFormHandling.handleChange}
                value={signingFormHandling.values.email}
              />
              <div className="input-icon">
                <MdOutlineMail />
              </div>
            </div>
          </div>
          <div className="form-input">
            <label htmlFor="password">password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                id="password"
                onChange={signingFormHandling.handleChange}
                value={signingFormHandling.values.password}
              />
              <div className="input-icon">
                <GoEyeClosed />
              </div>
            </div>
          </div>
          <p className="signing-forget-text">
            <Link>forgot password?</Link>
          </p>
          <button>login</button>
        </form>
        <div className="or">
          <span>or</span>
        </div>

        <Link className="sign-with-google">
          <picture className="signing-google-logo">
            <source />
            <img src={googleLogo} alt="google logo" />
          </picture>
          <span>login with google</span>
        </Link>
        <p className="signing-ref-text">
          Don't have an Eel Coach account?{" "}
          <Link to={"/register"}>Register here</Link>{" "}
        </p>
      </div>
    </section>
  );
};

export default Login;
