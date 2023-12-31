import React, { useEffect, useState } from "react";
import { getAllAnalysis } from "../../../../../../apis/ApisHandale";
import { getOneAnalyze } from "../../../../../../apis/ApisHandale";

export default function AnalyzeResult({
  darkMode,
  resultSet,
  setResultSet,
  isSelectActive,
  setisSelectActive,
  setApiMessage,
  isDone,
  setIsDone,
}) {
  //Object to save result of one anlyze
  const [anlyseResult, setAnlyseResult] = useState({
    anlyzeId: "",
    result: [],
  });
  // to handle ux
  const [currentSelectActive, setcurrentSelectActive] = useState(false);
  const [currentDone, setCurentDone] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  //analysis options
  const [allAnalysis, setAllAnalysis] = useState([]);
  const [selectValue, setSelectValue] = useState("0");

  //get All Analysis
  async function getAnalysis() {
    try {
      let response = await getAllAnalysis();
      const anlysisData = response.data.map((anlyze) => ({
        name: anlyze.name + " (" + anlyze.code + ")",
        id: anlyze.id,
        compnents: anlyze.compnents,
      }));
      setAllAnalysis(anlysisData);
    } catch (error) {
      console.error("Error From getAnalysis: ", error);
    }
  }
  // display the Anlysis options in our Lap
  function renderAnlysisOptiens() {
    if (allAnalysis.length === 0) {
      return <option value={"0"}>Loading...</option>;
    }
    return (
      <>
        <option value={"0"}>Not Found</option>
        {allAnalysis.map((anlyze) => (
          <option key={anlyze.id} value={anlyze.id}>
            {anlyze.name}
          </option>
        ))}
      </>
    );
  }
  //get result set details "AnlyzeID" from inputs
  let [foundAnalyze, setFoundAnalyze] = useState(); //search for the anlyze

  function getAnalyzeResultDetails(e) {
    setApiMessage("");
    setIsDone(false);
    setErrorMessage("");
    setSelectValue(e.target.value);
    if (!isSelectActive) setcurrentSelectActive(true);

    if (e.target.value === "0") {
      setcurrentSelectActive(false);
    } else {
      if (isSelectActive && !currentSelectActive) {
        setErrorMessage("You Didn't Finish The Previous Result! ");
      } else {
        setisSelectActive(true);
        let newAnlyseResult = { ...anlyseResult };
        newAnlyseResult[e.target.name] = e.target.value;
        setAnlyseResult((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        setFoundAnalyze(
          allAnalysis.find((analyze) => analyze.id === e.target.value)
        );
      }
    }
  }
  //handale Componenet Result Input
  function handleResultChange(name, value) {
    setApiMessage("");
    setIsDone(false);
    const updatedResults = [...anlyseResult.result];
    const existingResultIndex = updatedResults.findIndex(
      (result) => result.name === name
    );

    if (existingResultIndex !== -1) {
      updatedResults[existingResultIndex].value = value;
    } else {
      updatedResults.push({ name, value });
    }
    setAnlyseResult({ ...anlyseResult, result: updatedResults });
  }
  //Save Array of Components Result
  function saveResults(e) {
    e.preventDefault();
    if (anlyseResult.result.length === 0) {
      setErrorMessage("ThereEmptyValue");
    } else {
      // Use the current anlyseResult in the callback function
      console.log("anlyseResult from save: ", anlyseResult);
      const newResultSet = [...resultSet];
      newResultSet.push(anlyseResult);
      setResultSet(newResultSet);
      setcurrentSelectActive(false);
      setisSelectActive(false);
      setAnlyseResult({ anlyzeId: "", result: [] });
      setErrorMessage("");
      setSelectValue("0");
      setCurentDone(true);
    }
  }
  //Render Analyze Components
  function renderAnalyzeComponents() {
    if (foundAnalyze) {
      return foundAnalyze.compnents.map((component) => (
        <>
          <div className="row mb-4">
            <div className="col-4 col-md-3 d-md-flex text-truncate">
              {component.nameC}
            </div>
            <div className="col-3 col-md-3 d-md-flex">
              <div className="row">
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      handleResultChange(component.nameC, e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-2 col-md-3 d-md-flex text-truncate">
              {component.unit}
            </div>
            <div className="col-3 col-md-3 d-md-flex">
              {component.healthyValue}
            </div>
          </div>
          <hr />
        </>
      ));
    }
  }

  ///////////////////
  useEffect(() => {
    getAnalysis();
  }, []);
  useEffect(() => {
    console.log("ggg", anlyseResult);
  }, [anlyseResult]);

  useEffect(() => {
    if (isDone) {
      setcurrentSelectActive(false);
      setCurentDone(false);
    }
  }, [isDone]);

  ///////////////////
  return (
    <>
      <div className={`${darkMode ? " spic-dark-mode" : ""} row`}>
        <div className="col-12 col-md-6 my-3 d-flex justify-content-between align-items-center">
          <label
            className={` m-0 form-label ${darkMode ? " spic-dark-mode" : ""}`}
          >
            Analyze:
          </label>
          <select
            className={`w-75 mx-2 border border-white all-Mid-shadow ${
              darkMode ? " spic-dark-mode" : ""
            }`}
            aria-label="Default select example"
            name="anlyzeId"
            onChange={getAnalyzeResultDetails}
            value={selectValue}
            disabled={(isSelectActive && !currentSelectActive) || currentDone}
          >
            {renderAnlysisOptiens()}
          </select>
        </div>
        {errorMessage ? (
          <div className="col-12  alert alert-danger">{errorMessage}</div>
        ) : (
          ""
        )}
      </div>
      <div className={`col-12 ${!currentSelectActive ? "d-none" : ""}`}>
        <div
          className={`card mb-4 ${darkMode ? " spic-dark-mode border-0" : ""}`}
        >
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-3 d-none d-md-flex">Component Name:</div>
              <div className="col-md-3 d-none d-md-flex">Result:</div>
              <div className="col-md-3 d-none d-md-flex">Unit:</div>
              <div className="col-md-3 d-none d-md-flex">Normal Range:</div>
            </div>
            <hr />
            {renderAnalyzeComponents()}
            <div className="col-3 my-4 d-flex flex-column-reverse">
              <button
                onClick={(e) => saveResults(e)}
                className="btn btn-primary d-flex justify-content-center align-items-center BTN-Bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {currentDone ? <div className="alert alert-info ">Done!</div> : ""}
    </>
  );
}
