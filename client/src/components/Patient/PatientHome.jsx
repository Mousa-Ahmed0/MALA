import React, { useState, useEffect } from "react";
import DashboardWelcome from "../DashboardWelcome";

import { useDarkMode } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";
import { getResultByID } from "../../apis/ApisHandale";
export default function PatientHome({ user }) {
  const { darkMode } = useDarkMode();
  const [allResults, setAllResults] = useState([]);
  const [resultError, setResultError] = useState(false);
  let apiErrorMessage = (
    <div class="w-100 h-100 d-flex flex-column align-items-center">
      <div class="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
        Error!!!
      </div>
      <div class="my-4 mid-bold">
        Theres a proplem! Please wait for us to solve the proplem.
      </div>
    </div>
  );
  async function getResults() {
    try {
      let response = await getResultByID(user.id);
      console.log(user.id);
    } catch (error) {
      setResultError(true);
      console.error("Error From getResults - patienthome: ", error);
    }
  }

  /////////
  useEffect(() => {
    getResults();
  }, []);
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
            {allResults.length !== 0 ? (
              <>
                <h1 className="h5">
                  <span>
                    <i class="fa-solid fa-droplet"></i>
                  </span>{" "}
                  Last Results:
                </h1>
                <hr className="my-4" />
                <div className="row details-size mt-2 mb-4">
                  <div className="col-md-3 mid-bold">A. Date:</div>
                  <div className="col-md-6 mid-bold">Doctor:</div>
                  <div className="col-md-3 mid-bold">More:</div>
                </div>
                <div className="maxHeight-inhert overflow-yAxis ">
                  <div className="row detailes-size d-flex align-items-center">
                    <div className="col-3 d-flex align-items-center text-truncate">
                      08/11/2023
                    </div>
                    <div className="col-6 d-flex align-items-center">
                      Dr. {"Docror One"}
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
              </>
            ) : resultError ? (
              apiErrorMessage
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
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
              <div className="col-md-3 mid-bold">P. Date:</div>
              <div className="col-md-6 mid-bold">Paid Value:</div>
              <div className="col-md-3 mid-bold">More:</div>
            </div>
            <div className="row maxHeight-inhert overflow-yAxis detailes-size">
              <div className="col-3 d-flex align-items-center text-truncate">
                08/11/2023
              </div>
              <div className="col-6 d-flex align-items-center">
                235<span style={{ fontSize: "0.758rem" }}>NIS</span>
              </div>
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
        <hr />
        <div className="row maxHeight-part">
          <div
            className={`p-4 col-12 my-4 maxHeight-inhert overflow-hidden ${
              darkMode ? " spic-dark-mode" : " bg-white"
            }`}
          >
            <h1 className="h5">
              <span>
                <i class="fa-solid fa-bullhorn"></i>
              </span>{" "}
              Notice Board:
            </h1>
            <hr className="my-4" />
            <div className="row details-size mt-2 mb-4">
              <div className="col-md-3 mid-bold">Title:</div>
              <div className="col-md-6 mid-bold">Date:</div>
              <div className="col-md-3 mid-bold">More:</div>
            </div>
            <div className="maxHeight-inhert overflow-yAxis ">
              <div className="row detailes-size d-flex align-items-center">
                <div className="col-3 d-flex align-items-center text-truncate">
                  Some Important Thing you need to know!
                </div>
                <div className="col-6 d-flex align-items-center">
                  04/12/2023
                </div>
                <div className="col-3 d-flex align-items-center">
                  <Link className="btn m-0 nav-link position-relative">
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
