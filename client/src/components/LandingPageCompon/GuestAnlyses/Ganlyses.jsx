import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getAllAnalysis } from "../../../apis/ApisHandale";
export default function Ganlyses() {
  let navigate = useNavigate();
  let [trendAnlysis, setTrendAnlysis] = useState([]);
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
  //get All Anlysis
  async function getTrendAnlysis() {
    try {
      const response = await getAllAnalysis();

      setApiError(false);

      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setTrendAnlysis(response.data);
      }
    } catch (error) {
      console.error(error);
      setApiError(true);

      if (error.response) {
        console.log("Error data:", error.response.data);
      }
    }
  }
  function renderAnlysis() {
    if (!trendAnlysis || trendAnlysis.length === 0) {
      return (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
    }

    const renderAnlysis = [];
    for (let i = 0; trendAnlysis[i] && i < 5; i++) {
      //const anlyseID = trendAnlysess[i].id;

      renderAnlysis.push(
        <div className="col-12 col-sm-6 col-md-4 col-lg-2 ">
          <div className="trend-Box d-flex justify-content-center flex-column">
            <div>
              {" "}
              <h3 className="h5 text-center my-3">{trendAnlysis[i].name}</h3>
            </div>
            <button onClick={() => goToAnlysess()} className="det-btn mt-3">
              Details
            </button>
          </div>
        </div>
      );
    }
    return renderAnlysis;
  }
  let obj = {
    id: 0,
    name: "safasf",
  };
  function goToAnlysess() {
    navigate({
      pathname: "/Anlysis",
      state: { obj },
    });
  }
  useEffect(() => {
    getTrendAnlysis();
  }, []);
  return (
    <div className="LP-section LP-trindingAnlysis">
      {apiError ? (
        apiErrorMessage
      ) : noResults ? (
        <div>No Results Found.</div>
      ) : (
        <div className="trendRow row justify-content-center">
          <div className="col-12 trendRow-details d-flex justify-content-center align-items-center flex-column w-100">
            <div className="brd-top  mb-3"></div>
            <h2>The Most Frequently Used Tests</h2>
            <div className="brd-bottom  mt-3"></div>
          </div>
          <div className="col-12">
            <div className="row">{renderAnlysis()}</div>
          </div>
          <div className="more-Anlysis w-25 d-flex align-items-center flex-column">
            <a
              onClick={goToAnlysess}
              className="w-100 btn btn-primary  d-flex justify-content-center BTN-Bold"
            >
              More Tests
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
