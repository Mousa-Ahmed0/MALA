import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardWelcome from "../DashboardWelcome";
import LineChart from "./Charts/PaymentLineChart/PaymentLineChartComponents/LineChart";
import { useDarkMode } from "../../context/DarkModeContext";
import { getPaymentsFromTo } from "../../apis/ApisHandale";
import AdsSection from "../UserComponenet/Ads/AdsSection";
import PaymentLineChartContainer from "./Charts/PaymentLineChart/PaymentLineChartContainer";
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
  useEffect(() => {}, []);
  return (
    <div className="ST-section ST-Dashboard">
      <DashboardWelcome user={user} />
      <hr className="my-4" />
      <AdsSection darkMode={darkMode} />
      <hr className="my-4" />
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4 my-4">
        <div
          className={`w-100 ${darkMode ? " spic-dark-mode" : "bg-white"} p-4`}
        >
          <div className="home-size d-flex flex-column justify-content-center align-items-center gap-1">
            <div className="d-flex gap-4 align-items-center">
              <i class="h3 colorMain fa-solid fa-globe"></i>
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
          className={`w-100 ${darkMode ? " spic-dark-mode" : "bg-white"} p-4`}
        >
          <div className="home-size d-flex flex-column justify-content-center align-items-center gap-1">
            <div className="d-flex gap-4 align-items-center">
              <i class="h3 colorMain fa-solid fa-user"></i>
              <span className="h5 colorMain m-0">Staff</span>
            </div>
            <span className="h5 mid-bold">{3}</span>
            <div style={{ width }} className="progress">
              <div
                className={`progress-bar`}
                style={{ width: `${(3 * 100) / 38}%` }}
                role="progressbar"
                aria-valuenow={(3 * 100) / 38}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        <div
          className={`w-100 ${darkMode ? " spic-dark-mode" : "bg-white"} p-4`}
        >
          <div className="home-size d-flex flex-column justify-content-center align-items-center gap-1">
            <div className="d-flex gap-4 align-items-center">
              <i class="h3 colorMain fa-solid fa-hospital-user"></i>
              <span className="h5 colorMain m-0">Patients</span>
            </div>
            <span className="h5 mid-bold">{27}</span>
            <div style={{ width }} className="progress">
              <div
                className={`progress-bar`}
                style={{ width: `${(27 * 100) / 38}%` }}
                role="progressbar"
                aria-valuenow={(27 * 100) / 38}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        <div
          className={`w-100 ${darkMode ? " spic-dark-mode" : "bg-white"} p-4`}
        >
          <div className="home-size d-flex flex-column justify-content-center align-items-center gap-1">
            <div className="d-flex gap-4 align-items-center">
              <i class="h3 colorMain fa-solid fa-user-doctor"></i>
              <span className="h5 colorMain m-0">Doctors</span>
            </div>
            <span className="h5 mid-bold">{8}</span>
            <div style={{ width }} className="progress">
              <div
                className={`progress-bar`}
                style={{ width: `${(8 * 100) / 38}%` }}
                role="progressbar"
                aria-valuenow={(8 * 100) / 38}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="row maxHeight-part">
        <div
          className={`p-4 col-12 col-md-7 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
          <PaymentLineChartContainer darkMode={darkMode} />
        </div>
        <div className="col-1"></div>
        <div
          className={`maxHeight-inhert overflow-hidden p-4 col-12 col-md-4 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
          <h1 className="h5 mb-4">Recent Messages:</h1>
          <div className="maxHeight-inhert overflow-yAxis message-Box">
            <div className="row detailes-size d-flex align-items-center">
              <div className="col-1">1</div>
              <div className="col-9">
                <div className="d-flex align-items-center gap-2">
                  <img
                    loading="lazy"
                    className={`nav-profile-img mx-2 img-fluid border ${
                      darkMode ? "border-white" : "border-black"
                    } border-rounded`}
                    src={"./images/logo.png"}
                    alt="nav-profile-img"
                    style={{ objectFit: "cover" }}
                  />
                  <p className="h6 m-0 text-truncate">{"Omar Khaled"}</p>
                </div>
              </div>
              <div style={{ cursor: "pointer" }} className="col-1">
                <i class="fa-solid fa-circle-chevron-right fa-beat-fade"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
}
