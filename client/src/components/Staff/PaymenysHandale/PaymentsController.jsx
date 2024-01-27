import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UserDashbordNav } from "../../../componentsLoader/ComponentsLoader";

export default function PaymentsController({ setActiveId }) {
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

  ////
  useEffect(() => {
    setActiveId(7);
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
        </Suspense>{" "}
      </div>
      <div className="ST-section ST-Anlysis-Dashboard mt-0">
        <Outlet />
      </div>
    </>
  );
}
