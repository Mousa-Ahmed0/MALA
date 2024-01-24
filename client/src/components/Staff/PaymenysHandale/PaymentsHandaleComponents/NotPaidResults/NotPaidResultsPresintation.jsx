import React from "react";

import SearchBar from "../../../../SearchBar/SearchBar";
import UserFilter from "../../../../UserFilter/UserFilter";

export default function NotPaidResultsPresintation({
  darkMode,
  apiError,
  noResults,
  apiErrorMessage,
  handaleSearchVlue,
  filterOptions,
  handaleFilterOption,
  visibleResults,
  displayResults,
  filterOption,
  loader,
}) {
  return (
    <div className="ST-section my-2 p-0">
      <div className="container">
        <div className="row searchSection my-5">
          <div className="col-12 d-flex gap-3 flex-column flex-md-row align-items-start align-items-md-center p-0">
            <UserFilter
              filterOptions={filterOptions}
              handaleFilterOption={handaleFilterOption}
            />
            <SearchBar
              handaleSearchVlue={handaleSearchVlue}
              placeHolder={
                filterOption === "Doctor"
                  ? "Search for a Doctor"
                  : "Search for a Patient"
              }
            />
          </div>
        </div>
        <section className="px-4">
          <div className="row my-0 d-none d-md-block">
            <div className="col-lg-12">
              <div className="card border-0 bg-transparent">
                <div className="card-body">
                  <div className="row">
                    <div
                      className={`col-md-1 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Result #:
                    </div>
                    <div
                      className={`col-md-2 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Patient Name:
                    </div>
                    <div
                      className={`col-md-2 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Gender:
                    </div>
                    <div
                      className={`col-md-3 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Doctor:
                    </div>
                    <div
                      className={`col-md-1 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Analysis:
                    </div>
                    <div
                      className={`col-md-3 d-flex justify-content-center text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      More Options:
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            {loader ? (
              <div className="d-flex justify-content-center align-items-center my-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : Array.isArray(visibleResults) && visibleResults.length > 0 ? (
              displayResults()
            ) : apiError ? (
              apiErrorMessage
            ) : noResults || visibleResults.length === 0 ? (
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
    </div>
  );
}
