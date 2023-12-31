import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserDashbordNav from "../../UserDashbordNav";

export default function PaymentsController() {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "Payments",
      path: "/Staff/PaymentsController/PaymentsPreview",
    },
    {
      id: 2,
      text: "Unpaid Samples",
      path: "/Staff/PaymentsController/NotPaidPayments",
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
