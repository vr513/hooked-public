import React, { useState , useEffect } from "react";
import styles from "./Signup.module.css";
import Button from "react-bootstrap/Button";
import { Form, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../contexts/AuthContext";
import { Link , useNavigate } from "react-router-dom";
import Loading from "../../../shared/Loading";

const Signup = () => {

  const [alertType, setAlertType] = useState('success');
  const [alertHeading, setAlertHeading] = useState("Error");
  const [alertMessage, setAlertMessage] = useState("We have an Error");
  const [alertClass, setAlertClass] = useState(styles.customSuccess);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const { Signup , isLoggedIn } = useAuth();
  const nav = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    cpassword: Yup.string()
      .required("Retype your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    enableReinitialize: true,
    validateOnChange:true,
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      setShowAlert(false)
      const res = await Signup(values.email , values.password);
      if(res.status === 201){
        console.log("In 201")
        setAlertType('success');
        setAlertHeading('Success');
        setAlertMessage("User Registered Successfully. Please Log in to continue");
        setShowAlert(true);
        setAlertClass(styles.customSuccess);
      }else if(res.status === 409){
        console.log("In 409")
        setAlertType('danger');
        setAlertHeading('Error');
        setAlertMessage("User already Exists. Please Log in to continue");
        setAlertClass(styles.customDanger);
        setShowAlert(true);
      }else{
        setAlertType('danger');
        setAlertHeading('Error');
        setAlertMessage(res.data.message);
        setAlertClass(styles.customSuccess);
        setShowAlert(true);
      }
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      alert("User already logged in")
      nav("/");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className={styles.headSignupWrapper}>
        <div className={styles.signupWrapper}>
          <div className={styles.mainSignup}>
            <div className={styles.mainFormContainer}>
              <div className={styles.sectionContainer}>
                <div className={styles.formContainer}>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className={styles.header}>
                      <h1 className={styles.titleMain}>Sign Up</h1>
                    </div>
                    {showAlert && (
                      <Alert variant={alertType} onClose={() => setShowAlert(false)} className={`${alertClass} ${styles.customMainAlert}`} dismissible>
                        <Alert.Heading>{alertHeading}</Alert.Heading>
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
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.email && formik.errors.email}
                        isValid={formik.touched.email && !formik.errors.email}
                      />
                      <Form.Control.Feedback type="invalid" className={styles.errDiv}>
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* PASSOWORD */}

                    <Form.Group className={styles.mb} controlId="formBasicPassword">
                      <Form.Label>Password*</Form.Label>
                      <Form.Control
                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
                        isValid={formik.touched.password && !formik.errors.password}
                      />
                      <Form.Control.Feedback type="invalid" className={styles.errDiv}>
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* PASSWORD CONFIRMATION */}

                    <Form.Group className={styles.mb} controlId="formBasicPassword2">
                      <Form.Label>Password Confirmation*</Form.Label>
                      <Form.Control
                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        name="cpassword"
                        value={formik.values.cpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.cpassword && formik.errors.cpassword
                        }
                        isValid={formik.touched.cpassword && !formik.errors.cpassword}
                      />
                      <Form.Control.Feedback type="invalid" className={styles.errDiv}>
                        {formik.errors.cpassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* SIGN UP */}

                    <div className={styles.last}>
                      <div className={styles.ques}>
                        Already have an account?
                        <Link
                          className={styles.anc}
                          to="/login"
                        >
                          Log In
                        </Link>
                      </div>

                      <div className={styles.cancelCornfirmCont}>
                        <h5 className={styles.cancel}>Cancel</h5>
                        <button type="submit" disabled={formik.isSubmitting} className={styles.signup}>Sign Up</button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
