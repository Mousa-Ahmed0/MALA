import React, { Suspense } from "react";
import { useParams } from "react-router";

import {
  LabMessageInterface,
  UsersMessageInterface,
} from "../../../componentsLoader/ComponentsLoader";
import BackBtn from "../../BackBtn";

export default function MessageInterface({ user, darkMode }) {
  const { id } = useParams();
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

  //scroll the box down
  const scrollToBottom = (messagesContainerRef) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  return (
    <>
      <div className="ST-section my-5">
        <BackBtn />
        <div className="Reg-Pat my-5">
          <div className={`page-form ${darkMode ? " border-white" : ""}`}>
            {user.usertype === "Admin" || user.usertype === "Staff" ? (
              <Suspense
                fallback={
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                }
              >
                {" "}
                <LabMessageInterface
                  darkMode={darkMode}
                  user={user}
                  formatDate={formatDate}
                  scrollToBottom={scrollToBottom}
                  messageId={id}
                />
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                }
              >
                <UsersMessageInterface
                  darkMode={darkMode}
                  user={user}
                  formatDate={formatDate}
                  scrollToBottom={scrollToBottom}
                />{" "}
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
