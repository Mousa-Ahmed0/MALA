import React, { useState, useEffect, Suspense } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import BackBtn from "../BackBtn";
import {
  DetailsInformation,
  ReportsHeader,
  ResultsTable,
} from "../../componentsLoader/ComponentsLoader.js";
import { getDetailsResult } from "../../apis/ApisHandale.jsx";

import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResultDetails({ user }) {
  const [loader, setLoader] = useState(false);
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const [resultDetails, setResuultDetails] = useState({});
  async function getResultDetails() {
    try {
      let response = await getDetailsResult(id);
      //console.log(response);
      setResuultDetails(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  }

  function renderDetails() {
    return (
      <div className="print-section">
        <div className="print-result Report-header mb-1">
          <Suspense
            fallback={
              <div className="center-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            {" "}
            <ReportsHeader darkMode={darkMode} />
          </Suspense>
          <Suspense
            fallback={
              <div className="center-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            <DetailsInformation
              darkMode={darkMode}
              doctorInformation={
                resultDetails.usersDoctor
                  ? resultDetails.usersDoctor.firstname
                    ? resultDetails.usersDoctor.firstname +
                      " " +
                      resultDetails.usersDoctor.lastname
                    : resultDetails.usersDoctor
                  : "Not Found"
              }
              patintInformation={resultDetails.usersPatint}
              staffInformation={resultDetails.usersStaff}
              date={resultDetails.resultDate}
            />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="center-container">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        >
          <ResultsTable
            user={user}
            darkMode={darkMode}
            resultDetails={resultDetails}
          />
        </Suspense>
      </div>
    );
  }

  const downloadPDF = () => {
    const ai = document.querySelector(".ai-pridict");
    ai.classList.add("d-none");
    const capture = document.querySelector(".print-section");
    capture.style.padding = "40px 65px"; // Padding

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
        componentHeight * 0.65
      );
      setLoader(false);
      doc.save("receipt.pdf");
    });
    ai.classList.remove("d-none");
  };
  useEffect(() => {
    getResultDetails();
  }, []);

  return (
    <>
      <div className="section my-0">
        <div className="BackBtn my-2">
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
