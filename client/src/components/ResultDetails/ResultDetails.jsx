import React, { useState, useEffect } from "react";
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
  const exportToPDF = () => {};
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
      <div className="print-section container">
        <div className="print-resultReport-header mb-1">
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
        <div className="d-flex align-items-center justify-content-center print-button mt-4">
          <button
            className="btn btn-info text-white p-3"
            onClick={() => window.print()}
          >
            <span className="h4 mid-bold">Print</span>
          </button>
          <button
            className="btn btn-success text-white p-3 ml-2"
            onClick={exportToPDF}
          >
            {loader ? (
              <span className="h4 mid-bold">Loading ... </span>
            ) : (
              <span className="h4 mid-bold">Export to PDF</span>
            )}{" "}
          </button>
        </div>
      </div>
    </>
  );
}
