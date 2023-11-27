import React, { useState } from "react";
import Joi from "joi";

import { useDarkMode } from "../../../context/DarkModeContext";

export default function Contact() {
  const { darkMode } = useDarkMode();
  let [Message, setMessage] = useState({
    Guest_Name: "",
    Guest_Email: "",
    Guest_Message: "",
  });

  let [errorList, setErrorList] = useState([]);

  /* Submite Function */
  function onFormSubmit(e) {
    e.preventDefault();
    // Call Validation Function
    let validateResult = validateForm();
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
    }
  }

  /* Validation Function */
  function validateForm() {
    const schema = Joi.object({
      Patient_Email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      Guest_Name: Joi.string().min(4).max(12).required(),
      Guest_Message: Joi.string().min(4).required(),
    });

    return schema.validate(Message, { abortEarly: false });
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
        <div className="LP-Contact-Box d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="LP-Cont-Form w-50">
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
                  name="Guest_Name"
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
                  name="Guest_Email"
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
                  name="Guest_Message"
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
          <div className={`LP-Cont-Divide d-none d-md-block`}></div>
          <div
            className={`LP-Cont-Details w-25 d-flex flex-column flex-start gap-2 ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            <div className="">
              <h4
                className={`my-2 colorMain ${
                  darkMode ? " spic-dark-mode" : ""
                }`}
              >
                More Information:
              </h4>
            </div>
            <p className="my-2 detailes-size">
              <i className="fa-solid fa-map-location-dot colorMain"></i> Sufyan
              Street, Nablus - PS
            </p>
            <p className="mb-3 detailes-size">
              <i className="fa-solid fa-envelope colorMain"></i>{" "}
              someExample@exg.com
            </p>
            <p className="mb-3 detailes-size">
              <i className="fa-solid fa-mobile colorMain"></i> +970569156547{" "}
              <span className="font-weight-bold">|</span>{" "}
              <i className="font-weight-bold"></i> +2907058
            </p>
            <p className="mb-3 detailes-size">
              <i className="fa-solid fa-calendar-days colorMain"></i> Tuesday -
              Thursday <span className="font-weight-bold">|</span> 8:00Am -
              4:00Pm
            </p>
            <a
              className="btn bgMain w-50"
              href="https://www.google.com/maps/place/%D9%85%D8%AE%D8%AA%D8%A8%D8%B1%D8%A7%D8%AA+%D9%85%D9%8A%D8%AF%D9%8A%D9%83%D9%8A%D8%B1+-+%D9%81%D8%B1%D8%B9+%D9%86%D8%A7%D8%A8%D9%84%D8%B3+%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D9%8A%E2%80%AD/@32.2236318,35.2608394,17z/data=!4m10!1m2!2m1!1zbWVkaWNhcmUg2YXYrtiq2KjYsdin2Ko!3m6!1s0x151ce1856a93462f:0x71bb2242fd6896e8!8m2!3d32.2232016!4d35.259248!15sChdtZWRpY2FyZSDZhdiu2KrYqNix2KfYqpIBC21lZGljYWxfbGFi4AEA!16s%2Fg%2F11jk_tx3kz?hl=ar&entry=ttu"
              target="_blank"
            >
              Find US
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
