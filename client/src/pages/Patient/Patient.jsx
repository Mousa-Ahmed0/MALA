import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
export default function Patient() {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="page patientPage">
      {loading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
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
