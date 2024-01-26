import React from "react";

export default function AnalysisCostDetails({ payment, darkMode }) {
  const formatedICname =
    payment.InsuranceCompName.length > 0 ? payment.InsuranceCompName : "NaN";
  return (
    <>
      <div className="table-responsive">
        <h1 className="h4 mid-bold">Preview:</h1>
        <table
          className={`table table-bordered table-hover table-sm  ${
            darkMode ? " table-dark border-white" : ""
          }`}
        >
          <thead className="thead-light">
            <tr>
              <th>Total Value</th>
              <th>IC. Name</th>
              <th>Discount</th>
              <th>Paid Value</th>
              <th>Discounted Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {payment.totalValue}
                <span style={{ fontSize: "0.758rem" }}>NIS</span>
              </td>
              <td>{formatedICname}</td>
              <td>{payment.InsuranceCompPers}%</td>
              <td>
                {payment.paiedvalue}
                <span style={{ fontSize: "0.758rem" }}>NIS</span>
              </td>
              <td>
                {payment.discountedValue}
                <span style={{ fontSize: "0.758rem" }}>NIS</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="my-5" />
      <div className="table-responsive">
        <h1 className="h4 mid-bold">Sample Details:</h1>
        <table
          className={`table table-bordered table-hover table-sm  ${
            darkMode ? " table-dark border-white" : ""
          }`}
        >
          <thead className="thead-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {payment.resultCostDetils.map((analyze, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{analyze.anlayzeCost.aName}</td>
                <td>
                  {analyze.anlayzeCost.aCost}
                  <span style={{ fontSize: "0.758rem" }}>NIS</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
