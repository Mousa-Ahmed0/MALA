import "./LandingPage.css";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function LandingPage({ user }) {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="page">
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="container">
            <Outlet user={user} />
          </div>
        </>
      )}
    </div>
  );
}
