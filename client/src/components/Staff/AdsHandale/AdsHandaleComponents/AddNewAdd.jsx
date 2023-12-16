import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "../../../../context/DarkModeContext";

import BackBtn from "../../../BackBtn";
export default function AddNewAdd({ setIsFormOpen }) {
  const { darkMode } = useDarkMode();
  const [ad, setAd] = useState({
    images: [],
    title: "",
    addText: "",
    creDate: new Date(),
    expDate: new Date(),
  });
  let [errorMessage, setErrorMessage] = useState("");
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);
  let apiErrorMessage = (
    <div className="w-100 h-100 d-flex flex-column align-items-center">
      <div className="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
        Error!!!
      </div>
      <div className="my-4 mid-bold">
        Theres a proplem! Please wait for us to solve the proplem.
      </div>
    </div>
  );
  //add ad
  async function onFormSubmit(e) {
    e.preventDefault();

    /* const forms = images.map((image) => {
      const formData = new FormData();
      formData.append("image", image);
      return formData;
    });*/

    /* const formData = new FormData();
    formData.append("title", ad.title);
    formData.append("addText", ad.addText);
    formData.append("creDate", ad.creDate);
    formData.append("expDate", ad.expDate);

    images.map((image, index) => {
      formData.append(`image ${index + 1}`, image);
    });
    // Append array of FormData objects to the main FormData
    /* forms.forEach((form) => {
      formData.append("images", form);
    });*/

    try {
      const formDataToSend = new FormData();
      ad.images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
      });
      formDataToSend.append("title", ad.title);
      formDataToSend.append("addText", ad.addText);
      formDataToSend.append("creDate", ad.creDate);
      formDataToSend.append("expDate", ad.expDate);

      let response = await axios.post(
        "http://localhost:5000/api/advertisements/addAdvert",
        formDataToSend,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response);
    } catch (error) {
      setApiError(true);
      console.error("Error From Add a new Ad: ", error);
    }
  }

  // get Data
  function getAdData(e) {
    let newAd = { ...ad };
    newAd[e.target.name] = e.target.value;
    setAd(newAd);
  }
  //image changes
  function handleImageChange(e) {
    const files = e.target.files;
    setAd({ ...ad, images: [...ad.images, ...files] });
  }

  /*// move on the array of files to convert each one to FormData and push it to array
    selectedImages.forEach((imageFile, index) => {
      const fileFormData = new FormData();
      console.log("imageFile before FormData", imageFile);
      fileFormData.append(`image${index}`, imageFile);
      console.log("fileFormData", fileFormData);

      newFiles.push(fileFormData);
    });

    console.log("newFiles:", newFiles);
    setImages(newFiles); // Set the array of file objects to the images state*/
  //////////////
  /*useEffect(() => {
    console.log("New Ad: ", ad);
  }, [ad]);*/
  return (
    <div className="ST-section my-1">
      <BackBtn />
      <div className="Reg-Pat my-4">
        <div
          className={`page-form ${darkMode ? " spic-dark-mode border-0" : ""}`}
        >
          {apiError ? (
            apiErrorMessage
          ) : (
            <form className="mx-5" onSubmit={onFormSubmit}>
              <h1
                className={`h3 formHeader ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Add a New Ad:
              </h1>

              {errorMessage ? (
                <div className="alert alert-danger">errorMessage </div>
              ) : apiMessage ? (
                <div className="alert alert-info">apiMessage </div>
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
                name="images"
                multiple
                onChange={handleImageChange}
              />
              {/* Display selected images */}
              {/*images.length > 0 && (
                <div className="mt-4">
                  <h5>Selected Images:</h5>
                  <div className="d-flex gap-2">
                    {images.map((image, index) => (
                      <div key={index}>- {image.name} -</div>
                    ))}
                  </div>
                </div>
                    )*/}
              <div className="mt-4 d-flex justify-content-around">
                <button className="btn btn-primary  d-flex justify-content-center BTN-Bold">
                  Add
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
