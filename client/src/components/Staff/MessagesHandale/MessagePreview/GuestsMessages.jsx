import React, { useEffect, useState } from "react";
import axios from "axios";
import BackBtn from "../../../BackBtn";
import SendEmail from "../MessageComponents/SendEmail";
import { formatDate } from "../../../../methods/FormateDate";
export default function GuestsMessages({ darkMode, setIsFormOpen }) {
  const [allMessages, setAllMessages] = useState([]);
  const [isSendFormOpen, setIsSendFormOpen] = useState(false);
  const [toUser, setToUser] = useState();
  //Errors variables
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
  //
  async function getGuestMessages() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/guest/getGuestMeassage",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response);
      setAllMessages(response.data.allMeass);
    } catch (error) {
      console.error("error from getGuestMessages:", error);
    }
  }
  //
  function displayMessages() {
    return allMessages.map((msg, index) => {
      return (
        <div
          key={index}
          className="col-lg-4 col-md-6 col-sm-12 col-xsm-12 mb-3"
        >
          <div
            className={`card border-0 position-relative m-1 m-xl-3 mt-0 ${
              darkMode ? " spic-dark-mode border-0" : ""
            }`}
          >
            <div style={{ height: 300 }} className="card-body bottom-shadow ">
              <div className="row"></div>
              <div className="card-Top d-flex   align-items-center">
                <div className="card-Top-Details d-flexflex-column">
                  <div className="row">
                    <div className="col-10">
                      <h1 className="h4 mid-bold text-truncate colorMain">
                        {msg.fullName}
                      </h1>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                      <i
                        onClick={() => deleeteGuestMeassage(msg.id)}
                        style={{ cursor: "pointer" }}
                        className={`fa-solid delete-btn fa-trash border-0 m-0 p-0 text-truncate  ${
                          darkMode ? " dark-theme" : ""
                        }`}
                      />
                    </div>
                    <div className="col-12">
                      <p className="home-size mid-bold my-1 text-truncate">
                        {msg.email}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div style={{ overflowY: "auto" }} className="card-body p-0">
                <div
                  style={{
                    maxHeight: "75px",
                    minHeight: "75px",
                    lineHeight: "1.25",
                  }}
                  className="h5 m-0"
                >
                  {msg.message}
                </div>
              </div>
              <hr />
              <div className="col-12 w-100 ">
                <div className="row align-items-center">
                  <div className="col-10 d-flex">
                    <p className="detailes-size text-truncate m-0">
                      ({formatDate(msg.createdAt)})
                    </p>
                  </div>
                  <div className="col-2 d-flex align-items-center">
                    <i
                      onClick={() => handaleSendEmailFormOpen(msg)}
                      style={{ cursor: "pointer", fontSize: "1.375rem" }}
                      className={`fa-solid normal-btn fa-comment-dots border-0 m-0 p-0 text-truncate  ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  //
  async function deleeteGuestMeassage(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/guest/deleteGuestMeassage/${id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      await getGuestMessages();
    } catch (error) {
      console.error("error from getGuestMessages:", error);
    }
  }
  /* *************** Handale Pop Forms *************** */
  // form open
  function handaleSendEmailFormOpen(msg) {
    setIsFormOpen(true);
    setIsSendFormOpen(true);
    setToUser(msg);
  }

  function closeForm() {
    setIsFormOpen(false);
    setIsSendFormOpen(false);
  }
  /////////////
  useEffect(() => {
    getGuestMessages();
  }, []);
  return (
    <>
      <div className="ST-section my-4">
        <div
          className={`position-relative my-4 ${
            isSendFormOpen ? "d-flex" : "d-none"
          } ${
            darkMode ? " spic-dark-mode border-0" : "bg-white"
          } justify-content-center align-items-center h-100 w-100 z-200`}
        >
          <SendEmail
            darkMode={darkMode}
            closeForm={closeForm}
            setApiError={setApiError}
            toUser={toUser}
          />
        </div>
        <BackBtn />
        <section className="px-4">
          <div className="row ">
            {Array.isArray(allMessages) && allMessages.length > 0 ? (
              displayMessages()
            ) : apiError ? (
              apiErrorMessage
            ) : allMessages.length === 0 ? (
              <div className="my-4 mid-bold">No results Found.</div>
            ) : (
              <div className="d-flex justify-content-center align-items-center my-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </section>{" "}
      </div>
    </>
  );
}
