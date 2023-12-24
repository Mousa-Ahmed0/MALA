import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

import BackBtn from "../../BackBtn";
import { useParams } from "react-router";
import axios from "axios";
import { formatDateWithouHour } from "../../../methods/FormateDate";

export default function AdDetails({ darkMode }) {
  const { id } = useParams();
  const arrowStyles = {
    color: darkMode ? "white !important" : "black !important", // Set the desired color for the arrows
    "font-family": "fontawesome",
  };
  const [Ad, setAd] = useState();
  let [apiError, setApiError] = useState(false);
  let [noResults, setNoResults] = useState(false);
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

  //get Ad Details
  async function getAd() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/advertisements/getAdvertisId/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.allAdv) {
        setAd(response.data.allAdv);
        console.log(response);
      } else {
        setNoResults(true);
      }
    } catch (error) {
      setApiError(true);
      console.error("Error from getAd: ", error);
    }
  }

  //////////////
  useEffect(() => {
    getAd();
  }, []);
  useEffect(() => {
    console.log(Ad);
  }, [Ad]);
  return (
    <div className="ST-section">
      <BackBtn />
      {Ad ? (
        <>
          <div className="row mt-4 mb-0">
            <div className="col-12 col-md-9 h3 m-0 high-bold colorMain d-flex align-items-center my-1 text-truncate">
              {Ad.title}
            </div>
            <div className="col-12 col-md-3 h6 m-0 high-bold colorMain my-1">
              <span style={{ fontSize: "0.875rem" }} className="text-black">
                From:
              </span>
              {formatDateWithouHour(Ad.creDate)}{" "}
              <span style={{ fontSize: "0.875rem" }} className="text-black">
                to:
              </span>{" "}
              {formatDateWithouHour(Ad.expDate)}
            </div>
          </div>
          <hr className="mt-0 mb-4" />
          <div style={{}}>
            <Carousel
              nextIcon={<span style={arrowStyles}>&#xf30b;</span>}
              prevIcon={<span style={arrowStyles}>&#xf30a;</span>}
            >
              {Ad.advert.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 h-100"
                    src={img.url}
                    alt={index + 1 + " Slide"}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <hr className="my-4" />
          <div
            style={{ lineHeight: "1.75", textAlign: "justify" }}
            className="h5 m-0"
          >
            {Ad.addText}
          </div>
        </>
      ) : noResults ? (
        <div>No Results</div>
      ) : apiError ? (
        apiErrorMessage
      ) : (
        <div className="d-flex justify-content-center align-items-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
