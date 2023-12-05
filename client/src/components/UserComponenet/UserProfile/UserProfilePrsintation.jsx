import React from "react";
import AgeCalculator from "../../../methods/AgeCalculator";
import BackBtn from "../../BackBtn";

export default function UserProfilePrsintation({
  user,
  userDetails,
  darkMode,
  isImgFormOpen,
  closeImgForm,
  isUpdateFormOpen,
  handleImageChange,
  updatePhoto,
  closeUpdateForm,
  handaleUpdateFormOpen,
  handaleImageFormOpen,
  errorList,
  apiErrorMessage,
  apiError,
  getNewData,
  updateUser,
  loader,
}) {
  return (
    <>
      {Object.keys(user).length > 0 ? (
        <>
          <div className="ST-section my-1">
            <div
              className={`position-relative my-4 ${
                isImgFormOpen ? "d-flex" : "d-none"
              } ${
                darkMode ? " spic-dark-mode border-0" : "bg-white"
              } justify-content-center align-items-center h-100 w-100 z-200`}
            >
              <div className="w-100 my-4">
                <div className="row mx-4 mt-2 mb-4">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <h1
                          className={`m-0 h3 formHeader w-100 ${
                            darkMode
                              ? " spic-dark-mode border-0 border-bottom"
                              : ""
                          }`}
                        >
                          Upload A new Image:
                        </h1>
                      </div>
                      <button
                        type="button"
                        onClick={() => closeImgForm()}
                        className="btn btn-danger"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" mx-4 mb-4">
                  <label for="formFileLg" class="form-label">
                    Choose a New Profile Photo:
                  </label>
                  <input
                    class="form-control form-control-lg"
                    id="formFileLg"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>
                <div className="mx-4 my-2 d-flex justify-content-center">
                  <button
                    type="button"
                    onClick={() => updatePhoto()}
                    className="btn btn-primary"
                  >
                    {loader ? <span>Loading...</span> : "Update"}
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`position-relative my-4 ${
                isUpdateFormOpen ? "d-flex" : "d-none"
              } ${
                darkMode ? " spic-dark-mode border-0" : "bg-white"
              } justify-content-center align-items-center h-100 w-100 z-200`}
            >
              <div className="w-100 my-4">
                <div className="row mx-4 mt-2 mb-4">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <h1
                          className={`m-0 h3 formHeader  ${
                            darkMode
                              ? " spic-dark-mode border-0 border-bottom"
                              : ""
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
                    <div
                      className={`page-form ${
                        darkMode ? " spic-dark-mode" : ""
                      }`}
                    >
                      <h1
                        className={`h3 formHeader ${
                          darkMode
                            ? " spic-dark-mode border-0 border-bottom"
                            : ""
                        }`}
                      >
                        Edit Profile:
                      </h1>
                      <form className="mx-5" onSubmit={updateUser}>
                        <div className="d-flex gap-4">
                          <div className="mb-3 w-100">
                            <label
                              htmlFor="u_ident"
                              className={`form-label ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              Identify Id:
                            </label>
                            <input
                              onChange={getNewData}
                              type="text"
                              name="ident"
                              className="form-control"
                              id="u_ident"
                              value={user.ident}
                            />
                          </div>
                        </div>
                        <div className="complix-row d-flex gap-4 flex-column flex-sm-row">
                          <div className="complix-col mb-3 w-50">
                            <label
                              htmlFor="u_fname"
                              className={`form-label ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              First Name:
                            </label>
                            <input
                              onChange={getNewData}
                              type="text"
                              name="firstname"
                              className="form-control"
                              id="u_fname"
                              value={user.firstname}
                            />
                          </div>
                          <div className="complix-col mb-3 w-50">
                            <label
                              htmlFor="u_lname"
                              className={`form-label ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              Last Name:
                            </label>
                            <input
                              onChange={getNewData}
                              type="text"
                              name="lastname"
                              className="form-control"
                              id="u_lname"
                              value={user.lastname}
                            />
                          </div>
                        </div>
                        <div className="complix-row d-flex gap-4 flex-column flex-sm-row">
                          <div className="complix-col mb-3 w-50">
                            <label
                              htmlFor="u_city"
                              className={`form-label ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              City:
                            </label>
                            <input
                              onChange={getNewData}
                              type="text"
                              name="city"
                              className="form-control"
                              id="u_city"
                              value={user.city}
                            />
                          </div>
                          <div className="complix-col mb-3 w-50">
                            <label
                              htmlFor="u_phone"
                              className={`form-label ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              Phone Number:
                            </label>
                            <input
                              onChange={getNewData}
                              type="text"
                              name="phone"
                              className="form-control"
                              id="u_phone"
                              value={user.phone}
                            />
                          </div>
                        </div>
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
            </div>
            <BackBtn />
            <section className="my-4">
              <div className="container py-5">
                <div className="row">
                  <div className="col-lg-4">
                    <div
                      className={`card mb-4 ${
                        darkMode ? " spic-dark-mode border-0" : ""
                      }`}
                    >
                      <div className="card-body text-center">
                        <img
                          src={
                            user.profilePhoto
                              ? user.profilePhoto.url
                              : "Loading..."
                          }
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{
                            width: 200,
                            height: 200,
                            objectFit: "cover",
                          }}
                        />
                        <h5 className="my-3">
                          {user.firstname} {user.lastname}
                        </h5>
                        <AgeCalculator birthday={user.birthday} />
                        <p
                          className={`text-muted mb-1 ${
                            darkMode ? " spic-dark-mode" : ""
                          }`}
                        >
                          {user.usertype === "Staff" ||
                          user.usertype === "Doctor" ||
                          user.usertype === "Admin"
                            ? user.usertype
                            : ""}
                        </p>
                        <p
                          className={`text-muted mb-4 ${
                            darkMode ? " spic-dark-mode" : ""
                          }`}
                        >
                          {user.city}
                        </p>
                        <div className="d-flex justify-content-center mb-2">
                          <button
                            type="button"
                            onClick={() => handaleUpdateFormOpen()}
                            className={`btn btn-primary ${
                              userDetails.id === user.id ||
                              userDetails.usertype === "Admin" ||
                              userDetails.usertype === "Staff"
                                ? "d-block"
                                : "d-none"
                            }`}
                          >
                            Edit Profile
                          </button>
                          <button
                            type="button"
                            onClick={() => handaleImageFormOpen()}
                            className={`btn btn-outline-primary ms-1 ${
                              userDetails.id === user.id ? "d-block" : "d-none"
                            }`}
                          >
                            Change Image
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div
                      className={`card mb-4 ${
                        darkMode ? " spic-dark-mode border-0" : ""
                      }`}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Full Name</p>
                          </div>
                          <div className="col-sm-9">
                            <p
                              className={`text-muted mb-0 ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              {user.firstname} {user.lastname}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Age</p>
                          </div>
                          <div className="col-sm-9">
                            <p
                              className={`text-muted mb-0 ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              <AgeCalculator birthday={user.birthday} />
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Email</p>
                          </div>
                          <div className="col-sm-9">
                            <p
                              className={`text-muted mb-0 ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Mobile</p>
                          </div>
                          <div className="col-sm-9">
                            <p
                              className={`text-muted mb-0 ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              {user.phone}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">City:</p>
                          </div>
                          <div className="col-sm-9">
                            <p
                              className={`text-muted mb-0 ${
                                darkMode ? " spic-dark-mode" : ""
                              }`}
                            >
                              {user.city}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : apiError ? (
        apiErrorMessage
      ) : (
        <div className="d-flex my-4 justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
