import React from "react";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import styles from "../../css/register.module.css";
import { useFormik } from "formik";
import axios from "../../../src/axiosConfig";
import {
  Row,
  Col,
  Container,
  Form,
  Image,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";
import ReactSlider from "react-slider";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Update = () => {
  const nav = useNavigate();
  const { userData, RefreshData, Logout } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [fileSrc, setFileSrc] = useState(userData.picture);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").typeError("Required"),
    gender: Yup.number().required("Gender is required").typeError("Required"),
    genderPreference: Yup.number()
      .required("Gender Preference is required")
      .typeError("Required"),
    ageRange: Yup.array().required("Required").typeError("Required"),
    age: Yup.number()
      .required("Age is required")
      .typeError("A number is required"),
    city: Yup.string().required("City is required").typeError("Required"),
    matchLocality: Yup.number().required("Required").typeError("Required"),
    gradYear: Yup.number().required("Required").typeError("Number is required"),
    collegeName: Yup.string().required("Required").typeError("Required"),
  });

  const handleUpdateInfo = async () => {
    setSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: "JWT " + token,
        },
      };
      let formdata = new FormData();
      formdata.append("age", formik.values.age);
      formdata.append("gender", formik.values.gender);
      formdata.append("city", formik.values.city);
      formdata.append("genderPreference", formik.values.genderPreference);
      formdata.append("ageLimitUpper", formik.values.ageRange[1]);
      formdata.append("ageLimitLower", formik.values.ageRange[0]);
      formdata.append("matchLocality", formik.values.matchLocality);
      formdata.append("username", formik.values.name);
      formdata.append("file", formik.values.image);
      formdata.append("gradYear", formik.values.gradYear);
      formdata.append("collegeName", formik.values.collegeName);

      const res = await axios.post("/update-info", formdata, config);
      await RefreshData();
      nav("/");
      console.log(res);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

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

  const deleteAccount = async () => {
    const token = localStorage.getItem("token");
    const pictureRef2 = userData.picture;
    
    let headersList = {
      Authorization: "JWT " + token,
    };
    let bodyContent = JSON.stringify({
      pictureRef: pictureRef2,
    });
    let reqOptions = {
      url: "/delete-user",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    try {
      let response = await axios.request(reqOptions);
      Logout();
      nav('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => setShowDeleteModal(false);

  const formik = useFormik({
    initialValues: {
      name: userData.username,
      gender: userData.gender,
      genderPreference: userData.match_gender_preference,
      ageRange: [userData.age_limit_lower, userData.age_limit_upper],
      age: userData.age,
      city: userData.city,
      matchLocality: userData.match_locality,
      image: null,
      collegeName: userData.college_name,
      gradYear: userData.grad_year,
    },
    validateOnChange: true,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleUpdateInfo();
    },
  });

  return (
    <>
      <>
        <Modal show={showDeleteModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete your account? This action cannot be
            undone
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteAccount}>
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
          <Row className={styles.customRow}>
            <Col>
              <div className={styles.headLoginWrapper}>
                <div className={styles.loginWrapper}>
                  <div className={styles.mainLogin}>
                    <div className={styles.mainFormContainer}>
                      <div className={styles.previewSectionContainer}>
                        {fileSrc !== null ? (
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
                            name="genderPreference"
                            value={formik.values.genderPreference}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                              formik.touched.genderPreference &&
                              formik.errors.genderPreference
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
                            {formik.errors.genderPreference}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                          className={styles.mb}
                          controlId="formBasicEmail"
                        >
                          <Form.Label>Show Matches Between</Form.Label>

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

                        <Form.Group className={styles.mb}>
                          <Form.Label>Grad Year</Form.Label>
                          <Form.Control
                            className={styles.input}
                            type="number"
                            placeholder="Graduation Year"
                            name="gradYear"
                            value={formik.values.gradYear}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isInvalid={
                              formik.touched.gradYear && formik.errors.gradYear
                            }
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className={styles.errDiv}
                          >
                            {formik.errors.gradYear}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  disabled={submitting}
                  className={styles.submitBtn}
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    setShowDeleteModal(true);
                  }}
                  variant="danger"
                >
                  Delete
                </Button>
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
                              type="text"
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

                          <Form.Group className={styles.mb}>
                            <Form.Label>College Name</Form.Label>
                            <Form.Control
                              className={styles.input}
                              type="text"
                              placeholder="College Name"
                              name="collegeName"
                              value={formik.values.collegeName}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              isInvalid={
                                formik.touched.collegeName && formik.errors.city
                              }
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className={styles.errDiv}
                            >
                              {formik.errors.collegeName}
                            </Form.Control.Feedback>
                          </Form.Group>
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

export default Update;
