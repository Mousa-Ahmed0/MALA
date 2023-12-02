import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
//Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import Staff from "./pages/Staff/Staff";
import Doctor from "./pages/Doctor/Doctor";
import Patient from "./pages/Patient/Patient";
import Error from "./pages/Error/Error";
//Components
import Anlysis from "./components/Anlysis/AnlysisContainer.jsx";
import AnlyiseDetails from "./components/AnlyiseDetails/AnlyiseDetails";
import ResultDetails from "./components/ResultDetails/ResultDetails.jsx";
import Profile from "./components/UserComponenet/UserProfile/UserProfileContainer.jsx";
//LP Components
import Home from "./components/LandingPageCompon/Home/Home";
import About from "./components/LandingPageCompon/About/About";
import GuestAnlyses from "./components/LandingPageCompon/GuestAnlyses/Ganlyses";
import Contact from "./components/LandingPageCompon/Contact/Contact";
import Login from "./components/LandingPageCompon/Login/Login.jsx";
import ForgotPassword from "./components/LandingPageCompon/Login/ForgotPassword.jsx";
//StaffPage Components
import DashboardHome from "./components/Staff/DashboardHome.jsx";
/* Analysis */
import AnlysisController from "./components/Staff/AnlysisHandale/AnlysisController.jsx";
import AddAnlyze from "./components/Staff/AnlysisHandale/AnlysisHandaleComponenets/AddAnlyze.jsx";
import PreviewAnlysis from "./components/Staff/AnlysisHandale/AnlysisHandaleComponenets/PreviewAnlysis/PreviewAnlysisContainer.jsx";
/* UsersController */
import UsersController from "./components/Staff/UsersHandale/UsersController.jsx";
import UsersPreview from "./components/Staff/UsersHandale/UsersHandaleComponenets/UserPreview/UsersPreview.jsx";
import Register from "./components/Staff/UsersHandale/UsersHandaleComponenets/Register/Register.jsx";
/* StorageController */
import StorageController from "./components/Staff/StorageHandale/StorageController.jsx";
import ItemsPreview from "./components/Staff/StorageHandale/StorageHandaleComponents/ItemsPreview/ItemsPreviewContainer.jsx";
import AddItem from "./components/Staff/StorageHandale/StorageHandaleComponents/AddItem.jsx";
/* ResultsController */
import ResultsController from "./components/Staff/ResultsHandale/ResultsController.jsx";
import ResultsPreview from "./components/Staff/ResultsHandale/ResultsHandaleComponents/ResultsPreview/ResultsPreviewContainer.jsx";
import AddResult from "./components/Staff/ResultsHandale/ResultsHandaleComponents/AddResult/AddResultContainer.jsx";
/* ReportsController */
import ReportsController from "./components/Staff/ReportsHandale/ReportsController.jsx";
import ReportsPreview from "./components/Staff/ReportsHandale/ReportsHandaleComponents/ResultsPreview/ReportsPreviewContainer.jsx";
import MakeReport from "./components/Staff/ReportsHandale/ReportsHandaleComponents/MakeReport.jsx";
/* PaymentsController */
import PaymentsController from "./components/Staff/PaymenysHandale/PaymentsController.jsx";
import PaymentsPreviewContainer from "./components/Staff/PaymenysHandale/PaymentsHandaleComponents/PaymentsPreview/PaymentsPreviewContainer.jsx";
import AddAPayment from "./components/Staff/PaymenysHandale/PaymentsHandaleComponents/AddAPayment.jsx";
//ullits components
import Footer from "./ulitls/Footer/Footer";
import Navbar from "./ulitls/Navbar/Navbar.jsx";

//Patient
/* PatientHome */
import PatientHome from "./components/Patient/PatientHome.jsx";
import HealthCalculators from "./components/Patient/PatientComponents/HealthCalcs/HealthCalcsController.jsx";
import BMR from "./components/Patient/PatientComponents/HealthCalcs/HealthCalcsComponenets/BMR.jsx";
import BMI from "./components/Patient/PatientComponents/HealthCalcs/HealthCalcsComponenets/BMI.jsx";
import BFC from "./components/Patient/PatientComponents/HealthCalcs/HealthCalcsComponenets/BFC.jsx";

