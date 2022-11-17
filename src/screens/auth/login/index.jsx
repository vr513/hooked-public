import React from "react";
import styles from "./Login.module.css";
import Loading from "../../../shared/Loading";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import * as Yup from "yup";
import { Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
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
          nav("/register")
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
      <div className={styles.headLoginWrapper}>
        <div className={styles.loginWrapper}>
          <div className={styles.mainLogin}>
            <div className={styles.mainFormContainer}>
              <div className={styles.sectionContainer}>
                <div className={styles.formContainer}>
                  <Form>
                    <div className={styles.header}>
                      <h1 className={styles.titleMain}>Log In</h1>
                    </div>
                    {showAlert && (
                      <Alert
                        variant="danger"
                        onClose={() => setShowAlert(false)}
                        className={`${styles.customMainAlert}`}
                        dismissible
                      >
                        <Alert.Heading>Error</Alert.Heading>
                        <p>{alertMessage}</p>
                      </Alert>
                    )}
                    <Form.Group
                      className={styles.mb}
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Email Address*</Form.Label>
                      <Form.Control
                        className={styles.input}
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.email && formik.errors.email}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.errDiv}
                      >
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className={styles.mb}
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password*</Form.Label>
                      <Form.Control
                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.errDiv}
                      >
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </div>

                <div>
                  <div className={styles.forgor}>
                    Have you forgotton your password?
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.last}>
              <div className={styles.ques}>
                Don't have an account yet?
                <Link className={styles.anc} to="/signup">
                  Sign up here
                </Link>
              </div>

              <div className={styles.cancelCornfirmCont}>
                <h5 className={styles.cancel}>Cancel</h5>
                <button
                  disabled={formik.isSubmitting}
                  onClick={formik.handleSubmit}
                  className={styles.login}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
