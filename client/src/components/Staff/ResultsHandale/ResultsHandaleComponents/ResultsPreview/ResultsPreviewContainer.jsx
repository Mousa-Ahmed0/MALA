import ResultsPreviewPresintation from "./ResultsPreviewPresintation";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDarkMode } from "../../../../../context/DarkModeContext";
import { getAllResults } from "../../../../../apis/ApisHandale";

export default function AddResult({ setIsFormOpen }) {
  const { darkMode } = useDarkMode();

  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [allResults, setAllResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  //search & filter variables
  let [val, setVal] = useState(""); //search value
  let [filterOption, setFilterOption] = useState("noValue");
  let [searchResults, setSearchResults] = useState([]);
  const filterOptions = ["noValue", "Staff", "Patient", "Doctor"];
  //Errors variables
  let [apiError, setApiError] = useState(false);
  let [apiMessage, setApiMessage] = useState("");
  let [noResults, setNoResults] = useState(false);
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

  /* *************** Handale Pop Forms *************** */
  //update form open
  function handaleUpdateFormOpen(a) {
    setIsFormOpen(true);
    setIsUpdateFormOpen(true);
  }

  function closeUpdateForm() {
    setIsFormOpen(false);
    setIsUpdateFormOpen(false);
  }
  //get all results
  async function getResults() {
    try {
      let response = await getAllResults();
      setAllResults(response.data.usersArray);
      setVisibleResults(response.data.usersArray);
    } catch (error) {
      console.error("Error From getResults: ", error);
      setApiError(error.data.message);
    }
  }

  //display visible Results
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
                <div className="col-sm-12 col-md-1 d-flex align-items-center p-0">
                  <p className="mb-0 text-truncate">{index + 1}:</p>
                </div>
                <div className="col-5 col-sm-4 col-md-2 d-flex  justify-content-md-start align-items-center p-0">
                  {result.usersPatient
                    ? result.usersPatient.firstname +
                      " " +
                      result.usersPatient.lastname
                    : "Not Found"}
                </div>
                <div className="col-sm-12 col-md-2 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {" "}
                    {result.usersPatient
                      ? result.usersPatient.sex
                      : "Not Found"}
                  </p>
                </div>
                <div className="col-sm-12 col-md-3 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {result.usersDoctor
                      ? result.usersDoctor.firstname +
                        " " +
                        result.usersDoctor.lastname
                      : "Not Found"}
                  </p>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {result.detailsAnalyze.resultSet.length}
                  </p>
                </div>

                <div className="col-5 col-md-3 d-flex flex-row-reverse flex-md-row align-items-center">
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
                      <div className="col-6 col-md-5 d-flex align-items-center">
                        <button
                          onClick={() => handaleUpdateFormOpen(result)}
                          className="delete-btn btn d-flex justify-content-center align-items-center"
                        >
                          {" "}
                          <i
                            className={`fas fa-edit mb-0 text-truncate ${
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

  /** ====================== filter Section ====================== **/
  function clearResults() {}

  function handaleFilterOption(option) {}

  /** ====================== Search Section ====================== **/
  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  async function searchForAResult() {
    if (val.trim() === "") {
      return;
    }
  }
  /** ====================== Delete Section ====================== **/
  async function deleteUser(id) {}
  //initial rendring
  useEffect(() => {
    // Fetch Results when the component mounts
    getResults();
  }, []);

  useEffect(() => {
    // Filter and display users when the filter option or data changes
    handaleFilterOption(filterOption);
  }, [filterOption, searchResults]);

  useEffect(() => {
    // Search for users when the search value changes
    searchForAResult();
  }, [val]);
  useEffect(() => {
    // Search for users when the search value changes
    console.log("allResults", allResults);
  }, [allResults]);

  return (
    <>
      <ResultsPreviewPresintation
        darkMode={darkMode}
        apiMessage={apiMessage}
        apiError={apiError}
        noResults={noResults}
        apiErrorMessage={apiErrorMessage}
        val={val}
        setVal={setVal}
        setFilterOption={setFilterOption}
        filterOptions={filterOptions}
        clearResults={clearResults}
        handaleFilterOption={handaleFilterOption}
        handaleSearchVlue={handaleSearchVlue}
        searchForAResult={searchForAResult}
        deleteUser={deleteUser}
        displayResults={displayResults}
        visibleResults={visibleResults}
      />
    </>
  );
}
