import React, { useEffect, useState } from "react";
import { updateAnAd } from "../../../../../../apis/ApisHandale";

export default function UpdateAd({
  closeUpdateForm,
  darkMode,
  ad,
  setAd,
  getAllAds,
  setApiError,
  apiError,
  apiErrorMessage,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  //update User Details
  async function setNewAd(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log("ad before send", ad);
      const formDataToSend = new FormData();
      formDataToSend.append("title", ad.title);
      formDataToSend.append("addText", ad.addText);
      formDataToSend.append("creDate", ad.creDate);
      formDataToSend.append("expDate", ad.expDate);

      const response = await updateAnAd(ad.id, ad);
      console.log(response);
      setApiMessage("Done!");
    } catch (error) {
      setApiError(true);
      console.error("Error:", error);
      console.error("Error Response:", error.response); // Log the error response
    }

    getAllAds();
    setIsLoading(false);
  }
  // get new userDetails
  function getAdData(e) {
    let newAd = { ...ad };
    if (e.target.name === "creDate" || e.target.name === "expDate")
      newAd[e.target.name] = new Date(e.target.value);
    else newAd[e.target.name] = e.target.value;
    setAd(newAd);
  }

  useEffect(() => {
    console.log(ad);
  }, [ad]);
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
            {apiError ? (
              apiErrorMessage
            ) : (
              <form className="mx-5" onSubmit={setNewAd}>
                <h1
                  className={`h3 formHeader ${
                    darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                  }`}
                >
                  Add a New Ad:
                </h1>
                {apiMessage ? (
                  <div className="alert alert-info d-flex justify-content-center align-items-center">
                    {apiMessage}
                  </div>
                ) : (
                  ""
                )}

                <div className="row align-items-center">
                  <div className="col-12 col-md-5">
                    <label
                      className={`form-label text-truncate ${
                        darkMode ? " spic-dark-mode" : ""
                      }`}
                    >
                      Ad. Name:
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={ad.title}
                      onChange={(e) => getAdData(e)}
                    />
                  </div>
                  <div className="col-1 d-none d-md-flex justify-content-center align-items-end">
                    |
                  </div>
                  <div className="col-12 col-md-3">
                    <label
                      className={`form-label text-truncate ${
                        darkMode ? " spic-dark-mode" : ""
                      }`}
                    >
                      Start Date:
                    </label>
                    <input
                      type="date"
                      name="creDate"
                      className="form-control"
                      value={ad.creDate}
                      onChange={(e) => getAdData(e)}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <label
                      className={`form-label text-truncate ${
                        darkMode ? " spic-dark-mode" : ""
                      }`}
                    >
                      End Date:
                    </label>
                    <input
                      type="date"
                      name="expDate"
                      className="form-control"
                      value={ad.expDate}
                      onChange={(e) => getAdData(e)}
                    />
                  </div>
                </div>
                <hr className="d-none d-md-block my-4" />
                <div className="row justify-content-center align-items-center">
                  <div className="col-12">
                    <label
                      className={`form-label text-truncate ${
                        darkMode ? " spic-dark-mode" : ""
                      }`}
                    >
                      Ad. Details:
                    </label>
                    <textarea
                      name="addText"
                      className="form-control w-100"
                      rows="5"
                      value={ad.addText}
                      onChange={(e) => getAdData(e)}
                    />
                  </div>
                </div>
                <hr className=" my-4" />

                <div className="mt-4 d-flex justify-content-around">
                  <button className="btn btn-primary  d-flex justify-content-center BTN-Bold">
                    {isLoading ? (
                      <div className="d-flex justify-content-center align-items-center my-4">
                        <div
                          className="spinner-border text-white"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
