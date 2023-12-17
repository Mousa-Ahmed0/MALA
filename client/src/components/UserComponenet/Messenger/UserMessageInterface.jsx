import React, { useState, useEffect } from "react";
import axios from "axios";
import BackBtn from "../../BackBtn";
export default function UserMessageInterface({ user, darkMode }) {
  const [message, setMessage] = useState({
    massage: "",
  });
  const [allMessages, setAllMessages] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [apiError, setApiError] = useState(false);
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

  // send message
  async function sendMessage(e) {
    e.preventDefault();
    console.log(message);

    //try to send message with api
    try {
      let response = await axios.post(
        "http://localhost:5000/api/massage/sendMassage",
        message,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response);
      setMessage({
        massage: "",
      });
    } catch (error) {
      console.error("Error from Sending Message: ", error);
    }
  }

  //get All Message In Conversation
  async function getMessages() {
    try {
      let response = await axios.post(
        "http://localhost:5000/api/massage/sendMassage",
        message,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response);
      setMessage({
        massage: "",
      });
    } catch (error) {
      console.error("Error from Sending Message: ", error);
    }
  }
  //get Message Details
  function handaleMessageChange(e) {
    // cheack if the function come from " Enter BTN "
    if (e.key === "Enter") {
      try {
        sendMessage(e);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    // set new message value
    let newMessage = { ...message };
    newMessage[e.target.name] = e.target.value;
    console.log(e.target.value);
    setMessage(newMessage);
  }
  //////////////////
  useEffect(() => {
    //get all messages
    getMessages();
  }, []);
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
                <hr />

                <div className="col-12">
                  <div className="row">
                    <div className="col-10 form-floating gray-color">
                      <input
                        name="massage"
                        value={message.massage}
                        className={`${
                          darkMode ? " spic-dark-mode" : "light"
                        } form-control border-0`}
                        type="text"
                        placeholder="your message ..."
                        onChange={(e) => handaleMessageChange(e)}
                        onKeyDown={(e) => handaleMessageChange(e)}
                      />
                    </div>
                    <div className="col-2 d-flex align-items-center">
                      <button
                        onClick={(e) => sendMessage(e)}
                        className="nav-link position-relative"
                      >
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
