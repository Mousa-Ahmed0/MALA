import React, { useState, useEffect } from "react";
import PaymentsPreviewPresintation from "./PaymentsPreviewPresintation";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import { Link } from "react-router-dom";

import {
  getAllPayments,
  getPaymentsFiltered,
  getPaymentsFromTo,
} from "../../../../../apis/ApisHandale";
import { formatDate } from "../../../../../methods/FormateDate";
import PaymentToPDF from "../../../../PaymentToPDF";
export default function PaymentsPreviewContainer({ setIsPdfLoading }) {
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
      //console.log(response);
      setAllPayments(response.data.paumentArray);
      setVisiblePayments(response.data.paumentArray);
    } catch (error) {
      console.error("Error from disply all pyments: ", error);
    }
  }

  //Display the VisibleUsers
  function displayUsers() {
    return visiblePayments.map((p, index) => {
      /// get date and formate it
      const dateString = p.payment.payDate;

      // Create the formatted date string as yy/mm/dd
      const formDate = formatDate(new Date(dateString));

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
                  <p className="mb-0 text-truncate">{formDate}</p>
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
                  <PaymentToPDF
                    paymentDetails={p}
                    darkMode={darkMode}
                    setIsPdfLoading={setIsPdfLoading}
                  />
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

  //format date as "yy-mm-dd" formula
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  // Data Range Variable
  const [dateRange, setDateRange] = useState({
    firstDate: formatDate(startDate),
    secondtDate: formatDate(endDate),
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
      let response = await getPaymentsFromTo(dateRange);
      if (response.data.paumentArray) {
        setfillterdResults(response.data.paumentArray);
        setVisiblePayments(response.data.paumentArray);
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
      setVisiblePayments(allPayments);
      setfillterdResults([]); // Reset the filtered results
    } else {
      setVisiblePayments(fillterdResults);
    }
    setNoResults(false); // Reset the noResults state
    setVal("");
  }

  //handale search value filter - patient or IC -
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
          let response = await getPaymentsFiltered({
            payDate: formatDate(new Date()),
            number: 0,
          });
          if (response.data.paumentArray) {
            setfillterdResults(response.data.paumentArray);
            setVisiblePayments(response.data.paumentArray);
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
          let response = await getPaymentsFiltered({
            payDate: formatDate(new Date()),
            number: 1,
          });
          if (response.data.paumentArray) {
            setfillterdResults(response.data.paumentArray);
            setVisiblePayments(response.data.paumentArray);
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
          let response = await getPaymentsFiltered({
            payDate: formatDate(new Date()),
            number: 1,
          });
          if (response.data.paumentArray) {
            setfillterdResults(response.data.paumentArray);
            setVisiblePayments(response.data.paumentArray);
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
          let response = await getPaymentsFiltered({
            payDate: formatDate(new Date()),
            number: 3,
          });
          if (response.data.paumentArray) {
            setfillterdResults(response.data.paumentArray);
            setVisiblePayments(response.data.paumentArray);
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
          let response = await getPaymentsFiltered({
            payDate: formatDate(new Date()),
            number: 6,
          });
          if (response.data.paumentArray) {
            setfillterdResults(response.data.paumentArray);
            setVisiblePayments(response.data.paumentArray);
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
          let response = await getPaymentsFiltered({
            payDate: formatDate(new Date()),
            number: 12,
          });
          if (response.data.paumentArray) {
            setfillterdResults(response.data.paumentArray);
            setVisiblePayments(response.data.paumentArray);
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
      clearResults();
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
              setNoResults(true);
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
              setNoResults(true);
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
              setNoResults(true);
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
              setNoResults(true);
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
              setNoResults(true);
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
              setNoResults(true);
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
              setNoResults(true);
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
              setNoResults(true);
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
  useEffect(() => {
    console.log(visiblePayments);
  }, [visiblePayments]);
  useEffect(() => {
    if (isCustomeDate) {
      // console.log("Custome Date Function");
    } else {
      handaleFilterOption(filterOption);
    }
  }, [isCustomeDate]);

  return (
    <PaymentsPreviewPresintation
      darkMode={darkMode}
      visiblePayments={visiblePayments}
      displayUsers={displayUsers}
      noResults={noResults}
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
    />
  );
}
