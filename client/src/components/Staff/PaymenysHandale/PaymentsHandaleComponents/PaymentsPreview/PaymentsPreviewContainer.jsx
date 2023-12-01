import React, { useState, useEffect } from "react";
import PaymentsPreviewPresintation from "./PaymentsPreviewPresintation";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import { Link } from "react-router-dom";

import SearchBar from "../../../../SearchBar/SearchBar";
import UserFilter from "../../../../UserFilter/UserFilter";
import { getAllPayments } from "../../../../../apis/ApisHandale";
export default function PaymentsPreviewContainer() {
  const { darkMode } = useDarkMode();
  const [isInsuranceComp, setIsInsuranceComp] = useState(false);

  let [allPayments, setAllPayments] = useState([]);
  let [visiblePayments, setVisiblePayments] = useState([]);
  //search & filter variables
  let [val, setVal] = useState(""); //search value
  let [filterOption, setFilterOption] = useState("noValue");
  let [searchResults, setSearchResults] = useState([]);
  const filterOptions = [
    "noValue",
    "Last Week",
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
  ];
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
      setAllPayments(response.data.getAllPayment);
      setVisiblePayments(response.data.getAllPayment);
    } catch (error) {
      console.error("Error from disply all pyments: ", error);
    }
  }
  //Display the VisibleUsers
  function displayUsers() {
    return visiblePayments.map((payment, index) => {
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
                  <p className="mb-0 text-truncate">#{index + 1}:</p>
                </div>
                <div className="col-5 col-sm-4 col-md-3 d-flex  justify-content-md-start align-items-center p-0">
                  <img
                    loading="lazy"
                    className="nav-profile-img mx-2 img-fluid"
                    src={"user.profilePhoto.url"}
                    alt="nav-profile-img"
                    style={{ objectFit: "cover" }}
                  />
                  <Link
                    style={{ cursor: "pointer" }}
                    to={`/Profile/`}
                    className="position-relative nav-link mb-0 text-truncate"
                  >
                    dsv
                  </Link>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{"value"}</p>
                </div>
                <div className="col-2 col-md-3 d-flex justify-content-center justify-content-md-start  align-items-center p-0">
                  <p className="mb-0 text-truncate">{"IC Name"}</p>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{"dicount"}</p>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{"paid"}</p>
                </div>
                <div className="col-5 col-md-1 d-flex flex-row-reverse flex-md-row align-items-center">
                  <p>print</p>
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
    setVisiblePayments(allPayments);
  }

  function handaleFilterOption(option) {
    setFilterOption(option);
    const roleOptions = ["Staff", "Patient", "Doctor"];
    console.log("filter Function: ", searchResults);
    // No Search has been done
    if (searchResults.length === 0 || !searchResults || val === "") {
      if (option === "noValue") {
        clearResults();
      } else if (roleOptions.includes(option)) {
        /*const filteredUsers = allUsers.filter(
          (user) => user.usertype === option
        );
        setVisibleUsers(filteredUsers);*/
      }
    } else {
      if (option === "noValue") {
        setVisiblePayments(searchResults);
      } else if (roleOptions.includes(option)) {
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

  /** ====================== Search Section ====================== **/
  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  async function searchForAUser() {
    if (val.trim() === "") {
      return;
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
    // Filter and display users when the filter option or data changes
    handaleFilterOption(filterOption);
  }, [filterOption, searchResults]);

  useEffect(() => {
    // Search for users when the search value changes
    searchForAUser();
  }, [val]);

  return (
    <div className="ST-section my-2 p-0">
      <div className="container">
        <div className="row searchSection mb-5">
          <div className="col-sm-12 col-md-6 d-flex align-items-center p-0">
            <SearchBar handaleSearchVlue={handaleSearchVlue} />
          </div>
          <div
            className={`col-sm-12 col-md-4 d-flex justify-content-md-end align-items-center p-0`}
          >
            <div className="a w-100">
              <div
                className={`col-12 ${
                  isInsuranceComp ? "d-none" : ""
                } d-flex justify-content-md-end`}
              >
                <UserFilter
                  filterOptions={filterOptions}
                  handaleFilterOption={handaleFilterOption}
                />
              </div>
              <div
                className={`col-12 ${
                  !isInsuranceComp ? "d-none" : ""
                } d-flex justify-content-md-end gap-4`}
              >
                <div className="col-6">
                  <label
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
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
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
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
                onChange={() => setIsInsuranceComp(!isInsuranceComp)}
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                checked={isInsuranceComp}
              />
              <label
                className={`custom-control-label mx-2 ${
                  darkMode ? " text-white" : ""
                }`}
                htmlFor="customCheck1"
              >
                Custome Date?
              </label>
            </div>
          </div>
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
                    #:
                  </div>
                  <div
                    className={`col-md-3 text-truncate text-muted p-0 ${
                      darkMode ? " dark-theme" : ""
                    }`}
                  >
                    Patient Name:
                  </div>
                  <div
                    className={`col-md-1 text-truncate text-muted p-0 ${
                      darkMode ? " dark-theme" : ""
                    }`}
                  >
                    Value:
                  </div>
                  <div
                    className={`col-md-3 text-truncate text-muted p-0 ${
                      darkMode ? " dark-theme" : ""
                    }`}
                  >
                    IC Name:
                  </div>
                  <div
                    className={`col-md-2 text-truncate text-muted p-0 ${
                      darkMode ? " dark-theme" : ""
                    }`}
                  >
                    Dsicount Value:
                  </div>
                  <div
                    className={`col-md-1 text-truncate text-muted p-0 ${
                      darkMode ? " dark-theme" : ""
                    }`}
                  >
                    Paid Value:
                  </div>
                  <div
                    className={`col-md-1 text-truncate text-muted p-0 ${
                      darkMode ? " dark-theme" : ""
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
            displayUsers
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
