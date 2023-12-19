import React from "react";
import LabMessageInterface from "./UserMessageInterfaceComponents/LabMessageInterface";
import UsersMessageInterface from "./UserMessageInterfaceComponents/UsersMessageInterface";
import BackBtn from "../../BackBtn";
import { useParams } from "react-router";
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
      <div className="ST-section">
        <BackBtn />
        <div className="Reg-Pat my-5">
          <div className={`page-form ${darkMode ? " border-white" : ""}`}>
            {user.usertype === "Admin" || user.usertype === "Staff" ? (
              <LabMessageInterface
                darkMode={darkMode}
                user={user}
                formatDate={formatDate}
                scrollToBottom={scrollToBottom}
                userId={id}
              />
            ) : (
              <UsersMessageInterface
                darkMode={darkMode}
                user={user}
                formatDate={formatDate}
                scrollToBottom={scrollToBottom}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
