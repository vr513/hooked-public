import React, { useState, useEffect } from "react";
import Layout from "../../shared/Layout";
import registerBg from "../../assets/register.webp";
import { useFormik } from "formik";
import { Link, useNavigate, Navigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Alert, Image } from "react-bootstrap";
import "./register2.css";

const Register2 = () => {
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

  return (
    <>
      <Layout backgroundColor={"#b0d8da"} backgroundImage={registerBg}>
        <Form className="login_page">
          <h1 className="login_signup">Register</h1>
          <Form.Group
            className="login-inp txt_field"
          >
            <Form.Control
              className="login_field_input"
              type="text"
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid" className={`login__errDiv`}>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="login-inp txt_field"
          >
            <Form.Control
              className="login_field_input"
              type="number"
              placeholder="Age"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              isInvalid={formik.touched.age && formik.errors.age}
            />
            <Form.Control.Feedback type="invalid" className={`login__errDiv`}>
              {formik.errors.age}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="login-inp txt_field"
          >
            <Form.Control
              className="login_field_input"
              type="text"
              placeholder="City"
              name="age"
              value={formik.values.city}
              onChange={formik.handleChange}
              isInvalid={formik.touched.city && formik.errors.city}
            />
            <Form.Control.Feedback type="invalid" className={`login__errDiv`}>
              {formik.errors.city}
            </Form.Control.Feedback>
          </Form.Group>
          <button
            className="login_btn"
            disabled={formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            Log In
          </button>
        </Form>
      </Layout>
    </>
  );
};

export default Register2;
