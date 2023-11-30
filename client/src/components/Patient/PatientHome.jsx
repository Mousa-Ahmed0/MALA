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
            <div className="maxHeight-inhert overflow-yAxis"></div>
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
            <div className="maxHeight-inhert overflow-yAxis"></div>
            <div className="d-flex justify-content-end mt-4">
              <Link className="btn btn-primary">All Payments</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
