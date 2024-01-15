import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
export default function Doctor() {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="page patientPage">
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="container">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}
