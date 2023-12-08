import axios from "axios";
import React, { useEffect, useState } from "react";
import BackBtn from "../../../../../BackBtn";
import { useDarkMode } from "../../../../../../context/DarkModeContext";
import { useParams } from "react-router";
import { getOneAnalyze } from "../../../../../../apis/ApisHandale";

export default function UpdateAnlyze() {
  const { darkMode } = useDarkMode();
  let [tempAnlyze, setTempAnlyze] = useState({});
  let [components, setComponents] = useState([]);
  const { code } = useParams();

  //get anlyze
  async function getAnlyzeDetailt() {
    try {
      let response = await getOneAnalyze(code);
      setTempAnlyze(response.data);
      setComponents(response.data.compnents);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  //update User Details
  async function updateAnlyze(e) {
    e.preventDefault();
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
    } catch (error) {
      console.error("Error from Updating Anlyze: ", error);
    }
  }
  // get new userDetails
  function getNewData(e) {
    let newAnlyze = { ...tempAnlyze };
    newAnlyze[e.target.name] = e.target.value;
    setTempAnlyze(newAnlyze);
  }
  //handale avilabillty
  function handaleAvailablity(e) {
    let newAnlyze = { ...tempAnlyze };
    newAnlyze.isAvailable = e.target.value;
    setTempAnlyze(newAnlyze);
  }

  useEffect(() => {
    getAnlyzeDetailt();
  }, []);
  useEffect(() => {
    console.log("tempAnlyze:", tempAnlyze);
  }, [tempAnlyze]);
  //renderAnlyzeComponents
  function renderAnlyzeComponents() {
    return components.map((component) => {
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
                value={component.nameC}
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
                value={component.healthyValue}
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
                value={component.unit}
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
                    Update
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
