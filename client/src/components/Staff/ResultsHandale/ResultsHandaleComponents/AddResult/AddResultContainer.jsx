import AddResultPresintation from "./AddResultPresintation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import { addResult, getAllDoctor } from "../../../../../apis/ApisHandale";

import AnalyzeResult from "./AddResultComponents/AnalyzeResult";
export default function AddResult() {
  const { darkMode } = useDarkMode();
  const [isDone, setIsDone] = useState(false);
  let [errorList, setErrorList] = useState([]);
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);
  const [result, setResult] = useState({
    staffIdent: 0,
    patientIdent: 0,
    doctorIdent: 0,
    doctorName: "",
    date: new Date(),
    resultSet: [],
  });
  const [anlysisNo, setAnlysisNo] = useState(1);
  const [resultSet, setResultSet] = useState([]);
  //doctors
  const [allDoctors, setAllDoctors] = useState([]);
  async function getAllDoctors() {
    try {
      let response = await getAllDoctor();
      const doctorsData = response.data.map((doctor) => ({
        name: doctor.firstname + " " + doctor.lastname,
        ident: doctor.ident,
      }));
      setAllDoctors(doctorsData);
    } catch (error) {
      console.error("Error From getAllDoctors: ", error);
    }
  }
  //get result details from inputs
  function getResultData(e) {
    setApiMessage("");
    if (e.target.name === "a_no") {
      setAnlysisNo(e.target.value);
    } else {
      let newResult = { ...result };
      newResult[e.target.name] = e.target.value;
      setResult(newResult);
    }
  }

  //on submit ?
  async function onSubmitForm(e) {
    e.preventDefault();
    let newResult = { ...result, resultSet: resultSet };
    console.log("newResult", newResult);
    /*setResult((prevResult) => ({
      ...prevResult,
      resultSet: resultSet,
    }));*/

    try {
      let response = await addResult(newResult);
      setApiError(false);
      setApiMessage(response.data.message);
      console.log("Result with components submitted successfully");
      setResult({
        staffIdent: 0,
        patientIdent: 0,
        doctorIdent: 0,
        doctorName: "",
        date: new Date(),
        resultSet: [],
      });
      setIsDone(false);
    } catch (error) {
      setApiError(true);
      console.error("Error submitting Result with components:", error);
    }
  }
  // display the doctors options in our community
  function renderDoctorsOption() {
    if (allDoctors.length === 0) {
      return <option value={0}>Loading...</option>;
    }

    ///////////////////
    return (
      <>
        <option value={0}>Not Found</option>
        {allDoctors.map((doctor) => (
          <option key={doctor.ident} value={doctor.ident}>
            {doctor.name}
          </option>
        ))}
      </>
    );
  }
  /************** Anlysis Result **************/
  const [isSelectActive, setisSelectActive] = useState(false);
  // display the Anlysis ResultSet Form
  function renderResultSet() {
    let rows = [];
    for (let i = 0; i < anlysisNo; i++) {
      let r = (
        <>
          <div
            className={`componenet-No-Label text-truncate position-relative ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            Analyze No: {i + 1}:{" "}
          </div>
          <div className="row d-flex my-4 flex-column flex-md-row">
            <div className="col-12">
              <AnalyzeResult
                darkMode={darkMode}
                isDone={isDone}
                setIsDone={setIsDone}
                setResultSet={setResultSet}
                isSelectActive={isSelectActive}
                setisSelectActive={setisSelectActive}
                setApiMessage={setApiMessage}
                date={result ? result.date : new Date()}
              />
            </div>
            <br />
          </div>
          <hr />
        </>
      );
      rows.push(r);
    }
    return rows;
  }

  ///////////////////
  useEffect(() => {
    getAllDoctors();
  }, []);
  useEffect(() => {
    console.log("Result: ", result);
  }, [result]);
  /*useEffect(() => {
    console.log("resultSet: ", resultSet);
  }, [resultSet]);*/
  ///////////////////

  return (
    <>
      <AddResultPresintation
        darkMode={darkMode}
        result={result}
        getResultData={getResultData}
        onSubmitForm={onSubmitForm}
        renderDoctorsOption={renderDoctorsOption}
        apiMessage={apiMessage}
        renderResultSet={renderResultSet}
      />
    </>
  );
}
