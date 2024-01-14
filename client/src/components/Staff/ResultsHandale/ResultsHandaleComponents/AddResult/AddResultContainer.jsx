import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";

import { useDarkMode } from "../../../../../context/DarkModeContext";
import { getAllDoctor } from "../../../../../apis/ApisHandale";
import {
  AddResultPresintation,
  AnalyzeResult,
} from "../../../../../componentsLoader/ComponentsLoader";

export default function AddResult() {
  const { darkMode } = useDarkMode();
  const [isDone, setIsDone] = useState(false);
  let [errorList, setErrorList] = useState([]);
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);
  const [result, setResult] = useState({
    isDone: true,
    isPaied: false,
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
  const [doctorSelected, setDoctorSelected] = useState(false);

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
    setIsDone(false);

    if (e.target.name === "a_no") {
      setAnlysisNo(e.target.value);
    } else {
      let newResult = { ...result };
      newResult[e.target.name] = e.target.value;
      if (e.target.name === "doctorIdent") {
        newResult.doctorName = "";
      }
      setResult(newResult);
    }
  }

  //on submit ?
  async function onSubmitForm(e) {
    e.preventDefault();
    let newResult = { ...result, resultSet: resultSet };

    try {
      //console.log("newResult", newResult);
      let response = await axios.post(
        "http://localhost:5000/api/result/addResults",
        newResult,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      //console.log(response);
      setApiError(false);
      setApiMessage(response.data.message);
      setIsDone(true);
      //console.log("Result with components submitted successfully");
      setResult({
        isDone: true,
        isPaied: false,
        staffIdent: 0,
        patientIdent: 0,
        doctorIdent: 0,
        doctorName: "",
        date: new Date(),
        resultSet: [],
      });
      setResultSet([]);
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
    //
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
              <Suspense
                fallback={
                  <div className="center-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <AnalyzeResult
                  darkMode={darkMode}
                  isDone={isDone}
                  setIsDone={setIsDone}
                  resultSet={resultSet}
                  setResultSet={setResultSet}
                  isSelectActive={isSelectActive}
                  setisSelectActive={setisSelectActive}
                  setApiMessage={setApiMessage}
                  date={result ? result.date : new Date()}
                />
              </Suspense>
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
  // useEffect(() => {
  //   console.log("Result: ", result);
  // }, [result]);
  // useEffect(() => {
  //   console.log("resultSet: ", resultSet);
  // }, [resultSet]);
  ///////////////////

  return (
    <>
      <Suspense
        fallback={
          <div className="center-container">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <AddResultPresintation
          darkMode={darkMode}
          result={result}
          setResult={setResult}
          getResultData={getResultData}
          onSubmitForm={onSubmitForm}
          renderDoctorsOption={renderDoctorsOption}
          apiMessage={apiMessage}
          renderResultSet={renderResultSet}
        />
      </Suspense>
    </>
  );
}
