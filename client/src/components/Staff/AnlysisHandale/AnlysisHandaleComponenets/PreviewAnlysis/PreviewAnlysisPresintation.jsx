import React from "react";

import BackBtn from "../../../../BackBtn";
import SearchBar from "../../../../SearchBar/SearchBar";
import UpdateAnlyze from "./PreviewAnlysisComponents/UpdateAnlyze";

export default function PreviewAnlysisPresintation({
  handaleSearchVlue,
  darkMode,
  visibleAnlysis,
  displayAnlysis,
  apiError,
  apiErrorMessage,
  noResults,
  isUpdateFormOpen,
  closeUpdateForm,
  Anlyze,
  setAnlyze,
}) {
  return (
    <>
      <div
        className={`position-relative my-4 ${
          isUpdateFormOpen ? "d-flex" : "d-none"
        } ${
          darkMode ? " spic-dark-mode border-0" : "bg-white"
        } justify-content-center align-items-center h-100 w-100 z-200`}
      >
        <UpdateAnlyze
          Anlyze={Anlyze}
          setAnlyze={setAnlyze}
          isUpdateFormOpen={isUpdateFormOpen}
          darkMode={darkMode}
          closeUpdateForm={closeUpdateForm}
        />
      </div>
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
          <div className="row">
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
