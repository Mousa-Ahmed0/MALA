import React, { useState, useEffect } from "react";
import PaymentsPreviewPresintation from "./PaymentsPreviewPresintation";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import { Link } from "react-router-dom";

import SearchBar from "../../../../SearchBar/SearchBar";
import UserFilter from "../../../../UserFilter/UserFilter";
import {
  getAllPayments,
  getPaymentsFromTo,
} from "../../../../../apis/ApisHandale";
import PaymentsArrayPrint from "../../../../PaymentsReport/PaymentsArrayPrint/PaymentsArrayPrint";
export default function PaymentsPreviewContainer() {
  const { darkMode } = useDarkMode();
  const [isCustomeDate, setIsCustomeDate] = useState(false);

  let [allPayments, setAllPayments] = useState([]);
  let [visiblePayments, setVisiblePayments] = useState([]);
  //search & filter variables
  let [val, setVal] = useState(""); //search value
  let [filterOption, setFilterOption] = useState("noValue");
  let [srchFilterOption, setSrchFilterOption] = useState("Patient");
  let [searchResults, setSearchResults] = useState([]);
  const filterOptions = [
    "noValue",
    "Last Week",
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
  ];
  const srchFilterOptions = ["Patient", "IC"];
  //Errors variables
  let [apiError, setApiError] = useState(false);
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

  /*get all pyments */
  async function getPayments() {
    try {
      let response = await getAllPayments();
      console.log(response);
      setAllPayments(response.data.paumentArray);
      setVisiblePayments(response.data.paumentArray);
    } catch (error) {
      console.error("Error from disply all pyments: ", error);
    }
  }
  //Display the VisibleUsers
  function displayUsers() {
    console.log(visiblePayments);

    return visiblePayments.map((p, index) => {
      const dateString = p.payment.payDate;
      const dateObject = new Date(dateString);

      // Extract year, month, and day
      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      const day = dateObject.getDate().toString().padStart(2, "0");

      // Create the formatted date string as year-month-day
      const formDate = `${year}/${month}/${day}`;
      const allValue = p.payment.discountedValue + p.payment.value;
      const percentage = Math.floor(
        (p.payment.discountedValue / p.payment.value) * 100
      );

      return (
        <div key={index} className="col-lg-12">
          <div
            className={`card mb-4 border-0 px-3 ${darkMode ? " spic-dark-mode" : ""
              }`}
          >
            <div className={`card-body p-0`}>
              <div className="row  pt-4 pb-1 px-0">
                <div className="col-sm-12 col-md-1 d-flex align-items-center p-0">
                  <p className="mb-0 text-truncate">#{index + 1}:</p>
                </div>
                <div className="col-5 col-sm-2 col-md-2 d-flex  justify-content-md-start align-items-center p-0">
                  <Link
                    style={{ cursor: "pointer" }}
                    to={`/Profile/`}
                    className="position-relative nav-link mb-0 text-truncate"
                  >
                    {p.info ? p.info.firstname : "fn"}{" "}
                    {p.info ? p.info.lastname : "ln"}
                  </Link>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{formDate}</p>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{allValue}NIS</p>
                </div>
                <div className="col-2 col-md-3 d-flex justify-content-center justify-content-md-start  align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {p.payment.InsuranceCompName === ""
                      ? "..."
                      : p.payment.InsuranceCompName}
                  </p>
                </div>

                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{percentage}%</p>
                </div>
                <div className="col-sm-12 col-md-2 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{p.payment.value}NIS</p>
                </div>
                <div className="col-5 col-md-1 d-flex flex-row-reverse flex-md-row align-items-center">
                  <Link
                    className={`position-relative nav-link mb-0 text-truncate`}
                  >
                    Print
                  </Link>
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
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [dateRange, setDateRange] = useState({
    firstDate: formatDate(endDate),
    secondDate: "",
  });
  useEffect(() => {
    console.log("data range: ", dateRange);
  }, [dateRange]);

  function clearResults() {
    setVisiblePayments(allPayments);
  }

  function searchFilterOption(option) {
    setSrchFilterOption(option);
  }
  async function handaleFilterOption(option) {
    setFilterOption(option);
    const startDate = new Date();

    // No Search has been done
    if (searchResults.length === 0 || !searchResults || val === "") {
      console.log("first step");
      if (option === "noValue") {
        clearResults();
      } else if (option === "Last Week") {
   
        console.log("second step");
        startDate.setDate(endDate.getDate() - 7);

        let newDateRange = { ...dateRange, secondDate: formatDate(endDate) };
        let response;
        console.log("third step");
        response = await getPaymentsFromTo(newDateRange);
        console.log("response from filter function: ", response);
      }
    } else {
      if (option === "noValue") {
        setVisiblePayments(searchResults);
      } else if (option === "Last Week") {
        /* const filteredUsers = searchResults.filter(
          (user) => user.usertype === option
        );
        setVisibleUsers(filteredUsers);*/
      }
    }
    if (visiblePayments.length === 0) {
      setNoResults(true);
    }
  }

  function hadaleDateFilters() {
    setIsCustomeDate(!isCustomeDate);
  }
  /** ====================== Search Section ====================== **/
  useEffect(() => {
    console.log("all Payments: ", allPayments);
  }, [allPayments]);
  useEffect(() => {
    console.log("val: ", val);
  }, [val]);
  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  async function searchForAUser() {
    if (val.trim() === "") {
      return;
    } else {
      if (srchFilterOption === "noValue" || srchFilterOption === "Patient") {
        let srchResultsArray = allPayments.filter((p) =>
          p.info ? p.info.ident.toString().includes(val) : false
        );
        if (srchResultsArray.length === 0) {
          setVisiblePayments([]);
          setNoResults(true);
        } else {
          setSearchResults(srchResultsArray);
        }
      } else if (srchFilterOption === "IC") {
        let srchResultsArray = allPayments.filter((p) =>
          p.payment
            ? p.payment.InsuranceCompName.toLowerCase().includes(
              val.toLowerCase()
            )
            : false
        );
        if (srchResultsArray.length === 0) {
          setVisiblePayments([]);
          setNoResults(true);
        } else {
          setSearchResults(srchResultsArray);
        }
      }
    }
    /* let srchResultsArray = allPayments.filter((user) =>
      (user.firstname.toLowerCase() + user.lastname.toLowerCase()).includes(
        val.toLowerCase()
      )
    );
    if (srchResultsArray.length === 0) {
      setVisiblePayments([]);
      setNoResults(true);
    } else {
      setSearchResults(srchResultsArray);
    }*/
  }

  //initial rendring
  useEffect(() => {
    // Fetch all payments when the component mounts
    getPayments();
  }, []);

  useEffect(() => {
    // Filter and display users when the filter option or data changes and sure that not custom date
    if (!isCustomeDate) {
      handaleFilterOption(filterOption);
    }
  }, [filterOption, searchResults]);

  useEffect(() => {
    // Search for users when the search value changes
    searchForAUser();
  }, [val]);

  useEffect(() => {
    if (isCustomeDate) {
      console.log("Custome Date Function");
    } else {
      handaleFilterOption(filterOption);
    }
  }, [isCustomeDate]);
  return (
    <div className="ST-section my-2 p-0">
      <div className="container">
        <div className="d-none payments-array-print">
          <PaymentsArrayPrint
            paymentsArr={visiblePayments}
            darkMode={darkMode}
          />
        </div>
        <div className="row searchSection mb-5">
          <div className="col-sm-12 col-md-6 d-flex gap-4 align-items-center p-0">
            <UserFilter
              filterLabel={"Search for:"}
              filterOptions={srchFilterOptions}
              handaleFilterOption={searchFilterOption}
            />
            <SearchBar handaleSearchVlue={handaleSearchVlue} />
          </div>
          <div
            className={`col-sm-12 col-md-4 d-flex justify-content-md-end align-items-center p-0`}
          >
            <div className="a w-100">
              <div
                className={`col-12 ${isCustomeDate ? "d-none" : ""
                  } d-flex justify-content-md-end`}
              >
                <UserFilter
                  filterOptions={filterOptions}
                  handaleFilterOption={handaleFilterOption}
                />
              </div>
              <div
                className={`col-12 ${!isCustomeDate ? "d-none" : ""
                  } d-flex justify-content-md-end gap-4`}
              >
                <div className="col-6">
                  <label
                    className={`form-label ${darkMode ? " spic-dark-mode" : ""
                      }`}
                  >
                    From
                  </label>
                  <input
                    type="date"
                    name="InsuranceCompName"
                    className="form-control"
                  />
                </div>
                <div className="col-6">
                  <label
                    className={`form-label ${darkMode ? " spic-dark-mode" : ""
                      }`}
                  >
                    to
                  </label>
                  <input
                    type="date"
                    name="InsuranceCompName"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 d-flex justify-content-md-end align-items-center p-0">
            <div className="custom-control custom-checkbox d-flex gap-2">
              <input
                onChange={() => hadaleDateFilters()}
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                checked={isCustomeDate}
              />
              <label
                className={`custom-control-label mx-2 ${darkMode ? " text-white" : ""
                  }`}
                htmlFor="customCheck1"
              >
                Custome Date?
              </label>
            </div>
          </div>
        </div>
      </div>
      <section className="px-4 preview-section">
        <div className="row my-0 d-none d-md-block">
          <div className="col-lg-12">
            <div className="card border-0 bg-transparent">
              <div className="card-body">
                <div className="row">
                  <div
                    className={`col-md-1 text-truncate text-muted p-0 ${darkMode ? " dark-theme" : ""
                      }`}
                  >
                    #:
                  </div>
                  <div
                    className={`col-md-2 text-truncate text-muted p-0 ${darkMode ? " dark-theme" : ""
                      }`}
                  >
                    Patient Name:
                  </div>
                  <div
                    className={`col-md-1 text-truncate text-muted p-0 ${darkMode ? " dark-theme" : ""
                      }`}
                  >
                    Date:
                  </div>
                  <div
                    className={`col-md-1 text-truncate text-muted p-0 ${darkMode ? " dark-theme" : ""
                      }`}
                  >
                    value:
                  </div>
                  <div
                    className={`col-md-3 text-truncate text-muted p-0 ${darkMode ? " dark-theme" : ""
                      }`}
                  >
                    IC Name:
                  </div>
                  <div
                    className={`col-md-1 text-truncate text-muted p-0 ${darkMode ? " dark-theme" : ""
                      }`}
                  >
                    Dsicount:
                  </div>
                  <div
                    className={`col-md-2 text-truncate text-muted p-0 ${darkMode ? " dark-theme" : ""
                      }`}
                  >
                    Paid Value:
                  </div>

                  <div
                    className={`col-md-1 text-truncate text-muted p-0 ${darkMode ? " dark-theme" : ""
                      }`}
                  >
                    More:
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          {Array.isArray(visiblePayments) && visiblePayments.length > 0 ? (
            <>
              {displayUsers()}
              <div className="d-flex align-items-center justify-content-center print-button mt-4">
                <button
                  className="btn btn-info text-white p-3"
                  onClick={() => window.print()}
                >
                  <span className="h4 mid-bold">Print</span>
                </button>
              </div>
            </>
          ) : apiError ? (
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
  );
}
