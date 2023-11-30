import React from "react";
import { useDarkMode } from "../../../../../context/DarkModeContext";
import BackBtn from "../../../../BackBtn";
export default function BMR() {
  const { darkMode } = useDarkMode();

  return (
    <div className="Reg-Pat">
      <BackBtn />
      <div
        className={`page-form ${
          darkMode ? " spic-dark-mode border-0" : ""
        } my-4`}
      >
        <h1 className={`${darkMode ? " spic-dark-mode border-0" : ""} `}>
          BMR Calculete:
        </h1>
      </div>
    </div>
  );
}
