import PreviewAnlysisPresintation from "./PreviewAnlysisPresintation";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useDarkMode } from "../../../../../context/DarkModeContext";
import { getAllAnalysis } from "../../../../../apis/ApisHandale";

export default function PreviewAnlysisContainer({ setIsFormOpen }) {
  const { darkMode } = useDarkMode();
  let [allAnlysis, setAllAnlysis] = useState([]);
  let [visibleAnlysis, setVisibleAnlysis] = useState([]);
  let [apiError, setApiError] = useState(false);
  let [noResults, setNoResults] = useState(false);
  let [Anlyze, setAnlyze] = useState({
    name: "",
    code: "",
    cost: 0,
    description: "",
    isAvailable: true,
    compnents: [],
  });
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
  //update form open
  function handaleUpdateFormOpen(a) {
    setIsFormOpen(true);
    setIsUpdateFormOpen(true);
    setAnlyze(a);
  }

  function closeUpdateForm() {
    setIsFormOpen(false);
    setIsUpdateFormOpen(false);
  }
  //get All Anlysis
  async function getAnalysis() {
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
        <div key={index} className="col-lg-12">
          <div
            className={`card mb-4 border-0 px-3 ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            <div className={`card-body`}>
              <div className="row">
                <div className="col-sm-12 col-md-2 d-flex align-items-center p-0">
                  <p className="mb-0 text-truncate">Analyze No{index + 1}:</p>
                </div>
                <div className="col-5 col-sm-4 col-md-3 d-flex  justify-content-md-start align-items-center p-0">
                  {Analyze.name} ({Analyze.code})
                </div>
                <div className="col-sm-12 col-md-4 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{Analyze.cost} NIS</p>
                </div>

                <div className="col-5 col-md-3 d-flex flex-row-reverse flex-md-row align-items-center">
                  <div className="col-6 col-md-12 ">
                    <div className="row">
                      <div className="col-6 col-md-7 d-flex align-items-center">
                        <Link
                          style={{ cursor: "pointer" }}
                          className="position-relative nav-link mb-0 text-truncate"
                          to={`/AnlyiseDetails/${Analyze.code}`}
                        >
                          Analyze Details
                        </Link>
                      </div>
                      <div className="col-6 col-md-5 d-flex align-items-center">
                        <button
                          onClick={() => handaleUpdateFormOpen(Analyze)}
                          className="delete-btn btn d-flex justify-content-center align-items-center"
                        >
                          {" "}
                          <i
                            className={`fas fa-edit mb-0 text-truncate ${
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
    setVisibleAnlysis(allAnlysis);
  }
  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  async function searchForAnlyze() {
    console.log(val);
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
    getAnalysis();
  }, []);
  //use Effect
  useEffect(() => {
    searchForAnlyze();
  }, [val]);
  //use Effect
  useEffect(() => {
    console.log(Anlyze);
  }, [Anlyze]);
  return (
    <PreviewAnlysisPresintation
      handaleSearchVlue={handaleSearchVlue}
      darkMode={darkMode}
      visibleAnlysis={visibleAnlysis}
      displayAnlysis={displayAnlysis}
      apiError={apiError}
      apiErrorMessage={apiErrorMessage}
      noResults={noResults}
      closeUpdateForm={closeUpdateForm}
      isUpdateFormOpen={isUpdateFormOpen}
      Anlyze={Anlyze}
      setAnlyze={setAnlyze}
    />
  );
}
