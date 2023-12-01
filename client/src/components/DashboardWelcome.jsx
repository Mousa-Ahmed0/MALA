import React from "react";

export default function DashboardWelcome({ user }) {
  // Create a new Date object
  const currentDate = new Date();
  const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  // Get the current time
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  let time = `${hours}:${minutes}`;
  let date = `${day}/${month}/${year}`;
  return (
    <>
      <div className="w-100 d-flex justify-content-between align-items-center">
        <div className="h2 d-flex flex-column">
          <span className="h5 mid-bold m-0">Welcome</span>
          <span className="high-bold colorMain">
            {user.firstname} {user.lastname}
          </span>
        </div>
        {/*  <div
          className={`btn d-flex align-items-center gap-2 border ${
            darkMode ? "border-white text-white" : "border-black"
          }`}
        >
         /  <i class="fa-regular fa-message"></i>{" "}
          <span className="h3 mid-bold colorMain">{2}</span>
        </div>*/}
        <div className="d-flex flex-column">
          <span className="h2 high-bold">
            {time}
            <span className="h4 mid-bold"> {hours <= 12 ? "AM" : "PM"}</span>
          </span>
          <span>
            {dayOfWeek}, {date}
          </span>
        </div>
      </div>
    </>
  );
}
