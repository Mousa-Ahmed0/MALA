import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import BackBtn from "../BackBtn";

import { getOneAnalyze } from "../../apis/ApisHandale";

export default function AnlyiseDetails() {
  const { code } = useParams();
  let [Analyze, setAnalyze] = useState({});
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

  async function getAnalyzeDetails() {
    try {
      const response = await getOneAnalyze(code);
      setApiError(false);
      console.log(response);
      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setAnalyze(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAnalyzeDetails();
    console.log(code);
  }, []);
  useEffect(() => {
    console.log(Analyze);
  }, [Analyze]);

  return (
    <>
      <div className="ST-section">
        <BackBtn />
        {Analyze ? (
          <div className="LP-section anly-det d-flex flex-column justify-content-center align-items-center gap-2">
            <div
              className={`alert ${
                Analyze.isAvailable ? "alert-success" : "alert-danger"
              }`}
            >
              Available!
            </div>
            <h2 className="anl-name mb-4">
              {Analyze.name} ({Analyze.code})
            </h2>
            <div className="anl-det">
              <p className="anl-cost">Cost: {Analyze.cost} Nis</p>
              <p>{Analyze.description}</p>
            </div>
          </div>
        ) : apiError ? (
          apiErrorMessage
        ) : noResults ? (
          <div className="my-4 mid-bold">No results Found.</div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
