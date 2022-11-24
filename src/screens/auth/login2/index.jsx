import "./login2.css";
import loginBg from "../../../assets/auth.png";
import { Image } from "react-bootstrap";
import Loading from "../../../shared/Loading";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import * as Yup from "yup";
import { Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const Login2 = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const { Login, isLoggedIn, Logout } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "Invalid username or password"
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setShowAlert(false);
      const res = await Login(values.email, values.password);
      if (res.status === 404) {
        setShowAlert(true);
        setAlertMessage(
          "Email address does not exist. Please signup to continue"
        );
      } else if (res.status === 401) {
        setShowAlert(true);
        setAlertMessage("Invalid username or password");
      } else if (res.status === 202) {
        if (res.data.userminimal.registered === 0) {
          nav("/register");
        } else if (res.data.userminimal.registered === 1) {
          nav("/");
        } else {
          alert("Unknown error occurred");
          const res = Logout();
          if (res) nav("/");
        }
      }
    },
  });
  useEffect(() => {
    if (isLoggedIn) {
      alert("User already logged in");
      nav("/");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="login__background">
        <div className="login__title">
          <div className="login_head-cont">
            <h1 className="login_head">HOOKED</h1>
          </div>
          <Image className="login_banner_img" src={loginBg} alt="image" />
          {/* <img className="login_banner_img" src="third.png" alt="image" /> */}
        </div>
        <div className="login_card">
          <Form className="login_page">
            <h1 className="login_signup">Log In</h1>

            <Form.Group className="login_txt_field" controlId="formBasicEmail">
              <Form.Control
                className="login_field_input"
                type="email"
                placeholder="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid" className={`login__errDiv`}>
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="login_txt_field" controlId="formBasicEmail">
              <Form.Control
                className="login_field_input"
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid" className={`login__errDiv`}>
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <button 
                className="login_btn"
                disabled={formik.isSubmitting}
                onClick={formik.handleSubmit}
            >
                Log In
            </button>
            <div className="login_log">
              Don't have an account?
              <Link to={"/signup"} className="login_footer_link">
                Sign Up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login2;
