import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { MessageContainer } from "../../../../componentsLoader/ComponentsLoader";
import { Fade } from "react-bootstrap";
export default function UsersMessageInterface({
  user,
  darkMode,
  formatDate,
  scrollToBottom,
}) {
  const [message, setMessage] = useState({
    massage: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // send message
  async function sendMessage(e) {
    e.preventDefault();

    if (message && message.massage && message.massage.length > 0) {
      //try to send message with api
      setLoading(true);
      try {
        setIsSent(true);
        let response = await axios.post(
          "http://localhost:5000/api/massage/sendMassage",
          message,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setMessage({
          massage: "",
        });
      } catch (error) {
        console.error("Error from Sending Message: ", error);
      }
      setLoading(false);
    }
  }
  //get Message Details
  async function handaleMessageChange(e) {
    // cheack if the function come from " Enter BTN "
    if (e.key === "Enter") {
      try {
        await sendMessage(e);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    // set new message value
    let newMessage = { ...message };
    newMessage[e.target.name] = e.target.value;
    setMessage(newMessage);
  }
  //////////////////
  //get all messages
  useEffect(() => {
    console.log("hello user");
  }, []);
  //get all messages

  return (
    <>
      <div className="my-4 d-flex flex-column align-items-center justify-content-center">
        <h1 className={`h3 m-0 ${darkMode ? " text-white" : ""}`}>
          <span className="colorMain mid-bold">MALM</span> - Contact With Us:
        </h1>
        <hr className={`my-2 w-50 ${darkMode ? " text-white" : ""}`} />
      </div>
      <div className={`"message-platform row mx-4" `}>
        <h1 className="col-12 h3 my-0 colorMain">MALM:</h1>
        <div
          style={{ borderRadius: "7px" }}
          className={`row message-box bottom-shadow my-3 p-4 ${
            darkMode ? " spic-dark-mode" : ""
          }`}
        >
          {" "}
          <Suspense
            fallback={
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            }
          >
            <MessageContainer
              user={user}
              formatDate={formatDate}
              scrollToBottom={scrollToBottom}
              isSent={isSent}
              setIsSent={setIsSent}
            />
          </Suspense>
          <hr />
          <div className="col-12">
            <div className="row">
              <div
                className={`col-10 form-floating gray-color ${
                  darkMode ? "dark-input border border-white " : ""
                }`}
              >
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
                  disabled={loading}
                />
              </div>
              <div className="col-2 d-flex align-items-center">
                <button
                  onClick={(e) => sendMessage(e)}
                  className={`nav-link position-relative ${
                    darkMode ? "text-white" : ""
                  }`}
                >
                  <i
                    className={`fa-solid fa-message mid-bold h3 m-0 ${
                      darkMode ? "text-white" : ""
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
