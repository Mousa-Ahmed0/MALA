import {
  getAllPayments,
  getPaymentsFiltered,
} from "../../../../apis/ApisHandale";
import UserFilter from "../../../UserFilter/UserFilter";
import LineChart from "./PaymentLineChartComponents/LineChart";
import React, { useState, useEffect } from "react";

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
    let currentDay = currentDate.getDate();
    switch (option) {
      case "noValue":
        break;

      case "Last Week":
        try {
          //get data from api
          let response = await getPaymentsFiltered({
            payDate: formatDate(new Date()),
            number: 0,
          });
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
            for (let i = currentDay - 7; i <= currentDay; i++) {
              //move 7 times loop "one for each day"
              let count = 0; //total count for each day
              response.data.paumentArray.map((pay) => {
                //move on all data returned to get total value for each
                let date = new Date(pay.date);
                let day = date.getDate();
                if (day === i) {
                  count += pay.value;
                }
              });
              //push the count of day to array "0 if day not exist in data"
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
          let response = await getPaymentsFiltered({
            payDate: formatDate(new Date()),
            number: 3,
          });
          //check is there data?
          if (response.data.paumentArray) {
            //create new prop
            const newLineChartProperties = {
              lineLabels: [],
              lineData: [],
            };
            let month = currentDate.getMonth() + 1; //get current month
            for (let i = month - 3; i <= currentDate.getMonth(); i++) {
              // move on months count
              newLineChartProperties.lineLabels.push(monthsOfYear[i]); // get name of month then add it to label array
              let count = 0; // total count of paid value for each month
              response.data.paumentArray.map((pay) => {
                //move on data to count each
                let date = new Date(pay.date);
                let payMonth = date.getMonth();
                if (payMonth === i) {
                  count += pay.value;
                }
              });
              newLineChartProperties.lineData.push(count.toString()); //push the count to array
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
          let response = await getPaymentsFiltered({
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
            let month = currentDate.getMonth() + 1; //get current month
            for (let i = month - 6; i <= currentDate.getMonth(); i++) {
              // move on months count
              newLineChartProperties.lineLabels.push(monthsOfYear[i]); // get name of month then add it to label array
              let count = 0; // total count of paid value for each month
              response.data.paumentArray.map((pay) => {
                //move on data to count each
                let date = new Date(pay.date);
                let payMonth = date.getMonth();
                if (payMonth === i) {
                  count += pay.value;
                }
              });
              newLineChartProperties.lineData.push(count.toString()); //push the count to array
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
          let response = await getPaymentsFiltered({
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
            let month = currentDate.getMonth() + 1; //get current month
            for (let i = month - 12; i <= currentDate.getMonth(); i++) {
              // move on months count
              newLineChartProperties.lineLabels.push(monthsOfYear[i]); // get name of month then add it to label array
              let count = 0; // total count of paid value for each month
              response.data.paumentArray.map((pay) => {
                //move on data to count each
                let date = new Date(pay.date);
                let payMonth = date.getMonth();
                if (payMonth === i) {
                  count += pay.value;
                }
              });
              newLineChartProperties.lineData.push(count.toString()); //push the count to array
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
  useEffect(() => {
    console.log("filterOption: ", filterOption);
  }, [filterOption]);

  return (
    <>
      <div className="row align-items-center">
        <div className="col-12 d-flex gap-2">
          <span className=" h5 m-0 colorMain">
            <i class="fa-solid fa-file-invoice-dollar"></i>
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
      {lineChartPropreties.lineData.length > 0 &&
      lineChartPropreties.lineLabels.length > 0 ? (
        <LineChart
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
