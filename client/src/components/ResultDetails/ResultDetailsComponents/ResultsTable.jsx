import React, { useEffect } from "react";
import { formatDateWithouHour } from "../../../methods/FormateDate";
export default function ResultsTable({ darkMode, resultDetails }) {
  function renderNoOfResults(length, r) {
    const arrayResults = r.reverse();
    const results = [];
    for (let i = 0; i < length; i++) {
      if (i === 0) {
        results.push(
          <th className="result " key={i}>
            New Result
          </th>
        );
      } else
        results.push(
          <th className="result" key={i + 1}>
            Previous Result{" "}
            <span>({formatDateWithouHour(r[i].resultDate)})</span>
          </th>
        );
    }
    return results;
  }

  function renderComponentsResult(anlyze, noOfAnlyze) {
    // console.log("no:", resultDetails.analysArray[noOfAnlyze]);
    //  console.log("anlyze", anlyze);
    const compResult = anlyze.result[0].compontResult;
    //console.log("compResult", compResult);

    return compResult[0].resultValues.map((comp, index) => {
      return (
        <tr key={index}>
          <td className="comp-name">
            {resultDetails.analysArray[noOfAnlyze].compnents[index].nameC}
          </td>
          {compResult.reverse().map((comp, mostRecentIndex) => {
            console.log("comp", comp);
            return (
              <td className="result" key={mostRecentIndex}>
                {comp.resultValues[index].value}
              </td>
            );
          })}
          <td className="normal-range">
            {resultDetails.analysArray[noOfAnlyze]
              ? resultDetails.analysArray[noOfAnlyze].compnents[index]
                  .healthyValue
              : "Not Found"}
          </td>
          <td>
            {resultDetails.analysArray[noOfAnlyze]
              ? resultDetails.analysArray[noOfAnlyze].compnents[index].unit
              : "Not Found"}
          </td>
        </tr>
      );
    });
  }

  function renderResult() {
    if (resultDetails.detailsAnalyze) {
      return resultDetails.detailsAnalyze.resultSet.map((anlyze, index) => {
        return (
          <div key={index} className="table-responsive mt-2 mb-2">
            <h1 className="h4 mid-bold">
              {resultDetails.analysArray[index] &&
                resultDetails.analysArray[index].name && (
                  <>
                    {resultDetails.analysArray[index].name} ({" "}
                    {resultDetails.analysArray[index].code} )
                  </>
                )}{" "}
            </h1>
            <table
              className={`table table-bordered table-hover table-sm  ${
                darkMode ? " table-dark border-white" : ""
              }`}
            >
              <thead class="thead-light">
                <tr>
                  <th className="comp-name"></th>
                  {renderNoOfResults(
                    anlyze.result[0].compontResult.length,
                    anlyze.result[0].compontResult
                  )}
                  <th className="normal-range">Normal Range</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>{renderComponentsResult(anlyze, index)}</tbody>
            </table>
          </div>
        );
      });
    } else {
      return <div>Loding....</div>;
    }
  }
  ///////////
  useEffect(() => {
    console.log("rr: ", resultDetails);
  }, []);
  return <>{resultDetails ? renderResult() : ""}</>;
}
