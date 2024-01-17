import React, { useEffect, useState } from "react";

import ReportsHeader from "./ReportsHeader";
import DetailsHeader from "./PaymentsReport/PaymentsToPdfComponents/PatientDetailsHeader";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDateWithouHour } from "../methods/FormateDate";
import AnalysisCostDetails from "./PaymentsReport/PaymentsToPdfComponents/AnalysisCostDetails";

export default function PaymentToPDF({
  darkMode,
  paymentDetails,
  setIsPdfLoading,
}) {
  const [loader, setLoader] = useState(false);
  const payment = paymentDetails.payment;
  const formatedDate = formatDateWithouHour(paymentDetails.date);
  const formatedICname =
    payment.InsuranceCompName.length > 0 ? payment.InsuranceCompName : "NaN";

  const downloadPDF = (payment) => {
    const doc = new jsPDF("p", "px", "a4");
    doc.setFontSize(12);
    // Calculate the middle of the page
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth =
      (doc.getStringUnitWidth("Your Custom Header") *
        doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const xPositionCenter = (pageWidth - textWidth) / 2;

    // Add the custom header to the middle of the page
    const capture = document.querySelector(".pdf-pay-section");
    capture.style.padding = "40px 65px"; // Padding
    capture.style.position = "relative"; // Padding
    capture.style.left = "0"; // Padding

    setLoader(true);
    setIsPdfLoading(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      doc.addImage(
        imgData,
        "PNG",
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight() * 0.3
      );

      doc.autoTable({
        startY: 185,
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        bodyStyles: { textColor: 0 },
        theme: "striped",

        head: [
          ["Value", "IC. Name", "Discount", "Paid Value", "Discounted Value"],
        ],
        body: [
          [
            `${payment.totalValue} NIS`,
            `${formatedICname}`,
            `${payment.InsuranceCompPers}%`,
            `${payment.paiedvalue} NIS`,
            `${payment.discountedValue} NIS`,
          ],
        ],
      });

      setLoader(false);
      setIsPdfLoading(false);

      capture.style.position = "absolute"; // Padding
      capture.style.left = "-999999px"; // Padding
      setTimeout(() => {
        doc.save("receipt.pdf");
      }, 100);
    });
  };

  //////////
  useEffect(() => {
    if (paymentDetails.payment.id === "65863210b493cffd6d34659e")
      console.log("paymentDetails", paymentDetails);
  }, []);
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
        <i className="fa-solid fa-download"></i>
      </button>
      {/* Hidden div to render components */}
      <div className={`pdf-pay-section ${darkMode ? "dark-theme" : ""}`}>
        <ReportsHeader darkMode={darkMode} />
        <DetailsHeader
          info={paymentDetails.info}
          day={paymentDetails.day}
          date={formatedDate}
          darkMode={darkMode}
        />
        <hr className="my-4" />
      </div>
    </>
  );
}
