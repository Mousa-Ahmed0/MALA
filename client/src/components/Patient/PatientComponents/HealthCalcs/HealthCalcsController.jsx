import React from "react";
import { Outlet } from "react-router";
import UserDashbordNav from "../../../UserDashbordNav";
export default function HealthCalcsController() {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "BMR",
      path: "/Patient/HealthCalculators/BMR",
    },
    {
      id: 2,
      text: "BMI",
      path: "/Patient/HealthCalculators/BMI",
    },
    {
      id: 3,
      text: "Body Fat",
      path: "/Patient/HealthCalculators/BFC",
    },
  ];
  ///////

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