import { useDarkMode } from "./context/DarkModeContext.jsx";

export default function App() {
  let [isFormOpen, setIsFormOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const guestNavBarValues = [
    { id: 1, text: "Home", path: "/Home" },
    { id: 2, text: "About", path: "/About" },
    { id: 3, text: "GuestAnlyses", path: "/GuestAnlyses" },
    { id: 4, text: "Contact", path: "/Contact" },
    { id: 6, text: "|", path: null },
    { id: 7, text: "Login", path: "/Login" },
  ];
  const staffNavBarValues = [
    { id: 1, text: "Home", path: "/Staff/dashboard" },
    { id: 2, text: "Users", path: "/Staff/UsersController" },
    { id: 8, text: "Payments", path: "/Staff/PaymentsController" },
    { id: 5, text: "Results", path: "/Staff/ResultsController" },
    { id: 7, text: "Reports", path: "/Staff/ReportsController" },
    { id: 3, text: "Anlysis", path: "/Staff/AnlysisController" },
    { id: 4, text: "Storage", path: "/Staff/StorageController" },
    { id: 6, text: "|", path: null },
  ];
  const PatientNavBarValues = [
    { id: 1, text: "Home", path: "/Patient/PatientHome" },
    { id: 2, text: "Healthy Calculators", path: "/Patient/HealthCalculators" },
    { id: 3, text: "Anlysis", path: "/Patient/Anlysis" },
    { id: 6, text: "|", path: null },
  ];
  //login user details
  let [userDetails, setUserDetails] = useState({});
  /* get user token and decode it */
  function setUserData() {
    let token = localStorage.getItem("token");
    let decodeData = jwtDecode(token);
    setUserDetails(decodeData);
  }

  /* log out: clear toke local storage, clear userDetails. */
  function logout() {
    localStorage.removeItem("token");
    setUserDetails({});
    console.log("logout");
    navigate({
      pathname: "/Login",
    });
  }

  /* goTo page */
  function goToPage() {
    navigate({
      pathname: `/profile/${userDetails.id}`,
    });
  }

  useEffect(() => {
    setLoading(false);
    if (localStorage.getItem("token")) {
      setUserData();
    }
  }, []);
  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <header
            className={`all-Mid-shadow position-relative w-100 ${
              darkMode ? " spic-dark-mode" : "light"
            } bg-white`}
          >
            <Navbar
              values={
                userDetails.usertype === "Staff" ||
                userDetails.usertype === "Admin"
                  ? staffNavBarValues
                  : userDetails.usertype === "Patient"
                  ? PatientNavBarValues
                  : guestNavBarValues
              }
              userDetails={userDetails}
              logout={logout}
            />
          </header>
          <main className={`${isFormOpen ? "" : ""}`}>
            <div
              className={`${
                isFormOpen ? "d-block " : "d-none"
              } position-absolute bg-black low-opasity z-150  w-100`}
            ></div>
            <Routes>
              <Route path="/" element={<LandingPage user={userDetails} />}>
                <Route
                  path="/"
                  element={
                    userDetails.usertype === "Staff" ||
                    userDetails.usertype === "Admin" ? (
                      <DashboardHome user={userDetails} />
                    ) : userDetails.usertype === "Patient" ? (
                      <PatientHome user={userDetails} />
                    ) : (
                      <Home />
                    )
                  }
                />
                <Route path="/Home" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/GuestAnlyses" element={<GuestAnlyses />} />
                <Route
                  path="/AnlyiseDetails/:code"
                  element={<AnlyiseDetails />}
                />
                <Route path="/Anlysis" element={<Anlysis />} />
                <Route path="/Contact" element={<Contact />} />
                <Route
                  path="/Login"
                  element={
                    <Login
                      setUserData={setUserData}
                      userDetails={userDetails}
                      goToPage={goToPage}
                    />
                  }
                />
                <Route
                  path="/Profile/:id"
                  element={
                    <Profile
                      userDetails={userDetails}
                      isFormOpen={isFormOpen}
                      setIsFormOpen={setIsFormOpen}
                    />
                  }
                />
                <Route path="/ResultDetails/:id" element={<ResultDetails />} />

                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="*" element={<Error />} />
              </Route>
              <Route path="/Doctor" element={<Doctor />}>
                <Route path="*" element={<Error />} />
              </Route>
              <Route
                path="/Staff"
                element={<Staff user={userDetails} logout={logout} />}
              >
                <Route index element={<DashboardHome user={userDetails} />} />
                <Route
                  path="/Staff/dashboard"
                  element={<DashboardHome user={userDetails} />}
                />
                <Route
                  path="/Staff/UsersController"
                  element={<UsersController />}
                >
                  <Route
                    path="/Staff/UsersController/Register"
                    element={<Register usertype={userDetails.usertype} />}
                  />
                  <Route
                    path="/Staff/UsersController/UsersPreview"
                    element={<UsersPreview user={userDetails} />}
                  />
                </Route>
                <Route
                  path="/Staff/AnlysisController"
                  element={<AnlysisController />}
                >
                  <Route
                    path="/Staff/AnlysisController/AddAnlyze"
                    element={<AddAnlyze />}
                  />
                  <Route
                    path="/Staff/AnlysisController/PreviewAnlysis"
                    element={<PreviewAnlysis setIsFormOpen={setIsFormOpen} />}
                  />
                </Route>
                <Route
                  path="/Staff/StorageController"
                  element={<StorageController />}
                >
                  <Route
                    path="/Staff/StorageController/AddItem"
                    element={<AddItem />}
                  />
                  <Route
                    path="/Staff/StorageController/ItemsPreview"
                    element={<ItemsPreview setIsFormOpen={setIsFormOpen} />}
                  />
                </Route>
                <Route
                  path="/Staff/ResultsController"
                  element={<ResultsController />}
                >
                  <Route
                    path="/Staff/ResultsController/AddResult"
                    element={<AddResult />}
                  />
                  <Route
                    path="/Staff/ResultsController/ResultsPreview"
                    element={<ResultsPreview setIsFormOpen={setIsFormOpen} />}
                  />
                </Route>
                <Route
                  path="/Staff/PaymentsController"
                  element={<PaymentsController />}
                >
                  <Route
                    path="/Staff/PaymentsController/PaymentsPreview"
                    element={<PaymentsPreviewContainer />}
                  />
                  <Route
                    path="/Staff/PaymentsController/AddAPayment"
                    element={<AddAPayment />}
                  />
                </Route>
                <Route
                  path="/Staff/ReportsController"
                  element={<ReportsController />}
                >
                  <Route
                    path="/Staff/ReportsController/MakeReport"
                    element={<MakeReport />}
                  />
                  <Route
                    path="/Staff/ReportsController/ReportsPreview"
                    element={<ReportsPreview setIsFormOpen={setIsFormOpen} />}
                  />
                </Route>
                <Route path="*" element={<Error />} />
              </Route>
              <Route path="/Patient" element={<Patient />}>
                <Route
                  path="/Patient/PatientHome"
                  element={<PatientHome user={userDetails} />}
                />
                <Route
                  path="/Patient/HealthCalculators"
                  element={<HealthCalculators />}
                >
                  <Route
                    path="/Patient/HealthCalculators/BMR"
                    element={<BMR />}
                  />
                  <Route
                    path="/Patient/HealthCalculators/BMI"
                    element={<BMI />}
                  />
                  <Route
                    path="/Patient/HealthCalculators/BFC"
                    element={<BFC />}
                  />
                </Route>
                <Route path="/Patient/Anlysis" element={<Anlysis />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}