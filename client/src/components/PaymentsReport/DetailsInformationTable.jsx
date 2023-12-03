import React from "react";
export default function DetailsInformationTable({ p, darkMode }) {
  const dateString = p.payment.payDate;
  const dateObject = new Date(dateString);

  // Extract year, month, and day
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = dateObject.getDate().toString().padStart(2, "0");

  // Create the formatted date string as year-month-day
  const formDate = `${year}/${month}/${day}`;
  const allValue = p.payment.discountedValue + p.payment.value;
  const percentage = Math.floor(
    (p.payment.discountedValue / p.payment.value) * 100
  );
  return (
    <>
      <div
        className={`border p-1  detailes-size mb-4 ${
          darkMode ? " spic-dark-mode border-white" : "border-black"
        }`}
      >
        <div className="row">
          <div className="col-6">
            <div>
              Name:
              <span className="mid-bold">
                {" "}
                {p.info
                  ? p.info.firstname + " " + p.info.lastname
                  : "Not Found"}
              </span>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div>
              Date: <span className="mid-bold">{formDate}</span>
            </div>
          </div>
        </div>
        <hr className="my-2" />
        <div className="row">
          <div className="col-3">
            <div>
              Total:
              <span className="mid-bold">
                {" "}
                {allValue}
                <span style={{ fontSize: "0.575rem" }}>NIS</span>
              </span>
            </div>
          </div>
          <div className={`col-6`}>
            <div className="row">
              <div className="col-8">
                <div>
                  IC Name:
                  <span className="mid-bold">
                    {" "}
                    {p.payment.InsuranceCompName != ""
                      ? p.payment.InsuranceCompName
                      : "..."}
                  </span>
                </div>
              </div>
              <div className="col-4 d-flex">
                <div>
                  Perc: <span className="mid-bold">{percentage}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <div>
              Paid:
              <span className="mid-bold">
                {" "}
                {p.payment.value}
                <span style={{ fontSize: "0.575rem" }}>NIS</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
