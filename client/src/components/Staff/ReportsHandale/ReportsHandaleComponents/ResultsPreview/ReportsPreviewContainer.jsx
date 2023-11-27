import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDarkMode } from "../../../../../context/DarkModeContext";

export default function ReportsPreviewContainer() {
  const { darkMode } = useDarkMode();

  let [errorList, setErrorList] = useState([]);
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);

  return (
    <>
      <div>Reports Preview</div>
    </>
  );
}
