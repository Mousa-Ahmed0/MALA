import React, { useEffect, useState } from "react";
import BackBtn from "../../../BackBtn";
import axios from "axios";
import { useParams } from "react-router";

export default function ResetPassword({ darkMode }) {
  const [forgotPass, setForgotPass] = useState({
    password: "",
  });
  const [success, setSuccess] = useState(false);
  //
  const params = useParams();
  console.log(params);
  async function onFormSubmit(e) {
    e.preventDefault();
    console.log(forgotPass);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/password/rest-passwoed/${params.userId}/${params.token}`,
        forgotPass
      );
      console.log(response);
    } catch (error) {
      console.error("Error form Forgot Passowrd: ", error);
    }
  }
  //
  function getData(e) {
    let newPass = { ...forgotPass };
    newPass[e.target.name] = e.target.value;
    setForgotPass(newPass);
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
              Done! Please Log In.
            </h1>
          ) : (
            <>
              {" "}
              <h1
                className={`h3 formHeader ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Reset Password:
              </h1>
              <form
                className={` ${darkMode ? " spic-dark-mode" : ""}`}
                onSubmit={onFormSubmit}
              >
                <div className="mb-3">
                  <label className="form-label">New Password:</label>
                  <input
                    onChange={(e) => getData(e)}
                    type="text"
                    name="password"
                    className="form-control"
                  />
                </div>
                <div className="mt-4 mb-3 d-flex justify-content-around">
                  <button className="btn btn-primary  d-flex justify-content-center BTN-Bold">
                    Update
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
