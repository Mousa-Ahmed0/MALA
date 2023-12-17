import React, { useEffect, useState } from "react";
import DashboardWelcome from "../DashboardWelcome";
import { useDarkMode } from "../../context/DarkModeContext";
import AdsSection from "../UserComponenet/Ads/AdsSection";
import PaymentLineChartContainer from "./Charts/PaymentLineChart/PaymentLineChartContainer";
import MessageBox from "./MessagesHandale/MessageBox/MessageBox";
import axios from "axios";
import { getDatasetAtEvent } from "react-chartjs-2";
export default function DashboardHome({ user }) {
  const { darkMode } = useDarkMode();
  const width = "-webkit-fill-available";
  const [staffCount, setStaffCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);

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
          className={`maxHeight-inhert overflow-hidden p-4 col-12 col-md-4 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
          <h1 className="h5 mb-4">Recent Messages:</h1>
          <MessageBox darkMode={darkMode} />
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
}
