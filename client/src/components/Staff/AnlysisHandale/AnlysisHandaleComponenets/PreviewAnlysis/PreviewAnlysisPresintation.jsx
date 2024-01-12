import React from "react";

import SearchBar from "../../../../SearchBar/SearchBar";

export default function PreviewAnlysisPresintation({
  handaleSearchVlue,
  darkMode,
  visibleAnlysis,
  displayAnlysis,
  apiError,
  apiErrorMessage,
  noResults,
  renderCategoriesArray,
  handaleCategory,
  avilableCategories,
}) {
  return (
    <>
      <div className="row my-5">
        <div className="row">
          <div className="col-12 col-lg-10">
            <SearchBar
              handaleSearchVlue={handaleSearchVlue}
              placeHolder={"Analyze Name ..."}
            />
          </div>
          <div className="col-6 col-lg-2 d-flex align-items-center">
            <select
              className={`form-select ${
                darkMode ? " spic-dark-mode" : ""
              } w-100`}
              aria-label="Default select example"
              name="analyzeCategory"
              onChange={(e) => handaleCategory(e)}
            >
              <option value={""} hidden>
                Category:
              </option>
              <option value="noValue">All Categories</option>
              {avilableCategories.length > 0
                ? renderCategoriesArray()
                : "Loading ... "}
            </select>
          </div>
        </div>
        <section className="px-4">
          <div className="row my-0 d-none d-md-block">
            <div className="col-lg-12">
              <div className="card border-0 bg-transparent">
                <div className="card-body">
                  <div className="row">
                    <div
                      className={`col-md-2 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Analyze #:
                    </div>
                    <div
                      className={`col-md-3 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Analyze Name:
                    </div>
                    <div
                      className={`col-md-4 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Analyze Cost:
                    </div>

                    <div
                      className={`col-md-3 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      More Options:
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="row my-4">
            {Array.isArray(visibleAnlysis) && visibleAnlysis.length > 0 ? (
              displayAnlysis()
            ) : apiError ? (
              apiErrorMessage
            ) : noResults ? (
              <div className="my-4 mid-bold">No results Found.</div>
            ) : (
              <div className="d-flex justify-content-center align-items-center my-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
