import React from "react";
import { Outlet } from "react-router-dom";
import UserDashbordNav from "../../UserDashbordNav";

export default function AdsController() {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "Preview",
      path: "/Staff/ReportsController/ReportsPreview",
    },
    {
      id: 2,
      text: "Add Add",
      path: "/Staff/AdsController/AddNewAdd",
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
