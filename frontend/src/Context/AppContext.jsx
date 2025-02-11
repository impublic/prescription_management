import React, { createContext, useEffect, useState } from "react";
// import {doctors} from '../assets/assets' // Make sure doctors is imported correctly
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencysymbol = "$";
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setdoctors] = useState([]);
  const [token, settoken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setuserData] = useState(false);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backend_url + "/api/doctor/list", {
        headers: { token }});
      if (data.success) {
        setdoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const loaduserprofile = async () => {
    try {
      console.log("Token value", token);
      const { data } = await axios.get(backend_url + "/api/user/get-profile", {
        headers: { token }
      });
      // Log the API response to verify
      console.log("API Response:", data);
      if (data.success) {
        setuserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const value = {
    doctors,
    getAllDoctors,
    currencysymbol,
    token,
    settoken,
    backend_url,
    userData,
    setuserData,
    loaduserprofile
  };
  useEffect(() => {
    getAllDoctors();
  }, [token]);

  useEffect(() => {
    if (token) {
      loaduserprofile();
    } else {
      setuserData(false);
    }
  }, [token]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
