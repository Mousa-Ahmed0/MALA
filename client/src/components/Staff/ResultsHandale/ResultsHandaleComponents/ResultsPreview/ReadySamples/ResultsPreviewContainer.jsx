import ResultsPreviewPresintation from "./ResultsPreviewPresintation";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDarkMode } from "../../../../../../context/DarkModeContext";
import {
  getAllResults,
  getResultsFiltered,
  getResultsFromTo,
  getSamples,
} from "../../../../../../apis/ApisHandale";
import { formatDateYYMMDD } from "../../../../../../methods/FormateDate";

export default function ResultsPreviewContainer({}) {
  const { darkMode } = useDarkMode();

  const [allResults, setAllResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  //search & filter variables
  const [isCustomeDate, setIsCustomeDate] = useState(false);
  let [val, setVal] = useState(""); //search value
  let [filterOption, setFilterOption] = useState("noValue");
  let [srchFilterOption, setSrchFilterOption] = useState("Patient");
  let [fillterdResults, setfillterdResults] = useState([]);
  const filterOptions = [
    "noValue",
    "Last Week",
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
  ];
  const srchFilterOptions = ["Patient", "Doctor"];
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

  //get all results
  async function getResults() {
    try {
      let response = await getSamples(true, pageNo);
      console.log("response from gg", response);
      setAllResults(response.data.usersArray);
      setVisibleResults(response.data.usersArray);
      setUsersCount(response.data.count);
    } catch (error) {
      console.error("Error From getResults: ", error);
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
                        <button
                          onClick={() => {}}
                          className="delete-btn btn d-flex justify-content-center align-items-center"
                        >
                          {" "}
                          <i
                            className={`fas fa-trash mb-0 text-truncate ${
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
  const endDate = new Date(); // current date
  const startDate = new Date(endDate); // start date "Before 3 Years for initial"
  startDate.setFullYear(endDate.getFullYear() - 3);

  // Data Range Variable
  const [dateRange, setDateRange] = useState({
    firstDate: formatDateYYMMDD(startDate),
    secondtDate: formatDateYYMMDD(endDate),
  });

  // save new data range
  function handaleDataRangeChange(e) {
    const newDataRange = { ...dateRange };
    newDataRange[e.target.name] = e.target.value;
    setDateRange(newDataRange);
  }

  //filter based on data range
  async function filterByDataRange() {
    try {
      let response = await getResultsFromTo(dateRange, pageNo);
      console.log("response from range", response);
      if (response.data.usersArray) {
        setfillterdResults(response.data.usersArray);
        setVisibleResults(response.data.usersArray);
      } else {
        setNoResults(true);
        setfillterdResults([]);
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  //reset filter option, "reset Visible & filtered payments array"
  function clearResults() {
    if (
      filterOption === "noValue" ||
      fillterdResults.length === 0 ||
      !fillterdResults
    ) {
      setVisibleResults(allResults);
      setfillterdResults([]); // Reset the filtered results
    } else {
      setVisibleResults(fillterdResults);
    }
    setNoResults(false); // Reset the noResults state
    setVal("");
  }

  //handale search value filter - patient or Doctor -
  function searchFilterOption(option) {
    clearResults();
    setSrchFilterOption(option);
  }

  // handale the select filter option
  async function handaleFilterOption(option) {
    setVal("");
    setFilterOption(option);

    switch (option) {
      case "noValue":
        clearResults();
        break;

      case "Last Week":
        try {
          let response = await getResultsFiltered(
            {
              payDate: formatDateYYMMDD(new Date()),
              number: 0,
            },
            pageNo
          );
          console.log("Response from week filter", response);
          if (response.data.usersArray) {
            setfillterdResults(response.data.usersArray);
            setVisibleResults(response.data.usersArray);
            setUsersCount(response.data.count);
          } else {
            setNoResults(true);
            setfillterdResults([]);
          }
        } catch (error) {
          console.error("error", error);
        }
        break;
      case "Last Month":
        try {
          let response = await getResultsFiltered(
            {
              payDate: formatDateYYMMDD(new Date()),
              number: 1,
            },
            pageNo
          );
          console.log(response);
          if (response.data.usersArray) {
            setfillterdResults(response.data.usersArray);
            setVisibleResults(response.data.usersArray);
            setUsersCount(response.data.count);
          } else {
            setNoResults(true);
            setfillterdResults([]);
          }
        } catch (error) {
          console.error("error", error);
        }
        break;
      case "Last 3 Months":
        try {
          let response = await getResultsFiltered(
            {
              payDate: formatDateYYMMDD(new Date()),
              number: 3,
            },
            pageNo
          );

          console.log("Last 3 Months", response);
          if (response.data.usersArray) {
            setfillterdResults(response.data.usersArray);
            setVisibleResults(response.data.usersArray);
            setUsersCount(response.data.count);
          } else {
            setNoResults(true);
            setfillterdResults([]);
          }
        } catch (error) {
          console.error("error", error);
        }
        break;
      case "Last 6 Months":
        try {
          let response = await getResultsFiltered(
            {
              payDate: formatDateYYMMDD(new Date()),
              number: 6,
            },
            pageNo
          );
          if (response.data.usersArray) {
            setfillterdResults(response.data.usersArray);
            setVisibleResults(response.data.usersArray);
            setUsersCount(response.data.count);
          } else {
            setNoResults(true);
            setfillterdResults([]);
          }
        } catch (error) {
          console.error("error", error);
        }
        break;
      case "Last Year":
        try {
          let response = await getResultsFiltered(
            {
              payDate: formatDateYYMMDD(new Date()),
              number: 12,
            },
            pageNo
          );
          if (response.data.usersArray) {
            setfillterdResults(response.data.usersArray);
            setVisibleResults(response.data.usersArray);
            setUsersCount(response.data.count);
          } else {
            setNoResults(true);
            setfillterdResults([]);
          }
        } catch (error) {
          console.error("error", error);
        }
        break;

      default:
        console.log("Error in Option");
    }
  }

  // custome ui based on type of filter
  function hadaleDateFilters() {
    setIsCustomeDate(!isCustomeDate);
    setVisibleResults(allResults);
    setFilterOption("noValue");
    setfillterdResults([]);
    setVal("");
    setDateRange({
      firstDate: "",
      secondtDate: "",
    });
  }

  /** ====================== Search Section ====================== **/
  // get new search bar value
  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
      setVal("");
    }
    setVal(value);
  }

  //search for an payments
  async function searchForAResult() {
    if (val.trim() === "") {
      console.log("search out");
      return;
    } else {
      console.log("search in");
      //custome date range
      if (isCustomeDate) {
        //no filter yet
        // no data ranged selected
        if (fillterdResults.length === 0 || !fillterdResults) {
          // patient search filter
          if (
            srchFilterOption === "noValue" ||
            srchFilterOption === "Patient"
          ) {
            let srchResultsArray = [];
            allResults.map((res, index) => {
              console.log(res);
              if (
                (
                  res.usersPatient.firstname?.toLowerCase() +
                  " " +
                  res.usersPatient.lastname?.toLowerCase()
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
          }
          // Doctor search filter
          else if (srchFilterOption === "Doctor") {
            let srchResultsArray = [];
            for (const res of allResults) {
              console.log(res);
              const fullName = res.usersDoctor.firstname
                ? res.usersDoctor.firstname?.toLowerCase() +
                  " " +
                  res.usersDoctor.lastname?.toLowerCase()
                : res.usersDoctor.toLowerCase();
              const matches = fullName.includes(val);
              if (matches) {
                srchResultsArray.push(res);
              }
            }
          }
        } // data range is changed
        else {
          // patient search filter

          if (
            srchFilterOption === "noValue" ||
            srchFilterOption === "Patient"
          ) {
            let srchResultsArray = [];
            allResults.map((res, index) => {
              console.log(res);
              if (
                (
                  res.usersPatient.firstname?.toLowerCase() +
                  " " +
                  res.usersPatient.lastname?.toLowerCase()
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
          } // Doctor search filter
          else if (srchFilterOption === "Doctor") {
            let srchResultsArray = [];

            for (const res of allResults) {
              console.log(res);

              const fullName = res.usersDoctor.firstname
                ? res.usersDoctor.firstname?.toLowerCase() +
                  " " +
                  res.usersDoctor.lastname?.toLowerCase()
                : res.usersDoctor.toLowerCase();
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
      } // select filters (Last ...)
      else {
        // there no filter option selected
        if (
          fillterdResults.length === 0 ||
          !fillterdResults ||
          filterOption === "noValue"
        ) {
          // no option selected
          if (
            srchFilterOption === "noValue" ||
            srchFilterOption === "Patient" // patient search filter
          ) {
            let srchResultsArray = [];
            allResults.map((res, index) => {
              console.log(res);
              if (
                (
                  res.usersPatient.firstname?.toLowerCase() +
                  " " +
                  res.usersPatient.lastname?.toLowerCase()
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
          } else if (srchFilterOption === "Doctor") {
            let srchResultsArray = [];

            for (const res of allResults) {
              console.log(res);

              const fullName = res.usersDoctor.firstname
                ? res.usersDoctor.firstname?.toLowerCase() +
                  " " +
                  res.usersDoctor.lastname?.toLowerCase()
                : res.usersDoctor.toLowerCase();
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
        } else {
          // patient search filter
          if (
            srchFilterOption === "noValue" ||
            srchFilterOption === "Patient"
          ) {
            let srchResultsArray = [];
            fillterdResults.map((res, index) => {
              console.log(res);
              if (
                (
                  res.usersPatient.firstname?.toLowerCase() +
                  " " +
                  res.usersPatient.lastname?.toLowerCase()
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
          } // Doctor search filter
          else if (srchFilterOption === "Doctor") {
            let srchResultsArray = [];

            for (const res of fillterdResults) {
              console.log(res);

              const fullName = res.usersDoctor.firstname
                ? res.usersDoctor.firstname?.toLowerCase() +
                  " " +
                  res.usersDoctor.lastname?.toLowerCase()
                : res.usersDoctor.toLowerCase();
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
    console.log("useEffect 2");
  }, [filterOption]);

  useEffect(() => {
    // Search for users when the search value changes
    console.log("useEffect 3");

    searchForAResult();
  }, [val, fillterdResults]);

  useEffect(() => {
    filterByDataRange();
  }, [dateRange]);
  useEffect(() => {
    console.log("useEffect 4");
    if (isCustomeDate) {
      setDateRange({
        firstDate: formatDateYYMMDD(startDate),
        secondtDate: formatDateYYMMDD(endDate),
      });
    } else {
      handaleFilterOption(filterOption);
    }
  }, [isCustomeDate]);

  return (
    <>
      <ResultsPreviewPresintation
        darkMode={darkMode}
        visibleResults={visibleResults}
        displayResults={displayResults}
        apiMessage={apiMessage}
        apiError={apiError}
        noResults={noResults}
        apiErrorMessage={apiErrorMessage}
        isCustomeDate={isCustomeDate}
        hadaleDateFilters={hadaleDateFilters}
        handaleDataRangeChange={handaleDataRangeChange}
        filterOptions={filterOptions}
        handaleFilterOption={handaleFilterOption}
        srchFilterOptions={srchFilterOptions}
        searchFilterOption={searchFilterOption}
        val={val}
        handaleSearchVlue={handaleSearchVlue}
        srchFilterOption={srchFilterOption}
        dateRange={dateRange}
        deleteUser={deleteUser}
        setPageNo={setPageNo}
        pageNo={pageNo}
        usersCount={usersCount}
      />
    </>
  );
}
