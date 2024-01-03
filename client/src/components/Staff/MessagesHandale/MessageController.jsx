import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserDashbordNav from "../../UserDashbordNav";

export default function MessageController() {
  const userDashNavbarValues = [
    {
      id: 1,
      text: "Users Messages",
      path: "/Staff/MessagePreview/UsersMessages",
    },
    {
      id: 2,
      text: "Guests Messages",
      path: "/Staff/MessagePreview/GuestMessages",
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
