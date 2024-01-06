import React, { useEffect, useState } from "react";

export default function UpdateItem({ closeForm, darkMode, setApiError }) {
  const [apiMessage, setApiMessage] = useState("");
  //update User Details
  async function setNewItem(e) {
    e.preventDefault();
    try {
    } catch (error) {
      setApiError(true);
      console.error("Error:", error);
    }
  }
  // get new userDetails
  function getNewData(e) {}

  return (
    <div className="w-100 my-4">
      <div className="row mx-4 mt-2 mb-4">
        <div className="col-lg-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <h1
                className={`m-0 h3 formHeader  ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Update Form:
              </h1>
            </div>
            <button
              type="button"
              onClick={() => closeForm()}
              className="btn btn-danger"
            >
              X
            </button>
          </div>
        </div>
      </div>
      <div className="row mx-4 mt-2 mb-4">
        <div className="Reg-Pat">
          <div className={`page-form ${darkMode ? " spic-dark-mode" : ""}`}>
            <form className="mx-5" onSubmit={setNewItem}>
              <h1
                className={`h3 formHeader ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Send Email:
              </h1>
              <div
                className={`my-3 d-flex  ${darkMode ? " spic-dark-mode" : ""}`}
              >
                {apiMessage ? apiMessage : ""}
              </div>
              <div className="d-flex gap-4 flex-column flex-md-row"></div>

              <div className="mb-3 d-flex justify-content-end">
                <button className="btn btn-primary d-flex justify-content-center BTN-Bold">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
