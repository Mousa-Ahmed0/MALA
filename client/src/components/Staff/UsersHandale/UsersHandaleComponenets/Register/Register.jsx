import React, { useEffect, useState } from "react";
import Joi from "joi";
import axios from "axios";
import BackBtn from "../../../../BackBtn";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import { newUser } from "../../../../../apis/ApisHandale";

export default function Register({ usertype }) {
  const { darkMode } = useDarkMode();

  let [User, setUser] = useState({
    ident: "",
    firstname: "",
    lastname: "",
    sex: "Male",
    email: "",
    phone: "",
    birthday: new Date(),
    city: "",
    password: "",
    usertype: "",
  });
  let [errorList, setErrorList] = useState([]);
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);

  function handaleType(e) {
    let tempUser = { ...User };
    tempUser.usertype = e.target.value;
    setUser(tempUser);
  }
  function handaleSex(e) {
    let tempUser = { ...User };
    tempUser.sex = e.target.value;
    setUser(tempUser);
  }
  useEffect(() => {
    console.log(User);
  }, [User]);
  /* Submite Function */
  async function onFormSubmit(e) {
    e.preventDefault();
    // Call Validation Function
    let validateResult = validateForm();
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
    }

    try {
      await newUser(User)
        .then((response) => {
          // Handle the response data
          console.log("Axios response:", response.data);
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

    setUser({
      ident: "",
      firstname: "",
      lastname: "",
      sex: "",
      email: "",
      phone: "",
      birthday: new Date(),
      city: "",
      password: "",
      usertype: "",
    });
  }

  /* Get New Data Function */
  function getData(e) {
    let newUser = { ...User };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  }

  // custon validation
  /* 
  
  
  .custom((value, helpers) => {
        const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
        if (uppercaseCount < 1) {
          return helpers.error('any.custom', { message: 'Password must contain at least one uppercase letter' });
        }
        return value;
      })
  
  */
  /* Validation Function */
  function validateForm() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      firstname: Joi.string().min(4).max(12).required(),
      lastname: Joi.string().min(4).max(12).required(),
      password: Joi.string().min(8).required(),
      phone: Joi.string().trim().min(2).max(13).required(),
      birthday: Joi.date().required(),
      city: Joi.string().trim().min(2).max(100).required(),
      usertype: Joi.string().trim().required(),
      sex: Joi.string(),
      ident: Joi.number().required(),
    });

    return schema.validate(User, { abortEarly: false });
  }
  return (
    <div className="ST-section my-1">
      <BackBtn />
      <div className="Reg-Pat my-4">
        <div className={`page-form ${darkMode ? " spic-dark-mode" : ""}`}>
          <h1
            className={`h3 formHeader ${
              darkMode ? " spic-dark-mode border-0 border-bottom" : ""
            }`}
          >
            Register a User:
          </h1>
          {errorList.map((error, index) => (
            <div key={index} className="alert alert-danger">
              {" "}
              {error.message}{" "}
            </div>
          ))}
          {apiMessage ? (
            <div
              className={
                apiError ? "alert alert-danger" : "alert alert-primary"
              }
            >
              {apiMessage}
            </div>
          ) : (
            ""
          )}
          <form className="mx-5" onSubmit={onFormSubmit}>
            <div className="d-flex gap-4">
              <div className="mb-3 w-100">
                <label
                  htmlFor="u_ident"
                  className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  Identify Id:
                </label>
                <input
                  onChange={getData}
                  type="text"
                  name="ident"
                  className="form-control"
                  id="u_ident"
                  value={User.ident}
                />
              </div>
            </div>
            <div className="complix-row d-flex gap-4 flex-column flex-sm-row">
              <div className="complix-col mb-3 w-50">
                <label
                  htmlFor="u_fname"
                  className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  First Name:
                </label>
                <input
                  onChange={getData}
                  type="text"
                  name="firstname"
                  className="form-control"
                  id="u_fname"
                  value={User.firstname}
                />
              </div>
              <div className="complix-col mb-3 w-50">
                <label
                  htmlFor="u_lname"
                  className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  Last Name:
                </label>
                <input
                  onChange={getData}
                  type="text"
                  name="lastname"
                  className="form-control"
                  id="u_lname"
                  value={User.lastname}
                />
              </div>
            </div>
            <div className="complix-row d-flex gap-4 flex-column flex-sm-row">
              <div className="complix-col mb-3 w-50">
                <label
                  htmlFor="u_email"
                  className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  Email Address:
                </label>
                <input
                  onChange={getData}
                  type="email"
                  name="email"
                  className="form-control"
                  id="u_email"
                  aria-describedby="emailHelp"
                  value={User.email}
                />
              </div>
              <div className="complix-col mb-3 w-50">
                <label
                  htmlFor="u_phone"
                  className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  Phone Number:
                </label>
                <input
                  onChange={getData}
                  type="text"
                  name="phone"
                  className="form-control"
                  id="u_phone"
                  value={User.phone}
                />
              </div>
            </div>
            <div className="user-details complix-row d-flex gap-4 flex-column flex-md-row">
              <div className="complix-col mb-3 w-50">
                <label
                  htmlFor="u_city"
                  className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  City:
                </label>
                <input
                  onChange={getData}
                  type="text"
                  name="city"
                  className="form-control"
                  id="u_city"
                  value={User.city}
                />
              </div>
              <div className="complix-col mb-3 w-50">
                <label
                  htmlFor="u_bdate"
                  className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
                >
                  BirthDate:
                </label>
                <input
                  onChange={getData}
                  type="date"
                  name="birthday"
                  className="form-control"
                  id="u_bdate"
                  value={User.date}
                />
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="p_password"
                className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
              >
                Password:
              </label>
              <input
                onChange={getData}
                type="password"
                name="password"
                className="form-control"
                id="p_password"
                value={User.password}
              />
            </div>
            <div className="d-flex justify-content-between">
              <div className="mb-3 form-check p-0 w-50">
                <label
                  className={`w-100 form-check-label ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                  htmlFor="exampleCheck1"
                >
                  User Role:
                </label>
                {usertype === "Admin" ? (
                  <select
                    className={`all-Mid-shadow ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                    aria-label="Default select example"
                    name="usertype"
                    id="User_Role"
                    onChange={(e) => handaleType(e)}
                  >
                    <option value={""} hidden>
                      Role:
                    </option>
                    <option value="Staff" name="Staff">
                      Staff
                    </option>
                    <option value="Doctor" name="Doctor">
                      Doctor
                    </option>
                    <option value="Patient" name="Patient">
                      Patient
                    </option>
                  </select>
                ) : (
                  <select
                    className="all-Mid-shadow"
                    aria-label="Default select example"
                    name="usertype"
                    id="User_Role"
                    onChange={(e) => handaleType(e)}
                  >
                    <option value={""} hidden>
                      Role:
                    </option>
                    <option value="Patient" name="Patient">
                      Patient
                    </option>
                  </select>
                )}
              </div>
              <div className="complix-col mb-3 w-50">
                <label
                  htmlFor="u_sex"
                  className={`w-100 m-0 form-label ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                >
                  Sex:
                </label>
                <select
                  className={`all-Mid-shadow ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                  aria-label="Default select example"
                  name="usertype"
                  id="User_Role"
                  onChange={(e) => handaleSex(e)}
                >
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-end">
              <button className="btn btn-primary d-flex justify-content-center BTN-Bold">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
