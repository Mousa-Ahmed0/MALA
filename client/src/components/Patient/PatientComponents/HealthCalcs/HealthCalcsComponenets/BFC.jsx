import React from "react";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import BackBtn from "../../../../BackBtn";
export default function BMR() {
  const { darkMode } = useDarkMode();

  //
  function onFormSubmit(e) {
    e.preventDefault();
  }
  /////
  return (
    <div className="Reg-Pat">
      <BackBtn />
      <div
        className={`page-form ${
          darkMode ? " spic-dark-mode border-0" : ""
        } my-4`}
      >
        <h1 className={`${darkMode ? " spic-dark-mode border-0" : ""} `}>
          Body Fat Calculete:
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
                        className="form-control"
                      />
                    </div>
                    <div className="col-4 d-flex align-items-center">
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
                      name="btnradio"
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
                      name="btnradio"
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
                      <label className="form-label m-0">Neck:</label>
                    </div>
                    <div className="col-5">
                      {" "}
                      <input
                        type="number"
                        name="neck"
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
                      <label className="form-label m-0">Waist:</label>
                    </div>
                    <div className="col-5">
                      {" "}
                      <input
                        type="number"
                        name="waist"
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
                    <td></td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">Exercise 1-3 times/week</p>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      {" "}
                      <p className="m-0 p-1">Exercise 4-5 times/week</p>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      <p className="m-0 p-1">Intense exercise 6-7 times/week</p>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="text-start">
                      <p className="m-0 p-1">
                        Very intense exercise daily, or physical job
                      </p>
                    </td>
                    <td></td>
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
