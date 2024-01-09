import React, { useEffect, useState } from "react";
import BackBtn from "../../../BackBtn";
import axios from "axios";

export default function ForgotPassword({ darkMode }) {
  const [forgotPass, setForgotPass] = useState({
    email: "",
  });
  const [success, setSuccess] = useState(false);
  //
  async function onFormSubmit(e) {
    e.preventDefault();
    console.log(forgotPass);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/resetPaswordEmailLink",
        forgotPass
      );
      console.log(response);
      if (response.data.reset) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error form Forgot Passowrd: ", error);
    }
  }
  //
  function getData(e) {
    let newEmail = { ...forgotPass };
    newEmail[e.target.name] = e.target.value;
    setForgotPass(newEmail);
  }
  ////////////
  useEffect(() => {
    console.log(forgotPass);
  }, [forgotPass]);
  useEffect(() => {
    console.log("success", success);
  }, [success]);
  return (
    <div className="ST-section">
      <BackBtn />
      <div className="my-4">
        <div
          className={`page-form ${darkMode ? " spic-dark-mode border-0" : ""}`}
        >
          {success ? (
            <h1
              className={`h3 d-flex justify-content-center colorMain mid-bold ${
                darkMode ? " spic-dark-mode border-0 border-bottom" : ""
              }`}
            >
              Done! Check Your Email!
            </h1>
          ) : (
            <>
              {" "}
              <h1
                className={`h3 formHeader ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Forgot Password:
              </h1>
              <form
                className={` ${darkMode ? " spic-dark-mode" : ""}`}
                onSubmit={onFormSubmit}
              >
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    onChange={(e) => getData(e)}
                    type="email"
                    name="email"
                    className="form-control"
                  />
                </div>
                <div className="mt-4 mb-3 d-flex justify-content-around">
                  <button className="btn btn-primary  d-flex justify-content-center BTN-Bold">
                    Send Link
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
