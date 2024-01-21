import React, { useEffect, useState } from "react";
import { updateAnItem } from "../../../../../../apis/ApisHandale";
import Joi from "joi";

export default function UpdateItem({
  closeUpdateForm,
  darkMode,
  item,
  setItem,
  getAllItems,
  setApiError,
}) {
  const [apiMessage, setApiMessage] = useState("");
  let [errorList, setErrorList] = useState([]);

  //update User Details
  async function setNewItem(e) {
    e.preventDefault();
    // Call Validation Function
    let validateResult = vaildationStorage();
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
    } else {
      try {
        const response = await updateAnItem(item.id, item);
        setApiMessage("Done!");
      } catch (error) {
        setApiError(true);
        console.error("Error:", error);
        console.error("Error Response:", error.response); // Log the error response
      }

      getAllItems();
    }
  }
  // get new userDetails
  function getNewData(e) {
    setErrorList([]);
    let newItem = { ...item };
    newItem[e.target.name] = e.target.value;
    setItem(newItem);
  }

  //validate storage Model
  function vaildationStorage() {
    const Schema = Joi.object({
      itemName: Joi.string().trim().required(),
      theNumber: Joi.number().required(),
      cost: Joi.number().required(),
    });
    return Schema.validate(item, { abortEarly: false });
  }
  /////////////////////
  useEffect(() => {
    console.log(item);
  }, [item]);
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
            <form className="mx-5" onSubmit={setNewItem}>
              <h1
                className={`h3 formHeader ${
                  darkMode ? " spic-dark-mode border-0 border-bottom" : ""
                }`}
              >
                Edit item:
              </h1>
              <div
                className={`my-3 d-flex  ${darkMode ? " spic-dark-mode" : ""}`}
              >
                {apiMessage ? apiMessage : ""}
              </div>
              <div className="d-flex gap-4 flex-column flex-md-row">
                <div className="mb-3">
                  <label
                    htmlFor="i_name"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Item Name:
                  </label>
                  <input
                    onChange={getNewData}
                    type="text"
                    name="itemName"
                    className="form-control"
                    id="i_name"
                    value={item.itemName}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="i_theNumber"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Item Quntity:
                  </label>
                  <input
                    onChange={getNewData}
                    type="number"
                    name="theNumber"
                    className="form-control"
                    id="i_theNumber"
                    value={item.theNumber}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="i_cost"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Item Cost:
                  </label>
                  <input
                    onChange={getNewData}
                    type="number"
                    name="cost"
                    className="form-control"
                    id="i_cost"
                    value={item.cost}
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
  );
}
