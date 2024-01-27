import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UserDashbordNav } from "../../../componentsLoader/ComponentsLoader";

export default function StorageController({ setActiveId }) {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "Preview",
      path: "/Staff/StorageController/ItemsPreview",
    },
    {
      id: 2,
      text: "Add Item",
      path: "/Staff/StorageController/AddItem",
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
        </Suspense>{" "}
      </div>
      <div className="ST-section ST-Storage-Dashboard mt-0">
        <Outlet />
      </div>
    </>
  );
}
