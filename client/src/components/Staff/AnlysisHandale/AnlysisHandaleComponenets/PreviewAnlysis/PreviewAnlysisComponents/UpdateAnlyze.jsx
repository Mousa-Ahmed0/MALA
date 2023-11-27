import React, { useEffect, useState } from "react";

export default function UpdateAnlyze({
  closeUpdateForm,
  darkMode,
  Anlyze,
  setAnlyze,
}) {
  let [components, setComponents] = useState(Anlyze.compnents);
  //update User Details
  async function updateAnlyze(e) {
    e.preventDefault();
  }
  // get new userDetails
  function getNewData(e) {}

  //renderAnlyzeComponents
  function renderAnlyzeComponents() {
    return Anlyze.compnents.map((component) => {
      return <>1</>;
    });
  }
  return (
    <div className="w-100 my-4">
      <div className="row mx-4 mt-2 mb-4">
        <div className="col-lg-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <h1
                className={`m-0 h3 formHeader  ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Update Form:
              </h1>
            </div>
            <button
              type="button"
              onClick={() => closeUpdateForm()}
              className="btn btn-danger"
            >
              X
            </button>
          </div>
        </div>
      </div>
      <div className="row mx-4 mt-2 mb-4">
        <div className="Reg-Pat">
          <div className={`page-form ${darkMode ? " spic-dark-mode" : ""}`}>
            <form className="mx-5" onSubmit={updateAnlyze}>
              <h1
                className={`h3 formHeader ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Edit Anlyze:
              </h1>
              <div className="d-flex gap-4 flex-column flex-md-row">
                <div className="mb-3">
                  <label
                    htmlFor="a_name"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Analyze Name:
                  </label>
                  <input
                    onChange={getNewData}
                    type="text"
                    name="name"
                    className="form-control"
                    id="a_name"
                    value={Anlyze.name}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="a_code"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Analyze Code:
                  </label>
                  <input
                    onChange={getNewData}
                    type="text"
                    name="code"
                    className="form-control"
                    id="a_code"
                    value={Anlyze.code}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="a_cost"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Analyze Cost:
                  </label>
                  <input
                    onChange={getNewData}
                    type="number"
                    name="cost"
                    className="form-control"
                    id="a_cost"
                    value={Anlyze.cost}
                  />
                </div>
              </div>
              <div className="d-flex gap-4 flex-column flex-md-row">
                <div className="mb-3 w-100">
                  <label
                    htmlFor="a_description"
                    className={`form-label text-truncate ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Anlyze Description:
                  </label>
                  <textarea
                    onChange={getNewData}
                    name="description"
                    className="form-control w-75"
                    id="a_description"
                    rows="5"
                    value={Anlyze.description}
                  />
                </div>
              </div>
              <h1
                className={`h3 formHeader my-5 ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Components Details:
              </h1>
              {renderAnlyzeComponents()}
              <div className="mb-3 d-flex justify-content-end">
                <button className="btn btn-primary d-flex justify-content-center BTN-Bold">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
