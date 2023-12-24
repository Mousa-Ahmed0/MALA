import React from "react";

export default function AnalysisCostDetails({ info, day, date, darkMode }) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <div className="h4 m-0 mid-bold">
            Receipt for{" "}
            <span className="h3 m-0 colorMain">
              {info.firstname} {info.lastname}
            </span>
          </div>
          <div className="h6 m-0 my-2">Account ID: {info.id}</div>
        </div>
        <div className="d-flex flex-column  align-items-end">
          <div className="h4 m-0 mid-bold">{day}</div>
          <div style={{ fontSize: "0.875rem" }}>{date}</div>
        </div>
      </div>
    </>
  );
}
