import React from "react";

function DarkModeBtnContainer({ darkMode, toggleDarkMode }) {
  return (
    <div className="nav-link mode d-flex align-items-center">
      <button
        type="button"
        onClick={toggleDarkMode}
        className={`btn ${darkMode ? " spic-dark-mode" : ""} p-0`}
        id="mode-btn"
      >
        <i className={`mx-2 fa-regular ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>
    </div>
  );
}

export default DarkModeBtnContainer;
