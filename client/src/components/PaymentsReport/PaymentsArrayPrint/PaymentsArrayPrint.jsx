import React, { useEffect, useState } from "react";
import ReportsHeader from "../../ReportsHeader";
import DetailsInformationTable from "../DetailsInformationTable";

export default function PaymentsArrayPrint({ darkMode, paymentsArr }) {
  const [totalValue, setTotalValue] = useState(0);
  const [totalPaied, setTotalPaied] = useState(0);
  const [totalDiscounted, setTotalDiscounted] = useState(0);

  useEffect(() => {
    let calculatedTotalValue = 0;
    let calculatedTotalPaied = 0;
    let calculatedTotalDiscounted = 0;

    paymentsArr.forEach((p) => {
      calculatedTotalValue += p.payment.totalValue;
      calculatedTotalPaied += p.payment.paiedvalue;
      calculatedTotalDiscounted += p.payment.discountedValue;
    });

    setTotalValue(calculatedTotalValue);
    setTotalPaied(calculatedTotalPaied);
    setTotalDiscounted(calculatedTotalDiscounted);
  }, [paymentsArr]);

  function renderTables() {
    return paymentsArr.map((p, index) => {
      return (
        <>
          <DetailsInformationTable p={p} key={index} darkMode={darkMode} />
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
        <hr className="my-4" />
        <div className="row">
          <div className="col-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                Total Value:{" "}
              </div>
              <div className="col-12 d-flex justify-content-center h4 mid-bold m-0 coloMain">
                {totalValue}
                <span style={{ fontSize: "0.575rem" }}>NIS</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                {" "}
                Total Paid Value:{" "}
              </div>
              <div className="col-12 d-flex justify-content-center h4 mid-bold m-0 coloMain">
                {totalPaied}
                <span style={{ fontSize: "0.575rem" }}>NIS</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                Total Discounted Value:{" "}
              </div>
              <div className="col-12 d-flex justify-content-center h4 mid-bold m-0 coloMain">
                {totalDiscounted}
                <span style={{ fontSize: "0.575rem" }}>NIS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
