import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

import { useDarkMode } from "../../../../../context/DarkModeContext";
import { getResultByID } from "../../../../../apis/ApisHandale";
import { EditResultPresintation } from "../../../../../componentsLoader/ComponentsLoader";

export default function EditResultContainer() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);
  const [result, setResult] = useState({});
  const [allAnalysis, setAllAnalysis] = useState([]);
  const [anlysisNo, setAnlysisNo] = useState(1);
  const [resultSet, setResultSet] = useState([]);
  const { id } = useParams();
  const [allDone, setAllDone] = useState(false);

  const goBack = () => {
    navigate(-1);
  };
  //get Result details by id
  async function getResult() {
    try {
      const response = await getResultByID(id);
      setResult(response.data.detailsAnalyze);
      console.log(response);
      setAnlysisNo(response.data.detailsAnalyze.resultSet.length);
      setAllAnalysis(response.data.analysArray);
    } catch (error) {
      console.error("Error from getResult to edit: ", error);
    }
  }
  //get result details from inputs "Date"
  function getResultData(e) {
    setApiMessage("");
    let newResult = { ...result };
    newResult[e.target.name] = e.target.value;
    setResult(newResult);
  }

  //function editComponentResults
  function editComponentResults(e, analyzeIndex, compIndex, compName) {
    console.log(compName, ": ", e.target.value);
    console.log("analyzeIndex: ", analyzeIndex);
    console.log("compIndex: ", compIndex);
    //////////////////////////////////////////
    let newResultSet = [...result.resultSet];
    console.log("newResultSet", newResultSet);
    newResultSet[analyzeIndex].result[compIndex].value = e.target.value;
    setResult((prevResult) => {
      return {
        ...prevResult,
        resultSet: newResultSet,
      };
    });
  }
  //on submit ? => update the result
  async function onSubmitForm(e) {
    e.preventDefault();
    let newResult = { ...result, isDone: true };

    try {
      console.log("newResult", newResult);
      let response = await axios.put(
        `http://localhost:5000/api/result/editResults/${id}`,
        newResult,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setApiError(false);
      setApiMessage(response.data.message);
      console.log("Result with components submitted successfully");
      setAllDone(true);
    } catch (error) {
      setApiError(true);
      console.error("Error submitting Result with components:", error);
    }
  }

  /************** Anlysis Result **************/
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
          <div className="row d-flex my-4 flex-column flex-md-row my-2">
            <div className="col-12">
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-12 h3 m-0 high-bold ">
                    {allAnalysis[i]?.name || "Not Found"}
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          <div
            className={`card mb-4 ${
              darkMode ? " spic-dark-mode border-0" : ""
            }`}
          >
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-3 d-none d-md-flex">Component Name:</div>
                <div className="col-md-3 d-none d-md-flex">Result:</div>
                <div className="col-md-3 d-none d-md-flex">Unit:</div>
                <div className="col-md-3 d-none d-md-flex">Normal Range:</div>
              </div>
              <hr />
              {allAnalysis[i]?.compnents?.map((comp, compIndex) => (
                <>
                  <div className="row mb-4">
                    <div className="col-4 col-md-3 d-md-flex text-truncate">
                      {comp.nameC}
                    </div>
                    <div className="col-3 col-md-3 d-md-flex">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <input
                            type="text"
                            onChange={(e) =>
                              editComponentResults(e, i, compIndex, comp.nameC)
                            }
                            value={result?.resultSet[i].result[compIndex].value}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-2 col-md-3 d-md-flex text-truncate">
                      {comp.unit}
                    </div>
                    <div className="col-3 col-md-3 d-md-flex">
                      {comp.healthyValue}
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
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
    getResult();
  }, []);
  useEffect(() => {
    console.log("Result: ", result);
  }, [result]);
  useEffect(() => {
    console.log("resultSet: ", resultSet);
  }, [resultSet]);
  useEffect(() => {
    if (allDone) {
      goBack();
    }
  }, [allDone]);
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
        <EditResultPresintation
          darkMode={darkMode}
          result={result}
          setResult={setResult}
          getResultData={getResultData}
          onSubmitForm={onSubmitForm}
          apiMessage={apiMessage}
          renderResultSet={renderResultSet}
        />
      </Suspense>
    </>
  );
}
