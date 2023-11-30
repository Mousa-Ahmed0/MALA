import React, { useState, useEffect } from "react";
import DashboardWelcome from "../DashboardWelcome";

import { useDarkMode } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";
export default function PatientHome({ user }) {
  const { darkMode } = useDarkMode();
  return (
    <>
      <div className="ST-section">
        <DashboardWelcome user={user} />
        <hr />
        <div className="row maxHeight-part">
          <div
            className={`p-4 col-12 col-md-6 my-4 maxHeight-inhert overflow-hidden ${
              darkMode ? " spic-dark-mode" : " bg-white"
            }`}
          >
            <h1 className="h5">
              <span>
                <i class="fa-solid fa-droplet"></i>
              </span>{" "}
              Last Results:
            </h1>
            <hr className="my-4" />
            <div className="row details-size mt-2 mb-4">
              <div className="col-md-5 mid-bold">A. Name:</div>
              <div className="col-md-4 mid-bold">A. Date:</div>
              <div className="col-md-3 mid-bold">More:</div>
            </div>
            <div className="maxHeight-inhert overflow-yAxis ">
              <div className="row detailes-size d-flex align-items-center">
                <div className="col-5 d-flex align-items-center text-truncate">
                  Complete Blood Count( CBC )
                </div>
                <div className="col-4 d-flex align-items-center">
                  08/11/2023
                </div>
                <div className="col-3 d-flex align-items-center">
                  <Link className="btn m-0 nav-link position-relative">
                    More Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Link className="btn btn-primary">All Results</Link>
            </div>
          </div>
          <div className="col-12 col-md-1"></div>
          <div
            className={`p-4 col-12 col-md-5 my-4 maxHeight-inhert overflow-hidden ${
              darkMode ? " spic-dark-mode" : " bg-white"
            }`}
          >
            <h1 className="h5">
              <span>
                <i class="fa-solid fa-file-invoice-dollar"></i>
              </span>{" "}
              Last Payments:
            </h1>
            <hr className="my-4" />
            <div className="row details-size  mt-2 mb-4">
              <div className="col-md-5 mid-bold">A. Name:</div>
              <div className="col-md-2 mid-bold">P. Date:</div>
              <div className="col-md-2 mid-bold">Value:</div>
              <div className="col-md-3 mid-bold">More:</div>
            </div>
            <div className="row maxHeight-inhert overflow-yAxis">
              <div className="col-5 d-flex align-items-center text-truncate">
                Complete Blood Count( CBC )
              </div>
              <div className="col-2 d-flex align-items-center">08/11/2023</div>
              <div className="col-2 d-flex align-items-center">235</div>
              <div className="col-3 d-flex align-items-center">
                <Link className="btn m-0 nav-link position-relative">
                  More Details
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Link className="btn btn-primary">All Payments</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
