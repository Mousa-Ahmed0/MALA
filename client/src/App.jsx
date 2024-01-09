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
/*analyze*/
import Anlysis from "./components/Anlysis/AnlysisContainer.jsx";
import AnlyiseDetails from "./components/AnlyiseDetails/AnlyiseDetails";
/*result*/
import ResultDetails from "./components/ResultDetails/ResultDetails.jsx";
/*profile*/
import Profile from "./components/UserComponenet/UserProfile/UserProfileContainer.jsx";
/*Ads*/
import AdDetails from "./components/UserComponenet/Ads/AdDetails.jsx";
/*User Messenger*/
import MessageInterface from "./components/UserComponenet/Messenger/MessageInterface.jsx";
//LP Components
import Home from "./components/LandingPageCompon/Home/Home";
import About from "./components/LandingPageCompon/About/About";
import GuestAnlyses from "./components/LandingPageCompon/GuestAnlyses/Ganlyses";
import Contact from "./components/LandingPageCompon/Contact/Contact";
import Login from "./components/LandingPageCompon/Login/Login.jsx";
import ForgotPassword from "./components/LandingPageCompon/Login/ForgotPassword/ForgotPassword.jsx";
import ResetPasowrd from "./components/LandingPageCompon/Login/ForgotPassword/ResetPassword.jsx";
//StaffPage Components
import DashboardHome from "./components/Staff/DashboardHome.jsx";
/* Analysis */
import AnlysisController from "./components/Staff/AnlysisHandale/AnlysisController.jsx";
import AddAnlyze from "./components/Staff/AnlysisHandale/AnlysisHandaleComponenets/AddAnlyze.jsx";
import PreviewAnlysis from "./components/Staff/AnlysisHandale/AnlysisHandaleComponenets/PreviewAnlysis/PreviewAnlysisContainer.jsx";
import UpdateAnlyze from "./components/Staff/AnlysisHandale/AnlysisHandaleComponenets/PreviewAnlysis/PreviewAnlysisComponents/UpdateAnlyze.jsx";
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
import ResultsPreview from "./components/Staff/ResultsHandale/ResultsHandaleComponents/ResultsPreview/ReadySamples/ResultsPreviewContainer.jsx";
import UnpreparedSamples from "./components/Staff/ResultsHandale/ResultsHandaleComponents/ResultsPreview/UnpreparedSamples/UnpreparedSamplesContainer.jsx";
import AddResult from "./components/Staff/ResultsHandale/ResultsHandaleComponents/AddResult/AddResultContainer.jsx";
import EditResult from "./components/Staff/ResultsHandale/ResultsHandaleComponents/EditResult/EditResultContainer.jsx";
/* Messages */
import MessageController from "./components/Staff/MessagesHandale/MessageController.jsx";
import UsersMessages from "./components/Staff/MessagesHandale/MessagePreview/UsersMessages.jsx";
import GuestsMessages from "./components/Staff/MessagesHandale/MessagePreview/GuestsMessages.jsx";

/* PaymentsController */
import PaymentsController from "./components/Staff/PaymenysHandale/PaymentsController.jsx";
import PaymentsPreviewContainer from "./components/Staff/PaymenysHandale/PaymentsHandaleComponents/PaymentsPreview/PaymentsPreviewContainer.jsx";
import NotPaidResultsContainer from "./components/Staff/PaymenysHandale/PaymentsHandaleComponents/NotPaidResults/NotPaidResultsContainer.jsx";
import AddAPayment from "./components/Staff/PaymenysHandale/PaymentsHandaleComponents/AddAPayment.jsx";
/* AdsController */
import AdsController from "./components/Staff/AdsHandale/AdsController.jsx";
import AddNewAdd from "./components/Staff/AdsHandale/AdsHandaleComponents/AddNewAdd.jsx";
import AdsPreviewContainer from "./components/Staff/AdsHandale/AdsHandaleComponents/AdsPreview/AdsPreviewContainer.jsx";

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
import PatResultsPreviewContainer from "./components/Patient/PatientComponents/PatResultsPreview/PatResultsPreviewContainer.jsx";

