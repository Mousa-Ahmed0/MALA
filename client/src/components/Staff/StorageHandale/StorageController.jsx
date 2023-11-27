import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserDashbordNav from "../../UserDashbordNav";

export default function StorageController() {
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
  return (
    <>
      <div className="d-flex justify-content-center">
        <UserDashbordNav values={userDashNavbarValues} />
      </div>
      <div className="ST-section ST-Storage-Dashboard mt-0">
        <Outlet />
      </div>
    </>
  );
}
