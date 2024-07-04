import "../Signing.css";
import logo from "../../../../assets/favicon.png";
import googleLogo from "../../../../assets/google.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { FaFemale, FaMale } from "react-icons/fa";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { BiSolidUserDetail } from "react-icons/bi";

import { MdOutlineMail } from "react-icons/md";

const Register = () => {
  const signingFormHandling = useFormik({
    initialValues: {
      firstName: "",
      secondName: "",
      employeeNumber: "",
      email: "",
      phoneNumber: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <section className="signing-section">
      <div className="main-registering-container">
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
          <div className="register-name-inputs">
            <div className="form-input">
              <label htmlFor="firstName">first name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={signingFormHandling.handleChange}
                  value={signingFormHandling.values.firstName}
                />
                <div className="input-icon">
                  <BiSolidUserDetail />
                </div>
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="secondName">second name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="secondName"
                  id="secondName"
                  onChange={signingFormHandling.handleChange}
                  value={signingFormHandling.values.secondName}
                />
                <div className="input-icon">
                  <BiSolidUserDetail />
                </div>
              </div>
            </div>
          </div>
          <div className="form-input">
            <label htmlFor="employeeNumber">employee number</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="employeeNumber"
                id="employeeNumber"
                onChange={signingFormHandling.handleChange}
                value={signingFormHandling.values.employeeNumber}
              />
              <div className="input-icon">
                <CiShoppingTag />
              </div>
            </div>
          </div>
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
            <label htmlFor="phoneNumber">phone number</label>
            <div className="input-wrapper">
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                onChange={signingFormHandling.handleChange}
                value={signingFormHandling.values.phoneNumber}
              />
              <div className="input-icon">
                <MdOutlinePhoneEnabled />
              </div>
            </div>
          </div>
          <div className="register-date-photo">
            <div className="register-gender-input">
              <div className="form-input">
                <label htmlFor="male">male</label>
                <div className="input-wrapper">
                  <input type="radio" name="gender" id="male" />
                </div>
              </div>
              <div className="form-input">
                <label htmlFor="female">female</label>
                <div className="input-wrapper">
                  <input type="radio" name="gender" id="female" />
                </div>
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="image">upload your photo</label>
              <div className="input-wrapper">
                <input type="file" name="image" id="image" />
              </div>
            </div>
          </div>
          <div className="register-password-input">
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
            <div className="form-input">
              <label htmlFor="confirmPassword">confirm password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={signingFormHandling.handleChange}
                  value={signingFormHandling.values.confirmPassword}
                />
                <div className="input-icon">
                  <GoEyeClosed />
                </div>
              </div>
            </div>
          </div>
          <button>register</button>
        </form>
        <div className="or">
          <span>or</span>
        </div>

        <Link className="sign-with-google">
          <picture className="signing-google-logo">
            <source />
            <img src={googleLogo} alt="google logo" />
          </picture>
          <span>register with google</span>
        </Link>
        <p className="signing-ref-text">
          Already have an Eel Coach account?{" "}
          <Link to={"/login"}>Login here</Link>{" "}
        </p>
      </div>
    </section>
  );
};

export default Register;
