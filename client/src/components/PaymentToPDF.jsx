import React, { useState } from "react";

import ReportsHeader from "./ReportsHeader";
import DetailsHeader from "./PaymentsReport/PaymentsToPdfComponents/DetailsHeader";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PaymentToPDF({ darkMode, setIsPdfLoading }) {
  const [loader, setLoader] = useState(false);
  // Example usage
  const payment = {
    name: "Person",
    date: "22-3-2023",
    value: 275,
    // Add more properties as needed
  };
  const downloadPDF = (payment) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    // Calculate the middle of the page
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth =
      (doc.getStringUnitWidth("Your Custom Header") *
        doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const xPosition = (pageWidth - textWidth) / 2;

    // Add the custom header to the middle of the page
    const capture = document.querySelector(".pdf-pay-section");

    capture.style.padding = "1rem 2.5rem"; // Padding
    capture.style.position = "relative"; // Padding
    capture.style.left = "0"; // Padding

    setLoader(true);
    setIsPdfLoading(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      doc.addImage(imgData, "PNG", 0, 0, doc.internal.pageSize.getWidth(), 60);

      doc.autoTable({
        startY: 60,
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        bodyStyles: { textColor: 0 },
        theme: "striped",

        head: [["Value", "Date", "IC. Name", "Discount", "Paid Value"]],
        body: [["275Nis", "22-3-2024", "IC 1", "5%", "250Nis"]],
      });
      doc.text("Total Paid", xPosition, 90);
      doc.text("250Nis", xPosition, 100);

      setLoader(false);
      setIsPdfLoading(false);

      capture.style.position = "absolute"; // Padding
      capture.style.left = "-999999px"; // Padding
      setTimeout(() => {
        doc.save("receipt.pdf");
      }, 100);
    });
  };
  return (
    <>
      <button
        className="btn m-0 nav-link position-relative"
        onClick={
          darkMode
            ? () => window.alert("Please Convert To Light mode!")
            : () => downloadPDF(payment)
        }
      >
        <i class="fa-solid fa-download"></i>
      </button>
      {/* Hidden div to render components */}
      <div className={`pdf-pay-section ${darkMode ? "dark-theme" : ""}`}>
        <ReportsHeader darkMode={darkMode} />
        <DetailsHeader darkMode={darkMode} />
        <hr className="my-4" />
      </div>
    </>
  );
}
