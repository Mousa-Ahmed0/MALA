import React, { useEffect, useState } from "react";

import ReportsHeader from "../../ReportsHeader";
import DetailsHeader from "../../PaymentsReport/PaymentsToPdfComponents/PatientDetailsHeader";
import AnalysisCostDetails from "../../PaymentsReport/PaymentsToPdfComponents/AnalysisCostDetails";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDate } from "../../../methods/FormateDate";

import BackBtn from "../../BackBtn";
import axios from "axios";
import { useParams } from "react-router";

export default function PaymentPreview({ darkMode, setIsPdfLoading }) {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState();
  const [formatedDate, setFormatedDate] = useState("");

  //
  async function getPayment() {
    setLoader(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/payment/getPaymentId/${id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setPaymentDetails(response.data.pymentDetails);
      setFormatedDate(formatDate(response.data.pymentDetails.date));
    } catch (err) {
      console.error("Error from payment details: ", err);
    }
    setLoader(false);
  }
  //
  const downloadPDF = () => {
    const doc = new jsPDF("p", "px", "a4");
    doc.setFontSize(12);
    // Calculate the middle of the page
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth =
      (doc.getStringUnitWidth("Your Custom Header") *
        doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const xPositionCenter = (pageWidth - textWidth) / 2;

    // Add the custom header to  the page
    const capture = document.querySelector(".pdf-pay-section");
    capture.style.padding = "20px 65px"; // Padding
    capture.style.margin = "100px 0px 0px 0px"; // Margin

    // Add the details to  the page
    const captureDetails = document.querySelector(".pdf-pay-details");
    captureDetails.style.padding = "0 65px"; // Padding

    setIsPdfLoading(true);

    html2canvas(capture).then((canvas1) => {
      const imgData1 = canvas1.toDataURL("image/png");

      doc.addImage(
        imgData1,
        "PNG",
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight() * 0.2
      );

      html2canvas(captureDetails).then((canvas2) => {
        const imgData2 = canvas2.toDataURL("image/png");

        doc.addImage(
          imgData2,
          "PNG",
          0,
          125,
          doc.internal.pageSize.getWidth(),
          doc.internal.pageSize.getHeight() * 0.2
        );

        setIsPdfLoading(false);

        setTimeout(() => {
          doc.save("receipt.pdf");
        }, 100);
      });
    });
  };

  //////////
  useEffect(() => {
    getPayment();
  }, []);
  useEffect(() => {
    console.log("paymentDetails", paymentDetails);
  }, [paymentDetails]);
  return (
    <>
      <div className="ST-section my-4">
        <BackBtn />
        {loader ? (
          <div className="d-flex justify-content-center align-items-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : paymentDetails ? (
          <>
            {" "}
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
            <div className={`pdf-pay-details `}>
              <AnalysisCostDetails
                payment={paymentDetails.payment}
                darkMode={darkMode}
              />
            </div>{" "}
          </>
        ) : (
          ""
        )}
      </div>
      <hr className="my-4" />
      <div className="d-flex justify-content-center">
        <button
          className="btn m-0 nav-link position-relative"
          onClick={
            darkMode
              ? () => window.alert("Please Convert To Light mode!")
              : () => downloadPDF()
          }
        >
          <i className="h1 m-0 colorMain fa-solid fa-download"></i>
        </button>
      </div>
    </>
  );
}
