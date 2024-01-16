import React, { Suspense } from "react";
import { Outlet } from "react-router";
import { UserDashbordNav } from "../../../../componentsLoader/ComponentsLoader";
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
  ];
  ///////

  return (
    <>
      <div className="d-flex justify-content-center">
        <Suspense
          fallback={
            <div className="center-container">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        >
          <UserDashbordNav values={userDashNavbarValues} />
        </Suspense>{" "}
      </div>
      <div className="ST-section ST-Anlysis-Dashboard mt-0">
        <Outlet />
      </div>
    </>
  );
}
