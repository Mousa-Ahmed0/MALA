import react from "react";
import { Link } from "react-router-dom";

export default function AdsSection({ darkMode }) {
  return (
    <>
      {" "}
      <div
        className={`p-4 col-12 my-4 maxHeight-inhert overflow-hidden ${
          darkMode ? " spic-dark-mode" : " bg-white"
        }`}
      >
        <h1 className="h5">
          <span>
            <i class="fa-solid fa-bullhorn"></i>
          </span>{" "}
          Notice Board:
        </h1>
        <hr className="my-4" />
        <div className="row d-none d-md-flex details-size mt-2 mb-4">
          <div className="col-md-3 mid-bold">Title:</div>
          <div className="col-md-6 mid-bold">Date:</div>
          <div className="col-md-3 mid-bold">More:</div>
        </div>
        <div className="maxHeight-part overflow-yAxis ">
          <div className="row detailes-size d-flex align-items-center">
            <div className="col-3 d-flex align-items-center text-truncate">
              Some Important Thing you need to know!
            </div>
            <div className="col-6 d-flex align-items-center">04/12/2023</div>
            <div className="col-3 d-flex align-items-center">
              <Link
                to={"/AdDetails"}
                className="btn m-0 nav-link position-relative"
              >
                More Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
