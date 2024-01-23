import { UnpreparedSamplesPresintation } from "../../../../../../componentsLoader/ComponentsLoader";
import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";

import { useDarkMode } from "../../../../../../context/DarkModeContext";
import { getSamples } from "../../../../../../apis/ApisHandale";

export default function ResultsPreviewContainer({}) {
  const { darkMode } = useDarkMode();

  const [allResults, setAllResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  //search & filter variables
  let [val, setVal] = useState(""); //search value
  let [filterOption, setFilterOption] = useState("Patient");
  const filterOptions = ["Patient", "Doctor"];
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
  const [pageNo, setPageNo] = useState(1);
  const [usersCount, setUsersCount] = useState();
  const [loader, setLoader] = useState(false);

  //get all results
  async function getResults() {
    setLoader(true);
    try {
      let response = await getSamples(false, pageNo);
      //  console.log(response);
      setAllResults(response.data.usersArray);
      setVisibleResults(response.data.usersArray);
      setUsersCount(response.data.count);
      if (!response) {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error From getResults: ", error);
      //setApiError(true);
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
                      ? result.usersDoctor.firstname
                        ? result.usersDoctor.firstname +
                          " " +
                          result.usersDoctor.lastname
                        : result.isDone.doctorName
                      : "Not Found"}
                  </p>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {result.isDone.resultSet.length}
                  </p>
                </div>

                <div className="col-5 col-md-3 d-flex flex-row-reverse flex-md-row align-items-center">
                  <div className="col-6 col-md-12 ">
                    <div className="row">
                      <div className="col-6 col-md-7 d-flex justify-content-end align-items-center">
                        {result.isDone.isDone ? (
                          <Link
                            style={{ cursor: "pointer" }}
                            className="position-relative nav-link mb-0 text-truncate"
                            to={`/ResultDetails/${result.isDone.id}`}
                          >
                            Result Details
                          </Link>
                        ) : (
                          "Not Ready!"
                        )}
                      </div>
                      <div className="col-6 col-md-5 d-flex justify-content-end align-items-center">
                        <Link
                          to={`/Staff/ResultsController/EditResult/${result.isDone.id}`}
                          onClick={() => {}}
                          className="normal-btn btn d-flex justify-content-center align-items-center"
                        >
                          {" "}
                          <i
                            className={`fas fa-edit mb-0 text-truncate ${
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
    setVal("");
  }

  function handaleFilterOption(option) {
    clearResults();
    setFilterOption(option);
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
      //  console.log("search out");
      return;
    } else {
      //   console.log("search in");
      if (
        filterOption === "noValue" ||
        filterOption === "Patient" // patient search filter
      ) {
        let srchResultsArray = [];
        allResults.map((res, index) => {
          //     console.log(res);
          if (
            (
              res.usersPatient?.firstname?.toLowerCase() +
              " " +
              res.usersPatient?.lastname?.toLowerCase()
            ).includes(val)
          ) {
            srchResultsArray.push(res);
          }
        });
        if (srchResultsArray.length === 0) {
          setNoResults(true);
          setVisibleResults([]);
        } else {
          setVisibleResults(srchResultsArray);
        }
      } else if (filterOption === "Doctor") {
        let srchResultsArray = [];

        for (const res of allResults) {
          // console.log(res);

          const fullName = res.usersDoctor?.firstname
            ? res.usersDoctor?.firstname?.toLowerCase() +
              " " +
              res.usersDoctor?.lastname?.toLowerCase()
            : res.usersDoctor?.toLowerCase();
          const matches = fullName && fullName.includes(val);
          if (matches) {
            srchResultsArray.push(res);
          }
        }
        if (srchResultsArray.length === 0) {
          setNoResults(true);
          setVisibleResults([]);
        } else {
          setVisibleResults(srchResultsArray);
        }
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
    // Search for users when the search value changes
    searchForAResult();
  }, [val]);
  useEffect(() => {
    getResults();
  }, [pageNo]);
  // useEffect(() => {
  //   console.log("allResults", allResults);
  // }, [allResults]);

  return (
    <>
      {" "}
      <Suspense
        fallback={
          <div className="center-container">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <UnpreparedSamplesPresintation
          darkMode={darkMode}
          apiMessage={apiMessage}
          apiError={apiError}
          noResults={noResults}
          apiErrorMessage={apiErrorMessage}
          val={val}
          setVal={setVal}
          setFilterOption={setFilterOption}
          filterOptions={filterOptions}
          filterOption={filterOption}
          clearResults={clearResults}
          handaleFilterOption={handaleFilterOption}
          handaleSearchVlue={handaleSearchVlue}
          searchForAResult={searchForAResult}
          deleteUser={deleteUser}
          displayResults={displayResults}
          visibleResults={visibleResults}
          setPageNo={setPageNo}
          pageNo={pageNo}
          usersCount={usersCount}
          loader={loader}
        />{" "}
      </Suspense>
    </>
  );
}
