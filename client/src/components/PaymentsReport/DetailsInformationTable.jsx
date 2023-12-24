import React from "react";
import { formatDateWithouHour } from "../../methods/FormateDate";
export default function DetailsInformationTable({ p, darkMode }) {
  const formDate = formatDateWithouHour(p.payment.payDate);
  return (
    <>
      <div
        className={`border p-1  detailes-size mb-4 ${
          darkMode ? " spic-dark-mode border-white" : "border-black"
        }`}
      >
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                Name:
                <span className="mid-bold">
                  {" "}
                  {p.info
                    ? p.info.firstname + " " + p.info.lastname
                    : "Not Found"}
                </span>
              </div>
              <div className="col-12">
                ID Number:
                <span className="mid-bold">{p.info.ident}</span>
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div className="row">
              <div className="col-12 d-flex justify-content-end">
                <span className="mid-bold">{p.day}</span>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <span className="mid-bold">{formDate}</span>
              </div>
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
                {p.payment.totalValue}
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
                  Perc:{" "}
                  <span className="mid-bold">
                    {p.payment.InsuranceCompPers}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <div>
              Paid:
              <span className="mid-bold">
                {" "}
                {p.payment.paiedvalue}
                <span style={{ fontSize: "0.575rem" }}>NIS</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
