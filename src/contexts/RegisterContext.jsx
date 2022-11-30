import React, { useContext, createContext } from "react";
import { useState } from "react";

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  const [name , setName] = useState();
  const [gender , setGender] = useState();
  const [genderPrefrence , setGenderPreference] = useState();
  const [ageRange , setAgeRange] = useState();
  const [age , setAge] = useState();
  const [city , setCity] = useState();
  const [matchLocality , setMatchLocality] = useState();
  const [image , setImage] = useState();

  const [page1Filled , setPage1Filled] = useState(false);

  const registerDetails = async() => {

  } 

  const value = {
    setName,
    setGender,
    setGenderPreference,
    setAgeRange,
    setAge,
    setCity,
    setMatchLocality,
    setImage,
    registerDetails
  }
  return (
    <RegisterProvider.Provider value={value}>
      {children}
    </RegisterProvider.Provider>
  );
};

const useRegister = () => {
  return useContext(RegisterContext);
};

export {RegisterContext , RegisterProvider , useRegister};