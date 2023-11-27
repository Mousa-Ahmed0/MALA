import React, { useEffect } from "react";
export default function ResultsTable({ darkMode, resultDetails }) {
  function renderComponentsResult(anlyze, noOfAnlyze) {
    return anlyze.result.map((comp, index) => {
      return (
        <tr key={index}>
          <td>{comp.name}</td>
          <td>{comp.value}</td>
          <td className="normal-range">
            {
              resultDetails.analysArray[noOfAnlyze].compnents[index]
                .healthyValue
            }
          </td>
          <td>{resultDetails.analysArray[noOfAnlyze].compnents[index].unit}</td>
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
                  <th></th>
                  <th>New Result</th>
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

  return <>{resultDetails ? renderResult() : ""}</>;
}
