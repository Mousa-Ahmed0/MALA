import React, { useEffect, useState } from "react";
import Joi from "joi";

import { useDarkMode } from "../../../context/DarkModeContext";
import axios from "axios";

export default function Contact() {
  const { darkMode } = useDarkMode();
  let [guestMessage, setguestMessage] = useState({
    fullName: "",
    email: "",
    message: "",
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
    } else {
      setErrorList([]);
      try {
        await axios
          .post(
            "http://localhost:5000/api/guest/addGuestMeassage",
            guestMessage
          )
          .then((response) => {
            // Handle the response data
            console.log("Axios response:", response);
            setApiError(false);
            setApiMessage(response.data.message);
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
      setguestMessage({
        fullName: "",
        email: "",
        message: "",
      });
    }
  }

  /* Get Changes */
  function getData(e) {
    setApiMessage("");
    let newguestMessage = { ...guestMessage };
    newguestMessage[e.target.name] = e.target.value;
    setguestMessage(newguestMessage);
  }

  /* Validation Function */
  function validateForm() {
    const schema = Joi.object({
      email: Joi.string()
        .trim()
        .min(5)
        .max(100)
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      fullName: Joi.string().trim().min(2).max(100).required(),
      message: Joi.string().trim().required(),
    });

    return schema.validate(guestMessage, { abortEarly: false });
  }

  return (
    <div className="LP-section LP-Contact Con-Pat">
      <div
        className={`page-form ${darkMode ? " spic-dark-mode border-0" : ""}`}
      >
        <h1
          className={`h3 formHeader ${
            darkMode ? " spic-dark-mode border-0 border-bottom" : ""
          }`}
        >
          Send Us An Email:
        </h1>
        {apiMessage ? <div className="alert alert-info">{apiMessage}</div> : ""}
        <div className="LP-Contact-Box row flex-column flex-md-row justify-content-between align-items-center">
          <div className="col-12 col-md-7 LP-Cont-Form ">
            {errorList.map((error, index) => (
              <div key={index} className="alert alert-danger">
                {" "}
                {error.message}{" "}
              </div>
            ))}
            <form onSubmit={onFormSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="g_name"
                  className={`form-label  ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullName"
                  onChange={getData}
                  value={guestMessage.fullName}
                  className="form-control"
                  id="g_name"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="g_email"
                  className={`form-label  ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  Email Address:
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={getData}
                  value={guestMessage.email}
                  className="form-control"
                  id="g_email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="g_msg"
                  className={`form-label  ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  Message:
                </label>
                <textarea
                  name="message"
                  onChange={getData}
                  value={guestMessage.message}
                  className="form-control"
                  id="g_msg"
                  rows={3}
                />
              </div>
              <div className="mb-3 d-flex justify-content-around">
                <button className="btn bgMain w-25 d-flex justify-content-center BTN-Bold">
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className={`col-12 col-md-1  d-none d-md-block`}></div>
          <div
            className={`LP-Cont-Details col-12 col-md-4 d-flex flex-column flex-start gap-2 ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            <div className="row">
              <div className="col-12">
                <h4
                  className={` colorMain m-0 ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                >
                  More Information:
                </h4>
              </div>
              <div className="col-12 m-0">
                <hr />
              </div>
              <p className="my-2 col-12 detailes-size">
                <div className="row">
                  <div className="col-1">
                    {" "}
                    <i className="fa-solid fa-map-location-dot colorMain"></i>{" "}
                  </div>
                  <div className="col-11">Sufyan Street, Nablus - PS</div>
                </div>
              </p>
              <p className="mb-3 col-12 detailes-size">
                <div className="row">
                  <div className="col-1">
                    {" "}
                    <i className="fa-solid fa-envelope colorMain"></i>{" "}
                  </div>
                  <div className="col-11">someExample@exg.com</div>
                </div>
              </p>
              <p className="mb-3 col-12 detailes-size">
                <div className="row">
                  <div className="col-1">
                    {" "}
                    <i className="fa-solid fa-mobile colorMain"></i>
                  </div>
                  <div className="col-11">
                    +(970) 56-9156-547{" "}
                    <span className="font-weight-bold">|</span> +(29) 07058
                  </div>
                </div>
              </p>
              <p className="mb-3 col-12 detailes-size">
                <div className="row">
                  <div className="col-1">
                    {" "}
                    <i className="fa-solid fa-calendar-days colorMain"></i>{" "}
                  </div>
                  <div className="col-11">
                    Tuesday - Thursday{" "}
                    <span className="font-weight-bold">|</span> 8:00Am - 4:00Pm
                  </div>
                </div>
              </p>
              <a
                className="btn bgMain col-4"
                href="https://www.google.com/maps/place/%D9%85%D8%AE%D8%AA%D8%A8%D8%B1%D8%A7%D8%AA+%D9%85%D9%8A%D8%AF%D9%8A%D9%83%D9%8A%D8%B1+-+%D9%81%D8%B1%D8%B9+%D9%86%D8%A7%D8%A8%D9%84%D8%B3+%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D9%8A%E2%80%AD/@32.2236318,35.2608394,17z/data=!4m10!1m2!2m1!1zbWVkaWNhcmUg2YXYrtiq2KjYsdin2Ko!3m6!1s0x151ce1856a93462f:0x71bb2242fd6896e8!8m2!3d32.2232016!4d35.259248!15sChdtZWRpY2FyZSDZhdiu2KrYqNix2KfYqpIBC21lZGljYWxfbGFi4AEA!16s%2Fg%2F11jk_tx3kz?hl=ar&entry=ttu"
                target="_blank"
              >
                Find US
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
