import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDarkMode } from "../../context/DarkModeContext";
import { getAllAnalysis } from "../../apis/ApisHandale";
import { AnlysisPresintation } from "../../componentsLoader/ComponentsLoader";

export default function AnlysisContainer() {
  const { darkMode } = useDarkMode();
  let [allAnlysis, setAllAnlysis] = useState([]);
  let [visibleAnlysis, setVisibleAnlysis] = useState([]);
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

  //get All Anlysis
  async function getAnnysis() {
    try {
      const response = await getAllAnalysis();
      setApiError(false);

      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setAllAnlysis(response.data);
        setVisibleAnlysis(response.data);
      }
    } catch (error) {
      console.error(error);
      setApiError(true);

      if (error.response) {
        console.log("Error data:", error.response.data);
      }
    }
  }

  //display visible Anlysis
  function displayAnlysis() {
    return visibleAnlysis.map((Analyze, index) => {
      return (
        <div
          key={index}
          className="col-lg-4 col-md-6 col-sm-12 col-xsm-12 mb-3"
        >
          <div
            className={`card border-0 position-relative m-1 m-xl-3 mt-0 ${
              darkMode ? " spic-dark-mode border-0" : ""
            }`}
          >
            <div style={{ height: 300 }} className="card-body bottom-shadow ">
              <div className="card-Top d-flex gap-3 justify-content-center text-center align-items-center py-3">
                <div className="card-Top-Details d-flex gap-1 justify-content-center flex-column">
                  <h1 className="h4">{Analyze.name}</h1>
                  <p className="h4 my-2">({Analyze.code})</p>
                  <hr />
                  <p className="my-2">{Analyze.cost} NIS</p>
                </div>
              </div>
              <div className=" col-6 col-md-7 w-100 d-flex justify-content-center align-items-center">
                <Link
                  style={{ cursor: "pointer" }}
                  className="position-relative nav-link mb-0 text-truncate border mb-3 p-2"
                  to={`/AnlyiseDetails/${Analyze.code}`}
                >
                  Analyze Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  /** ====================== Search Section ====================== **/
  function clearResults() {
    setVisibleAnlysis(allAnlysis);
  }
  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  async function searchForAnlyze() {
    if (val.trim() === "") {
      return;
    }
    let srchResultsArray = allAnlysis.filter((Analyze) =>
      Analyze.name.toLowerCase().includes(val.toLowerCase())
    );
    if (srchResultsArray.length === 0) {
      setVisibleAnlysis([]);
      setNoResults(true);
    } else {
      setVisibleAnlysis(srchResultsArray);
    }
  }

  // initial use Effect
  useEffect(() => {
    getAnnysis();
  }, []);
  //use Effect
  useEffect(() => {
    searchForAnlyze();
  }, [val]);
  return (
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
      <AnlysisPresintation
        handaleSearchVlue={handaleSearchVlue}
        visibleAnlysis={visibleAnlysis}
        displayAnlysis={displayAnlysis}
        apiError={apiError}
        apiErrorMessage={apiErrorMessage}
        noResults={noResults}
      />
    </Suspense>
  );
}
