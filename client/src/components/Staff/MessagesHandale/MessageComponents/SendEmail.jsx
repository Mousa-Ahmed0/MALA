import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UpdateItem({
  closeForm,
  darkMode,
  setApiError,
  toUser,
}) {
  const [apiMessage, setApiMessage] = useState("");
  const [newEmail, setNewEmail] = useState({
    email: "",
    subject: "",
    massage: "",
  });
  //update User Details
  async function setNewItem(e) {
    let toUserEmail = { ...newEmail, email: toUser.email };
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/guest/sendEmail",
        toUserEmail,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setApiMessage(response.data.message);
      setNewEmail({
        email: toUser ? toUser.email : "",
        subject: "",
        massage: "",
      });
    } catch (error) {
      setApiError(true);
      console.error("Error:", error);
    }
  }
  // get new userDetails
  function getNewData(e) {
    setApiMessage("");
    let newMessage = { ...newEmail };
    newMessage[e.target.name] = e.target.value;
    setNewEmail(newMessage);
  }

  ////////////////
  useEffect(() => {
    console.log("newEmail:", newEmail);
  }, [newEmail]);
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
              onClick={() => closeForm()}
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
            <form className="mx-5" onSubmit={setNewItem}>
              <h1
                className={`h3 formHeader ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Send Email:
              </h1>
              {apiMessage ? (
                <div className="alert alert-info">{apiMessage}</div>
              ) : (
                ""
              )}
              <div
                className={`my-3 d-flex  ${darkMode ? " spic-dark-mode" : ""}`}
              >
                {apiMessage ? apiMessage : ""}
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="mb-3 col-12 col-md-8">
                      <label
                        className={`form-label ${
                          darkMode ? " spic-dark-mode" : ""
                        }`}
                      >
                        Subject:
                      </label>
                      <input
                        onChange={getNewData}
                        type="text"
                        name="subject"
                        value={newEmail.subject}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3 col-12 col-md-4 d-flex align-items-center justify-content-md-end">
                      <div className="row">
                        <div className="col-3">To:</div>
                        <div className="col-9">
                          <div className="row">
                            <div className="col-12">
                              <span className="colorMain mid-bold">
                                {toUser?.fullName}
                              </span>
                            </div>
                          </div>
                          <div className="col-12">
                            <span className="colorMain mid-bold">
                              {toUser?.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label
                      className={`form-label ${
                        darkMode ? " spic-dark-mode" : ""
                      }`}
                    >
                      Message:
                    </label>
                    <textarea
                      onChange={getNewData}
                      name="massage"
                      value={newEmail.massage}
                      className="form-control"
                      rows="5"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <button className="btn btn-primary d-flex justify-content-center BTN-Bold">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
