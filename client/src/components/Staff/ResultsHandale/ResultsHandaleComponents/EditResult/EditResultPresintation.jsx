import React from "react";
import BackBtn from "../../../../BackBtn";
export default function EditResultPresintation({
  darkMode,
  result,
  getResultData,
  onSubmitForm,
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
                Edit Result:
              </h1>
              {apiMessage ? (
                <div className="alert alert-info d-flex justify-content-center">
                  {apiMessage}
                </div>
              ) : (
                ""
              )}
              <div className="row d-flex  flex-column flex-md-row">
                <div className="row">
                  <div className="col-12 col-md-4 mb-3 bg-white">
                    <div className="row">
                      <div className="col-12 mb-3"> Staff Ident:</div>
                      <div className="col-12 text-center colorMain h3 m-0 high-bold">
                        {result.staffIdent}
                      </div>
                    </div>
                  </div>
                  <div className="col-1"></div>
                  <div className="col-12 col-md-3 mb-3 bg-white">
                    <div className="row">
                      <div className="col-12 mb-3"> Patient Ident:</div>
                      <div className="col-12 text-center h3 m-0 high-bold">
                        {result.patientIdent}
                      </div>
                    </div>
                  </div>
                  <div className="col-1"></div>
                  <div className="col-12 col-md-3 mb-3 bg-white">
                    <div className="row text-truncate">
                      <div className="col-12 mb-3">Doctor:</div>
                      <div className="col-12 text-center h3 m-0 high-bold colorMain">
                        {result.doctorIdent !== 0 ? (
                          <div>
                            <span style={{ fontSize: "0.675rem" }}>
                              Dr. Ident:{" "}
                            </span>
                            {result.doctorIdent}
                          </div>
                        ) : (
                          <div>
                            <span style={{ fontSize: "0.675rem" }}>Dr. </span>
                            {result.doctorName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="row">
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
                  <div className="col-5"></div>
                  <div className="col-12 col-md-3 mb-3 bg-white">
                    <div className="row">
                      <div className="col-12 mb-3"> No. of Analysis:</div>
                      <div className="col-12 text-center colorMain h3 m-0 high-bold">
                        {result.resultSet?.length || 0}
                      </div>
                    </div>
                  </div>
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
                <div className="h-100 alert m-0 col-12  d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary d-flex justify-content-center BTN-Bold"
                  >
                    Update
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
