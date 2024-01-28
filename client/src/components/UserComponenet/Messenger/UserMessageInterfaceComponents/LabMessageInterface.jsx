import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { MessageContainer } from "../../../../componentsLoader/ComponentsLoader";
import { Link } from "react-router-dom";
export default function LabMessageInterface({
  user,
  darkMode,
  formatDate,
  scrollToBottom,
  messageId,
}) {
  const [userDetails, setUserDetails] = useState();
  const [message, setMessage] = useState({
    massage: "",
    secondUser: "",
  });
  const [isSent, setIsSent] = useState(false);

  //
  async function getStaffMessages() {
    try {
      let response = await axios.get(
        `http://localhost:5000/api/massage/getUserMassage/${
          messageId ? messageId : ""
        }`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setIsSent(false);
      setUserDetails(response.data.firstUser);
    } catch (error) {
      console.error("Error from Sending Message: ", error);
    }
  }
  // send message
  async function sendMessage(e) {
    e.preventDefault();
    const newMessage = { ...message, secondUser: userDetails.id };
    if (newMessage && newMessage.massage && newMessage.massage.length > 0) {
      //try to send message with api
      try {
        setIsSent(true);
        let response = await axios.post(
          "http://localhost:5000/api/massage/sendMassage",
          newMessage,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setMessage({
          massage: "",
          secondUser: "",
        });
      } catch (error) {
        console.error("Error from Sending Message: ", error);
      }
    }
  }
  //get Message Details
  async function handaleMessageChange(e) {
    // cheack if the function come from " Enter BTN "
    if (e.key === "Enter") {
      try {
        await sendMessage(e);
      } catch (error) {
        console.error(error);
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
    console.log("hello staff");
    getStaffMessages();
  }, []);

  return (
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
                userDetails
                  ? userDetails.profilePhoto.url
                  : "https://placehold.it/1321x583?text=Loading"
              }
              alt="nav-profile-img"
              style={{ objectFit: "cover" }}
            />
            <Link
              to={`/Profile/${userDetails ? userDetails.id : ""}`}
              className="pt-1 nav-item nav-link position-relative m-0 mid-bold text-truncate"
            >
              {userDetails
                ? userDetails.firstname + " " + userDetails.lastname
                : "User Name"}
            </Link>
          </div>
        </h1>
        <hr className={`my-2 w-50 ${darkMode ? " text-white" : ""}`} />
      </div>
      <div className={`"message-platform row mx-4" `}>
        <div
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
              id={messageId}
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
                {" "}
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
