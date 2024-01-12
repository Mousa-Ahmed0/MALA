import React, { useEffect, useState } from "react";
import { addItem } from "../../../../apis/ApisHandale";
import { useDarkMode } from "../../../../context/DarkModeContext";

export default function AddItem() {
  const { darkMode } = useDarkMode();
  const [item, setItem] = useState({
    itemName: "",
    theNumber: 0,
    cost: 0,
  });
  let [errorList, setErrorList] = useState([]);
  let [apiMessage, setApiMessage] = useState("");
  let [apiError, setApiError] = useState(false);

  function getNewItem(e) {
    setApiMessage("");
    let newItem = { ...item };
    newItem[e.target.name] = e.target.value;
    setItem(newItem);
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await addItem(item)
        .then((response) => {
          // Handle the response data
          console.log("Axios response:", response.data);
          setApiError(false);
          setApiMessage(response.data.message);
        })
        .catch((error) => {
          // Handle errors
          if (error.response) {
            console.log("Error data:", error.response.data);
            setApiError(true);
            setApiMessage(error.response.data.message);
          }
          console.error("Axios error:", error);
        });
    } catch (error) {
      console.error(error);
    }
    setItem({
      itemName: "",
      theNumber: 0,
      cost: 0,
    });
  }
  useEffect(() => {
    console.log(item);
  }, [item]);
  return (
    <>
      <div className="ST-section my-1">
        <div className="Reg-Pat my-4">
          <div className={`page-form ${darkMode ? " spic-dark-mode" : ""}`}>
            <h1
              className={`h3 formHeader ${
                darkMode ? " spic-dark-mode border-0 border-bottom" : ""
              }`}
            >
              Add an Item:
            </h1>
            <form className="mx-5" onSubmit={onFormSubmit}>
              <div
                className={`my-3 d-flex  ${darkMode ? " spic-dark-mode" : ""}`}
              >
                {apiMessage ? apiMessage : ""}
              </div>
              <div className="d-flex gap-4">
                <div className="my-3">
                  <label
                    htmlFor="i_name"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Item Name:
                  </label>
                  <input
                    onChange={getNewItem}
                    type="text"
                    name="itemName"
                    className="form-control"
                    id="i_name"
                    value={item.itemName}
                  />
                </div>
                <div className="my-3">
                  <label
                    htmlFor="i_number"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Item Quntity:
                  </label>
                  <input
                    onChange={getNewItem}
                    type="text"
                    name="theNumber"
                    className="form-control"
                    id="i_number"
                    value={item.theNumber}
                  />
                </div>
                <div className="my-3">
                  <label
                    htmlFor="i_cost"
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Item Cost:
                  </label>
                  <input
                    onChange={getNewItem}
                    type="text"
                    name="cost"
                    className="form-control"
                    id="i_cost"
                    value={item.cost}
                  />
                </div>
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <button className="btn btn-primary d-flex justify-content-center BTN-Bold">
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
