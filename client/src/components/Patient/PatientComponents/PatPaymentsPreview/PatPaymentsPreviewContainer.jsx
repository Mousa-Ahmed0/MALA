import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDarkMode } from "../../../../context/DarkModeContext";
import { getPateinrPayments } from "../../../../apis/ApisHandale";
import { Link } from "react-router-dom";
import BackBtn from "../../../BackBtn";

import FormateDate from "../../../FormateDate";
import PaymentToPDF from "../../../PaymentToPDF";

export default function PatPaymentsPreviewContainer({ setIsPdfLoading }) {
  const patientIdent = useParams("ident").ident;
  const { darkMode } = useDarkMode();
  const [allPayments, setallPayments] = useState([]);
  const [visiblePayments, setvisiblePayments] = useState([]);
  //Search
  let [val, setVal] = useState(""); //search value
  let [searchResults, setSearchResults] = useState([]);
  //...
  const [noResults, setNoResults] = useState(false);
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

  //get patient results
  async function getPayments() {
    try {
      let response = await getPateinrPayments({ identPatient: patientIdent });
      setallPayments(response.data.paumentArray);
      console.log(response.data);
      setvisiblePayments(response.data.paumentArray);
      if (response.data.paumentArray.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      setResultError(true);
      console.error("Error From getPayments - patienthome: ", error);
    }
  }
  //displayPayments
  function displayPayments() {
    return visiblePayments.map((p, index) => {
      return (
        <div key={index} className="col-lg-12">
          <div
            className={`card mb-4 border-0 px-3 ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            <div className={`card-body`}>
              <div className="row">
                <div className="col-1 col-md-1 d-flex align-items-center p-0">
                  <p className="mb-0 text-truncate">{index + 1}:</p>
                </div>
                <div className="col-6 col-md-2 d-flex align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {<FormateDate date={p.date} />}
                  </p>
                </div>
                <div className="col-6 col-md-6 d-flex align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {p.payment.value}
                    <span style={{ fontSize: "0.758rem" }}>NIS</span>
                  </p>
                </div>

                <div className="col-12 col-md-3 d-flex flex-row-reverse flex-md-row align-items-center">
                  <div className="col-6 col-md-12 ">
                    <div className="row">
                      <div className="col-6 col-md-7 d-flex align-items-center">
                        <Link
                          style={{ cursor: "pointer" }}
                          className="position-relative nav-link mb-0 text-truncate"
                          to={`/ResultDetails/${p.payment.id}`}
                        >
                          More Details
                        </Link>
                      </div>
                      <div className="col-6 col-md-1 d-flex justify-content-end align-items-center">
                        <PaymentToPDF
                          darkMode={darkMode}
                          setIsPdfLoading={setIsPdfLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      );
    });
  }

  /** ====================== Search Section ====================== **/
  //reset
  function clearResults() {
    setvisiblePayments(allPayments);
  }

  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  /* async function searchForAResult() {
    if (val.trim() === "") {
      return;
    } else {
      const srchResultsArray = allPayments.filter((result) =>
        result.usersDoctor
          ? (result.usersDoctor.fname + result.usersDoctor.lastname)
              .toLowerCase()
              .includes(val.toLowerCase())
          : result.detailsAnalyze.doctorName
              .toLowerCase()
              .includes(val.toLowerCase())
      );
      if (srchResultsArray.length === 0) {
        setvisiblePayments([]);
        setNoResults(true);
      } else {
        setvisiblePayments(srchResultsArray);
      }
    }
  }*/

  useEffect(() => {
    getPayments();
  }, []);
  /*useEffect(() => {
    searchForAResult();
  }, [val]);*/
  return (
    <>
      <div className="ST-section  p-0">
        <div className="my-4">
          {" "}
          <BackBtn />
        </div>
        <div className="container">
          <div className="row searchSection mb-5"></div>
          <section className="px-4">
            <div className="row my-0 d-none d-md-block">
              <div className="col-lg-12">
                <div className="card border-0 bg-transparent">
                  <div className="card-body">
                    <div className="row">
                      <div
                        className={`col-md-1 text-truncate text-muted p-0 ${
                          darkMode ? " dark-theme" : ""
                        }`}
                      >
                        Result #:
                      </div>
                      <div
                        className={`col-md-2 text-truncate text-muted p-0 ${
                          darkMode ? " dark-theme" : ""
                        }`}
                      >
                        Paiymnet Date:
                      </div>
                      <div
                        className={`col-md-6 text-truncate text-muted p-0 ${
                          darkMode ? " dark-theme" : ""
                        }`}
                      >
                        Paid Value:
                      </div>
                      <div
                        className={`col-md-3 text-truncate text-muted p-0 ${
                          darkMode ? " dark-theme" : ""
                        }`}
                      >
                        More Options:
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ">
              {Array.isArray(visiblePayments) && visiblePayments.length > 0 ? (
                displayPayments()
              ) : resultError ? (
                apiErrorMessage
              ) : noResults ? (
                <div className="my-4 mid-bold">No results Found.</div>
              ) : (
                <div className="d-flex justify-content-center align-items-center my-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>{" "}
    </>
  );
}
