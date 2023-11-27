import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDarkMode } from "../../../../context/DarkModeContext";

export default function MakeReport() {
  const { darkMode } = useDarkMode();

  let [errorList, setErrorList] = useState([]);
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);

  return (
    <>
      <div className="Reg-Pat">
        <div className={`page-form ${darkMode ? " spic-dark-mode" : ""}`}>
          <h1
            className={`h3 formHeader ${
              darkMode ? " spic-dark-mode border-0 border-bottom" : ""
            }`}
          >
            Extract a New Report:
          </h1>
        </div>
      </div>
    </>
  );
}
