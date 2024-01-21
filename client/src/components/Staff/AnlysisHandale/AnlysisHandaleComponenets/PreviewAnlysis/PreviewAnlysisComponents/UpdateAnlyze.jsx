import axios from "axios";
import React, { useEffect, useState } from "react";
import BackBtn from "../../../../../BackBtn";
import { useDarkMode } from "../../../../../../context/DarkModeContext";
import { useParams } from "react-router";
import { getOneAnalyze } from "../../../../../../apis/ApisHandale";

export default function UpdateAnlyze() {
  const { darkMode } = useDarkMode();
  let [tempAnlyze, setTempAnlyze] = useState({});
  let [tempComponents, setTempComponents] = useState([]);
  let [apiMessage, setApiMessage] = useState();
  let [btnLoader, setBtnLoader] = useState(false);

  const { code } = useParams();

  //get anlyze
  async function getAnlyzeDetailt() {
    try {
      let response = await getOneAnalyze(code);
      setTempAnlyze(response.data);
      response.data.compnents.map((comp, index) => {
        setTempComponents((prevComponents) => {
          const updatedComponents = [...prevComponents];
          updatedComponents.push({ index, comp });
          return updatedComponents;
        });
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  //update Analyze Details
  async function updateAnlyze(e) {
    setBtnLoader(true);
    e.preventDefault();
    let newAnlyze = {
      ...tempAnlyze,
      compnents: tempComponents.map((component) => component.comp),
    };
    console.log(newAnlyze);
    try {
      let response = await axios.put(
        "http://localhost:5000/api/analyze/updateAnalyze",
        tempAnlyze,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setApiMessage("Done");
    } catch (error) {
      console.error("Error from Updating Anlyze: ", error);
    }
    setBtnLoader(false);
  }
  // get new anlyzeDetails
  function getNewData(e) {
    setApiMessage();
    let newAnlyze = { ...tempAnlyze };
    newAnlyze[e.target.name] = e.target.value;
    setTempAnlyze(newAnlyze);
  }
  //handale avilabillty of anlyze
  function handaleAvailablity(e) {
    setApiMessage();
    let newAnlyze = { ...tempAnlyze };
    newAnlyze.isAvailable = e.target.value;
    setTempAnlyze(newAnlyze);
  }
  /* Get New ComponenetsData Function */
  async function getNewComponentData(e, index) {
    setApiMessage();
    console.log("Index is: ", index, " and e: ", e);
    await setTempComponents((prevComponents) => {
      const updatedComponents = [...prevComponents];
      const existingComponentIndex = updatedComponents.findIndex(
        (component) => component.index === index
      );

      if (existingComponentIndex !== -1) {
        updatedComponents[existingComponentIndex].comp[e.target.name] =
          e.target.value;
      } else {
        //updatedComponents.push({ index, component });
        console.log("Errroro!!");
      }
      return updatedComponents;
    });
  }

  useEffect(() => {
    getAnlyzeDetailt();
  }, []);
  useEffect(() => {
    console.log("tempAnlyze:", tempAnlyze);
  }, [tempAnlyze]);
  useEffect(() => {
    console.log("tempComponents:", tempComponents);
  }, [tempComponents]);

  //renderAnlyzeComponents
  function renderAnlyzeComponents() {
    return tempComponents.map((component, index) => {
      return (
        <>
          <div className="row">
            <div className="col-3 mb-3">
              <label
                className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
              >
                C. Name:
              </label>
              <input
                className="form-control"
                name="nameC"
                value={component.comp.nameC}
                onChange={(e) => getNewComponentData(e, index)}
              />
            </div>
            <div className="col-3 mb-3">
              <label
                className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
              >
                NormalRange:
              </label>
              <input
                className="form-control"
                name="healthyValue"
                value={component.comp.healthyValue}
                onChange={(e) => getNewComponentData(e, index)}
              />
            </div>
            <div className="col-3 mb-3">
              <label
                className={`form-label ${darkMode ? " spic-dark-mode" : ""}`}
              >
                Unit:
              </label>
              <input
                className="form-control"
                name="unit"
                value={component.comp.unit}
                onChange={(e) => getNewComponentData(e, index)}
              />
            </div>
          </div>
          <hr />
        </>
      );
    });
  }
  return (
    <>
      <BackBtn />
      <div className="ST-section">
        <div className="row mx-4 mb-4">
          <div className="col-lg-12">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <h1
                  className={`m-0 h3 formHeader  ${
                    darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                  }`}
                >
                  Update Form:
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-4 mt-2 mb-4">
          <div className="Reg-Pat">
            <div className={`page-form ${darkMode ? " spic-dark-mode" : ""}`}>
              <form className="mx-5" onSubmit={updateAnlyze}>
                <h1
                  className={`h3 formHeader ${
                    darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                  }`}
                >
                  Edit Anlyze:
                </h1>
                {apiMessage ? (
                  <div className="alert alert-info">{apiMessage}</div>
                ) : (
                  ""
                )}
                <div className="d-flex gap-4 flex-column flex-md-row">
                  <div className="mb-3">
                    <label
                      htmlFor="a_name"
                      className={`form-label ${
                        darkMode ? " spic-dark-mode" : ""
                      }`}
                    >
                      Analyze Name:
                    </label>
                    <input
                      onChange={getNewData}
                      type="text"
                      name="name"
                      className="form-control"
                      id="a_name"
                      value={tempAnlyze.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="a_code"
                      className={`form-label ${
                        darkMode ? " spic-dark-mode" : ""
                      }`}
                    >
                      Analyze Code:
                    </label>
                    <input
                      onChange={(e) => getNewData(e)}
                      type="text"
                      name="code"
                      className="form-control"
                      id="a_code"
                      value={tempAnlyze.code}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="a_cost"
                      className={`form-label ${
                        darkMode ? " spic-dark-mode" : ""
                      }`}
                    >
                      Analyze Cost:
                    </label>
                    <input
                      onChange={getNewData}
                      type="number"
                      name="cost"
                      className="form-control"
                      id="a_cost"
                      value={tempAnlyze.cost}
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
                      className={`all-low-shadow ${
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
                <div className="d-flex gap-4 flex-column flex-md-row">
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
                      onChange={getNewData}
                      name="description"
                      className="form-control w-75"
                      id="a_description"
                      rows="5"
                      value={tempAnlyze.description}
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
                {renderAnlyzeComponents()}
                <div className="mb-3 d-flex justify-content-end">
                  <button className="btn btn-primary d-flex justify-content-center BTN-Bold">
                    {btnLoader ? "Loading..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
