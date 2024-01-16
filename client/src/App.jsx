import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Header, Footer, Main } from "./componentsLoader/ComponentsLoader.js";
import { useDarkMode } from "./context/DarkModeContext.jsx";

export default function App() {
  let [isFormOpen, setIsFormOpen] = useState(false);
  let [isPdfLoading, setIsPdfLoading] = useState(false);
  const { darkMode } = useDarkMode();

  const navigate = useNavigate();

  //login user details
  let [userDetails, setUserDetails] = useState({});
  /* get user token and decode it */
  function setUserData() {
    let token = localStorage.getItem("token");
    let decodeData = jwtDecode(token);
    setUserDetails(decodeData);
  }

  /* log out: clear toke local storage, clear userDetails. */
  function logout() {
    localStorage.removeItem("token");
    setUserDetails({});
    navigate({
      pathname: "/Login",
    });
  }

  /* goTo page */
  function goToPage() {
    navigate({
      pathname: `/`,
    });
  }
  ///////////////
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserData();
    }
  }, []);
  useEffect(() => {
    console.log("userDetails", userDetails);
  }, [userDetails]);

  return (
    <>
      {
        <>
          <div
            className={`${
              isPdfLoading ? "d-flex " : "d-none"
            } position-absolute bg-black high-opasity z-150  w-100 justify-content-center align-items-center`}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          {/* Header */}
          <Suspense
            fallback={
              <div className="center-container">
                <div
                  className="spinner-border text-primary d-flex justify-content-center align-items-center"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            <Header
              darkMode={darkMode}
              userDetails={userDetails}
              logout={logout}
            />
          </Suspense>
          {/* Main */}
          <Suspense
            fallback={
              <div className="center-container">
                <div
                  className="spinner-border text-primary d-flex justify-content-center align-items-center"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            <Main
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              setUserData={setUserData}
              isPdfLoading={isPdfLoading}
              setIsPdfLoading={setIsPdfLoading}
              goToPage={goToPage}
              logout={logout}
              setIsFormOpen={setIsFormOpen}
              userDetails={userDetails}
              setUserData={setUserData}
              isPdfLoading={isPdfLoading}
              setIsPdfLoading={setIsPdfLoading}
              goToPage={goToPage}
              darkMode={darkMode}
            />
          </Suspense>
          {/* Footer */}
          <Suspense
            fallback={
              <div
                style={{ minHeight: "100vh" }}
                className="spinner-border text-primary d-flex justify-content-center align-items-center"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            }
          >
            <Footer />
          </Suspense>
        </>
      }
    </>
  );
}
