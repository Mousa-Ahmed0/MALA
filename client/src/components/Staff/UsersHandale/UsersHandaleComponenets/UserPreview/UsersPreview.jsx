import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDarkMode } from "../../../../../context/DarkModeContext";

import SearchBar from "../../../../SearchBar/SearchBar";
import UserFilter from "../../../../UserFilter/UserFilter";
import PaginationNav from "../../../../PaginationNav";

import { getAllUsers } from "../../../../../apis/ApisHandale";
import { getAllDoctPat } from "../../../../../apis/ApisHandale";
import { deleteAUser } from "../../../../../apis/ApisHandale";

export default function UsersPreview({ user }) {
  const { darkMode } = useDarkMode();
  let [allUsers, setAllUsers] = useState([]);
  let [visibleUsers, setVisibleUsers] = useState([]);
  //search & filter variables
  let [val, setVal] = useState(""); //search value
  let [filterOption, setFilterOption] = useState("noValue");
  let [searchResults, setSearchResults] = useState([]);
  const filterOptions = ["noValue", "Staff", "Patient", "Doctor"];
  //Errors variables
  let [apiError, setApiError] = useState(false);
  let [noResults, setNoResults] = useState(false);
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
  const [pageNo, setPageNo] = useState(1);
  const [usersCount, setUsersCount] = useState();

  // get Users Count
  async function getCount() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/getCount",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setUsersCount(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fron getCount: ", error);
    }
  }
  // Get all Users from API
  async function getUsers() {
    console.log("gg", user);
    let response;
    try {
      if (user.usertype === "Admin") {
        response = (await getAllUsers(pageNo)).data;
      } else if (user.usertype === "Staff") {
        response = (await getAllDoctPat()).data;
      }

      setApiError(false);

      if (response.length === 0) {
        setNoResults(true);
      } else {
        setAllUsers(response);
        setVisibleUsers(response);
      }
    } catch (error) {
      console.error(error);
      setApiError(true);

      if (error.response) {
        console.log("Error data:", error.response.data);
      }
    }
  }
  //Display the VisibleUsers
  function displayUsers() {
    return visibleUsers.map((user, index) => {
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
                  <p className="mb-0 text-truncate">User No{index + 1}:</p>
                </div>
                <div className="col-5 col-sm-4 col-md-3 d-flex  justify-content-md-start align-items-center p-0">
                  <img
                    loading="lazy"
                    className="nav-profile-img mx-2 img-fluid"
                    src={user.profilePhoto.url}
                    alt="nav-profile-img"
                    style={{ objectFit: "cover" }}
                  />
                  <Link
                    style={{ cursor: "pointer" }}
                    to={`/Profile/${user.id}`}
                    className="position-relative nav-link mb-0 text-truncate"
                  >
                    {user.firstname} {user.lastname}
                  </Link>
                </div>
                <div className="col-sm-12 col-md-1 d-md-flex d-none align-items-center p-0">
                  <p className="mb-0 text-truncate">{user.sex}</p>
                </div>
                <div className="col-2 col-md-4 d-flex justify-content-center justify-content-md-start  align-items-center p-0">
                  <p className="mb-0 text-truncate">{user.usertype}</p>
                </div>
                <div className="col-5 col-md-2 d-flex flex-row-reverse flex-md-row align-items-center">
                  <div className="d-flex align-items-center">
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/profile/${user.id}`}
                      className="normal-btn btn d-flex justify-content-center align-items-center"
                    >
                      <i
                        class={`h5 m-0 fa-solid fa-address-card ${
                          darkMode ? " dark-theme" : ""
                        }`}
                      ></i>
                    </Link>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="delete-btn btn d-flex justify-content-center align-items-center"
                    >
                      {" "}
                      <i
                        className={`h5 m-0   fa-solid fa-trash mb-0 text-truncate ${
                          darkMode ? " dark-theme" : ""
                        }`}
                      ></i>
                    </button>
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
  /** ====================== filter Section ====================== **/
  function clearResults() {
    setVisibleUsers(allUsers);
  }

  function handaleFilterOption(option) {
    setFilterOption(option);
    const roleOptions = ["Staff", "Patient", "Doctor"];
    console.log("filter Function: ", searchResults);
    // No Search has been done
    if (searchResults.length === 0 || !searchResults || val === "") {
      if (option === "noValue") {
        clearResults();
      } else if (roleOptions.includes(option)) {
        const filteredUsers = allUsers.filter(
          (user) => user.usertype === option
        );
        setVisibleUsers(filteredUsers);
      }
    } else {
      if (option === "noValue") {
        setVisibleUsers(searchResults);
      } else if (roleOptions.includes(option)) {
        const filteredUsers = searchResults.filter(
          (user) => user.usertype === option
        );
        setVisibleUsers(filteredUsers);
      }
    }
    if (visibleUsers.length === 0) {
      setNoResults(true);
    }
  }

  /** ====================== Search Section ====================== **/
  function handaleSearchVlue(value) {
    if (value === "") {
      clearResults();
    }
    setVal(value);
  }
  async function searchForAUser() {
    if (val.trim() === "") {
      return;
    }
    let srchResultsArray = allUsers.filter((user) =>
      (user.firstname.toLowerCase() + user.lastname.toLowerCase()).includes(
        val.toLowerCase()
      )
    );
    if (srchResultsArray.length === 0) {
      setVisibleUsers([]);
      setNoResults(true);
    } else {
      setSearchResults(srchResultsArray);
    }
  }
  /** ====================== Delete Section ====================== **/
  async function deleteUser(id) {
    try {
      const response = await deleteAUser(id);
      console.log(response);
      getUsers();
    } catch (error) {
      console.log("Error", error);
    }
  }

  //////////////////
  //initial rendring
  useEffect(() => {
    // get Users count
    getCount();
    // Fetch users when the component mounts
    getUsers();
  }, []);
  //
  useEffect(() => {
    getUsers();
  }, [pageNo]);

  useEffect(() => {
    // Filter and display users when the filter option or data changes
    handaleFilterOption(filterOption);
  }, [filterOption, searchResults]);

  useEffect(() => {
    // Search for users when the search value changes
    searchForAUser();
  }, [val]);

  return (
    <div className="ST-section my-2 p-0">
      <div className="container">
        <div className="row searchSection mb-5">
          <div className="col-sm-12 col-md-8 d-flex align-items-center p-0">
            <SearchBar handaleSearchVlue={handaleSearchVlue} />
          </div>
          <div className="col-sm-12 col-md-4 d-flex justify-content-md-end align-items-center p-0">
            <UserFilter
              filterOptions={filterOptions}
              handaleFilterOption={handaleFilterOption}
            />
          </div>
        </div>
        <section className="px-4">
          <PaginationNav
            counts={usersCount}
            pageNo={pageNo}
            setPageNo={setPageNo}
            countPerPage={1}
          />
          <div className="row my-0 d-none d-md-block">
            <div className="col-lg-12">
              <div className="card border-0 bg-transparent">
                <div className="card-body">
                  <div className="row">
                    <div
                      className={`col-md-2 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      User #:
                    </div>
                    <div
                      className={`col-md-3 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      User Name:
                    </div>
                    <div
                      className={`col-md-1 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Gender:
                    </div>
                    <div
                      className={`col-md-4 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      Role:
                    </div>
                    <div
                      className={`col-md-2 text-truncate text-muted p-0 ${
                        darkMode ? " dark-theme" : ""
                      }`}
                    >
                      More Options:
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            {Array.isArray(visibleUsers) && visibleUsers.length > 0 ? (
              displayUsers()
            ) : apiError ? (
              apiErrorMessage
            ) : noResults ? (
              <div className="my-4 mid-bold">No results Found.</div>
            ) : (
              <div className="d-flex justify-content-center align-items-center my-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
          <PaginationNav
            counts={usersCount}
            pageNo={pageNo}
            setPageNo={setPageNo}
            countPerPage={1}
          />
        </section>
      </div>
    </div>
  );
}
