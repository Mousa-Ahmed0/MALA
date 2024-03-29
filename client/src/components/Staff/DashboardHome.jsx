import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//
import { useDarkMode } from "../../context/DarkModeContext";
//
import {
  AdsSection,
  MessageBox,
  PaymentLineChartContainer,
  VisitorsLineChartContainer,
  DashboardWelcome,
} from "../../componentsLoader/ComponentsLoader";

export default function DashboardHome({ user, setActiveId }) {
  const { darkMode } = useDarkMode();
  const width = "-webkit-fill-available";
  const [staffCount, setStaffCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [nonReadNo, setNonReadNo] = useState(0);
  const [unpreperdSambles, setunpreperdSambles] = useState(0);
  const [unPaymentResults, setunPaymentResults] = useState(0);
  const [unGuestMsg, setunGuestMsg] = useState(0);

  //get unread messages from guests
  async function getunGuestMsg() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/guest/countIfRead",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setunGuestMsg(response.data.count);
    } catch (error) {
      if (!error?.response.status === 400) {
        console.error("Error from getunGuestMsg:", error);
      }
    }
  }

  //get count of unpreperdSambles
  async function getunpreperdSambles() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/result/getResults/ifDoneCount",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setunpreperdSambles(response.data.Number_of_false);
    } catch (error) {
      console.error("Error from getNonReadMessagesCount:", error);
    }
  }
  //get count of unPaymentResults
  async function getunPaymentResults() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/result/getResults/ifPaiedCount",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      // console.log(response);
      setunPaymentResults(response.data.Number_of_false);
    } catch (error) {
      console.error("Error from getNonReadMessagesCount:", error);
    }
  }
  //get count of non-read messages
  async function getNonReadMessagesCount() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/massage/countRead",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      // console.log("from non read", response);
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
    setActiveId(1);
    //initial
    getPatientCount();
    getStaffCount();
    getDoctorsCount();
    getNonReadMessagesCount();
    getunpreperdSambles();
    getunPaymentResults();
    getunGuestMsg();
  }, []);
  return (
    <div className="ST-section ST-Dashboard">
      <Suspense
        fallback={
          <div className="center-container">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <DashboardWelcome user={user} />
      </Suspense>
      <hr className="my-4" />
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4 my-4">
        <div
          className={`w-100 ${darkMode ? " spic-dark-mode" : "bg-white"} p-4`}
        >
          <div className="home-size d-flex flex-column justify-content-center align-items-center gap-1">
            <div className="d-flex gap-4 align-items-center">
              <i
                className={`h3  fa-solid fa-globe ${
                  darkMode ? "text-white" : "colorMain"
                }`}
              ></i>
              <span
                className={`h5  m-0 ${darkMode ? "text-white" : "colorMain"}`}
              >
                Users
              </span>
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
              <i
                className={`h3 fa-solid fa-user ${
                  darkMode ? "text-white" : "colorMain"
                }`}
              ></i>
              <span
                className={`h5  m-0 ${darkMode ? "text-white" : "colorMain"}`}
              >
                Staff
              </span>
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
              <i
                className={`h3 fa-solid fa-hospital-user ${
                  darkMode ? "text-white" : "colorMain"
                }`}
              ></i>
              <span
                className={`h5 m-0 ${darkMode ? "text-white" : "colorMain"}`}
              >
                Patients
              </span>
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
              <i
                className={`h3 fa-solid fa-user-doctor ${
                  darkMode ? "text-white" : "colorMain"
                }`}
              ></i>
              <span
                className={`h5  m-0 ${darkMode ? "text-white" : "colorMain"}`}
              >
                Doctors
              </span>
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
          className={`p-4 col-12 col-lg-7 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
          <Suspense
            fallback={
              <div className="center-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            <PaymentLineChartContainer darkMode={darkMode} />
          </Suspense>
        </div>
        <div className="col-1"></div>
        <div
          className={`p-4 col-12 col-lg-4 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
          <div className="row align-items-center">
            <div className="col-8 d-flex gap-2">
              <span className=" h5 m-0 colorMain">
                <i
                  className={`fa-solid fa-envelope ${
                    darkMode ? "text-white" : ""
                  }`}
                ></i>
              </span>
              <h1 className=" h5 m-0">Recent Messages:</h1>
            </div>
            <div className="col-4 d-flex justify-content-end colorMain">
              <h1 className={`h6  m-0 ${darkMode ? "text-white" : ""}`}>
                {nonReadNo === 0 || !nonReadNo ? (
                  "All Message Readed!"
                ) : (
                  <div className=" mid-bold">+{nonReadNo} </div>
                )}
              </h1>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="center-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            <MessageBox darkMode={darkMode} />
          </Suspense>
        </div>
      </div>
      <hr className="my-4" />
      <div className="row maxHeight-part">
        <div
          className={`p-4 col-12 col-lg-7 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
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
            <VisitorsLineChartContainer darkMode={darkMode} />
          </Suspense>
        </div>
        <div className="col-1"></div>
        <div
          className={`p-4 col-12 col-lg-4 ${
            darkMode ? " spic-dark-mode" : " bg-white"
          }`}
        >
          <div className="row align-items-center">
            <div className="col-12 d-flex gap-2">
              <span className=" h5 m-0 colorMain">
                <i
                  className={`fa-solid fa-note-sticky ${
                    darkMode ? "text-white" : ""
                  }`}
                ></i>{" "}
              </span>
              <h1 className=" h5 m-0">Important Notes:</h1>
            </div>
            <hr className="my-3" />
            {unpreperdSambles === 0 && unPaymentResults === 0 ? (
              <div className="row home-size d-flex align-items-center mt-3 mb-4 high-bold colorMain">
                You are Finished!
              </div>
            ) : (
              ""
            )}
            {unpreperdSambles !== 0 ? (
              <div className="row home-size d-flex align-items-center mt-3 mb-4">
                <div className="col-10">
                  You Have{" "}
                  <span className="high-bold colorMain">
                    {unpreperdSambles}
                  </span>{" "}
                  Sambles Not Ready Yet!
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <Link
                    to={"/Staff/ResultsController/UnpreparedSamples"}
                    className="btn m-0 nav-link position-relative"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            {unPaymentResults !== 0 ? (
              <div className="row home-size d-flex align-items-center mt-3 mb-4">
                <div className="col-10">
                  You Have{" "}
                  <span className="high-bold colorMain">
                    {unPaymentResults}
                  </span>{" "}
                  Samples didnt payed yet!
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <Link
                    to={"/Staff/PaymentsController/NotPaidPayments"}
                    className="btn m-0 nav-link position-relative"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}{" "}
            {unGuestMsg !== 0 ? (
              <div className="row home-size d-flex align-items-center mt-3 mb-4">
                <div className="col-10">
                  You Have{" "}
                  <span className="high-bold colorMain">{unGuestMsg}</span>{" "}
                  Messages from Guests didnt seen yet!
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <Link
                    to={"/Staff/PaymentsController/NotPaidPayments"}
                    className="btn m-0 nav-link position-relative"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <Suspense
        fallback={
          <div className="center-container">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <AdsSection darkMode={darkMode} />
      </Suspense>
    </div>
  );
}
