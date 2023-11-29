import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserDashbordNav from "../../UserDashbordNav";

export default function PaymentsController() {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "Preview",
      path: "/Staff/PaymentsController/PaymentsPreview",
    },
    {
      id: 2,
      text: "Add a Payment",
      path: "/Staff/PaymentsController/AddAPayment",
    },
  ];
  return (
    <>
      <div className="d-flex justify-content-center">
        <UserDashbordNav values={userDashNavbarValues} />
      </div>
      <div className="ST-section ST-Anlysis-Dashboard mt-0">
        <Outlet />
      </div>
    </>
  );
}
