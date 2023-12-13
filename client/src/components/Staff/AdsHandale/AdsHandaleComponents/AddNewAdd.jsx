import React, { useState, useEffect } from "react";

import { useDarkMode } from "../../../../context/DarkModeContext";

import BackBtn from "../../../BackBtn";
export default function AddNewAdd({ setIsFormOpen }) {
  const { darkMode } = useDarkMode();
  const [ad, setAd] = useState({
    title: "",
    addText: "",
    creDate: new Date(),
    expDate: new Date(),
    advert: [],
  });
  const [images, setImages] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);

  //add ad
  async function onFormSubmit(e) {
    e.preventDefault();
    const newAd = { ...ad, advert: images };
    console.log("Uploading images:", images);
    console.log("Uploading Ad:", newAd);
  }

  //image changes
  const handleImageChange = async (e) => {
    const selectedImages = Array.from(e.target.files);
    await setImages(selectedImages);
  };
  return (
    <div className="ST-section my-1">
      <BackBtn />
      <div className="Reg-Pat my-4">
        <div
          className={`page-form ${darkMode ? " spic-dark-mode border-0" : ""}`}
        >
          <form className="mx-5" onSubmit={onFormSubmit}>
            <h1
              className={`h3 formHeader ${
                darkMode ? " spic-dark-mode border-0 border-bottom" : ""
              }`}
            >
              Add a New Ad:
            </h1>
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <label
                  className={`form-label text-truncate ${
                    darkMode ? " spic-dark-mode" : ""
                  }`}
                >
                  Anlyze Name:
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={ad.title}
                />
              </div>
              <div className="col-1 d-none d-md-flex justify-content-center align-items-end">
                |
              </div>
              <div className="col-12 col-md-5">
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
                  Anlyze Description:
                </label>
                <textarea
                  name="addText"
                  className="form-control w-100"
                  rows="5"
                  value={ad.addText}
                />
              </div>
            </div>
            <hr className=" my-4" />
            <h1
              className={`h3 formHeader my-5 ${
                darkMode ? " spic-dark-mode border-0 border-bottom" : ""
              }`}
            >
              Choose Images:
            </h1>
            <input
              className="form-control form-control-lg"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            {/* Display selected images */}
            {images.length > 0 && (
              <div className="mt-4">
                <h5>Selected Images:</h5>
                <div className="d-flex gap-2">
                  {images.map((image, index) => (
                    <div key={index}>- {image.name} -</div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4 d-flex justify-content-around">
              <button className="btn btn-primary  d-flex justify-content-center BTN-Bold">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
