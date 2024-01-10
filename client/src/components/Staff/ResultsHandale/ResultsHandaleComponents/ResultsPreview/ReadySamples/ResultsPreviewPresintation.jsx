import React, { useEffect, useState } from "react";

import SearchBar from "../../../../../SearchBar/SearchBar";
import UserFilter from "../../../../../UserFilter/UserFilter";
import PaginationNav from "../../../../../PaginationNav";

export default function ResultsPreviewPresintation({
  darkMode,
  visibleResults,
  displayResults,
  apiError,
  apiErrorMessage,
  noResults,
  isCustomeDate,
  hadaleDateFilters,
  handaleDataRangeChange,
  filterOptions,
  handaleFilterOption,
  srchFilterOptions,
  searchFilterOption,
  val,
  handaleSearchVlue,
  srchFilterOption,
  dateRange,
  usersCount,
  pageNo,
  setPageNo,
}) {
  return (
    <div className="ST-section my-2 p-0">
      <div className="container">
        <div className="row searchSection mb-5">
          <div className="col-sm-12 col-md-6 d-flex gap-4 align-items-center p-0">
            <UserFilter
              filterLabel={"Search for:"}
              filterOptions={srchFilterOptions}
              handaleFilterOption={searchFilterOption}
            />
            <SearchBar
              handaleSearchVlue={handaleSearchVlue}
              val={val}
              placeHolder={
                srchFilterOption === "Patient"
                  ? "Enter Patient Name ..."
                  : "Enter Doctor Name ..."
              }
            />
          </div>
          <div
            className={`col-sm-12 col-md-4 d-flex justify-content-md-end align-items-center p-0`}
          >
            <div className="a w-100">
              <div
                className={`col-12 ${
                  isCustomeDate ? "d-none" : ""
                } d-flex justify-content-md-end`}
              >
                <UserFilter
                  filterOptions={filterOptions}
                  handaleFilterOption={handaleFilterOption}
                />
              </div>
              <div
                className={`col-12 ${
                  !isCustomeDate ? "d-none" : ""
                } d-flex justify-content-md-end gap-4`}
              >
                <div className="col-6">
                  <label
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    From
                  </label>
                  <input
                    type="date"
                    name="firstDate"
                    className="form-control"
                    value={dateRange.firstDate}
                    onChange={(e) => handaleDataRangeChange(e)}
                  />
                </div>
                <div className="col-6">
                  <label
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    to
                  </label>
                  <input
                    type="date"
                    name="secondtDate"
                    className="form-control"
                    value={dateRange.secondtDate}
                    onChange={(e) => handaleDataRangeChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 d-flex justify-content-md-end align-items-center p-0">
            <div className="custom-control custom-checkbox d-flex gap-2">
              <input
                onChange={() => hadaleDateFilters()}
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                checked={isCustomeDate}
              />
              <label
                className={`custom-control-label mx-2 ${
                  darkMode ? " text-white" : ""
                }`}
                htmlFor="customCheck1"
              >
                Custome Date?
              </label>
            </div>
          </div>
        </div>
        <section className="px-4">
          <PaginationNav
            counts={usersCount}
            pageNo={pageNo}
            setPageNo={setPageNo}
            countPerPage={10}
          />{" "}
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
            {Array.isArray(visibleResults) && visibleResults.length > 0 ? (
              displayResults()
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
          <PaginationNav
            counts={usersCount}
            pageNo={pageNo}
            setPageNo={setPageNo}
            countPerPage={10}
          />
        </section>
      </div>
    </div>
  );
}
