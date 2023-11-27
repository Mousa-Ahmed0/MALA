import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";
import axios from "axios";

import { useDarkMode } from "../../../context/DarkModeContext";

export default function Login({ setUserData, goToPage, userDetails }) {
  const { darkMode } = useDarkMode();

  let [user, setUser] = useState({
    phone: "",
    password: "",
  });
  let [errorList, setErrorList] = useState([]);
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);

  /* Submite Function */
  async function onFormSubmit(e) {
    e.preventDefault();
    // Call Validation Function
    let validateResult = validateForm();
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
    }

    try {
      await axios
        .post("http://localhost:5000/api/auth/Login", user)
        .then((response) => {
          // Handle the response data
          setApiError(false);
          if (response.data.message === "Your Login successfully") {
            localStorage.setItem("token", response.data.token);
            console.log("Done!");
            setUserData();
          }
        })
        .catch((error) => {
          // Handle errors
          if (error.response) {
            console.log("Error data:", error.response.data);
            setApiError(true);
            setApiMessage(error.response.data.message);
          }
          console.error("Axios error:", error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  /* Get New Data Function */
  function getData(e) {
    setErrorList([]);
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  }

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      goToPage();
    }
  }, [userDetails, goToPage]);

  /* Validation Function */
  function validateForm() {
    const schema = Joi.object({
      phone: Joi.string().max(12).required(),
      password: Joi.string().min(8).required(),
    });

    return schema.validate(user, { abortEarly: false });
  }
  return (
    <div className="LP-section LP-Register Reg-Pat">
      <div
        className={`page-form ${darkMode ? " spic-dark-mode border-0" : ""}`}
      >
        <h1
          className={`h3 formHeader ${
            darkMode ? " spic-dark-mode border-0 border-bottom" : ""
          }`}
        >
          Login:
        </h1>
        {errorList.map((error, index) => (
          <div key={index} className="alert alert-danger">
            {" "}
            {error.message}{" "}
          </div>
        ))}
        {apiMessage ? (
          <div
            className={apiError ? "alert alert-danger" : "alert alert-primary"}
          >
            {apiMessage}
          </div>
        ) : (
          ""
        )}
        <form
          className={` ${darkMode ? " spic-dark-mode" : ""}`}
          onSubmit={onFormSubmit}
        >
          <div className="mb-3">
            <label htmlFor="u_phone" className="form-label">
              Phone Number:
            </label>
            <input
              onChange={getData}
              type="text"
              name="phone"
              className="form-control"
              id="u_phone"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="p_password" className="form-label">
              Password:
            </label>
            <input
              onChange={getData}
              type="password"
              name="password"
              className="form-control"
              id="p_password"
            />
          </div>
          <div className="mb-5">
            <Link
              className={`${darkMode ? "spic-dark-mode" : "colorMain"}`}
              to="/ForgotPassword"
            >
              Forget Your Password ?
            </Link>
          </div>
          <div className="mt-4 mb-3 d-flex justify-content-around">
            <button className="btn btn-primary  d-flex justify-content-center BTN-Bold">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
