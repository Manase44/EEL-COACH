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
import { useState } from "react";
import axios from "axios";
import { object, ref, string } from "yup";

const Register = () => {
  const preset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handlePasswordShow = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };
  const handleConfPasswordShow = () => {
    if (!showConfPassword) {
      setShowConfPassword(true);
    } else {
      setShowConfPassword(false);
    }
  };

  const uploadingImage = async (e) => {
    if (!image) {
      setError("please choose an image");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        formData,
      );

      if (response.data && response.data.secure_url) {
        const secureUrl = response.data.secure_url;
        const previewUrl = secureUrl.replace(
          "/upload/",
          "/upload/w_400/f_auto,q_auto/",
        );

        return previewUrl;
      } else {
        setError(
          "An error happened while uploading the image, please try again",
        );
      }
    } catch (error) {
      setError("An error happened while uploading the image, try again later");
    }
  };

  const validation = object({
    firstName: string().required("this field is required").lowercase().trim(),
    secondName: string().required("this field is required").lowercase().trim(),
    employeeNumber: string().required("this field is required"),
    email: string()
      .email("invalid email address")
      .required("this field is required"),
    phoneNumber: string().required("this field is required"),
    gender: string().required("this field is required"),
    password: string()
      .required("this field is required")
      .min(8, "must have atleast 8 characters")
      .max(25, "must have at most 25 characters"),
    confirmPassword: string()
      .required("this field is required")
      .oneOf([ref("password")], "passwords must match"),
  });

  const signingFormHandling = useFormik({
    initialValues: {
      firstName: "",
      secondName: "",
      photoUrl: "",
      employeeNumber: "",
      email: "",
      phoneNumber: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validation,
    onSubmit: async (data) => {
      setIsLoading(true);
      const imageLink = await uploadingImage();
      if (imageLink) {
        data.photoUrl = imageLink;
        console.log(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
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
        <form
          className="signing-form"
          onSubmit={signingFormHandling.handleSubmit}
        >
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
              {signingFormHandling.errors.firstName && (
                <p className="error">{signingFormHandling.errors.firstName}</p>
              )}
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
              {signingFormHandling.errors.secondName && (
                <p className="error">{signingFormHandling.errors.secondName}</p>
              )}
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
            {signingFormHandling.errors.employeeNumber && (
              <p className="error">
                {signingFormHandling.errors.employeeNumber}
              </p>
            )}
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
            {signingFormHandling.errors.email && (
              <p className="error">{signingFormHandling.errors.email}</p>
            )}
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
            {signingFormHandling.errors.phoneNumber && (
              <p className="error">{signingFormHandling.errors.phoneNumber}</p>
            )}
          </div>
          <div className="register-date-photo" label="gender">
            <fieldset
              id="gender"
              label="gender"
              className="register-gender-input"
            >
              <div className="form-input">
                <label htmlFor="male">male</label>
                <div className="input-wrapper">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    onChange={signingFormHandling.handleChange}
                    value="male"
                  />
                </div>
              </div>
              <div className="form-input">
                <label htmlFor="female">female</label>
                <div className="input-wrapper">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    onChange={signingFormHandling.handleChange}
                    value="female"
                  />
                </div>
              </div>
              {signingFormHandling.errors.gender && (
                <p className="error">{signingFormHandling.errors.gender}</p>
              )}
            </fieldset>
            <div className="form-input">
              <label htmlFor="image">upload your photo</label>
              <div className="input-wrapper">
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          <div className="register-password-input">
            <div className="form-input">
              <label htmlFor="password">password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={signingFormHandling.handleChange}
                  value={signingFormHandling.values.password}
                />
                <div
                  className="input-icon password-eye"
                  onClick={handlePasswordShow}
                >
                  {showPassword ? <GoEye /> : <GoEyeClosed />}
                </div>
                {signingFormHandling.errors.password && (
                  <p className="error">{signingFormHandling.errors.password}</p>
                )}
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="confirmPassword">confirm password</label>
              <div className="input-wrapper">
                <input
                  type={showConfPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={signingFormHandling.handleChange}
                  value={signingFormHandling.values.confirmPassword}
                />
                <div
                  className="input-icon password-eye"
                  onClick={handleConfPasswordShow}
                >
                  {showConfPassword ? <GoEye /> : <GoEyeClosed />}
                </div>
              </div>
              {signingFormHandling.errors.confirmPassword && (
                <p className="error">
                  {signingFormHandling.errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">
            {isLoading ? "give us a minute..." : "register"}
          </button>
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
