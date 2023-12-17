import axios from "axios";
import { func } from "joi";
import React, { useState, useEffect } from "react";

export default function MessageBox({ darkMode }) {
  const [allMessages, setAllMessages] = useState([]);
  let [apiError, setApiError] = useState(false);
  let [noResults, setNoResults] = useState(false);
  let apiErrorMessage = (
    <div class="w-100 h-100 d-flex flex-column align-items-center">
      <div class="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
        Error!!!
      </div>
      <div class="my-4 mid-bold">
        Theres a proplem! Please wait for us to solve the proplem.
      </div>
    </div>
  );

  //get most recent messages
  async function getRecentMessages() {
    try {
      const response = await axios.get("");
    } catch (error) {
      setApiError(true);
      console.error("Error From GetRecentMessages: ", error);
    }
  }
  /////////

  return (
    <div className="maxHeight-inhert overflow-yAxis message-Box">
      <div className="row detailes-size d-flex align-items-center">
        <div className="col-1">1</div>
        <div className="col-9">
          <div className="d-flex align-items-center gap-2">
            <img
              loading="lazy"
              className={`nav-profile-img mx-2 img-fluid border ${
                darkMode ? "border-white" : "border-black"
              } border-rounded`}
              src={"./images/logo.png"}
              alt="nav-profile-img"
              style={{ objectFit: "cover" }}
            />
            <p className="h6 m-0 text-truncate">{"Omar Khaled"}</p>
          </div>
        </div>
        <div style={{ cursor: "pointer" }} className="col-1">
          <i class="fa-solid fa-circle-chevron-right fa-beat-fade"></i>
        </div>
      </div>
    </div>
  );
}
