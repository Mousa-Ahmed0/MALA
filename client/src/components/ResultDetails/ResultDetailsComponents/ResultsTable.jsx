import React, { useEffect, useState } from "react";
import { formatDateWithouHour } from "../../../methods/FormateDate";
import axios from "axios";
export default function ResultsTable({ user, darkMode, resultDetails }) {
  const [aiResult, setAiResult] = useState([]);

  //
  async function getAiResult(resID) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/result/getResults/pythonResults/${resID}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log("response", response);
      setAiResult(response.data);
    } catch (error) {
      console.error("Error from getAiResult: ", error);
    }
  }
  // render initial information of tabels
  function renderResult() {
    if (resultDetails.currentResult) {
      return resultDetails.currentResult.resultSet.map((anlyze, index) => {
        console.log("anlyze: ", resultDetails.analyzComponent[index]);
        return (
          <>
            <div key={index} className="table-responsive my-5">
              <h1 className="h4 mid-bold">
                {resultDetails.analyzComponent[index] &&
                resultDetails.analyzComponent[index].name &&
                resultDetails.analyzComponent[index].code ? (
                  <>
                    {resultDetails.analyzComponent[index].name} ({" "}
                    {resultDetails.analyzComponent[index].code} )
                  </>
                ) : (
                  "Anaylze Name"
                )}{" "}
              </h1>
              <table
                className={`table table-bordered table-hover table-sm  ${
                  darkMode ? " table-dark border-white" : ""
                }`}
              >
                <thead className="thead-light">
                  <tr>
                    <th className="comp-name"></th>
                    {renderResultsNo(anlyze)}
                    <th className="normal-range">Normal Range</th>
                    <th className="unit">Unit</th>
                  </tr>
                </thead>
                <tbody>{renderComponentsResult(anlyze, index)}</tbody>
              </table>
            </div>
            {/*Ai Pridict if CBC  && User is Doctor*/}
            {resultDetails.analyzComponent[index]?.code === "CBC" ? (
              <div
                className={`ai-pridict ${
                  user.usertype === "Doctor" ? "" : "d-none"
                }`}
              >
                <button
                  onClick={() => getAiResult(resultDetails.currentResult._id)}
                  className="btn btn-primary my-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Using Ai - Predict the issue.
                </button>
                <div className="collapse" id="collapseExample">
                  <div className="row">
                    <div className="col-12 card card-body d-flex flex-row gap-2 bg-transparent">
                      {aiResult.result?.length > 0 ? (
                        <>
                          {" "}
                          Using{" "}
                          <span className="colorMain h5 m-0 mid-bold">
                            Ai
                          </span>{" "}
                          Owner of this{" "}
                          <span className="colorMain h5 m-0 mid-bold">CBC</span>{" "}
                          Result Can be have:{" "}
                          <span className="colorMain h5 m-0 mid-bold">
                            {aiResult.result[0]} .
                          </span>
                        </>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center my-4">
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <hr className="my-2" />
          </>
        );
      });
    } else {
      return <div>Loding....</div>;
    }
  }
  // detrmine number of results in DB
  function renderResultsNo(anlyze) {
    // Sort userAnalyze array by date before mapping over it
    const sortedUserAnalyze = [...resultDetails.userAnalyze].sort(
      (a, b) => a.date - b.date
    );
    // console.log("anlyze from header", anlyze);
    const resultsNo = [];
    resultsNo.push(<th className="result">New Result</th>); //initial the newResult
    sortedUserAnalyze.map((r, index) => {
      if (r.result.anlyzeId === anlyze.anlyzeId) {
        const resultTitle = (
          <th className="result" key={index}>
            <span className="d-block w-100">Result</span> (
            <span style={{ fontSize: "0.65rem" }}>
              {formatDateWithouHour(r.date)}
            </span>
            )
          </th>
        );
        resultsNo.push(resultTitle);
      } else return;
    });
    return resultsNo;
  }
  //render componenets details "name, normal range and unit" and all results
  function renderComponentsResult(anlyze, noOfAnlyze) {
    //console.log("no:", resultDetails.analyzComponent[noOfAnlyze]);
    //console.log("anlyze", anlyze);
    const compResult = anlyze.result;
    //console.log("compResult", compResult);

    return compResult.map((comp, index) => {
      //console.log("Comp: ", comp);
      return (
        <tr key={index}>
          <td className="comp-name">
            {resultDetails.analyzComponent[noOfAnlyze]?.compnents[index]
              ?.nameC || "Component Name"}
          </td>
          <td className="result">{comp.value}</td>
          {renderPrevResultsValue(anlyze, index)}
          <td className="normal-range">
            {resultDetails.analyzComponent[noOfAnlyze]?.compnents[index]
              ?.healthyValue || "Not Found"}
          </td>
          <td className="unit">
            {resultDetails.analyzComponent[noOfAnlyze]?.compnents[index]
              ?.unit || "Not Found"}
          </td>
        </tr>
      );
    });
  }
  // detrmine number of results in DB
  function renderPrevResultsValue(anlyze, compIndex) {
    // Sort userAnalyze array by date before mapping over it
    const sortedUserAnalyze = [...resultDetails.userAnalyze].sort(
      (a, b) => a.date - b.date
    );
    // console.log("compIndex", compIndex);
    //console.log("anlyze from prev", anlyze);
    // console.log("anlyze from header", anlyze);
    const previousCompResults = [];
    sortedUserAnalyze.map((r, index) => {
      if (r.result.anlyzeId === anlyze.anlyzeId) {
        const prevResult = (
          <td key={index} className="result">
            {r.result.result[compIndex].value}
          </td>
        );
        previousCompResults.push(prevResult);
      } else return;
    });
    return previousCompResults;
  }

  ///////////
  useEffect(() => {
    console.log("resultDetails tttttt: ", resultDetails);
  }, []);
  return <>{resultDetails ? renderResult() : ""}</>;
}
