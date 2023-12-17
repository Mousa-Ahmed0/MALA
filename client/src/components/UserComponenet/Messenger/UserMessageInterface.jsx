import React, { useState, useEffect } from "react";
import axios from "axios";
import BackBtn from "../../BackBtn";
export default function UserMessageInterface({ user, darkMode }) {
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

  //formate Date
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    // Format date components
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear(); // Get last two digits of the year
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Format with leading zeros
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year;
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Construct the formatted date string
    const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}, ${formattedHours}:${formattedMinutes} ${ampm}`;

    return formattedDate;
  };

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
      setAllMessages(response.data[0]);
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
  //display the messages
  //display the messages
  function renderMessages() {
    console.log(allMessages);
    if (allMessages) {
      return allMessages.massage.map((message, index) => {
        console.log(index, message);
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
              className={`col-6 alert text-wrap overflow-auto ${
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
    // Fetch messages initially
    getMessages();

    // Set up interval to fetch messages every 5 seconds (adjust as needed)
    const intervalId = setInterval(getMessages, 30000);

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once after the initial render

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
                <div className="col-12 messages">{renderMessages()}</div>
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
