import React, { useState, useEffect, useRef } from "react";
import LabMessageInterface from "./UserMessageInterfaceComponents/LabMessageInterface";
import UsersMessageInterface from "./UserMessageInterfaceComponents/UsersMessageInterface";
import { formatDate } from "../../../methods/FormateDate";
import axios from "axios";
import { Link } from "react-router-dom";
import BackBtn from "../../BackBtn";
import { useParams } from "react-router";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

export default function MessageInterface({ user, darkMode }) {
  const { id } = useParams();
  //scroll the box down
  const scrollToBottom = (messagesContainerRef) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  const messagesContainerRef = useRef(null);

  // const [message, setMessage] = useState({
  //   massage: "",
  //   secondUser: "",
  // });
  const [allMessages, setAllMessages] = useState();
  const [inputMessage, setInputMessage] = useState("");

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
  // async function sendMessage(e) {
  //   e.preventDefault();

  //   //try to send message with api
  //   try {
  //     let response = await axios.post(
  //       "http://localhost:5000/api/massage/sendMassage",
  //       message,
  //       {
  //         headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //       }
  //     );
  //     setMessage({
  //       massage: "",
  //       secondUser: "",
  //     });
  //     await getMessages();
  //   } catch (error) {
  //     console.error("Error from Sending Message: ", error);
  //   }
  // }

  //get All Message In Conversation
  // async function getMessages() {
  //   try {
  //     let response = await axios.get(
  //       `http://localhost:5000/api/massage/getUserMassage/${id}`,
  //       {
  //         headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //       }
  //     );
  //     console.log("Lab response: ", response);
  //     setAllMessages(response.data);
  //     if (response.data.massage.length === 0) setNoResults(true);
  //     setMessage({
  //       massage: "",
  //       secondUser: response.data.firstUser.id,
  //     });
  //   } catch (error) {
  //     console.error("Error from getting Message by Id: ", error);
  //   }
  // }
  //get Message Details
  function handaleMessageChange(e) {
    // cheack if the function come from " Enter BTN "
    if (e.key === "Enter") {
      try {
        console.log("Send Message");
      } catch (error) {
        console.log(error);
      }
      return;
    }
    // set new message value
    // let newMessage = { ...inputMessage };
    // newMessage[e.target.name] = e.target.value;
    setInputMessage(e.target.value);
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
              className={`col-6 alert text-wrap overflow-auto ${
                message.senderId === user.id ? "alert-primary" : "alert-light"
              }`}
            >
              {message.mass}{" "}
              <div
                style={{ fontSize: "0.745rem" }}
                className={`m-0 position-absolute text-center top-0 end-0 bg-light bottom-shadow bg-info w-25 ${
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
  //to convert state to readed
  /* async function msgReaded() {
    console.log("hhh");
    try {
      const response = axios.put(
        `http://localhost:5000/api/massage/ifReady/${allMessages._id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error From msgReaded: ", error);
    }
  }*/
  //////////////////
  //get all messages
  useEffect(() => {
    // getMessages();
    // Listen for incoming messages from the server
    socket.on("message", (message) => {
      setAllMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once after the initial render
  //scroll if message changed "send or rescive a message"
  useEffect(() => {
    scrollToBottom(messagesContainerRef);
    //Make Messages Read
    // msgReaded();
    console.log(allMessages);
  }, [allMessages]);
  useEffect(() => {
    console.log("inputMessage", inputMessage);
  }, [inputMessage]);
  return (
    <>
      <div className="ST-section">
        <BackBtn />
        <div className="Reg-Pat my-5">
          <div className={`page-form ${darkMode ? " border-white" : ""}`}>
            <>
              <div className="my-4 d-flex flex-column align-items-center justify-content-center">
                <h1 className={`h3 m-0 ${darkMode ? " text-white" : ""}`}>
                  <div
                    style={{ cursor: "pointer" }}
                    className="nav-item accDet d-flex justify-content-center align-items-center mx-2"
                  >
                    <img
                      className="nav-profile-img mx-2"
                      src={
                        allMessages
                          ? allMessages.firstUser.profilePhoto.url
                          : "https://placehold.it/1321x583?text=Loading"
                      }
                      alt="nav-profile-img"
                      style={{ objectFit: "cover" }}
                    />
                    <Link
                      to={`/Profile/${
                        allMessages ? allMessages.firstUser.id : ""
                      }`}
                      className="pt-1 nav-item nav-link position-relative m-0 mid-bold text-truncate"
                    >
                      {allMessages
                        ? allMessages.firstUser.firstname +
                          " " +
                          allMessages.firstUser.lastname
                        : "User Name"}
                    </Link>
                  </div>
                </h1>
                <hr className={`my-2 w-50 ${darkMode ? " text-white" : ""}`} />
              </div>
              <div className={`"message-platform row mx-4" `}>
                <div
                  className={`row message-box bottom-shadow my-3 ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                >
                  <div className="col-12 messages" ref={messagesContainerRef}>
                    {" "}
                    {allMessages ? (
                      renderMessages()
                    ) : noResults ? (
                      <div className="d-flex justify-content-center align-items-center">
                        You didnt start a conversation yet ...
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center align-items-center my-4">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
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
                          value={inputMessage}
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
                          // onClick={(e) => sendMessage(e)}
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
          </div>
        </div>
      </div>
    </>
  );
}
