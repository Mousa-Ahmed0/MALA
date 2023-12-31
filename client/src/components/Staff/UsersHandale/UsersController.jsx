import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserDashbordNav from "../../UserDashbordNav";

export default function UsersController() {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "Preview",
      path: "/Staff/UsersController/UsersPreview",
    },
    {
      id: 2,
      text: "Add an User",
      path: "/Staff/UsersController/Register",
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
