import ItemsPreviewPresintation from "./ItemsPreviewPresintation";

import React, { useEffect, useState } from "react";

import { useDarkMode } from "../../../../../context/DarkModeContext";
import { getItems } from "../../../../../apis/ApisHandale";
import { deleteAnItem } from "../../../../../apis/ApisHandale";

export default function ItemsPreviewContainer({ setIsFormOpen }) {
  const { darkMode } = useDarkMode();
  let [allItems, setAllItems] = useState([]);
  let [visibleItems, setVisibleItems] = useState([]);
  let [apiError, setApiError] = useState(false);
  let [noResults, setNoResults] = useState(false);
  let [item, setItem] = useState({
    itemName: "",
    theNumber: 0,
    cost: 0,
  });
  //search variables
  let [val, setVal] = useState(""); //search value
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
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [usersCount, setUsersCount] = useState();

  /* *************** Handale Pop Forms *************** */
  //update form open
  function handaleUpdateFormOpen(a) {
    setIsFormOpen(true);
    setIsUpdateFormOpen(true);
    setItem(a);
  }

  function closeUpdateForm() {
    setIsFormOpen(false);
    setIsUpdateFormOpen(false);
  }
  //get All Anlysis
  async function getAllItems() {
    try {
      const response = await getItems(pageNo);

      setApiError(false);

      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setAllItems(response.data.allItem);
        setVisibleItems(response.data.allItem);
        setUsersCount(response.data.count);
      }
    } catch (error) {
      console.error(error);
      setApiError(true);

      if (error.response) {
        console.log("Error data:", error.response.data);
      }
    }
  }

  //display visible Anlysis
  function displayItems() {
    return visibleItems.map((item, index) => {
      return (
        <div key={index} className="col-lg-12">
          <div
            className={`card mb-4 border-0 px-3 ${
              darkMode ? " spic-dark-mode" : ""
            }`}
          >
            <div className={`card-body`}>
              <div className="row">
                <div className="col-sm-12 col-md-2 d-flex align-items-center p-0">
                  <p className="mb-0 text-truncate">Item No{index + 1}:</p>
                </div>
                <div className="col-5 col-sm-4 col-md-3 d-flex  justify-content-md-start align-items-center p-0">
                  {item.itemName}
                </div>
                <div className="col-sm-12 col-md-2 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{item.theNumber}</p>
                </div>
                <div className="col-sm-12 col-md-2 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{item.cost} NIS</p>
                </div>

                <div className="col-5 col-md-3 d-flex flex-row-reverse flex-md-row align-items-center">
                  <div className="col-6 col-md-12 ">
                    <div className="row">
                      <div className="col-6 col-md-5 d-flex align-items-center">
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="delete-btn btn d-flex justify-content-center align-items-center"
                        >
                          {" "}
                          <i
                            className={`fa-solid fa-trash mb-0 text-truncate ${
                              darkMode ? " dark-theme" : ""
                            }`}
                          ></i>
                        </button>
                      </div>
                      <div className="col-6 col-md-5 d-flex align-items-center">
                        <button
                          onClick={() => handaleUpdateFormOpen(item)}
                          className="delete-btn btn d-flex justify-content-center align-items-center"
                        >
                          {" "}
                          <i
                            className={`fas fa-edit mb-0 text-truncate ${
                              darkMode ? " dark-theme" : ""
                            }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      );
    });
  }
  /** ====================== Delete Section ====================== **/
  async function deleteItem(id) {
    try {
      const response = await deleteAnItem(id);
      console.log(response);
      getAllItems();
    } catch (error) {
      console.log("Error", error);
    }
  }
  /** ====================== Search Section ====================== **/
  function clearResults() {
    setVisibleItems(allItems);
  }
  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  async function searchForItem() {
    console.log(val);
    if (val.trim() === "") {
      return;
    }
    let srchResultsArray = allItems.filter((item) =>
      item.itemName.toLowerCase().includes(val.toLowerCase())
    );
    if (srchResultsArray.length === 0) {
      setVisibleItems([]);
      setNoResults(true);
    } else {
      setVisibleItems(srchResultsArray);
    }
  }

  // initial use Effect
  useEffect(() => {
    getAllItems();
  }, []);
  //use Effect
  useEffect(() => {
    searchForItem();
  }, [val]);
  //use Effect
  useEffect(() => {
    console.log(item);
  }, [item]);
  return (
    <ItemsPreviewPresintation
      handaleSearchVlue={handaleSearchVlue}
      darkMode={darkMode}
      visibleItems={visibleItems}
      displayItems={displayItems}
      apiError={apiError}
      apiErrorMessage={apiErrorMessage}
      noResults={noResults}
      closeUpdateForm={closeUpdateForm}
      isUpdateFormOpen={isUpdateFormOpen}
      item={item}
      setItem={setItem}
      getAllItems={getAllItems}
      setApiError={setApiError}
      setPageNo={setPageNo}
      pageNo={pageNo}
      usersCount={usersCount}
    />
  );
}
