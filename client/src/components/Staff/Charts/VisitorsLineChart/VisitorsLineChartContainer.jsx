import axios from "axios";
import {
  getAllPayments,
  getPaymentsFiltered,
} from "../../../../apis/ApisHandale";
import UserFilter from "../../../UserFilter/UserFilter";
import VisitorsLineChart from "./VisitorsLineChartComponents/VisitorsLineChart";
import React, { useState, useEffect } from "react";

export default function VisitorsLineChartContainer({ darkMode }) {
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

  const [totalVisitors, setTotalVisitors] = useState(0);
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
    setFilterOption(option);
    let currentDate = new Date();
    let currentDateString = formatDate(currentDate);
    let currentDay = currentDate.getDate();
    switch (option) {
      case "noValue":
        break;

      case "Last Week":
        try {
          //get data from api
          let response = await axios.get(
            `http://localhost:5000/api/result/getResults/resultDate?number=0&date=${currentDateString}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          console.log(response);
          //check is there data?
          if (response.data.resultArray) {
            //create new prop
            const newLineChartProperties = {
              lineLabels: [],
              lineData: [],
            };
            //set total count of paid value
            setTotalVisitors(response.data.resultArray.length);
            newLineChartProperties.lineLabels = getPastDayNames(7); //get name of last 7 days
            for (let i = 0; i <= 6; i++) {
              let currentDate = new Date();
              currentDate.setDate(currentDate.getDate() - i);

              let count = 0; // total count for each day
              response.data.resultArray.forEach((res) => {
                let resDate = new Date(res.date);
                if (
                  resDate.getDate() === currentDate.getDate() &&
                  resDate.getMonth() === currentDate.getMonth() &&
                  resDate.getFullYear() === currentDate.getFullYear()
                ) {
                  count += 1;
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
          console.error("error", error);
        }
        break;

      case "Last 3 Months":
        try {
          //get data from api
          let response = await await axios.get(
            `http://localhost:5000/api/result/getResults/resultDate?number=3&date=${currentDateString}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          //check is there data?
          if (response.data.resultArray) {
            //create new prop
            const newLineChartProperties = {
              lineLabels: [],
              lineData: [],
            };
            setTotalVisitors(response.data.resultArray.length);
            for (let i = 0; i <= 2; i++) {
              let currentDate = new Date();
              currentDate.setMonth(currentDate.getMonth() - i);
              // get name of month then add it to label array
              newLineChartProperties.lineLabels.push(
                monthsOfYear[currentDate.getMonth()]
              );
              let count = 0; // total count for each month
              response.data.resultArray.forEach((res) => {
                let resDate = new Date(res.date);
                if (
                  resDate.getMonth() === currentDate.getMonth() &&
                  resDate.getFullYear() === currentDate.getFullYear()
                ) {
                  count += 1;
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
          console.error("error", error);
        }
        break;

      case "Last 6 Months":
        try {
          //get data from api
          let response = await await axios.get(
            `http://localhost:5000/api/result/getResults/resultDate?number=6&date=${currentDateString}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          //check is there data?
          if (response.data.resultArray) {
            //create new prop
            const newLineChartProperties = {
              lineLabels: [],
              lineData: [],
            };
            setTotalVisitors(response.data.resultArray.length);
            for (let i = 0; i <= 5; i++) {
              let currentDate = new Date();
              currentDate.setMonth(currentDate.getMonth() - i);
              // get name of month then add it to label array
              newLineChartProperties.lineLabels.push(
                monthsOfYear[currentDate.getMonth()]
              );

              let count = 0; // total count for each month
              response.data.resultArray.forEach((res) => {
                let resDate = new Date(res.date);
                if (
                  resDate.getMonth() === currentDate.getMonth() &&
                  resDate.getFullYear() === currentDate.getFullYear()
                ) {
                  count += 1;
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
          console.error("error", error);
        }
        break;

      case "Last Year":
        try {
          //get data from api
          let response = await await axios.get(
            `http://localhost:5000/api/result/getResults/resultDate?number=12&date=${currentDateString}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          //check is there data?
          if (response.data.resultArray) {
            //create new prop
            const newLineChartProperties = {
              lineLabels: [],
              lineData: [],
            };
            setTotalVisitors(response.data.resultArray.length);
            for (let i = 0; i <= 11; i++) {
              let currentDate = new Date();
              currentDate.setMonth(currentDate.getMonth() - i);
              // get name of month then add it to label array
              newLineChartProperties.lineLabels.push(
                monthsOfYear[currentDate.getMonth()]
              );
              let count = 0; // total count for each month
              response.data.resultArray.forEach((res) => {
                let resDate = new Date(res.date);
                if (
                  resDate.getMonth() === currentDate.getMonth() &&
                  resDate.getFullYear() === currentDate.getFullYear()
                ) {
                  count += 1;
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
          console.error("error", error);
        }
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

  return (
    <>
      <div className="row align-items-center">
        <div className="col-12 d-flex gap-2">
          <span className=" h5 m-0 colorMain">
            <i class="fa-solid fa-file-invoice-dollar"></i>
          </span>
          <h1 className=" h5 m-0">Lab Visitors - {filterOption}:</h1>
        </div>
        <div className="col-8">
          <h1 className="h1 mt-3 mb-4 colorMain mid-bold">
            {totalVisitors}{" "}
            <span className={`${darkMode ? "text-white" : "text-black"} h5`}>
              Persons
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
      {lineChartPropreties.lineData.length > 0 &&
      lineChartPropreties.lineLabels.length > 0 ? (
        <VisitorsLineChart
          darkMode={darkMode}
          lineLabels={lineChartPropreties.lineLabels}
          lineData={lineChartPropreties.lineData}
          filterOption={filterOption}
        />
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
