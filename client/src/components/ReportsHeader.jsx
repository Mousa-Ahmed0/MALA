import React from "react";

export default function ReportsHeader({ darkMode }) {
  return (
    <>
      <div className={`row`}>
        <div className="col-12 my-1">
          <div className="d-flex justify-content-around gap-4 align-items-center">
            <div className=" d-flex flex-column">
              <h1 className="h3 colorMain high-bold text-center">
                Name of Lab
              </h1>
              <h1 className="h6 mid-bold">Name of Owner ( MED.TECH )</h1>
            </div>
            <div className=" d-flex justify-content-center w-25">
              <div
                className={`result-header-logo border ${
                  darkMode ? " border-white" : "border-black"
                }`}
              >
                <img
                  className="img-fluid rounded "
                  alt="Logo Img"
                  src="../images/logo.png"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 my-2">
          <div className={`row alert alert-info text-black px-1 py-0`}>
            <div
              className={`col-6 d-flex align-items-center detailes-size m-0 my-1 p-0`}
            >
              {" "}
              City-Details-More details
            </div>
            <div
              className={`col-6 text-center colorMain d-flex justify-content-end detailes-size m-0 my-1 p-0`}
            >
              Licensed and approved by The Palestinian Ministry of Health No:
              nnn/nnn/ r l{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
