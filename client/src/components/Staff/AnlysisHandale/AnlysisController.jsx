import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserDashbordNav from "../../UserDashbordNav";

export default function AnlysisController() {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "Preview",
      path: "/Staff/AnlysisController/PreviewAnlysis",
    },
    {
      id: 2,
      text: "Add an Analyze",
      path: "/Staff/AnlysisController/AddAnlyze",
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
