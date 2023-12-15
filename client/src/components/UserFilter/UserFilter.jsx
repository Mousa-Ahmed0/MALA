import React, { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";

function UserFilter(props) {
  const { darkMode } = useDarkMode(); //dark mode
  const filterOptions = props.filterOptions;
  const filterLabel = props.filterLabel;

  function handaleChange(event) {
    let regionValue = event.target.value;
    props.handaleFilterOption(regionValue);
  }

  // Return Elements:
  return (
    <select
      className={`form-select ${
        darkMode ? "spic-dark-mode" : "light"
      } selectpicker ${props.style ? props.style : ""}`}
      aria-label="Default select example"
      onChange={handaleChange}
      name="region"
    >
      <option value={"noValue"} hidden>
        {filterLabel ? filterLabel : "Filter by:"}
      </option>
      {filterOptions.map((choise, index) => (
        <option key={index} value={choise}>
          {choise === "noValue" ? "No Filter" : choise}
        </option>
      ))}
    </select>
  );
}

export default UserFilter;
