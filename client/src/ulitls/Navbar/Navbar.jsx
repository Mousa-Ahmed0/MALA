import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import DarkModeBtn from "../../components/DarkModeBtn";

export default function Navbar({ values, userDetails, logout }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { darkMode, toggleDarkMode } = useDarkMode();
  let [activeId, setActiveId] = useState();
  let [clickOnProfile, setClickOnProfile] = useState(false);

  function handaleProfileClick() {
    if (clickOnProfile) {
      setClickOnProfile(false);
    } else {
      setClickOnProfile(true);
    }
  }
  function handaleLogoutActive() {
    logout();
    setActiveId(7);
  }
  /////
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={` ${
        darkMode ? " spic-dark-mode border-0" : "light"
      } bg-white general-nav navbar navbar-expand-lg`}
      id="nav"
    >
      <div className="container nav-xsmall-screens">
        <div>
          <Link
            className={`navbar-brand ${
              darkMode ? " spic-dark-mode" : "light"
            } bg-white`}
            to="/"
          >
            MALM
          </Link>
        </div>
        <div className="d-flex">
          <div className="respo-nav">
            <button
              className="navbar-toggler mx-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className={"navbar-toggler-icon"} />
            </button>
            <div
              className="container collapse navbar-collapse nav-small-screns"
              id="navbarSupportedContent"
            >
              <ul
                className={`navbar-nav ms-auto mb-2 mb-lg-0 ${
                  darkMode ? " spic-dark-mode" : ""
                } bg-white`}
              >
                {values.map((val, index) => (
                  <li
                    key={index}
                    className="nav-item"
                    onClick={() => setActiveId(val.id)}
                  >
                    {val.text === "|" ? (
                      <div
                        className={`nav-span d-none d-lg-flex justify-content-center align-items-center ${
                          darkMode ? " spic-dark-mode" : ""
                        } bg-white`}
                      >
                        <span>{val.text}</span>
                      </div>
                    ) : (
                      <Link
                        style={{
                          display:
                            windowWidth < 742 && val.text === "|"
                              ? "none"
                              : "block",
                          transition:
                            windowWidth < 742 && val.text === "|" ? "0s" : "",
                        }}
                        className={`
                          ${
                            activeId === val.id ? "nav-link active" : "nav-link"
                          }
                          ${darkMode ? " spic-dark-mode" : ""} bg-white
                        `}
                        to={val.path}
                      >
                        {val.id === 3 ? "Anlysis" : val.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {Object.keys(userDetails).length > 0 ? (
            <div
              onClick={() => handaleProfileClick()}
              style={{ cursor: "pointer" }}
              className="position-relative"
            >
              <div className="nav-item accDet d-flex justify-content-center align-items-center mx-2">
                <img
                  className="nav-profile-img mx-2"
                  src={userDetails.profilePhoto.url}
                  alt="nav-profile-img"
                  style={{ objectFit: "cover" }}
                />
                <p className="pt-1 nav-item nav-link position-relative m-0 mid-bold text-truncate">
                  {userDetails.firstname} {userDetails.lastname}
                </p>
              </div>
              <div
                className={`${
                  darkMode ? " spic-dark-mode" : ""
                } dropDawn navbar-nav position-absolute bg-white bottom-shadow w-100 d-flex flex-column justify-content-center align-items-center ${
                  clickOnProfile ? "" : "d-none"
                }`}
              >
                <Link
                  onClick={() => setActiveId(0)}
                  style={{ cursor: "pointer" }}
                  className={`position-relative nav-item nav-link mt-1 text-truncate ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                  to={`/Profile/${userDetails.id}`}
                >
                  You Profile
                </Link>
                <a
                  style={{ cursor: "pointer" }}
                  className={`position-relative nav-item nav-link mb-3 text-truncate ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                  onClick={() => handaleLogoutActive()}
                >
                  LogOut
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="nav-item">
            <DarkModeBtn darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </div>
      </div>
    </nav>
  );
}
