import React from "react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Footer() {
  const { darkMode } = useDarkMode();

  return (
    <footer
      className={`d-flex justify-content-center align-items-center mt-4 ${
        darkMode ? " spic-dark-mode border-0" : ""
      }`}
    >
      <div className="fot-Copyright">
        <p>All rights reserved to An-Najah Universty © 2023</p>
      </div>

      <ul className="fot-Details d-flex align-items-center justify-content-center m-0 fs-4">
        <li>
          {" "}
          <a href="https://www.facebook.com/" target="_blank">
            <i className="fa-brands fa-facebook" />
          </a>
        </li>
        <li>
          {" "}
          <a href="https://www.facebook.com/" target="_blank">
            <i className="fa-brands fa-instagram" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/" target="_blank">
            <i className="fa-brands fa-twitter " />
          </a>
        </li>
        <li>
          {" "}
          <a href="https://www.facebook.com/" target="_blank">
            <i className="fa-brands fa-linkedin-in" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
