import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from "../../../../context/DarkModeContext";

import BackBtn from "../../../BackBtn";

export default function AddAnlyze() {
  const { darkMode } = useDarkMode();
  let [anlyze, setAnlyze] = useState({
    name: "",
    code: "",
    cost: 0,
    description: "",
    isAvailable: true,
    analyzeCategory: "",
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
  //Category
  const [avilableCategories, setAvilableCategories] = useState([
    "Blood Tests",
    "Endocrinology",
    "Clinical Chemistry",
  ]);
  const [isCategoryChoosen, setisCategoryChoosen] = useState(false);

  //get current categories
  async function getCategories() {
    try {
      let response = await axios.get(
        "http://localhost:5000/api/analyze/getCategorys",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response);
      if (response.data.length > 0) setAvilableCategories(response.data);
    } catch (error) {
      console.error("Error From getCategories: ", error);
    }
  }
  //Add analyze
  async function onAnlyzeFormSubmit(e) {
    e.preventDefault();
    let newAnlyze = {
      ...anlyze,
      compnents: components.map((component) => component.newComponent),
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
  async function getNewComponentData(e, i) {
    e.preventDefault();
    await setComponents((prevComponents) => {
      const updatedComponents = [...prevComponents];
      const existingComponentIndex = updatedComponents.findIndex(
        (component) => component.i === i
      );

      if (existingComponentIndex !== -1) {
        updatedComponents[existingComponentIndex].newComponent[e.target.name] =
          e.target.value;
      } else {
        const newComponent = { ...component };
        newComponent[e.target.name] = e.target.value;
        updatedComponents.push({ i, newComponent });
      }
      return updatedComponents;
    });
  }

  /* Render Componenets Details */
  function renderComponentsRows() {
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
                    onChange={(e) => getNewComponentData(e, i)}
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
                    onChange={(e) => getNewComponentData(e, i)}
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
                    onChange={(e) => getNewComponentData(e, i)}
                    type="text"
                    name="healthyValue"
                    className="form-control"
                    id="healthyValue"
                  />
                </div>
              </>
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
  /* Render renderCategoriesArray */
  function renderCategoriesArray() {
    return avilableCategories.map((category, index) => {
      if (category) {
        return (
          <option key={index} value={category}>
            {category}
          </option>
        );
      }
    });
  }
  /* handale category changes */
  function handaleCategory(e) {
    setisCategoryChoosen(true);
    if (e.target.value === "") {
      setisCategoryChoosen(false);
    }
    let newAnlyze = { ...anlyze };
    newAnlyze.analyzeCategory = e.target.value;
    setAnlyze(newAnlyze);
  }

  ////////////////
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    console.log(anlyze);
    console.log(components);
  }, [components, anlyze]);
  return (
    <div className="ST-section my-1">
      <BackBtn />
      <div className="Reg-Pat my-4">
        <div
          className={`page-form ${darkMode ? " spic-dark-mode border-0" : ""}`}
        >
          <form className="mx-5" onSubmit={onAnlyzeFormSubmit}>
            <h1
              className={`h3 formHeader ${
                darkMode ? " spic-dark-mode border-0 border-bottom" : ""
              }`}
            >
              Add a New Anlyze:
            </h1>
            <div className="row">
              <div className="col-12">
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
            <hr className="d-none d-md-block my-4" />
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-2">
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
              <div className="col-1 d-none d-md-flex justify-content-center align-items-center">
                |
              </div>
              <div className="col-12 col-md-2">
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
              <div className="col-1 d-none d-md-flex justify-content-center align-items-center">
                |
              </div>
              <div className="col-12 col-md-2">
                <label
                  htmlFor="a_code"
                  className={`form-label text-truncate ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                >
                  No. of Components:
                </label>
                <input
                  onChange={getNewAnlyzeData}
                  type="number"
                  name="no"
                  className="form-control"
                  id="a_code"
                />
              </div>
              <div className="col-1 d-none d-md-flex justify-content-center align-items-center ">
                |
              </div>
              <div className="col-12 col-md-3 custom-select">
                <label
                  className={`w-100  form-label ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                >
                  isAvailable?
                </label>
                <select
                  className={`${darkMode ? " spic-dark-mode" : ""} w-100 `}
                  aria-label="Default select example"
                  name="isAvailable"
                  onChange={(e) => handaleAvailablity(e)}
                >
                  <option value={true}>Avilable</option>
                  <option value={false}>Not Avilable</option>
                </select>
              </div>
            </div>
            <hr className="d-none d-md-block my-4" />
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-2 ">
                <label
                  className={`w-100 form-label ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                >
                  Category:
                </label>
                <select
                  className={` ${darkMode ? " spic-dark-mode" : ""} w-100`}
                  aria-label="Default select example"
                  name="analyzeCategory"
                  onChange={(e) => handaleCategory(e)}
                >
                  <option value={""} hidden>
                    Choose:
                  </option>
                  <option value="">Others ...</option>
                  {renderCategoriesArray()}
                </select>
              </div>
              <div className="col-12 col-md-3">
                <label
                  className={`form-label text-truncate ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                >
                  New Category?
                </label>
                <input
                  onChange={getNewAnlyzeData}
                  type="text"
                  name="analyzeCategory"
                  className="form-control"
                  disabled={isCategoryChoosen}
                />
              </div>
              <div className="col-1 d-none d-md-flex justify-content-center align-items-center">
                |
              </div>
              <div className="col-12 col-md-6">
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
            <hr className=" my-4" />
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
            <div className="mt-4 d-flex justify-content-around">
              <button className="btn btn-primary  d-flex justify-content-center BTN-Bold">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
