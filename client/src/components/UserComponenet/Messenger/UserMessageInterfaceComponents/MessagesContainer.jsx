import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function MessagesContainer({
  user,
  formatDate,
  scrollToBottom,
  isSent,
  setIsSent,
  id,
}) {
  const messagesContainerRef = useRef(null);
  //get All Message In Conversation
  const [allMessages, setAllMessages] = useState();
  const [noResults, setNoResults] = useState(false);
  //const [apiError, setApiError] = useState(false);
  // let apiErrorMessage = (
  //   <div className="w-100 h-100 d-flex flex-column align-items-center">
  //     <div className="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
  //       Error!!!
  //     </div>
  //     <div className="my-4 mid-bold">
  //       Theres a proplem! Please wait for us to solve the proplem.
  //     </div>
  //   </div>
  // );
  const [mouseOnMsgIndex, setMouseOnMsgIndex] = useState(null);

  async function getStaffMessages() {
    try {
      let response = await axios.get(
        `http://localhost:5000/api/massage/getUserMassage/${id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      //console.log("getStaffMessages", response);

      setIsSent(false);
      setAllMessages(response.data);
    } catch (error) {
      console.error("Error from Sending Message: ", error);
    }
  }
  async function getMessages() {
    try {
      let response = await axios.get(
        "http://localhost:5000/api/massage/getMassage",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      //console.log("getMessages", response);
      if (response.data.length > 0) {
        setIsSent(false);
        setAllMessages(response.data[0]);
      } else setNoResults(true);
    } catch (error) {
      console.error("Error from Sending Message: ", error);
    }
  }
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
                className={`detailes-size m-0 position-absolute text-center top-0 end-0 bg-light bottom-shadow bg-info w-50 ${
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
  //get all messages
  useEffect(() => {
    //console.log(`hello ${user.usertype}`);
    // Fetch messages initially
    if (user.usertype === "Admin" || user.usertype === "Staff") {
      getStaffMessages();
    } else {
      getMessages();
    }

    //
    // Set up interval to fetch messages every 5 seconds (adjust as needed)

    const intervalId = setInterval(() => {
      user.usertype === "Admin" || user.usertype === "Staff"
        ? getStaffMessages()
        : getMessages();
    }, 1000);
    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once after the initial render

  //scroll if message changed "send or rescive a message"
  useEffect(() => {
    scrollToBottom(messagesContainerRef);
  }, [allMessages]);
  //
  useEffect(() => {
    //console.log(isSent);
    if (isSent) {
      if (user.usertype === "Admin" || user.usertype === "Staff")
        getStaffMessages();
      else getMessages();
    }
  }, [isSent]);
  return (
    <>
      {" "}
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
    </>
  );
}
