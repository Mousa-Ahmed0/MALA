import React, { useEffect } from "react";

export default function AddResultPresintation({
  darkMode,
  result,
  getResultData,
  onSubmitForm,
  renderDoctorsOption,
  renderResultSet,
  apiMessage,
}) {
  return (
    <>
      <div className="row mx-4 mt-2 mb-4">
        <div className="Reg-Pat">
          <div className={`page-form ${darkMode ? " spic-dark-mode" : ""}`}>
            <form className="mx-5" onSubmit={onSubmitForm}>
              <h1
                className={`h3 formHeader ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                New Result:
              </h1>
              {apiMessage ? (
                <div className="alert alert-info d-flex justify-content-center">
                  {apiMessage}
                </div>
              ) : (
                ""
              )}
              <div className="row d-flex  flex-column flex-md-row">
                <div className="col-12 col-md-4 mb-3">
                  <label
                    htmlFor="r_staff"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Staff Ident:
                  </label>
                  <input
                    onChange={getResultData}
                    type="text"
                    name="staffIdent"
                    className="form-control"
                    id="r_staff"
                    value={result.staffIdent}
                  />
                </div>
                <div className="col-12 col-md-4 mb-3">
                  <label
                    htmlFor="r_patientIdent"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Patient Ident:
                  </label>
                  <input
                    onChange={getResultData}
                    type="text"
                    name="patientIdent"
                    className="form-control"
                    id="r_patientIdent"
                    value={result.patientIdent}
                  />
                </div>
                <div className="col-12 col-lg-4 mb-3">
                  <label
                    htmlFor="r_date"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Result Date:
                  </label>
                  <input
                    onChange={getResultData}
                    type="date"
                    name="date"
                    className="form-control"
                    id="r_date"
                    value={result.date}
                  />
                </div>
              </div>
              <div className="row d-flex flex-column flex-md-row">
                <div className="col-12 col-lg-4 my-3 d-flex justify-content-between align-items-center">
                  <label
                    htmlFor="r_doctor"
                    className={` m-0 form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Doctor:
                  </label>
                  <select
                    className={`w-75 mx-2 border border-white all-Mid-shadow ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                    aria-label="Default select example"
                    name="doctorIdent"
                    id="r_doctor"
                    onChange={getResultData}
                  >
                    {renderDoctorsOption()}
                  </select>
                </div>
                <div className="col-12 col-lg-4 mb-3">
                  <label
                    htmlFor="r_doctorName"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Doctor Not Found?
                  </label>
                  <input
                    onChange={getResultData}
                    type="text"
                    name="doctorName"
                    className="form-control"
                    id="r_doctorName"
                    value={result.doctorName}
                    disabled={result.doctorIdent != "0"}
                  />
                </div>
                <div className="col-12 col-lg-4 mb-3">
                  <label
                    htmlFor="a_no"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    No of Analysis:
                  </label>
                  <input
                    onChange={getResultData}
                    type="number"
                    name="a_no"
                    className="form-control"
                    id="a_no"
                  />
                </div>
              </div>
              <h1
                className={`h3 formHeader my-5 ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                ResultSet Details:
              </h1>
              {renderResultSet()}
              <div className="mb-3 d-flex justify-content-end">
                <button className="btn btn-primary d-flex justify-content-center BTN-Bold">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
