import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";

import { useDarkMode } from "../../../../../context/DarkModeContext";
import { getUnPaidSamples } from "../../../../../apis/ApisHandale";
import { NotPaidResultsPresintation } from "../../../../../componentsLoader/ComponentsLoader";

export default function NotPaidResultsContainer({}) {
  const { darkMode } = useDarkMode();

  const [allResults, setAllResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  //search & filter variables
  let [val, setVal] = useState(""); //search value
  let [filterOption, setFilterOption] = useState("noValue");
  const filterOptions = ["noValue", "Patient", "Doctor"];
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
  const [loader, setLoader] = useState(false);

  //get all results
  async function getResults() {
    setLoader(true);
    try {
      let response = await getUnPaidSamples();
      console.log(response);
      setAllResults(response.data.usersArray);
      setVisibleResults(response.data.usersArray);
    } catch (error) {
      console.error("Error From getResults: ", error);
      //setApiError(error.data.message);
      setNoResults(true);
    }
    setLoader(false);
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
                      ? result.usersDoctor.length > 0
                        ? result.usersDoctor
                        : result.usersDoctor.firstname +
                          " " +
                          result.usersDoctor.lastname
                      : "Not Found"}
                  </p>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {result.isPaied.resultSet.length}
                  </p>
                </div>

                <div className="col-5 col-md-3 d-flex flex-row-reverse flex-md-row align-items-center">
                  <div className="col-6 col-md-12 ">
                    <div className="row">
                      <div className="col-6 col-md-7 d-flex justify-content-end align-items-center">
                        {result.isPaied.isDone ? (
                          <Link
                            style={{ cursor: "pointer" }}
                            className="position-relative nav-link mb-0 text-truncate"
                            to={`/ResultDetails/${result.isPaied.id}`}
                          >
                            Result Details
                          </Link>
                        ) : (
                          "Not Ready!"
                        )}
                      </div>
                      <div className="col-6 col-md-5 d-flex justify-content-end align-items-center">
                        <Link
                          to={`/AddAPayment/${result.isPaied.id}`}
                          onClick={() => {}}
                          className="normal-btn btn d-flex justify-content-center align-items-center"
                        >
                          {" "}
                          <i
                            className={`fas fa-money-bill mb-0 text-truncate ${
                              darkMode ? " dark-theme" : ""
                            }`}
                          ></i>
                        </Link>
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
  function clearResults() {
    setVisibleResults(allResults);
  }

  function handaleFilterOption(option) {
    setFilterOption(option);
    clearResults();
  }

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
    } else {
      if (filterOption === "Doctor") {
        let srchResultsArray = [];

        for (const res of allResults) {
          //      console.log(res);

          const fullName = res.usersDoctor
            ? res.usersDoctor.firstname
              ? res.usersDoctor?.firstname?.toLowerCase() +
                " " +
                res.usersDoctor?.lastname?.toLowerCase()
              : res.usersDoctor?.toLowerCase()
            : false;
          const matches = fullName && fullName.includes(val);
          if (matches) {
            srchResultsArray.push(res);
          }
        }
        setVisibleResults(srchResultsArray);
      } else {
        let srchResultsArray = allResults.filter((r) =>
          r.usersPatient
            ? (
                r.usersPatient?.firstname?.toLowerCase() +
                " " +
                r.usersPatient?.lastname?.toLowerCase()
              ).includes(val)
            : false
        );

        setVisibleResults(srchResultsArray);
      }
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
  }, [filterOption]);

  useEffect(() => {
    // Search for users when the search value changes
    searchForAResult();
  }, [val, filterOption]);
  // useEffect(() => {
  //   console.log("allResults", allResults);
  // }, [allResults]);

  return (
    <>
      <Suspense
        fallback={
          <div className="center-container">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <NotPaidResultsPresintation
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
          filterOption={filterOption}
          loader={loader}
        />
      </Suspense>
    </>
  );
}
