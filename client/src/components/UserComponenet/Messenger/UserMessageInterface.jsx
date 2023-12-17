import React, { useEffect } from "react";
import BackBtn from "../../BackBtn";
export default function UserMessageInterface({ user, darkMode }) {
  useEffect(() => {}, []);
  return (
    <>
      <div className="ST-section">
        <BackBtn />
        <div className="Reg-Pat my-5">
          <div className={`page-form ${darkMode ? " border-white" : ""}`}>
            <div className="my-5 d-flex flex-column align-items-center justify-content-center">
              <h1 className={`h3 m-0 ${darkMode ? " text-white" : ""}`}>
                Contact With Us:
              </h1>
              <hr className={`my-2 w-50 ${darkMode ? " text-white" : ""}`} />
            </div>
            <div className={`"message-platform row mx-4" `}>
              <h1 className="col-12 h3 my-0 colorMain">MALM:</h1>
              <div
                className={`row message-box bottom-shadow my-3 ${
                  darkMode ? " spic-dark-mode" : ""
                }`}
              >
                <div className="col-12 messages"></div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-10 form-floating gray-color">
                      <input
                        className={`${
                          darkMode ? " spic-dark-mode" : "light"
                        } form-control border-0`}
                        type="text"
                        placeholder="your message ..."
                      />
                    </div>
                    <div className="col-2 d-flex align-items-center">
                      <button className="nav-link position-relative">
                        <i className="fa-solid fa-message colorMain mid-bold h3 m-0"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
