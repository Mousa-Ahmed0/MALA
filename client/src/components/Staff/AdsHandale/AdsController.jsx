import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UserDashbordNav } from "../../../componentsLoader/ComponentsLoader";

export default function AdsController({ setActiveId }) {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "Preview",
      path: "/Staff/AdsController/AdsPreview",
    },
    {
      id: 2,
      text: "Add Add",
      path: "/Staff/AdsController/AddNewAdd",
    },
  ];

  ////
  useEffect(() => {
    setActiveId(8);
  }, []);
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
        </Suspense>
      </div>
      <div className="ST-section ST-Anlysis-Dashboard mt-0">
        <Outlet />
      </div>
    </>
  );
}
