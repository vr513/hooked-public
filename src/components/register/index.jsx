import React from "react";
import styles from "../../css/register.module.css";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as Yup from "yup";
import { Form, Alert, Image } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import ReactSlider from "react-slider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from '../../../src/axiosConfig';

const Register = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const { Login, isLoggedIn , RefreshData } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [fileSrc, setFileSrc] = useState(null);
  const [alertMessage, setAlertMessage] = useState(
    "Invalid username or password"
  );
  const [submitting,setSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").typeError("Required"),
    gender: Yup.number().required("Gender is required").typeError("Required"),
    genderPrefrence: Yup.number()
      .required("Gender Preference is required")
      .typeError("Required"),
    ageRange: Yup.array().required("Required").typeError("Required"),
    age: Yup.number()
      .required("Age is required")
      .typeError("A number is required"),
    city: Yup.string().required("City is required").typeError("Required"),
    matchLocality: Yup.number().required("Required").typeError("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: null,
      gender: null,
      genderPrefrence: null,
      ageRange: null,
      age: null,
      city: null,
      matchLocality: null,
      image: null,
    },
    validateOnChange: true,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });


  const handleImageChange = (evt) => {
    console.log();
    if (evt.target.files.length !== 0) {
      setFileSrc(URL.createObjectURL(evt.target.files[0]));
      formik.setFieldValue("image", evt.target.files[0]);
    } else {
      setFileSrc(null);
      formik.setFieldValue("image", null);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          'Authorization': 'JWT ' + token,
        }
      }
      let formdata = new FormData();
      formdata.append('age', formik.values.age);
      formdata.append('gender', formik.values.gender);
      formdata.append('city', formik.values.city);
      formdata.append('genderPrefrence', formik.values.genderPrefrence);
      formdata.append('ageLimitUpper', formik.values.ageRange[1]);
      formdata.append('ageLimitLower', formik.values.ageRange[0]);
      formdata.append('matchLocality', formik.values.matchLocality);
      formdata.append('username', formik.values.name);
      formdata.append('file', formik.values.image);


      const res = await axios.post('/register', formdata, config);
      await RefreshData();
      nav("/");
      console.log(res);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  }

  return (
    <>
      <>
        <Form>
          <Row className={styles.customRow}>
            <Col>
              {/* CSS */}
              <div className={styles.headLoginWrapper}>
                <div className={styles.loginWrapper}>
                  <div className={styles.mainLogin}>
                    <div className={styles.mainFormContainer}>
                      <div className={styles.previewSectionContainer}>
                        {fileSrc !== null && formik.values.image !== null ? (
                          <div className={styles.previewCont}>
                            <Image
                              className={styles.imgPreview}
                              src={fileSrc}
                            />
                          </div>
                        ) : (
                          <div className={styles.noSelectCont}>
                            <h2 className={styles.noSelectText}>
                              Select an Image from below
                            </h2>
                            <p className={styles.noSelectSubtext}>
                              Drop your best photo to get more matches
                            </p>
                          </div>
                        )}

                        <Form.Group className={styles.mb}>
                          <Form.Label>Select your best click</Form.Label>
                          <Form.Control
                            className={styles.customFile}
                            type="file"
                            placeholder="Select a file"
                            name="image"
                            onBlur={formik.handleBlur}
                            accept="image/*"
                            onChange={handleImageChange}
                            isInvalid={
                              formik.touched.image && formik.errors.image
                            }
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className={styles.errDiv}
                          >
                            {formik.errors.image}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col>
              {/* CSS */}
              <div className={styles.headLoginWrapper}>
                <div className={styles.loginWrapper}>
                  <div className={styles.mainLogin}>
                    <div className={styles.mainFormContainer}>
                      <div className={styles.sectionContainer}>
                        {/* CSS */}

                        {/* GENDER PREFERENCE */}

                        <Form.Group className={styles.mb}>
                          <Form.Label>Gender Preference</Form.Label>
                          <Form.Select
                            className={styles.input}
                            name="genderPrefrence"
                            value={formik.values.genderPrefrence}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.touched.genderPrefrence &&
                              formik.errors.genderPrefrence
                            }
                          >
                            <option>
                              Select gender you want to match with
                            </option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                          </Form.Select>

                          <Form.Control.Feedback
                            type="invalid"
                            className={styles.errDiv}
                          >
                            {formik.errors.genderPrefrence}
                          </Form.Control.Feedback>
                        </Form.Group>

                        {/* Age limit upper */}

                        {/* <Form.Group
                                                    className={styles.mb}
                                                    controlId="formBasicEmail"
                                                >
                                                    <Form.Label>Show matches between</Form.Label>
                                                    <Form.Range
                                                        className={styles.input}
                                                        max={100}
                                                        min={0}
                                                        name="ageLimit"

                                                        onChange={(evt) => console.log(evt.target.value)}
                                                        isInvalid={
                                                            formik.touched.email && formik.errors.email
                                                        }
                                                    />
                                                    <Form.Control.Feedback
                                                        type="invalid"
                                                        className={styles.errDiv}
                                                    >
                                                        {formik.errors.email}
                                                    </Form.Control.Feedback>
                                                </Form.Group> */}

                        {/* Age limit lower */}

                        <Form.Group
                          className={styles.mb}
                          controlId="formBasicEmail"
                        >
                          <Form.Label>Show Matches Between</Form.Label>
                          {/* <Form.Control
                                                        className={styles.input}
                                                        type="email"
                                                        placeholder="Age limit lower"
                                                        name="email"
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        isInvalid={
                                                            formik.touched.email && formik.errors.email
                                                        }
                                                    /> */}
                          <ReactSlider
                            className={`${styles.input} ${styles.customRegister}`}
                            thumbClassName={styles.registerThumb}
                            trackClassName="example-track"
                            defaultValue={[0, 60]}
                            value={formik.values.ageRange}
                            onBlur={formik.handleBlur}
                            name={"ageRange"}
                            onChange={(val, index) =>
                              formik.setFieldValue("ageRange", val)
                            }
                            ariaLabel={["Lower age", "Upper age"]}
                            ariaValuetext={(state) =>
                              `Thumb value ${state.valueNow}`
                            }
                            renderThumb={(props, state) => {
                              return <div {...props}>{state.valueNow}</div>;
                            }}
                            pearling
                            minDistance={1}
                            min={0}
                            max={70}
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className={styles.errDiv}
                          >
                            {formik.errors.ageRange}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={styles.mb}>
                          <Form.Label>Show Users from </Form.Label>
                          <Form.Select
                            className={styles.input}
                            name="matchLocality"
                            value={formik.values.matchLocality}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.touched.matchLocality &&
                              formik.errors.matchLocality
                            }
                          >
                            <option>Select an option</option>
                            <option value="1">Same City</option>
                            <option value="2">Everyone</option>
                          </Form.Select>

                          <Form.Control.Feedback
                            type="invalid"
                            className={styles.errDiv}
                          >
                            {formik.errors.matchLocality}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>

                    </div>
                  </div>
                </div>
                <Button onClick={handleRegister} disabled={submitting} className={styles.submitBtn} >Submit</Button>
              </div>
            </Col>

            <Col>
              {/* CSS */}
              <div className={styles.headLoginWrapper}>
                <div className={styles.loginWrapper}>
                  <div className={styles.mainLogin}>
                    <div className={styles.mainFormContainer}>
                      <div className={styles.sectionContainer}>
                        {/* CSS */}

                        <div className={styles.formContainer}>
                          {/* username */}

                          <Form.Group className={styles.mb}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              className={styles.input}
                              type="text"
                              placeholder="Name"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.touched.name && formik.errors.name
                              }
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className={styles.errDiv}
                            >
                              {formik.errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* GENDER */}

                          <Form.Group className={styles.mb}>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                              className={styles.input}
                              name="gender"
                              value={formik.values.gender}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={
                                formik.touched.gender && formik.errors.gender
                              }
                            >
                              <option className={styles.option}>
                                Select your gender
                              </option>
                              <option className={styles.option} value="1">
                                Male
                              </option>
                              <option className={styles.option} value="2">
                                Female
                              </option>
                            </Form.Select>

                            <Form.Control.Feedback
                              type="invalid"
                              className={styles.errDiv}
                            >
                              {formik.errors.gender}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* user age lower */}

                          <Form.Group className={styles.mb}>
                            <Form.Label>Your age</Form.Label>
                            <Form.Control
                              className={styles.input}
                              type="number"
                              placeholder="Age"
                              name="age"
                              onBlur={formik.handleBlur}
                              value={formik.values.age}
                              onChange={formik.handleChange}
                              isInvalid={
                                formik.touched.age && formik.errors.age
                              }
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className={styles.errDiv}
                            >
                              {formik.errors.age}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* City */}

                          <Form.Group className={styles.mb}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              className={styles.input}
                              type="city"
                              placeholder="City"
                              name="city"
                              value={formik.values.city}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              isInvalid={
                                formik.touched.city && formik.errors.city
                              }
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className={styles.errDiv}
                            >
                              {formik.errors.city}
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* User Image */}

                          {/* Pincode */}

                          {/* <Form.Group
                                                        className={styles.mb}
                                                    >
                                                        <Form.Label>Pincode</Form.Label>
                                                        <Form.Control
                                                            className={styles.input}
                                                            type="email"
                                                            placeholder="Pincode"
                                                            name="email"
                                                            value={formik.values.email}
                                                            onChange={formik.handleChange}
                                                            isInvalid={
                                                                formik.touched.email && formik.errors.email
                                                            }
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
                                                                formik.touched.password &&
                                                                formik.errors.password
                                                            }
                                                        />
                                                        <Form.Control.Feedback
                                                            type="invalid"
                                                            className={styles.errDiv}
                                                        >
                                                            {formik.errors.password}
                                                        </Form.Control.Feedback>
                                                    </Form.Group> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </>

      {/* <div className={styles.forgor}>
            Have you forgotton your password?
        </div> */}
    </>
  );
};

export default Register;
