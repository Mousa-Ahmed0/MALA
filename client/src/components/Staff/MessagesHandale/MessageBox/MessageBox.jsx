import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MessageBox({ darkMode }) {
  const [allMessages, setAllMessages] = useState([]);
  let [apiError, setApiError] = useState(false);
  let [noResults, setNoResults] = useState(false);
  let apiErrorMessage = (
    <div className="w-100 h-100 d-flex flex-column align-items-center">
      <div className="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
        Error!!!
      </div>
      <div className="my-4 mid-bold">
        Theres a proplem! Please wait for us to solve the proplem.
      </div>
    </div>
  );

  //get most recent messages
  async function getRecentMessages() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/massage/getAllMassage?pageNumber=1",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response);
      if (response.data.newMass) {
        setAllMessages(response.data.newMass);
      } else {
        setNoResults(true);
      }
    } catch (error) {
      setApiError(true);
      console.error("Error From GetRecentMessages: ", error);
    }
  }
  //disply the most 10 recent message
  function renderRecentMessages() {
    return allMessages.map((message, index) => {
      return (
        <div
          key={index}
          className="row detailes-size d-flex align-items-center mt-3 mb-4"
        >
          <div className="col-1">{index + 1}</div>
          <div className="col-9">
            <div className="d-flex align-items-center gap-2">
              <img
                src={message.firstUser.profilePhoto.url}
                data-lazy-placeholder="https://placehold.it/1321x583?text=Loading"
                loading="lazy"
                className={`img-fluid lazy nav-profile-img mx-2 img-fluid border ${
                  darkMode ? "border-white" : "border-black"
                } border-rounded`}
                alt="nav-profile-img"
                style={{ objectFit: "cover" }}
              />
              <p className="h6 m-0 text-truncate">
                {message.firstUser.firstname + " " + message.firstUser.lastname}
              </p>
            </div>
          </div>
          <Link
            to={`/Patient/contactLab/${message.id}`}
            style={{ cursor: "pointer" }}
            className="col-1"
          >
            <i
              className={`fa-solid fa-circle-chevron-right ${
                !message.ifReadySecondUser ? "fa-beat-fade" : ""
              }`}
            ></i>
          </Link>
        </div>
      );
    });
  }

  /////////
  useEffect(() => {
    getRecentMessages();
  }, []);
  return (
    <div className="maxHeight-inhert overflow-yAxis message-Box">
      {allMessages.length === 0 ? (
        <div>No Messages Yet...</div>
      ) : allMessages.length > 0 ? (
        renderRecentMessages()
      ) : apiError ? (
        apiErrorMessage
      ) : (
        <div className="d-flex justify-content-center align-items-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
