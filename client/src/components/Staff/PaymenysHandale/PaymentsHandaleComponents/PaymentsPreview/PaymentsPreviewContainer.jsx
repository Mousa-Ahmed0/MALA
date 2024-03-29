import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";

import { PaymentsPreviewPresintation } from "../../../../../componentsLoader/ComponentsLoader";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import {
  getAllPayments,
  getPaymentsFiltered,
  getPaymentsFromTo,
} from "../../../../../apis/ApisHandale";
import { formatDateYYMMDD } from "../../../../../methods/FormateDate";

export default function PaymentsPreviewContainer({}) {
  const { darkMode } = useDarkMode();
  const [isCustomeDate, setIsCustomeDate] = useState(false);

  let [allPayments, setAllPayments] = useState([]);
  let [visiblePayments, setVisiblePayments] = useState([]);
  //search & filter variables
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

  const srchFilterOptions = ["Patient", "IC"];
  //Errors variables
  let [apiError, setApiError] = useState(false);
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

  /*get all pyments */
  async function getPayments() {
    setLoader(true);
    try {
      let response = await getAllPayments();
      //  console.log("response from gg", response);
      setAllPayments(response.data.paumentArray);
      setVisiblePayments(response.data.paumentArray);
      setUsersCount(response.data.countPage);
    } catch (error) {
      console.error("Error from disply all pyments: ", error);
    }
    setLoader(false);
  }

  //Display the VisibleUsers
  function displayUsers() {
    return visiblePayments.map((p, index) => {
      return (
        <div key={index} className="col-lg-12">
          <div
            className={`card mb-4 border-0 px-3 ${
              darkMode ? " spic-dark-mode" : ""
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
                    {p.info?.firstname || "fn"} {p.info?.lastname || "ln"}
                  </Link>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {formatDateYYMMDD(p.date)}
                  </p>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {p.payment.totalValue}{" "}
                    <span style={{ fontSize: "0.758rem" }}>NIS</span>
                  </p>
                </div>
                <div className="col-2 col-md-3 d-flex justify-content-center justify-content-md-start  align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {p.payment.InsuranceCompName === ""
                      ? "..."
                      : p.payment.InsuranceCompName}
                  </p>
                </div>

                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {p.payment.InsuranceCompPers}%
                  </p>
                </div>
                <div className="col-sm-12 col-md-2 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {p.payment.paiedvalue}{" "}
                    <span style={{ fontSize: "0.758rem" }}>NIS</span>
                  </p>
                </div>
                <div className="col-5 col-md-1 d-flex  align-items-center gap-4">
                  <Link
                    style={{ cursor: "pointer" }}
                    className="position-relative nav-link mb-0 text-truncate"
                    to={`/PaymentPreview/${p.payment.id}`}
                  >
                    <i class="fa-solid fa-angles-right"></i>
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
      let response = await getPaymentsFromTo(dateRange, pageNo);
      //console.log("response from payment to: ", response);
      if (response.data.paumentArray) {
        setfillterdResults(response.data.paumentArray);
        setVisiblePayments(response.data.paumentArray);
      } else {
        setfillterdResults([]);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setfillterdResults([]);
        setVisiblePayments([]);
      } else console.error("error.response", error.response);
    }
  }

  //reset filter option, "reset Visible & filtered payments array"
  function clearResults() {
    if (
      filterOption === "noValue" ||
      fillterdResults.length === 0 ||
      !fillterdResults
    ) {
      setVisiblePayments(allPayments);
      setfillterdResults([]); // Reset the filtered results
    } else {
      setVisiblePayments(fillterdResults);
    }
    // Reset the noResults state
    setVal("");
  }

  //handale search value filter - patient or IC -
  function searchFilterOption(option) {
    if (fillterdResults.length > 0) {
      setVisiblePayments(fillterdResults);
    } else {
      clearResults();
    }
    setSrchFilterOption(option);
  }

  //
  async function handaleGetPaymentsFiltered(no) {
    setLoader(true);
    try {
      let response = await getPaymentsFiltered(
        {
          payDate: formatDateYYMMDD(new Date()),
          number: no,
        },
        pageNo
      );
      // console.log("Last Week", response);
      if (response.data.paumentArray) {
        setfillterdResults(response.data.paumentArray);
        setVisiblePayments(response.data.paumentArray);
        setUsersCount(response.data.conutPage);
      } else {
        setfillterdResults([]);
        setVisiblePayments([]);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setfillterdResults([]);
        setVisiblePayments([]);
      } else console.error("error.response", error.response);
    }
    setLoader(false);
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
          await handaleGetPaymentsFiltered(0);
        } catch (error) {}
        break;

      case "Last Month":
        try {
          await handaleGetPaymentsFiltered(1);
        } catch (error) {}
        break;
      case "Last 3 Months":
        try {
          await handaleGetPaymentsFiltered(3);
        } catch (error) {}
        break;
      case "Last 6 Months":
        try {
          await handaleGetPaymentsFiltered(6);
        } catch (error) {}
        break;
      case "Last Year":
        try {
          await handaleGetPaymentsFiltered(12);
        } catch (error) {}
        break;

      default:
        console.log("Error in Option");
    }
  }

  // custome ui based on type of filter
  function hadaleDateFilters() {
    setIsCustomeDate(!isCustomeDate);
    setVisiblePayments(allPayments);
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
      if (fillterdResults.length > 0) {
        setVisiblePayments(fillterdResults);
      } else {
        clearResults();
      }
      setVal("");
    }
    setVal(value);
  }

  //search for an payments
  async function searchForAUser() {
    if (val.trim() === "") {
      //  console.log("search out");
      return;
    } else {
      // console.log("search in");
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
            let srchResultsArray = allPayments.filter((p) =>
              p.info ? p.info.ident.toString().includes(val) : false
            );
            if (srchResultsArray.length === 0) {
              setVisiblePayments([]);
            } else {
              setVisiblePayments(srchResultsArray);
            }
          }
          // IC search filter
          else if (srchFilterOption === "IC") {
            let srchResultsArray = allPayments.filter((p) =>
              p.payment
                ? p.payment.InsuranceCompName.toLowerCase().includes(
                    val.toLowerCase()
                  )
                : false
            );
            if (srchResultsArray.length === 0) {
              setVisiblePayments([]);
            } else {
              setVisiblePayments(srchResultsArray);
            }
          }
        } // data range is changed
        else {
          // patient search filter

          if (
            srchFilterOption === "noValue" ||
            srchFilterOption === "Patient"
          ) {
            let srchResultsArray = fillterdResults.filter((p) =>
              p.info ? p.info.ident.toString().includes(val) : false
            );
            if (srchResultsArray.length === 0) {
              setVisiblePayments([]);
            } else {
              setVisiblePayments(srchResultsArray);
            }
          } // IC search filter
          else if (srchFilterOption === "IC") {
            let srchResultsArray = fillterdResults.filter((p) =>
              p.payment
                ? p.payment.InsuranceCompName.toLowerCase().includes(
                    val.toLowerCase()
                  )
                : false
            );
            if (srchResultsArray.length === 0) {
              setVisiblePayments([]);
            } else {
              setVisiblePayments(srchResultsArray);
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
            let srchResultsArray = allPayments.filter((p) =>
              p.info ? p.info.ident.toString().includes(val) : false
            );
            if (srchResultsArray.length === 0) {
              setVisiblePayments([]);
            } else {
              setVisiblePayments(srchResultsArray);
            }
          } else if (srchFilterOption === "IC") {
            // IC search filter
            let srchResultsArray = allPayments.filter((p) =>
              p.payment
                ? p.payment.InsuranceCompName.toLowerCase().includes(
                    val.toLowerCase()
                  )
                : false
            );
            if (srchResultsArray.length === 0) {
              setVisiblePayments([]);
            } else {
              setVisiblePayments(srchResultsArray);
            }
          }
        } else {
          // patient search filter
          if (
            srchFilterOption === "noValue" ||
            srchFilterOption === "Patient"
          ) {
            let srchResultsArray = fillterdResults.filter((p) =>
              p.info ? p.info.ident.toString().includes(val) : false
            );
            if (srchResultsArray.length === 0) {
              setVisiblePayments([]);
            } else {
              setVisiblePayments(srchResultsArray);
            }
          } // IC search filter
          else if (srchFilterOption === "IC") {
            // IC search filter
            let srchResultsArray = fillterdResults.filter((p) =>
              p.payment
                ? p.payment.InsuranceCompName.toLowerCase().includes(
                    val.toLowerCase()
                  )
                : false
            );
            if (srchResultsArray.length === 0) {
              setVisiblePayments([]);
            } else {
              setVisiblePayments(srchResultsArray);
            }
          }
        }
      }
    }
  }

  //initial rendring
  useEffect(() => {
    // Fetch all payments when the component mounts
    getPayments();
  }, []);

  useEffect(() => {
    // Filter and display users when the filter option or data changes
    handaleFilterOption(filterOption);
  }, [filterOption]);

  useEffect(() => {
    // Search for users when the search value changes

    searchForAUser();
  }, [val, fillterdResults]);

  useEffect(() => {
    filterByDataRange();
  }, [dateRange]);
  // useEffect(() => {
  //   console.log(visiblePayments);
  // }, [visiblePayments]);
  useEffect(() => {
    if (isCustomeDate) {
      setDateRange({
        firstDate: formatDateYYMMDD(startDate),
        secondtDate: formatDateYYMMDD(endDate),
      });
    } else {
      handaleFilterOption(filterOption);
    }
  }, [isCustomeDate]);
  useEffect(() => {
    if (filterOption === "noValue" && !isCustomeDate) getPayments();
    else if (isCustomeDate) {
      filterByDataRange();
    } else {
      switch (filterOption) {
        case "Last Week":
          try {
            handaleGetPaymentsFiltered(0);
          } catch (error) {}
          break;
        case "Last Month":
          try {
            handaleGetPaymentsFiltered(1);
          } catch (error) {}
          break;
        case "Last 3 Months":
          try {
            handaleGetPaymentsFiltered(3);
          } catch (error) {}
          break;
        case "Last 6 Months":
          try {
            handaleGetPaymentsFiltered(6);
          } catch (error) {}
          break;
        case "Last Year":
          try {
            handaleGetPaymentsFiltered(12);
          } catch (error) {}
          break;

        default:
          console.log("Error in Option");
      }
    }
  }, [pageNo]);
  return (
    <Suspense
      fallback={
        <div className="center-container">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
    >
      <PaymentsPreviewPresintation
        darkMode={darkMode}
        visiblePayments={visiblePayments}
        displayUsers={displayUsers}
        apiError={apiError}
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
        setPageNo={setPageNo}
        pageNo={pageNo}
        usersCount={usersCount}
        loader={loader}
      />
    </Suspense>
  );
}
