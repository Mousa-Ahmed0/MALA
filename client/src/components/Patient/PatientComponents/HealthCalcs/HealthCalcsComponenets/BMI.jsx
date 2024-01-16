import React, { useState, useEffect } from "react";
import Joi from "joi";
import { bfcCalc, bmiCalc } from "../../../../../methods/HealthyCalculator";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import BackBtn from "../../../../BackBtn";
export default function BMR() {
  const { darkMode } = useDarkMode();
  let [errorList, setErrorList] = useState([]);
  const [details, setDetails] = useState({
    age: 0,
    sex: "Male",
    height: 0,
    weight: 0,
  });
  const [bmiResult, setBmiResult] = useState();
  const [bfcResult, setBfcResult] = useState();
  const [resultDone, setResultDone] = useState(false);
  //
  function getData(e) {
    setErrorList([]);
    setBmiResult(0);

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
      const result = await bmiCalc(
        details.age,
        details.sex,
        details.height,
        details.weight
      );
      console.log("result:", result);
      setBmiResult(result);
      const bfc = await bfcCalc(details.age, details.sex, result);
      setBfcResult(bfc);
    }
  }
  /* Validation Function */
  function validateForm() {
    const schema = Joi.object({
      age: Joi.number().min(3).max(120).required(),
      height: Joi.required(),
      weight: Joi.required(),
      sex: Joi.required(),
    });
    return schema.validate(details, { abortEarly: false });
  }
  /////
  useEffect(() => {
    setResultDone(bmiResult && bmiResult > 0);
  }, [bmiResult]);
  useEffect(() => {
    console.log("details", details);
  }, [details]);
  return (
    <div className="Reg-Pat">
      <BackBtn />
      <div
        className={`page-form ${
          darkMode ? " spic-dark-mode border-0" : ""
        } my-4`}
      >
        <h1 className={`${darkMode ? " spic-dark-mode border-0" : ""} `}>
          BMI Calculete:
        </h1>
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
                    <div className="col-4 d-flex align-items-center">
                      Ages: 2 - 120
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
                      onClick={(e) => getData(e)}
                      name="sex"
                      value={"Male"}
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
                      onClick={(e) => getData(e)}
                      name="sex"
                      value={"Female"}
                      id="btnradio2"
                      autoComplete="off"
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
              <table
                className={`table table-bordered table-hover table-sm  ${
                  darkMode ? " table-dark border-white" : ""
                }`}
              >
                <thead className="thead-light">
                  <tr>
                    <th className="w-75"></th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-start">
                      <p className="m-0 p-1">Healthy BMI Range:</p>
                    </td>
                    <td>18.5 - 25.00 </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">Your BMI:</p>
                    </td>
                    <td className="mid-bold colorMain">
                      {resultDone ? bmiResult : "NaN"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">Your BMI Condition:</p>
                    </td>
                    <td
                      className={`mid-bold ${
                        resultDone
                          ? bmiResult < 18.5
                            ? "text-danger"
                            : bmiResult > 24.9
                            ? "text-danger"
                            : "text-success"
                          : "colorMain"
                      }`}
                    >
                      {resultDone
                        ? bmiResult < 18.5
                          ? "Underweight"
                          : bmiResult > 24.9
                          ? "Overweight"
                          : "Normal"
                        : "NaN"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">
                        Lower Healthy Weight For The Height:
                      </p>
                    </td>
                    <td className="mid-bold colorMain">
                      {Math.ceil(
                        (details.height / 100.0) *
                          (details.height / 100.0) *
                          18.5
                      )}
                      kg
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">
                        Higher Healthy Weight For The Height:
                      </p>
                    </td>
                    <td className="mid-bold colorMain">
                      {" "}
                      {Math.ceil(
                        (details.height / 100.0) *
                          (details.height / 100.0) *
                          24.9
                      )}
                      kg
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">Body Fat:</p>
                    </td>
                    <td className="mid-bold colorMain">
                      {" "}
                      {bfcResult ? bfcResult : "NaN"}%
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">Body Fat Category:</p>
                    </td>
                    <td
                      className={`mid-bold colorMain ${
                        bfcResult
                          ? details.sex === "Male"
                            ? bfcResult > 2.0 && bfcResult < 5.0
                              ? "text-danger"
                              : bfcResult > 6.0 && bfcResult < 13.0
                              ? "text-primary"
                              : bfcResult > 14.0 && bfcResult < 17.0
                              ? "text-primary"
                              : bfcResult > 18.0 && bfcResult < 24.0
                              ? "text-success"
                              : "text-danger"
                            : bfcResult > 10.0 && bfcResult < 13.0
                            ? "text-danger"
                            : bfcResult > 14.0 && bfcResult < 20.0
                            ? "text-primary"
                            : bfcResult > 21.0 && bfcResult < 24.0
                            ? "text-primary"
                            : bfcResult > 25.0 && bfcResult < 31.0
                            ? "text-success"
                            : "text-danger"
                          : ""
                      }`}
                    >
                      {" "}
                      {bfcResult
                        ? details.sex === "Male"
                          ? bfcResult > 2.0 && bfcResult < 5.0
                            ? "Essential Fat"
                            : bfcResult > 6.0 && bfcResult < 13.0
                            ? "Athletes"
                            : bfcResult > 14.0 && bfcResult < 17.0
                            ? "Fitness"
                            : bfcResult > 18.0 && bfcResult < 24.0
                            ? "Average"
                            : "Obese"
                          : bfcResult > 10.0 && bfcResult < 13.0
                          ? "Essential Fat"
                          : bfcResult > 14.0 && bfcResult < 20.0
                          ? "Athletes"
                          : bfcResult > 21.0 && bfcResult < 24.0
                          ? "Fitness"
                          : bfcResult > 25.0 && bfcResult < 31.0
                          ? "Average"
                          : "Obese"
                        : "NaN"}
                    </td>
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
