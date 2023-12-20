import React, { useEffect, useState } from "react";
import axios from "axios";
//
import { useDarkMode } from "../../context/DarkModeContext";
//
import DashboardWelcome from "../DashboardWelcome";
import AdsSection from "../UserComponenet/Ads/AdsSection";
import MessageBox from "./MessagesHandale/MessageBox/MessageBox";
import PaymentLineChartContainer from "./Charts/PaymentLineChart/PaymentLineChartContainer";
import VisitorsLineChartContainer from "./Charts/VisitorsLineChart/VisitorsLineChartContainer";
export default function DashboardHome({ user }) {
  const { darkMode } = useDarkMode();
  const width = "-webkit-fill-available";
  const [staffCount, setStaffCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [nonReadNo, setNonReadNo] = useState(0);

  //get count of non-read messages
  async function getNonReadMessagesCount() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/massage/countRead",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setNonReadNo(response.data.No);
    } catch (error) {
      console.error("Error from getNonReadMessagesCount:", error);
    }
  }
  //get Patients count
  async function getDoctorsCount() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/countDoctor",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setDoctorsCount(response.data);
    } catch (error) {
      console.error("Error From getDoctorsCount: ", error);
    }
  }
  //get Patients count
  async function getStaffCount() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/countStaff",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setStaffCount(response.data);
    } catch (error) {
      console.error("Error From getStaffCount: ", error);
    }
  }
  //get Patients count
  async function getPatientCount() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/countPatient",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setPatientCount(response.data);
    } catch (error) {
      console.error("Error From Get PatientsNo.: ", error);
    }
  }
  ///////////////////////////////
  useEffect(() => {
    //initial
    getPatientCount();
    getStaffCount();
    getDoctorsCount();
    getNonReadMessagesCount();
  }, []);
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
            <span className="h5 mid-bold">
              {patientCount + doctorsCount + staffCount}
            </span>
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
            <span className="h5 mid-bold">{staffCount}</span>
            <div style={{ width }} className="progress">
              <div
                className={`progress-bar`}
                style={{
                  width: `${
                    (staffCount * 100) /
                    (patientCount + doctorsCount + staffCount)
                  }%`,
                }}
                role="progressbar"
                aria-valuenow={
                  (staffCount * 100) /
                  (patientCount + doctorsCount + staffCount)
                }
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
            <span className="h5 mid-bold">{patientCount}</span>
            <div style={{ width }} className="progress">
              <div
                className={`progress-bar`}
                style={{
                  width: `${
                    (patientCount * 100) /
                    (patientCount + doctorsCount + staffCount)
                  }%`,
                }}
                role="progressbar"
                aria-valuenow={
                  (patientCount * 100) /
                  (patientCount + doctorsCount + staffCount)
                }
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
            <span className="h5 mid-bold">{doctorsCount}</span>
            <div style={{ width }} className="progress">
              <div
                className={`progress-bar`}
                style={{
                  width: `${
                    (doctorsCount * 100) /
                    (patientCount + doctorsCount + staffCount)
                  }%`,
                }}
                role="progressbar"
                aria-valuenow={
                  (doctorsCount * 100) /
                  (patientCount + doctorsCount + staffCount)
                }
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
          className={`p-4 col-12 col-md-4 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
          <div className="row align-items-center">
            <div className="col-10 d-flex gap-2">
              <span className=" h5 m-0 colorMain">
                <i class="fa-solid fa-inbox"></i>
              </span>
              <h1 className=" h5 m-0">Recent Messages:</h1>
            </div>
            <div className="col-2 d-flex justify-content-end colorMain">
              <h1 className="h3  m-0">
                {nonReadNo === 0 ? (
                  "All Message Readed!"
                ) : (
                  <div className=" mid-bold">+{nonReadNo} </div>
                )}
              </h1>
            </div>
          </div>
          <MessageBox darkMode={darkMode} />
        </div>
      </div>
      <hr className="my-4" />
      {/*<div className="row maxHeight-part">
        <div
          className={`p-4 col-12 col-md-7 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
          <VisitorsLineChartContainer darkMode={darkMode} />
        </div>
        <div className="col-1"></div>
        <div
          className={`p-4 col-12 col-md-4 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
          <div className="row align-items-center">
            <div className="col-10 d-flex gap-2">
              <span className=" h5 m-0 colorMain">
                <i class="fa-solid fa-inbox"></i>
              </span>
              <h1 className=" h5 m-0">Recent Messages:</h1>
            </div>
            <div className="col-2 d-flex justify-content-end colorMain">
              <h1 className="h3  m-0">
                {nonReadNo === 0 ? (
                  "All Message Readed!"
                ) : (
                  <div className=" mid-bold">+{nonReadNo} </div>
                )}
              </h1>
            </div>
          </div>
          <MessageBox darkMode={darkMode} />
        </div>
      </div>*/}
    </div>
  );
}
