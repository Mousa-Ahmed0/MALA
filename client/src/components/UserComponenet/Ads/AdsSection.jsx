import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDateWithouHour } from "../../../methods/FormateDate";

export default function AdsSection({ darkMode }) {
  let [allAds, setAllAds] = useState([]);
  let [apiError, setApiError] = useState(false);
  let [noResults, setNoResults] = useState(false);
  let apiErrorMessage = (
    <div className="w-100 h-100 d-flex flex-column align-items-center">
      <div className="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
        Error!!!
      </div>
      <div className="my-4 mid-bold">
        Theres a proplem! Please wait for us to solve the proplem.
      </div>
    </div>
  );

  //get All Ads
  async function getAllAds() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/advertisements/getAdvertis",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.allAdv) {
        setAllAds(response.data.allAdv);
      } else {
        setNoResults(true);
      }
      setApiError(false);
    } catch (error) {
      console.error(error);
      setApiError(true);

      if (error.response) {
        console.log("Error data:", error.response.data);
      }
    }
  }

  function renderAds() {
    return allAds.map((ad, index) => (
      <div
        key={index}
        className="row detailes-size d-flex align-items-center my-4"
      >
        <div className="col-3 d-flex align-items-center text-truncate">
          {ad.title}
        </div>
        <div className="col-6 d-flex align-items-center">
          {formatDateWithouHour(ad.expDate)}
        </div>
        <div className="col-3 d-flex align-items-center">
          <Link
            to={`/AdDetails/${ad._id}`}
            className="btn m-0 nav-link position-relative"
          >
            More Details
          </Link>
        </div>
      </div>
    ));
  }
  //////////////////
  // initial use Effect
  useEffect(() => {
    getAllAds();
  }, []);
  //
  return (
    <>
      {" "}
      <div
        className={`p-4 col-12 my-4 maxHeight-inhert overflow-hidden ${
          darkMode ? " spic-dark-mode" : " bg-white"
        }`}
      >
        <h1 className="h5">
          <span>
            <i className="fa-solid fa-bullhorn"></i>
          </span>{" "}
          Notice Board:
        </h1>
        <hr className="my-4" />
        <div className="row d-none d-md-flex details-size mt-2 mb-4">
          <div className="col-md-3 mid-bold">Title:</div>
          <div className="col-md-6 mid-bold">Date:</div>
          <div className="col-md-3 mid-bold">More:</div>
        </div>
        <div className="maxHeight-part overflow-yAxis ">
          {allAds ? (
            renderAds()
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
      </div>
    </>
  );
}
