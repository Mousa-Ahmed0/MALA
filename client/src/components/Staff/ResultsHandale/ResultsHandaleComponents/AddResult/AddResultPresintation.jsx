import React from "react";
import BackBtn from "../../../../BackBtn";
export default function AddResultPresintation({
  darkMode,
  result,
  setResult,
  getResultData,
  onSubmitForm,
  renderDoctorsOption,
  renderResultSet,
  apiMessage,
}) {
  return (
    <>
      <div className="ST-section my-1">
        <BackBtn />
        <div className="Reg-Pat my-4">
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
              <div className="mb-3 row">
                <div className="col-12 col-md-8 d-flex flex-column">
                  <div className="row h-100 align-items-center">
                    <div className="col-12 col-md-4 m-0 alert custom-control custom-checkbox ">
                      <input
                        onChange={() =>
                          setResult({ ...result, isPaied: !result.isPaied })
                        }
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        checked={result.isPaied}
                      />
                      <label
                        className={`mid-bold custom-control-label mx-2 ${
                          darkMode ? " spic-dark-mode" : ""
                        }`}
                        htmlFor="customCheck1"
                      >
                        is Paid?
                      </label>
                    </div>
                    <div className="col-12 col-md-4 m-0 alert custom-control custom-checkbox ">
                      <input
                        onChange={() =>
                          setResult({ ...result, isDone: !result.isDone })
                        }
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        checked={!result.isDone}
                      />
                      <label
                        className={`mid-bold custom-control-label mx-2 ${
                          darkMode ? " spic-dark-mode" : ""
                        }`}
                        htmlFor="customCheck1"
                      >
                        Result Not Ready?
                      </label>
                    </div>
                  </div>
                </div>
                <div className="h-100 alert m-0 col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
                  <button
                    type="submit"
                    className="btn btn-primary d-flex justify-content-center BTN-Bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
