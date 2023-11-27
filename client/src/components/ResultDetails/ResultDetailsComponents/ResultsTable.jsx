import React, { useEffect } from "react";
export default function ResultsTable({ darkMode, resultDetails }) {
  function renderComponentsResult(anlyze) {
    return anlyze.result.map((comp, index) => {
      return (
        <tr key={index}>
          <td>R.B.C s</td>
          <td>{comp.value}</td>
          <td className="normal-range">14-20</td>
          <td>x 10^12/L</td>
        </tr>
      );
    });
  }

  function renderResult() {
    if (resultDetails) {
      return resultDetails.resultSet.map((anlyze, index) => {
        return (
          <div key={index} className="table-responsive mt-2 mb-2">
            <h1 className="h4 mid-bold">Complete Blood Count ( CBC )</h1>
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
              <tbody>{renderComponentsResult(anlyze)}</tbody>
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
