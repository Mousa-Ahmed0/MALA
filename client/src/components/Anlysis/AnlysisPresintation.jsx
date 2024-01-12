import React from "react";

import BackBtn from "../BackBtn";
import SearchBar from "../SearchBar/SearchBar";

export default function AnlysisPresintation({
  handaleSearchVlue,
  visibleAnlysis,
  displayAnlysis,
  apiError,
  apiErrorMessage,
  noResults,
}) {
  return (
    <div className="ST-section">
      <BackBtn />
      <div className="row my-5">
        <div className="row">
          <div className="col-12 col-md-7">
            <SearchBar handaleSearchVlue={handaleSearchVlue} />
          </div>
          <div className="col-12 d-md-none">
            <hr className="my-4 " />
          </div>
        </div>
        <section className="px-4">
          <div className="row">
            {Array.isArray(visibleAnlysis) && visibleAnlysis.length > 0 ? (
              displayAnlysis()
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
        </section>
      </div>
    </div>
  );
}
