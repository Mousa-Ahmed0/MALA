import "./Staff.css";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Staff({ user }) {
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let accissError = (
    <div class="w-100 h-100 d-flex flex-column align-items-center">
      <div class="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
        Error 403 !
      </div>
      <div class="my-4 mid-bold">
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
