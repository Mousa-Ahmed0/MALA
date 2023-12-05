import React, { useEffect } from "react";
import ReportsHeader from "../../ReportsHeader";
import DetailsInformationTable from "../DetailsInformationTable";

export default function PaymentsArrayPrint({ darkMode, paymentsArr }) {
  function renderTables() {
    return paymentsArr.map((p, index) => {
      return (
        <>
          <DetailsInformationTable p={p} key={index} darkMode={darkMode} />
          <hr />
        </>
      );
    });
  }
  return (
    <>
      <div className="mb-1">
        <ReportsHeader darkMode={darkMode} />
        <h1 className="h2 mid-bold">Payments Report:</h1>
        {renderTables()}
      </div>
    </>
  );
}
