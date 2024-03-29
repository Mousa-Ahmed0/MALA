import { getPaymentsForCharts } from "../../../../apis/ApisHandale";
import UserFilter from "../../../UserFilter/UserFilter";
import { PayLineChart } from "../../../../componentsLoader/ComponentsLoader";
import React, { Suspense, useState, useEffect } from "react";

export default function PaymentLineChartContainer({ darkMode }) {
  const [lineChartPropreties, setLineChartProperties] = useState({
    lineLabels: [],
    lineData: [],
  });
  const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [totalCount, setTotalCount] = useState(0);
  let [noResults, setNoResults] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [apiMessage, setApiMessage] = useState("");
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
  //search & filter variables
  let [filterOption, setFilterOption] = useState("Last Week");
  const filterOptions = [
    "Last Week",
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
  ];
  const [loading, setLoading] = useState(false);

  //get past days
  const getPastDayNames = (numberOfDays) => {
    const currentDate = new Date();
    const pastDayNames = [];

    for (let i = 0; i <= numberOfDays; i++) {
      const pastDate = new Date(currentDate);
      pastDate.setDate(currentDate.getDate() - i);

      const index = pastDate.getDay();
      pastDayNames.push(daysOfWeek[index]);
    }

    return pastDayNames.reverse(); // Reverse the array to get past days in the correct order
  };

  //format date as "yy-mm-dd" formula
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  //Handel Chart Data
  //Handel Filter
  async function handaleFilterOption(option) {
    setTotalCount(0);
    setLineChartProperties({
      lineLabels: [],
      lineData: [],
    });
    setFilterOption(option);
    switch (option) {
      case "noValue":
        break;

      case "Last Week":
        try {
          setLoading(true);
          //get data from api
          let response = await getPaymentsForCharts({
            payDate: formatDate(new Date()),
            number: 0,
          });
          console.log(response);
          //check is there data?
          if (response.data.paumentArray) {
            //create new prop
            const newLineChartProperties = {
              lineLabels: [],
              lineData: [],
            };
            //set total count of paid value
            setTotalCount(response.data.count);
            newLineChartProperties.lineLabels = getPastDayNames(7); //get name of last 7 days
            for (let i = 0; i <= 6; i++) {
              let currentDate = new Date();
              currentDate.setDate(currentDate.getDate() - i);

              let count = 0; // total count for each day
              response.data.paumentArray.forEach((pay) => {
                let payDate = new Date(pay.date);
                if (
                  payDate.getDate() === currentDate.getDate() &&
                  payDate.getMonth() === currentDate.getMonth() &&
                  payDate.getFullYear() === currentDate.getFullYear()
                ) {
                  count += pay.payment.totalValue;
                }
              });

              // push the count of day to array "0 if day not exist in data"
              newLineChartProperties.lineData.push(count.toString());
            }

            //set the chart prop to our state
            setLineChartProperties(newLineChartProperties);
          } else {
            //no results?
            setNoResults(true);
          }
        } catch (error) {
          //Api Error?
          if (error.response.status === 400) {
            setNoResults(true);
          } else console.error("error", error);
        }
        setLoading(false);
        break;

      case "Last 3 Months":
        try {
          setLoading(true);
          //get data from api
          let response = await getPaymentsForCharts({
            payDate: formatDate(new Date()),
            number: 3,
          });
          //  console.log(response);
          //check is there data?
          if (response.data.paumentArray) {
            //create new prop
            const newLineChartProperties = {
              lineLabels: [],
              lineData: [],
            };
            setTotalCount(response.data.count);

            for (let i = 0; i <= 2; i++) {
              let currentDate = new Date();
              currentDate.setMonth(currentDate.getMonth() - i);
              // get name of month then add it to label array
              newLineChartProperties.lineLabels.push(
                monthsOfYear[currentDate.getMonth()]
              );
              let count = 0; // total count for each month
              response.data.paumentArray.forEach((pay) => {
                let payDate = new Date(pay.date);
                if (
                  payDate.getMonth() === currentDate.getMonth() &&
                  payDate.getFullYear() === currentDate.getFullYear()
                ) {
                  count += pay.payment.totalValue;
                }
              });

              // push the count of month to array "0 if month not exist in data"
              newLineChartProperties.lineData.push(count.toString());
            }

            //set the propretes to our state
            setLineChartProperties(newLineChartProperties);
          } else {
            setNoResults(true);
          }
        } catch (error) {
          //Api Error?
          if (error.response.status === 400) {
            setNoResults(true);
          } else console.error("error", error);
        }
        setLoading(false);
        break;

      case "Last 6 Months":
        try {
          setLoading(true);
          //get data from api
          let response = await getPaymentsForCharts({
            payDate: formatDate(new Date()),
            number: 6,
          });
          //check is there data?
          if (response.data.paumentArray) {
            //create new prop
            const newLineChartProperties = {
              lineLabels: [],
              lineData: [],
            };
            setTotalCount(response.data.count);

            for (let i = 0; i <= 5; i++) {
              let currentDate = new Date();
              currentDate.setMonth(currentDate.getMonth() - i);
              // get name of month then add it to label array
              newLineChartProperties.lineLabels.push(
                monthsOfYear[currentDate.getMonth()]
              );
              let count = 0; // total count for each month
              response.data.paumentArray.forEach((pay) => {
                let payDate = new Date(pay.date);
                if (
                  payDate.getMonth() === currentDate.getMonth() &&
                  payDate.getFullYear() === currentDate.getFullYear()
                ) {
                  count += pay.payment.totalValue;
                }
              });

              // push the count of month to array "0 if month not exist in data"
              newLineChartProperties.lineData.push(count.toString());
            }

            //set the propretes to our state
            setLineChartProperties(newLineChartProperties);
          } else {
            setNoResults(true);
          }
        } catch (error) {
          //Api Error?
          if (error.response.status === 400) {
            setNoResults(true);
          } else console.error("error", error);
        }
        setLoading(false);
        break;
      case "Last Year":
        try {
          setLoading(true);
          //get data from api
          let response = await getPaymentsForCharts({
            payDate: formatDate(new Date()),
            number: 12,
          });
          //check is there data?
          if (response.data.paumentArray) {
            //create new prop
            const newLineChartProperties = {
              lineLabels: [],
              lineData: [],
            };
            setTotalCount(response.data.count);

            for (let i = 0; i <= 11; i++) {
              let currentDate = new Date();
              currentDate.setMonth(currentDate.getMonth() - i);
              // get name of month then add it to label array
              newLineChartProperties.lineLabels.push(
                monthsOfYear[currentDate.getMonth()]
              );

              let count = 0; // total count for each month
              response.data.paumentArray.forEach((pay) => {
                let payDate = new Date(pay.date);
                if (
                  payDate.getMonth() === currentDate.getMonth() &&
                  payDate.getFullYear() === currentDate.getFullYear()
                ) {
                  count += pay.payment.totalValue;
                }
              });

              // push the count of month to array "0 if month not exist in data"
              newLineChartProperties.lineData.push(count.toString());
            }

            //set the propretes to our state
            setLineChartProperties(newLineChartProperties);
          } else {
            setNoResults(true);
          }
        } catch (error) {
          //Api Error?
          if (error.response.status === 400) {
            setNoResults(true);
          } else console.error("error", error);
        }
        setLoading(false);
        break;

      default:
        console.log("Error in Option");
    }
  }
  /////////////////
  useEffect(() => {
    handaleFilterOption(filterOption);
  }, []);
  useEffect(() => {
    handaleFilterOption(filterOption);
  }, [filterOption]);
  useEffect(() => {
    //console.log("filterOption: ", filterOption);
  }, [filterOption]);

  return (
    <>
      <div className="row align-items-center">
        <div className="col-12 d-flex gap-2">
          <span className=" h5 m-0 colorMain">
            <i
              className={`fa-solid fa-file-invoice-dollar ${
                darkMode ? "text-white" : ""
              }`}
            ></i>
          </span>
          <h1 className=" h5 m-0">Our Payments - {filterOption}:</h1>
        </div>
        <div className="col-8">
          <h1 className="h1 mt-3 mb-4 colorMain mid-bold">
            {totalCount}{" "}
            <span className={`${darkMode ? "text-white" : "text-black"} h5`}>
              NIS
            </span>
          </h1>
        </div>
        <div className="col-4 mt-3 mb-4">
          <div className="border border-black ">
            <UserFilter
              filterOptions={filterOptions}
              handaleFilterOption={handaleFilterOption}
              style={"w-100"}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only h5 m-0">Loading...</span>
          </div>
        </div>
      ) : lineChartPropreties.lineData.length > 0 &&
        lineChartPropreties.lineLabels.length > 0 ? (
        <Suspense
          fallback={
            <div className="center-container">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        >
          {" "}
          <PayLineChart
            darkMode={darkMode}
            lineLabels={lineChartPropreties.lineLabels}
            lineData={lineChartPropreties.lineData}
            filterOption={filterOption}
          />
        </Suspense>
      ) : lineChartPropreties.lineData.length === 0 ||
        lineChartPropreties.lineLabels.length === 0 ? (
        <div>No Payments Found</div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only h5 m-0">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