//Doctor
/* DoctorHome */
import DoctorHome from "./components/Doctor/DoctorHome.jsx";

import { useDarkMode } from "./context/DarkModeContext.jsx";
import PatPaymentsPreviewContainer from "./components/Patient/PatientComponents/PatPaymentsPreview/PatPaymentsPreviewContainer.jsx";

export default function App() {
  let [isFormOpen, setIsFormOpen] = useState(false);
  let [isPdfLoading, setIsPdfLoading] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  //NavBars
  const guestNavBarValues = [
    { id: 1, text: "Home", path: "/Home" },
    { id: 2, text: "About", path: "/About" },
    { id: 3, text: "GuestAnlyses", path: "/GuestAnlyses" },
    { id: 4, text: "Contact", path: "/Contact" },
    { id: 6, text: "|", path: null },
    { id: 7, text: "Login", path: "/Login" },
  ];
  const adminNavBarValues = [
    { id: 1, text: "Home", path: "/Staff/dashboard" },
    { id: 10, text: "Messenger", path: "/Staff/MessagePreview" },
    { id: 2, text: "Users", path: "/Staff/UsersController" },
    { id: 3, text: "Anlysis", path: "/Staff/AnlysisController" },
    { id: 4, text: "Storage", path: "/Staff/StorageController" },
    { id: 5, text: "Results", path: "/Staff/ResultsController" },
    { id: 7, text: "Payments", path: "/Staff/PaymentsController" },
    { id: 8, text: "Ads", path: "/Staff/AdsController" },
    { id: 6, text: "|", path: null },
  ];
  const staffNavBarValues = [
    { id: 1, text: "Home", path: "/Staff/dashboard" },
    { id: 10, text: "Messenger", path: "/Staff/MessagePreview" },
    { id: 2, text: "Users", path: "/Staff/UsersController" },
    { id: 3, text: "Anlysis", path: "/Staff/AnlysisController" },
    { id: 4, text: "Storage", path: "/Staff/StorageController" },
    { id: 5, text: "Results", path: "/Staff/ResultsController" },
    { id: 7, text: "Payments", path: "/Staff/PaymentsController" },
    { id: 6, text: "|", path: null },
  ];
  const PatientNavBarValues = [
    { id: 1, text: "Home", path: "/Patient/PatientHome" },
    { id: 2, text: "Healthy Calculators", path: "/Patient/HealthCalculators" },
    { id: 3, text: "Anlysis", path: "/Patient/Anlysis" },
    {
      id: 4,
      text: "Contact Us",
      path: `/Patient/contactLab/${userDetails.id}`,
    },
    { id: 6, text: "|", path: null },
  ];
  const DoctorNavBarValues = [
    { id: 1, text: "Home", path: "/Doctor/Home" },
    {
      id: 2,
      text: "Contact Us",
      path: `/Doctor/contactLab/${userDetails.id}`,
    },
    { id: 6, text: "|", path: null },
  ];
  ///////////////
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
          <div
            className={`${
              isPdfLoading ? "d-flex " : "d-none"
            } position-absolute bg-black high-opasity z-150  w-100 justify-content-center align-items-center`}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <header
            className={`all-Mid-shadow position-relative w-100 ${
              darkMode ? " spic-dark-mode" : "light"
            } bg-white`}
          >
            <Navbar
              values={
                userDetails.usertype === "Admin"
                  ? adminNavBarValues
                  : userDetails.usertype === "Staff"
                  ? staffNavBarValues
                  : userDetails.usertype === "Patient"
                  ? PatientNavBarValues
                  : userDetails.usertype === "Doctor"
                  ? DoctorNavBarValues
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
                      <PatientHome
                        user={userDetails}
                        isPdfLoading={isPdfLoading}
                        setIsPdfLoading={setIsPdfLoading}
                      />
                    ) : userDetails.usertype === "Doctor" ? (
                      <DoctorHome user={userDetails} />
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
                      setUserDetails={setUserDetails}
                    />
                  }
                />
                <Route
                  path="/ResultDetails/:id"
                  element={<ResultDetails user={userDetails} />}
                />
                <Route path="/AddAPayment/:id" element={<AddAPayment />} />

                <Route
                  path="/password/forgot-password"
                  element={<ForgotPassword darkMode={darkMode} />}
                />
                <Route
                  path="/password/reset-password/:userId/:token"
                  element={<ResetPasowrd darkMode={darkMode} />}
                />
                <Route
                  path="/AdDetails/:id"
                  element={<AdDetails darkMode={darkMode} />}
                />
                <Route path="*" element={<Error />} />
              </Route>
              <Route path="/Doctor" element={<Doctor />}>
                <Route
                  path="/Doctor/Home"
                  element={<DoctorHome user={userDetails} />}
                />
                <Route
                  path="/Doctor/contactLab/:id"
                  element={
                    <MessageInterface user={userDetails} darkMode={darkMode} />
                  }
                />
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
                    element={<PreviewAnlysis />}
                  />
                  <Route
                    path="/Staff/AnlysisController/UpdateAnlyze/:code"
                    element={<UpdateAnlyze />}
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
                    path="/Staff/ResultsController/EditResult/:id"
                    element={<EditResult />}
                  />
                  <Route
                    path="/Staff/ResultsController/ResultsPreview"
                    element={<ResultsPreview />}
                  />
                  <Route
                    path="/Staff/ResultsController/UnpreparedSamples"
                    element={<UnpreparedSamples />}
                  />
                </Route>
                <Route
                  path="/Staff/PaymentsController"
                  element={<PaymentsController />}
                >
                  <Route
                    path="/Staff/PaymentsController/PaymentsPreview"
                    element={
                      <PaymentsPreviewContainer
                        setIsPdfLoading={setIsPdfLoading}
                      />
                    }
                  />
                  <Route
                    path="/Staff/PaymentsController/NotPaidPayments"
                    element={<NotPaidResultsContainer />}
                  />
                </Route>
                <Route path="/Staff/AdsController" element={<AdsController />}>
                  <Route
                    path="/Staff/AdsController/AddNewAdd"
                    element={<AddNewAdd setIsFormOpen={setIsFormOpen} />}
                  />
                  <Route
                    path="/Staff/AdsController/AdsPreview"
                    element={<AdsPreviewContainer />}
                  />
                </Route>
                <Route
                  path="/Staff/MessagePreview"
                  element={<MessageController darkMode={darkMode} />}
                >
                  <Route
                    path="/Staff/MessagePreview/UsersMessages"
                    element={<UsersMessages darkMode={darkMode} />}
                  />
                  <Route
                    path="/Staff/MessagePreview/GuestMessages"
                    element={
                      <GuestsMessages
                        darkMode={darkMode}
                        setIsFormOpen={setIsFormOpen}
                      />
                    }
                  />
                </Route>

                <Route path="*" element={<Error />} />
              </Route>
              <Route path="/Patient" element={<Patient />}>
                <Route
                  path="/Patient/PatientHome"
                  element={
                    <PatientHome
                      user={userDetails}
                      setIsPdfLoading={setIsPdfLoading}
                    />
                  }
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
                <Route
                  path="/Patient/ResultsPreview/:ident"
                  element={<PatResultsPreviewContainer />}
                />
                <Route
                  path="/Patient/PaymentsReview/:ident"
                  element={
                    <PatPaymentsPreviewContainer
                      setIsPdfLoading={setIsPdfLoading}
                    />
                  }
                />
                <Route
                  path="/Patient/contactLab/:id"
                  element={
                    <MessageInterface user={userDetails} darkMode={darkMode} />
                  }
                />
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
