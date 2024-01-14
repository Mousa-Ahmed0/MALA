import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";

import {
  DashboardWelcome,
  AdsSection,
} from "../../componentsLoader/ComponentsLoader";

import { formatDateWithouHour } from "../../methods/FormateDate";
import { useDarkMode } from "../../context/DarkModeContext";
import { getPateinrPayments, getPateinrResults } from "../../apis/ApisHandale";
import PaymentToPDF from "../PaymentToPDF";

export default function PatientHome({ user, setIsPdfLoading }) {
  const { darkMode } = useDarkMode();
  const [allResults, setAllResults] = useState([]);
  const [resultError, setResultError] = useState(false);
  const [allPayments, setAllPayments] = useState([]);
  const [paymentError, setPaymentError] = useState(false);
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
  const [noPayments, setNoPayments] = useState(false);

  //get patient results
  async function getResults() {
    try {
      let response = await getPateinrResults({ patientIdent: user.ident });
      setAllResults(response.data.usersArray);
      //console.log("Results", response);
      setResultError(false);
    } catch (error) {
      setResultError(true);
      console.error("Error From getResults - patienthome: ", error);
    }
  }

  //display patient results
  function displayResults() {
    return allResults.map((result, index) => {
      return (
        <>
          <div
            key={index}
            className="row detailes-size d-flex align-items-center my-4"
          >
            <div className="col-3 d-flex align-items-center text-truncate">
              {formatDateWithouHour(result.detailsAnalyze.date)}
            </div>
            <div className="col-6 d-flex align-items-center">
              {result.detailsAnalyze.doctorName.length > 0
                ? result.detailsAnalyze.doctorName
                : result.usersDoctor.firstname +
                  " " +
                  result.usersDoctor.lastname}
            </div>
            <div className="col-3 d-flex justify-content-center align-items-center">
              <Link
                to={`/ResultDetails/${result.detailsAnalyze.id}`}
                className="btn m-0 nav-link position-relative"
              >
                <i class="fa-solid fa-eye"></i>
              </Link>
            </div>
          </div>
        </>
      );
    });
  }

  //get patient Payments
  async function getPayments() {
    try {
      let response = await getPateinrPayments({ identPatient: user.ident });
      //console.log("Payments", response);
      if (response.data.paumentArray.length > 0)
        setAllPayments(response.data.paumentArray);
      else setNoPayments(true);
      setPaymentError(false);
    } catch (error) {
      setPaymentError(true);
      console.error("Error From getResults - patienthome: ", error);
    }
  }

  //display patient results
  function displayPayments() {
    return allPayments.map((p, index) => {
      return (
        <>
          <div key={index} className="row overflow-yAxis detailes-size my-4">
            <div className="col-3 d-flex align-items-center text-truncate">
              {formatDateWithouHour(p.date)}
            </div>
            <div className="col-5 d-flex align-items-center">
              {p.payment.paiedvalue}
              <span style={{ fontSize: "0.758rem" }}>NIS</span>
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center gap-4">
              <PaymentToPDF
                paymentDetails={p}
                darkMode={darkMode}
                setIsPdfLoading={setIsPdfLoading}
              />
            </div>
          </div>
        </>
      );
    });
  }

  /////////
  useEffect(() => {
    getResults();
    getPayments();
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
        </Suspense>
        <hr />
        <div className="row">
          <div
            className={`p-4 col-12 col-md-6 my-4 maxHeight-inhert overflow-hidden  ${
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
            <div className="row details-size  mt-2 mb-4">
              <div className="col-md-3 mid-bold">A. Date:</div>
              <div className="col-md-6 mid-bold">Doctor:</div>
              <div className="col-md-3 mid-bold d-flex justify-content-center">
                More:
              </div>
            </div>
            <div className=" overflow-yAxis  maxHeight-part">
              {allResults.length !== 0 ? (
                displayResults()
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
            <hr className="my-4" />
            <div className="d-flex justify-content-end mt-4">
              <Link
                to={`/Patient/ResultsPreview/${user.ident}`}
                className="btn btn-primary"
              >
                All Results
              </Link>
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
              <div className="col-md-3 mid-bold">P. Date:</div>
              <div className="col-md-6 mid-bold">Paid Value:</div>
              <div className="col-md-3 mid-bold ">More:</div>
            </div>
            <div className=" overflow-yAxis  maxHeight-part">
              {allPayments.length !== 0 ? (
                displayPayments()
              ) : paymentError ? (
                apiErrorMessage
              ) : noPayments ? (
                <div>No Payments Found.</div>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>

            <hr className="my-4" />
            <div className="d-flex justify-content-end mt-4">
              <Link
                to={`/Patient/PaymentsReview/${user.ident}`}
                className="btn btn-primary"
              >
                All Payments
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
