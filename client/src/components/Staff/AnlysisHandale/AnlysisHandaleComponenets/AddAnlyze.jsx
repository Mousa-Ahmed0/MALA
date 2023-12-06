import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from "../../../../context/DarkModeContext";
import { addANewAnalyze } from "../../../../apis/ApisHandale";

export default function AddAnlyze() {
  const { darkMode } = useDarkMode();
  let [anlyze, setAnlyze] = useState({
    name: "",
    code: "",
    cost: 0,
    description: "",
    isAvailable: true,
    compnents: [],
  });
  let [No, setNo] = useState(1);
  let [components, setComponents] = useState([]);
  let [component, setComponent] = useState({
    nameC: "",
    unit: "",
    healthyValue: "",
  });
  let [errorMessage, setErrorMessage] = useState("");
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);

  async function onAnlyzeFormSubmit(e) {
    e.preventDefault();
    let newAnlyze = {
      ...anlyze,
      compnents: components.map((component) => component.component),
    };
    try {
      await axios.post(
        "http://localhost:5000/api/Analyze/Add-Analyze",
        newAnlyze,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setApiError(false);
      console.log("Analyze with components submitted successfully");
    } catch (error) {
      setApiError(true);
      console.error("Error submitting analyze with components:", error);
    }
  }

  /* Get New AnlyzeData Function */
  function getNewAnlyzeData(e) {
    if (e.target.name === "no") {
      setNo(parseInt(e.target.value));
    } else {
      let newAnlyze = { ...anlyze };
      newAnlyze[e.target.name] = e.target.value;
      setAnlyze(newAnlyze);
    }
  }
  //handale avilabillty
  function handaleAvailablity(e) {
    let newAnlyze = { ...anlyze };
    newAnlyze.isAvailable = e.target.value;
    setAnlyze(newAnlyze);
  }
  /* Get New ComponenetsData Function */
  function getNewComponentData(e) {
    let newComponent = { ...component };
    newComponent[e.target.name] = e.target.value;

    setComponent(newComponent);
  }
  async function addNewComponent(e, i) {
    e.preventDefault();

    await setComponents((prevComponents) => {
      const updatedComponents = [...prevComponents];
      const existingComponentIndex = updatedComponents.findIndex(
        (component) => component.i === i
      );

      if (existingComponentIndex !== -1) {
        updatedComponents[existingComponentIndex].component = component;
      } else {
        updatedComponents.push({ i, component });
      }
      return updatedComponents;
    });
  }
  /* Render Componenets Details */
  function renderComponentsRows() {
    let componentRow = (
      <>
        <div className="">
          <label
            htmlFor="nameC"
            className={`form-label text-truncate ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            Component Name:
          </label>
          <input
            onChange={getNewComponentData}
            type="text"
            name="nameC"
            className="form-control"
            id="nameC"
          />
        </div>
        <div className="">
          <label
            htmlFor="unit"
            className={`form-label text-truncate ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            Component Unit:
          </label>
          <input
            onChange={getNewComponentData}
            type="text"
            name="unit"
            className="form-control"
            id="unit"
          />
        </div>
        <div className="">
          <label
            htmlFor="healthyValue"
            className={`form-label text-truncate ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            Normal Range:
          </label>
          <input
            onChange={getNewComponentData}
            type="text"
            name="healthyValue"
            className="form-control"
            id="healthyValue"
          />
        </div>
      </>
    );
    let rows = [];
    for (let i = 0; i < No; i++) {
      let result = (
        <>
          <div
            className={`componenet-No-Label text-truncate position-relative ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            Component No: {i + 1}:{" "}
          </div>
          <div className="d-flex my-4 gap-4  flex-column flex-md-row">
            <div className="d-flex gap-4 flex-column flex-md-row">
              {" "}
              {componentRow}
              <div className="d-flex flex-column-reverse">
                <button
                  onClick={(e) => addNewComponent(e, i)}
                  className="btn btn-primary d-flex justify-content-center align-items-center BTN-Bold"
                >
                  Save
                </button>
              </div>
            </div>
            <br />
          </div>
          <hr />
        </>
      );
      rows.push(result);
    }
    return rows;
  }
  useEffect(() => {
    console.log(anlyze);
    console.log(components);
  }, [components, anlyze]);
  return (
    <div className={`page-form ${darkMode ? " spic-dark-mode border-0" : ""}`}>
      <form className="mx-5" onSubmit={onAnlyzeFormSubmit}>
        <h1
          className={`h3 formHeader ${
            darkMode ? " spic-dark-mode border-0 border-bottom" : ""
          }`}
        >
          Add a New Anlyze:
        </h1>
        <div className="w-100">
          <div className="mb-3">
            <label
              htmlFor="a_name"
              className={`form-label text-truncate ${
                darkMode ? " spic-dark-mode" : ""
              }`}
            >
              Anlyze Name:
            </label>
            <input
              onChange={getNewAnlyzeData}
              type="text"
              name="name"
              className="form-control"
              id="a_name"
            />
          </div>
        </div>
        <div className="d-flex gap-4 flex-column flex-md-row justify-content-around">
          <div className="mb-3">
            <label
              htmlFor="a_code"
              className={`form-label text-truncate ${
                darkMode ? " spic-dark-mode" : ""
              }`}
            >
              Anlyze Code:
            </label>
            <input
              onChange={getNewAnlyzeData}
              type="text"
              name="code"
              className="form-control"
              id="a_code"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="a_cost"
              className={`form-label text-truncate ${
                darkMode ? " spic-dark-mode" : ""
              }`}
            >
              Anlyze Cost:
            </label>
            <input
              onChange={getNewAnlyzeData}
              type="number"
              name="cost"
              className="form-control"
              id="a_cost"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="a_code"
              className={`form-label text-truncate ${
                darkMode ? " spic-dark-mode" : ""
              }`}
            >
              No. of Anlyze Components:
            </label>
            <input
              onChange={getNewAnlyzeData}
              type="number"
              name="no"
              className="form-control"
              id="a_code"
            />
          </div>
          <div className="mb-3">
            <label
              className={`w-100 m-0 form-label ${
                darkMode ? " spic-dark-mode" : ""
              }`}
            >
              isAvailable?
            </label>
            <select
              className={`all-Mid-shadow ${
                darkMode ? " spic-dark-mode" : ""
              } w-100`}
              aria-label="Default select example"
              name="isAvailable"
              onChange={(e) => handaleAvailablity(e)}
            >
              <option value={true}>Avilable</option>
              <option value={false}>Not Avilable</option>
            </select>
          </div>
        </div>
        <div>
          <div className="mb-3 w-100">
            <label
              htmlFor="a_description"
              className={`form-label text-truncate ${
                darkMode ? " spic-dark-mode" : ""
              }`}
            >
              Anlyze Description:
            </label>
            <textarea
              onChange={getNewAnlyzeData}
              name="description"
              className="form-control w-100"
              id="a_description"
              rows="5"
            />
          </div>
        </div>
        <h1
          className={`h3 formHeader my-5 ${
            darkMode ? " spic-dark-mode border-0 border-bottom" : ""
          }`}
        >
          Components Details:
        </h1>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : (
          ""
        )}
        {renderComponentsRows()}
        <div className="mt-4 mb-3 d-flex justify-content-around">
          <button className="btn btn-primary  d-flex justify-content-center BTN-Bold">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
