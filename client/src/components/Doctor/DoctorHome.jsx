import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { formatDateWithouHour } from "../../methods/FormateDate";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  DashboardWelcome,
  AdsSection,
} from "../../componentsLoader/ComponentsLoader";

export default function DoctorHome({ user, setActiveId }) {
  const { darkMode } = useDarkMode();
  const [allResults, setAllResults] = useState([]);
  const [loader, setLoader] = useState(false);
  const [resultError, setResultError] = useState(false);
  let apiErrorMessage = (
    <div className="w-100 h-100 d-flex flex-column align-items-center">
      <div className="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
        Error!!!
      </div>
      <div className="my-4 mid-bold">
        Theres a proplem! Please wait for us to solve the proplem.
      </div>
    </div>
  );

  //get patient results
  async function getResults() {
    setLoader(true);
    try {
      let response = await axios.get(
        `http://localhost:5000/api/result/getDoctorAnzlyze?doctorIdent=${user.ident}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      //  console.log("Results", response);
      setAllResults(response.data.usersArray.reverse());
      setResultError(false);
    } catch (error) {
      if (error.response.status === 404) {
        setAllResults([]);
      } else {
        console.error("Error From getResults - doctor Home: ", error);
        setResultError(true);
      }
    }
    setLoader(false);
  }

  //display patient results
  function displayResults() {
    return allResults.map((result, index) => {
      // console.log(result);
      return (
        <>
          <div
            key={index}
            className="row detailes-size d-flex align-items-center my-4"
          >
            <div className="col-2 d-flex align-items-center text-truncate">
              {formatDateWithouHour(result.detailsAnalyze.date)}
            </div>
            <div className="col-7 d-flex align-items-center">
              <Link
                to={`/profile/${result.usersPatient?._id}`}
                className="btn m-0 nav-link position-relative"
              >
                {result.usersPatient
                  ? result.usersPatient.firstname +
                    " " +
                    result.usersPatient.lastname
                  : "Not Found"}
              </Link>
            </div>
            <div className="col-3 d-flex justify-content-center align-items-center">
              <Link
                to={`/ResultDetails/${result.detailsAnalyze.id}`}
                className="btn m-0 nav-link position-relative"
              >
                <i className="fa-solid fa-eye"></i>
              </Link>
            </div>
          </div>
        </>
      );
    });
  }

  ///////
  useEffect(() => {
    setActiveId(1);
    getResults();
  }, []);
  return (
    <>
      <div className="ST-section">
        <Suspense
          fallback={
            <div className="center-container">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        >
          <DashboardWelcome user={user} />
        </Suspense>{" "}
        <hr />
        <div className="row">
          <div
            className={`p-4 col-12 my-4 maxHeight-inhert overflow-hidden  ${
              darkMode ? " spic-dark-mode" : " bg-white"
            }`}
          >
            <h1 className="h5">
              <span>
                <i className="fa-solid fa-droplet"></i>
              </span>{" "}
              Last Results:
            </h1>
            <hr className="my-4" />
            <div className="row details-size  my-3">
              <div className="col-md-2 mid-bold">A. Date:</div>
              <div className="col-md-7 mid-bold">Patient Name:</div>
              <div className="col-md-3 mid-bold d-flex justify-content-center">
                More:
              </div>
            </div>
            <div className=" overflow-yAxis  maxHeight-part">
              {loader ? (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : allResults.length !== 0 ? (
                displayResults()
              ) : resultError ? (
                apiErrorMessage
              ) : (
                <div>No Results Found.</div>
              )}
            </div>
            <hr className="my-4" />
            <div className="d-flex justify-content-end mt-4">
              <Link
                to={`/Doctor/AllDoctorResults/${user.ident}`}
                className="btn btn-primary"
              >
                All Results
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="row ">
          <Suspense
            fallback={
              <div className="center-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            <AdsSection darkMode={darkMode} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
