import AdsPreviewPresintation from "./AdsPreviewPresintation";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDarkMode } from "../../../../../context/DarkModeContext";
import axios from "axios";
import { formatDateWithouHour } from "../../../../../methods/FormateDate";

export default function AdsPreviewContainer() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  let [allAds, setAllAds] = useState([]);
  let [visibleAds, setVisibleAds] = useState([]);

  let [apiError, setApiError] = useState(false);
  let [noResults, setNoResults] = useState(false);
  //search variables
  let [val, setVal] = useState(""); //search value
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
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  /* *************** Handale Pop Forms *************** */
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
      console.log(response);
      if (response.data.allAdv) {
        setAllAds(response.data.allAdv);
        setVisibleAds(response.data.allAdv);
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

  //display visible Anlysis
  function displayAds() {
    return visibleAds.map((Ad, index) => {
      return (
        <div key={index} className="col-lg-12">
          <div
            className={`card mb-4 border-0 px-3 ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            <div className={`card-body`}>
              <div className="row">
                <div className="col-sm-12 col-md-2 d-flex align-items-center p-0">
                  <p className="mb-0 text-truncate">Ad No{index + 1}:</p>
                </div>
                <div className="col-5 col-sm-4 col-md-4 d-flex  justify-content-md-start align-items-center p-0">
                  {Ad.title}
                </div>
                <div className="col-sm-12 col-md-3 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">
                    {formatDateWithouHour(Ad.expDate)}
                  </p>
                </div>

                <div className="col-5 col-md-3 d-flex flex-row-reverse flex-md-row align-items-center">
                  <div className="col-6 col-md-12 ">
                    <div className="row">
                      <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
                        <Link
                          style={{ cursor: "pointer" }}
                          className="position-relative nav-link mb-0 text-truncate"
                          to={`/Ads/`}
                        >
                          Ad Details
                        </Link>
                      </div>
                      <div className="col-6 col-md-3 d-flex justify-content-end align-items-center">
                        <button
                          onClick={() => {}}
                          className="normal-btn btn d-flex justify-content-center align-items-center"
                        >
                          {" "}
                          <i
                            className={`fas fa-edit mb-0 text-truncate ${
                              darkMode ? " dark-theme" : ""
                            }`}
                          ></i>
                        </button>
                      </div>
                      <div className="col-6 col-md-3 d-flex justify-content-end align-items-center">
                        <button
                          onClick={() => deleteAd(Ad._id)}
                          className="delete-btn btn d-flex justify-content-center align-items-center"
                        >
                          {" "}
                          <i
                            className={`fas fa-trash mb-0 text-truncate ${
                              darkMode ? " dark-theme" : ""
                            }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      );
    });
  }

  /** ====================== Search Section ====================== **/
  function clearResults() {
    setVisibleAds(allAds);
  }
  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  async function searchForAd() {
    console.log(val);
    if (val.trim() === "") {
      return;
    }
  }
  /** ====================== Delete Section ====================== **/
  async function deleteAd(id) {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/advertisements/deleteAdvert/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error from deleteAd: ", error);
    }
    getAllAds();
  }
  //////////////////
  // initial use Effect
  useEffect(() => {
    getAllAds();
  }, []);
  //use Effect
  useEffect(() => {
    searchForAd();
  }, [val]);
  return (
    <AdsPreviewPresintation
      darkMode={darkMode}
      visibleAds={visibleAds}
      displayAds={displayAds}
      handaleSearchVlue={handaleSearchVlue}
      apiError={apiError}
      apiErrorMessage={apiErrorMessage}
      noResults={noResults}
    />
  );
}
