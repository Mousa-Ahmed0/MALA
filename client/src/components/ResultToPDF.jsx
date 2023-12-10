import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResultToPDF({ darkMode }) {
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.getElementById("print-section");
    if (!capture) {
      console.error("Element with id 'print-section' not found.");
      return;
    }

    capture.style.display = "block";
    capture.style.padding = "20px 100px"; // Padding

    setLoader(true);

    html2canvas(capture).then((canvas) => {
      console.log("canvas:", canvas);
      const imgData = canvas.toDataURL("image/png");
      console.log("imgData:", imgData);

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
      capture.style.display = "none"; // Set the element back to display: none
      doc.save("receipt.pdf");
    });
  };

  return (
    <>
      <div id="print-section" className="d-none">
        ssss
      </div>
      <button
        onClick={downloadPDF}
        className="delete-btn btn d-flex justify-content-center align-items-center"
      >
        {" "}
        {loader ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <i
            className={`fas fa-download mb-0 text-truncate ${
              darkMode ? " dark-theme" : ""
            }`}
          ></i>
        )}
      </button>
    </>
  );
}
