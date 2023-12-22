import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserDashbordNav from "../../UserDashbordNav";

export default function ResultsController() {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "Ready Samples",
      path: "/Staff/ResultsController/ResultsPreview",
    },
    {
      id: 2,
      text: "Unprepared Samples",
      path: "/Staff/ResultsController/UnpreparedSamples",
    },
    {
      id: 3,
      text: "New Sample",
      path: "/Staff/ResultsController/AddResult",
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
