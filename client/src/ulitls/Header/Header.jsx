import React from "react";
import { Navbar } from "../../componentsLoader/ComponentsLoader";

export default function Header({ userDetails, darkMode, logout }) {
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
  return (
    <>
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
    </>
  );
}
