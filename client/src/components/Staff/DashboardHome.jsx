import React, { useEffect, useState } from "react";
import MyChart from "../MyChart";
import { useDarkMode } from "../../context/DarkModeContext";
export default function DashboardHome({ user }) {
  const { darkMode } = useDarkMode();
  const width = "-webkit-fill-available";
  //BarChart
  const [chartLabels, setChartLabels] = useState([
    ["Staff"],
    ["Patients"],
    ["Doctors"],
  ]);
  const [chartDataColors, setChartDataColors] = useState([
    ["aqua"],
    ["red"],
    ["green"],
  ]);
  const [chartData, setChartData] = useState([[3], [25], [5]]);

  return (
    <div className="ST-section ST-Dashboard">
      <div className="w-100 d-flex justify-content-between align-items-center">
        <div className="h2 d-flex align-items-center gap-2 m-0">
          Welcome
          <span className="mid-bold colorMain">
            {user.firstname} {user.lastname}
          </span>
        </div>
        <div
          className={`btn d-flex align-items-center gap-2 border ${
            darkMode ? "border-white text-white" : "border-black"
          }`}
        >
          <i class="fa-regular fa-message"></i>{" "}
          <span className="h3 mid-bold colorMain">{2}</span>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center gap-4 my-4">
        <div
          className={`w-25 ${darkMode ? " spic-dark-mode" : "bg-white"} p-4`}
        >
          <div className="home-size d-flex flex-column justify-content-center align-items-center gap-1">
            <div className="d-flex gap-4 align-items-center">
              <i class="h3 colorMain fa-solid fa-user-doctor"></i>
              <span className="h5 colorMain m-0">Users</span>
            </div>
            <span className="h5 mid-bold">{38}</span>
            <div style={{ width }} className="progress">
              <div
                className="progress-bar w-100"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        <div
          className={`w-25 ${darkMode ? " spic-dark-mode" : "bg-white"} p-4`}
        >
          <div className="home-size d-flex flex-column justify-content-center align-items-center gap-1">
            <div className="d-flex gap-4 align-items-center">
              <i class="h3 colorMain fa-solid fa-user"></i>
              <span className="h5 colorMain m-0">Staff</span>
            </div>
            <span className="h5 mid-bold">{3}</span>
            <div style={{ width }} className="progress">
              <div
                className="progress-bar w-25"
                role="progressbar"
                aria-valuenow={(3 / 38) * 100}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        <div
          className={`w-25 ${darkMode ? " spic-dark-mode" : "bg-white"} p-4`}
        >
          <div className="home-size d-flex flex-column justify-content-center align-items-center gap-1">
            <div className="d-flex gap-4 align-items-center">
              <i class="h3 colorMain fa-solid fa-user-doctor"></i>
              <span className="h5 colorMain m-0">Patients</span>
            </div>
            <span className="h5 mid-bold">{27}</span>
          </div>
        </div>
        <div
          className={`w-25 ${darkMode ? " spic-dark-mode" : "bg-white"} p-4`}
        >
          <div className="home-size d-flex flex-column justify-content-center align-items-center gap-1">
            <div className="d-flex gap-4 align-items-center">
              <i class="h3 colorMain fa-solid fa-user-doctor"></i>
              <span className="h5 colorMain m-0">Doctors</span>
            </div>
            <span className="h5 mid-bold">{8}</span>
          </div>
        </div>
      </div>
      {/*<MyChart
        darkMode={darkMode}
        chartLabels={chartLabels}
        chartDataColors={chartDataColors}
        chartData={chartData}
  />*/}
    </div>
  );
}
