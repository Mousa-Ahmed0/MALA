import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../../context/DarkModeContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function About() {
  const { darkMode } = useDarkMode();

  let [Staff, setStaff] = useState();
  let [apiError, setApiError] = useState(false);
  let apiErrorMessage = (
    <div class="w-100 h-100 d-flex flex-column align-items-center">
      <div class="alert alert-danger my-4 mid-bold w-100 d-flex justify-content-center">
        Error!!!
      </div>
      <div class="my-4 mid-bold">
        Theres a proplem! Please wait for us to solve the proplem.
      </div>
    </div>
  );

  //Get API Function ...
  async function getAnlysers() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/getAllStuffAdmin"
      );
      console.log(response);
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setStaff(response.data);
      }
      setApiError(false);
    } catch (error) {
      setApiError(true);
      console.error("Error from getStaff: ", error);
    }
  }
  //Test
  function renderStaff() {
    return Staff.map((st, index) => (
      <div key={index} className="col-lg-4 col-md-6 col-sm-12 col-xsm-12 mb-3">
        <div
          className={`card border-0 position-relative m-1 m-xl-3 mt-0 ${
            darkMode ? " spic-dark-mode border-0" : ""
          }`}
        >
          <div className="card-body">
            <div className="row card-Top justify-content-center my-3 pb-3">
              <div className="col-12 col-md-4 card-Top-Image">
                <img
                  className="img-fluid"
                  src={st.profilePhoto.url}
                  alt="Card image cap"
                />
              </div>
              <div className="my-2 card-Top-Details col-12 col-md-6 d-flex justify-content-center flex-column align-items-center mid-bold colorMain">
                <h1 className="h5 m-0 text-truncate">
                  {st.firstname + " " + st.lastname}
                </h1>
              </div>
            </div>

            <div className="card-Mid  my-3 pb-3">
              <p className="m-0">{st.email}</p>
            </div>
            <div className="card-Bottom py-2 d-flex justify-content-between align-items-center m-0">
              <div className="position-relative p-2 btn  btn-outline-info">
                <Link className="nav-link">View Profile</Link>
              </div>
              <p className="m-0">
                <i className=" btn colorMain fa-solid fa-phone"></i>- {st.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  useEffect(() => {
    // Code (similar to componentDidMount)
    getAnlysers();
  }, []);
  return (
    <div className="LP-section LP-About">
      <div className="row">
        {Staff && Array.isArray(Staff) && Staff.length > 0 ? (
          renderStaff()
        ) : apiError ? (
          apiErrorMessage
        ) : (
          <div>No Results Found</div>
        )}
      </div>
    </div>
  );
}
