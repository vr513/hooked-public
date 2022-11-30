import Button from "react-bootstrap/Button";
import { Form, Alert, Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../shared/Loading";
import React, { useState, useEffect } from "react";
import signupBg from "../../../assets/auth.webp";
import Layout from "../../../shared/Layout";

const Signup2 = () => {
  const [alertType, setAlertType] = useState("success");
  const [alertHeading, setAlertHeading] = useState("Error");
  const [alertMessage, setAlertMessage] = useState("We have an Error");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  const { Signup, isLoggedIn } = useAuth();
  const nav = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    cpassword: Yup.string()
      .required("Retype your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setShowAlert(false);
      const res = await Signup(values.email, values.password);
      if (res.status === 201) {
        console.log("In 201");
        setAlertType("success");
        setAlertHeading("Success");
        setAlertMessage(
          "User Registered Successfully. Please Log in to continue"
        );
        setShowAlert(true);
      } else if (res.status === 409) {
        console.log("In 409");
        setAlertType("danger");
        setAlertHeading("Error");
        setAlertMessage("User already Exists. Please Log in to continue");

        setShowAlert(true);
      } else {
        setAlertType("danger");
        setAlertHeading("Error");
        setAlertMessage(res.data.message);
        setShowAlert(true);
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
  return (
    <>
      <Layout backgroundColor={"#b0d8da"} backgroundImage={signupBg}>
        <Form className="login_page">
          <h1 className="login_signup">Create An Account</h1>
          {showAlert && (
            <Alert
              variant={alertType}
              onClose={() => setShowAlert(false)}
              className={`login_customMainAlert`}
              dismissible
            >
              <Alert.Heading>Error</Alert.Heading>
              <p>{alertMessage}</p>
            </Alert>
          )}
          <Form.Group
            className="signup-inp txt_field"
          >
            <Form.Control
              className="login_field_input"
              type="email"
              placeholder="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
              isValid={formik.touched.email && !formik.errors.email}
            />
            <Form.Control.Feedback type="invalid" className={`login__errDiv`}>
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="signup-inp txt_field"
          >
            <Form.Control
              className="login_field_input"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
              isValid={formik.touched.password && !formik.errors.password}
            />
            <Form.Control.Feedback type="invalid" className={`login__errDiv`}>
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="signup-inp txt_field"
          >
            <Form.Control
              className="login_field_input"
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              value={formik.values.cpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.cpassword && formik.errors.cpassword}
              isValid={formik.touched.cpassword && !formik.errors.cpassword}
            />
            <Form.Control.Feedback type="invalid" className={`login__errDiv`}>
              {formik.errors.cpassword}
            </Form.Control.Feedback>
          </Form.Group>
          <button
            className="login_btn"
            disabled={formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            Sign Up
          </button>
          <div className="login_log">
            Already have an account?
            <Link to={"/login"} className="login_footer_link">
              Login
            </Link>
          </div>
        </Form>
      </Layout>
    </>
  );
};

export default Signup2;
