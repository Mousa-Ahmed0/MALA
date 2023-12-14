import React, { useState, useEffect, useRef } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import BackBtn from "../BackBtn";
import DetailsInformation from "./ResultDetailsComponents/DetailsInformation";
import ReportsHeader from "../ReportsHeader";
import ResultsTable from "./ResultDetailsComponents/ResultsTable";
import { getResultByID } from "../../apis/ApisHandale.jsx";

import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResultDetails() {
  const [loader, setLoader] = useState(false);
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  let [apiError, setApiError] = useState(false);
  let apiErrorMessage = (
    <div class="w-100 h-100 d-flex flex-column align-items-center">
      <div class="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
        Error!!!
      </div>
      <div class="my-4 mid-bold">
        Theres a proplem! Please wait for us to solve the proplem.
      </div>
    </div>
  );
  let [noResults, setNoResults] = useState(false);
  const [resultDetails, setResuultDetails] = useState({});
  async function getResultDetails() {
    try {
      let response = await getResultByID(id);
      setResuultDetails(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  }

  function renderDetails() {
    return (
      <div className="print-section">
        <div className="print-result Report-header mb-1">
          <ReportsHeader darkMode={darkMode} />
          <DetailsInformation
            darkMode={darkMode}
            doctorInformation={
              resultDetails.usersDoctor
                ? resultDetails.usersDoctor
                : resultDetails.detailsAnalyze.doctorName
            }
            patintInformation={resultDetails.usersPatint}
            staffInformation={resultDetails.usersStaff}
            date={resultDetails.detailsAnalyze.date}
          />
        </div>
        <ResultsTable darkMode={darkMode} resultDetails={resultDetails} />
      </div>
    );
  }

  const downloadPDF = () => {
    const capture = document.querySelector(".print-section");
    capture.style.padding = "20px 100px"; // Padding

    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "px", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();

      doc.setFontSize(12);

      doc.addImage(
        imgData,
        "PNG",
        0,
        0,
        componentWidth * 1,
        componentHeight * 0.4
      );
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };
  useEffect(() => {
    getResultDetails();
  }, []);

  return (
    <>
      <div className="section my-2">
        <div className="BackBtn my-4">
          <BackBtn />
        </div>
        {Object.keys(resultDetails).length > 0 && resultDetails ? (
          renderDetails()
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className="d-flex align-items-center justify-content-center gap-4 print-button mt-4">
          <button
            className="btn btn-info text-white p-2"
            onClick={() => window.print()}
          >
            <span className="h4 mid-bold m-0">Print</span>
          </button>
          {loader ? (
            <span className="h4 mid-bold m-0">Loading ... </span>
          ) : (
            <button
              className="btn btn-success text-white p-2"
              onClick={downloadPDF}
            >
              {loader ? (
                <span className="h4 mid-bold m-0">Loading ... </span>
              ) : (
                <span className="h4 mid-bold m-0">Export to PDF</span>
              )}
            </button>
          )}{" "}
        </div>
      </div>
    </>
  );
}
