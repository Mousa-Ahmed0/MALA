import PreviewAnlysisPresintation from "./PreviewAnlysisPresintation";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDarkMode } from "../../../../../context/DarkModeContext";
import { getAllAnalysis } from "../../../../../apis/ApisHandale";
import axios from "axios";

export default function PreviewAnlysisContainer() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  let [allAnlysis, setAllAnlysis] = useState([]);
  let [visibleAnlysis, setVisibleAnlysis] = useState([]);
  let [searchResults, setSearchResults] = useState([]);
  let [apiError, setApiError] = useState(false);
  let [noResults, setNoResults] = useState(false);
  //Category
  const [avilableCategories, setAvilableCategories] = useState([]);
  const [categoryOption, setCategoryOption] = useState("noValue");
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
  function handaleUpdateFormOpen(code) {
    navigate(`/Staff/AnlysisController/UpdateAnlyze/${code}`);
  }

  //get All Anlysis
  async function getAnalysis() {
    try {
      const response = await getAllAnalysis();
      console.log(response);
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
                          onClick={() => handaleUpdateFormOpen(Analyze.code)}
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
  //get current categories
  async function getCategories() {
    try {
      let response = await axios.get(
        "http://localhost:5000/api/analyze/getCategorys",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response);
      if (response.data.length > 0) setAvilableCategories(response.data);
    } catch (error) {
      console.error("Error From getCategories: ", error);
    }
  }
  function handaleCategory(e) {
    if (e && e.target && e.target.value) {
      setCategoryOption(e.target.value);
      const option = e.target.value;
      if (searchResults.length === 0 || !searchResults || val === "") {
        console.log("No Search");
        if (option === "noValue") {
          clearResults();
        } else if (avilableCategories.includes(option)) {
          const filterdAnalysis = allAnlysis.filter(
            (analyze) => analyze.analyzeCategory === option
          );
          console.log(filterdAnalysis);
          setVisibleAnlysis(filterdAnalysis);
        }
      } else {
        console.log("Search");
        if (option === "noValue") {
          console.log("hh");
          setVisibleAnlysis(searchResults);
        } else if (avilableCategories.includes(option)) {
          const filterdAnalysis = searchResults.filter(
            (analyze) => analyze.analyzeCategory === option
          );
          if (filterdAnalysis.length > 0) setVisibleAnlysis(filterdAnalysis);
          else {
            setVisibleAnlysis([]);
            setNoResults(true);
          }
        }
      }
      if (visibleAnlysis.length === 0) {
        setNoResults(true);
      }
    } else {
      if (searchResults.length === 0 || !searchResults || val === "") {
        clearResults();
      } else {
        setVisibleAnlysis(searchResults);
      }
    }
  }
  /* Render renderCategoriesArray */
  function renderCategoriesArray() {
    return avilableCategories.map((category, index) => {
      if (category) {
        return (
          <option key={index} value={category}>
            {category}
          </option>
        );
      }
    });
  }
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
      setSearchResults(srchResultsArray);
    }
  }

  // initial use Effect
  useEffect(() => {
    getAnalysis();
    getCategories();
  }, []);
  //use Effect
  useEffect(() => {
    searchForAnlyze();
  }, [val]);
  useEffect(() => {
    // Filter and display users when the filter option or data changes
    handaleCategory(categoryOption);
  }, [categoryOption, searchResults]);
  //use Effect
  useEffect(() => {
    console.log("visibleAnlysis", visibleAnlysis);
  }, [visibleAnlysis]);
  return (
    <PreviewAnlysisPresintation
      handaleSearchVlue={handaleSearchVlue}
      darkMode={darkMode}
      visibleAnlysis={visibleAnlysis}
      displayAnlysis={displayAnlysis}
      apiError={apiError}
      apiErrorMessage={apiErrorMessage}
      noResults={noResults}
      renderCategoriesArray={renderCategoriesArray}
      handaleCategory={handaleCategory}
      avilableCategories={avilableCategories}
    />
  );
}
