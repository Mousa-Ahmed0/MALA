import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDarkMode } from "../../../../context/DarkModeContext";
import { getPateinrResults } from "../../../../apis/ApisHandale";
import { Link } from "react-router-dom";
import BackBtn from "../../../BackBtn";
import SearchBar from "../../../SearchBar/SearchBar";
import { formatDateWithouHour } from "../../../../methods/FormateDate";

export default function PatResultsPreviewContainer() {
  const patientIdent = useParams("ident").ident;
  const { darkMode } = useDarkMode();
  const [allResults, setAllResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
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
  async function getResults() {
    try {
      let response = await getPateinrResults({ patientIdent: patientIdent });
      setAllResults(response.data.usersArray);
      setVisibleResults(response.data.usersArray);
      if (response.data.usersArray.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      setResultError(true);
      console.error("Error From getResults - patienthome: ", error);
    }
  }
  //displayResults
  function displayResults() {
    return visibleResults.map((result, index) => {
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
                    {formatDateWithouHour(result.detailsAnalyze.date)}
                  </p>
                </div>
                <div className="col-5 col-md-2 justify-content-end justify-content-md-start d-flex align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {result.detailsAnalyze.doctorName.length > 0
                      ? result.detailsAnalyze.doctorName
                      : result.usersDoctor.firstname +
                        " " +
                        result.usersDoctor.lastname}
                  </p>
                </div>
                <div className="col-12 col-md-4 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {result.detailsAnalyze.resultSet.length}
                  </p>
                </div>

                <div className="col-12 col-md-3 d-flex flex-row-reverse flex-md-row align-items-center">
                  <div className="col-6 col-md-12 ">
                    <div className="row">
                      <div className="col-6 col-md-7 d-flex align-items-center">
                        <Link
                          style={{ cursor: "pointer" }}
                          className="position-relative nav-link mb-0 text-truncate"
                          to={`/ResultDetails/${result.detailsAnalyze.id}`}
                        >
                          Result Details
                        </Link>
                      </div>
                      <div className="col-6 col-md-1 d-flex justify-content-end align-items-center">
                        <button className="delete-btn btn d-flex justify-content-center align-items-center">
                          {" "}
                          <i
                            className={`fas fa-download mb-0 text-truncate ${
                              darkMode ? " dark-theme" : ""
                            }`}
                          ></i>
                        </button>
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
    setVisibleResults(allResults);
  }

  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  async function searchForAResult() {
    if (val.trim() === "") {
      return;
    } else {
      const srchResultsArray = allResults.filter((result) =>
        result.usersDoctor
          ? (result.usersDoctor.firstname + " " + result.usersDoctor.lastname)
              .toLowerCase()
              .includes(val.toLowerCase())
          : result.detailsAnalyze.doctorName
              .toLowerCase()
              .includes(val.toLowerCase())
      );
      if (srchResultsArray.length === 0) {
        setVisibleResults([]);
        setNoResults(true);
      } else {
        setVisibleResults(srchResultsArray);
      }
    }
  }
  useEffect(() => {
    getResults();
  }, []);
  useEffect(() => {
    console.log(val);
    searchForAResult();
  }, [val]);
  useEffect(() => {
    console.log(visibleResults);
  }, [visibleResults]);
  return (
    <>
      <div className="ST-section  p-0">
        <div className="my-4">
          {" "}
          <BackBtn />
        </div>
        <div className="container">
          <div className="row searchSection mb-5">
            <div className="col-sm-12 col-md-7 d-flex align-items-center p-0">
              <SearchBar
                handaleSearchVlue={handaleSearchVlue}
                placeHolder={"Search for a Doctor .."}
              />
            </div>
          </div>
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
                        Sample Date:
                      </div>
                      <div
                        className={`col-md-2 text-truncate text-muted p-0 ${
                          darkMode ? " dark-theme" : ""
                        }`}
                      >
                        Doctor:
                      </div>
                      <div
                        className={`col-md-4 text-truncate text-muted p-0 ${
                          darkMode ? " dark-theme" : ""
                        }`}
                      >
                        Analysis No.:
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
              {Array.isArray(visibleResults) && visibleResults.length > 0 ? (
                displayResults()
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
