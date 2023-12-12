import "./Staff.css";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Staff({ user }) {
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let accissError = (
    <div class="container w-100 h-100 d-flex flex-column align-items-center">
      <div class="alert alert-danger gap-1 my-4 mid-bold w-100 d-flex justify-content-center align-items-center">
        Error <span className="h1 m-0 colorMain">403</span>!
      </div>
      <div class="my-2 mid-bold">
        Theres a proplem! You are not allowed to be here.
      </div>
    </div>
  );

  function goToLogIn() {
    navigate({
      pathname: "/Login",
    });
  }
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="page">
      <>
        {user ? (
          user.usertype === "Admin" || user.usertype === "Staff" ? (
            <div className="container">
              <Outlet />
            </div>
          ) : (
            accissError
          )
        ) : (
          goToLogIn()
        )}
      </>
    </div>
  );
}
