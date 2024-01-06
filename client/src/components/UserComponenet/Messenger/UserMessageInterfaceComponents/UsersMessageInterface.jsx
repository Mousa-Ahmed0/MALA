import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BackBtn from "../../../BackBtn";
export default function UsersMessageInterface({
  user,
  darkMode,
  formatDate,
  scrollToBottom,
}) {
  const messagesContainerRef = useRef(null);
  const [message, setMessage] = useState({
    massage: "",
  });
  const [allMessages, setAllMessages] = useState();
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
  const [mouseOnMsgIndex, setMouseOnMsgIndex] = useState(null);

  // send message
  async function sendMessage(e) {
    e.preventDefault();

    //try to send message with api
    try {
      let response = await axios.post(
        "http://localhost:5000/api/massage/sendMassage",
        message,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setMessage({
        massage: "",
      });
      await getMessages();
    } catch (error) {
      console.error("Error from Sending Message: ", error);
    }
  }
  //get All Message In Conversation
  async function getMessages() {
    try {
      let response = await axios.get(
        "http://localhost:5000/api/massage/getMassage",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (response.data.length > 0) setAllMessages(response.data[0]);
      else setNoResults(true);
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
    setMessage(newMessage);
  }
  //display the messages
  //display the messages
  function renderMessages() {
    if (allMessages) {
      return allMessages.massage.map((message, index) => {
        return (
          <div
            className={`row position-relative ${
              message.senderId === user.id
                ? "justify-content-start"
                : "justify-content-end"
            }`}
          >
            <div
              key={index}
              onMouseEnter={() => setMouseOnMsgIndex(index)}
              onMouseLeave={() => setMouseOnMsgIndex(null)}
              className={`col-6 alert  text-break ${
                message.senderId === user.id
                  ? "alert-primary"
                  : "alert-secondry"
              }`}
            >
              {message.mass}{" "}
              <div
                className={`detailes-size m-0 position-absolute text-center top-0 end-0 bg-light bottom-shadow bg-info w-25 ${
                  mouseOnMsgIndex === index ? "d-block" : "d-none"
                }`}
              >
                {formatDate(message.date)}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <div>Loading ...</div>;
    }
  }

  //////////////////
  //get all messages
  useEffect(() => {
    console.log("hello user");
    // Fetch messages initially
    getMessages();

    // Set up interval to fetch messages every 5 seconds (adjust as needed)
    const intervalId = setInterval(getMessages, 5000);

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once after the initial render
  //scroll if message changed "send or rescive a message"
  useEffect(() => {
    scrollToBottom(messagesContainerRef);
  }, [allMessages]);
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
          className={`row message-box bottom-shadow my-3 ${
            darkMode ? " spic-dark-mode" : ""
          }`}
        >
          <div className="col-12 messages" ref={messagesContainerRef}>
            {allMessages ? (
              renderMessages()
            ) : noResults ? (
              <div className="d-flex justify-content-center align-items-center">
                You didnt start a conversation yet ...
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center my-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
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
    </>
  );
}
