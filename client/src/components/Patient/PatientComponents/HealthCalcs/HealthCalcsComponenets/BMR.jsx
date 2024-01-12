import React, { useEffect, useState } from "react";
import Joi from "joi";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import BackBtn from "../../../../BackBtn";
import { bmrCalc } from "../../../../../methods/HealthyCalculator";
export default function BMR() {
  const { darkMode } = useDarkMode();
  let [errorList, setErrorList] = useState([]);
  const [details, setDetails] = useState({
    age: 0,
    sex: "Female",
    height: 0,
    weight: 0,
  });
  const [bmrResult, setBmrResult] = useState();
  const [resultDone, setResultDone] = useState(false);
  //
  function getData(e) {
    setErrorList([]);
    setBmrResult(0);

    console.log("Input changed:", e.target.name, e.target.value);
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  //
  async function onFormSubmit(e) {
    e.preventDefault();
    // Call Validation Function
    let validateResult = await validateForm();
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
    }
    if (!validateResult.error) {
      const result = await bmrCalc(
        details.age,
        details.sex,
        details.height,
        details.weight
      );
      console.log("result:", result);
      setBmrResult(result);
    }
  }
  /* Validation Function */
  function validateForm() {
    const schema = Joi.object({
      age: Joi.number().min(15).max(80).required(),
      height: Joi.required(),
      weight: Joi.required(),
      sex: Joi.required(),
    });
    return schema.validate(details, { abortEarly: false });
  }
  /////
  useEffect(() => {
    setResultDone(bmrResult && bmrResult > 0);
  }, [bmrResult]);
  useEffect(() => {
    console.log("resultDone", resultDone);
  }, [resultDone]);
  return (
    <div className="Reg-Pat">
      <BackBtn />
      <div
        className={`page-form ${
          darkMode ? " spic-dark-mode border-0" : ""
        } my-4`}
      >
        <h1 className={`${darkMode ? " spic-dark-mode border-0" : ""} `}>
          BMR Calculete:
        </h1>
        {errorList.map((error, index) => (
          <div key={index} className="alert alert-danger">
            {" "}
            {error.message}{" "}
          </div>
        ))}
        <div className="my-5 row align-items-center">
          <div className="col-12 col-md-4">
            {" "}
            <div className="col-12 my-4">
              <form
                className={`  ${darkMode ? " spic-dark-mode" : ""}`}
                onSubmit={onFormSubmit}
              >
                <div className="mb-3">
                  <label className="form-label m-0">Age:</label>
                  <div className="row">
                    <div className="col-7">
                      <input
                        type="number"
                        name="age"
                        onChange={(e) => getData(e)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-5 d-flex align-items-center">
                      Ages: 15 - 80
                    </div>
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center gap-3">
                  <label className="form-label m-0">Gender:</label>
                  <div
                    className="btn-group "
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="sex"
                      value={"Male"}
                      onClick={(e) => getData(e)}
                      id="btnradio1"
                      autoComplete="off"
                      defaultChecked
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btnradio1"
                    >
                      Male
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="sex"
                      onClick={(e) => getData(e)}
                      value={"Female"}
                      id="btnradio2"
                      autoComplete="off"
                      defaultChecked
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btnradio2"
                    >
                      Female
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row align-items-center my-2">
                    <div className="col-2 d-flex align-items-center">
                      {" "}
                      <label className="form-label m-0">Height:</label>
                    </div>
                    <div className="col-5">
                      {" "}
                      <input
                        type="number"
                        name="height"
                        onChange={(e) => getData(e)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-5 d-flex align-items-center">
                      CentiMeter - Cm -
                    </div>
                  </div>
                  <div className="row align-items-center my-2">
                    <div className="col-2 d-flex align-items-center">
                      {" "}
                      <label className="form-label m-0">Weight:</label>
                    </div>
                    <div className="col-5">
                      {" "}
                      <input
                        type="number"
                        name="weight"
                        onChange={(e) => getData(e)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-5 d-flex align-items-center">
                      KiloGram - Kg -
                    </div>
                  </div>
                </div>

                <div className="mt-4 mb-3 d-flex justify-content-around">
                  <button className="btn btn-primary  d-flex justify-content-center BTN-Bold">
                    Calculate
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-1"></div>
          <div className="col-12 col-md-6">
            <div className="table-responsive">
              <div className="my-2">
                BMR ={" "}
                <span className="colorMain mid-bold h3 m-0">
                  {resultDone ? bmrResult : "NaN"}
                </span>{" "}
                Calories/day
              </div>
              <table
                className={`table table-bordered table-hover table-sm  ${
                  darkMode ? " table-dark border-white" : ""
                }`}
              >
                <thead className="thead-light">
                  <tr>
                    <th className="w-75">Activity Level</th>
                    <th className="w-10">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-start">
                      <p className="m-0 p-1">
                        Sedentary: little or no exercise
                      </p>
                    </td>
                    <td>{resultDone ? bmrResult + 318 : ""}</td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">Exercise 1-3 times/week</p>
                    </td>
                    <td>{resultDone ? bmrResult + 598 : ""}</td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">Exercise 4-5 times/week</p>
                    </td>
                    <td>{resultDone ? bmrResult + 739 : ""}</td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      <p className="m-0 p-1">Intense exercise 6-7 times/week</p>
                    </td>
                    <td>{resultDone ? bmrResult + 1152 : ""}</td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      <p className="m-0 p-1">
                        Very intense exercise daily, or physical job
                      </p>
                    </td>
                    <td>{resultDone ? bmrResult + 1430 : ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
