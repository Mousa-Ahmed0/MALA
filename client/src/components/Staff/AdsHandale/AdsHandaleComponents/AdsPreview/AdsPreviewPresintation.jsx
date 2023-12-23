import React from "react";
import BackBtn from "../../../../BackBtn";
import SearchBar from "../../../../SearchBar/SearchBar";

export default function AdsPreviewPresintation({
  handaleSearchVlue,
  darkMode,
  visibleAds,
  displayAds,
  apiError,
  apiErrorMessage,
  noResults,
}) {
  return (
    <>
      <BackBtn />
      <div className="row my-5">
        <div className="row">
          <div className="col-lg-12">
            <SearchBar handaleSearchVlue={handaleSearchVlue} />
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
                      Ad #:
                    </div>
                    <div
                      className={`col-md-4 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Ad Title:
                    </div>
                    <div
                      className={`col-md-3 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Finish Date:
                    </div>

                    <div
                      className={`col-md-3 text-truncate text-muted d-flex justify-content-center p-0 ${
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
          <div className="row">
            {Array.isArray(visibleAds) && visibleAds.length > 0 ? (
              displayAds()
            ) : apiError ? (
              apiErrorMessage
            ) : noResults || visibleAds.length === 0 ? (
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
