import { UserProfilePrsintation } from "../../../componentsLoader/ComponentsLoader";
import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../../../context/DarkModeContext";

import { getUserByID } from "../../../apis/ApisHandale";
import { updateAUser } from "../../../apis/ApisHandale";
import { updateProfilePhoto } from "../../../apis/ApisHandale";

export default function UserProfileContainer({
  userDetails,
  setIsFormOpen,
  setUserDetails,
}) {
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [errorList, setErrorList] = useState([]);
  const [apiError, setApiError] = useState(false);
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
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isImgFormOpen, setIsImgFormOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  /* use Effects */
  useEffect(() => {
    getUser();
  }, []);

  //Get User Details
  async function getUser() {
    try {
      const response = await getUserByID(id);
      setUser(response.data.profile);
      if (userDetails.id === id) setUserDetails(response.data.profile);
    } catch (error) {
      setApiError(true);
      console.error("Error:", error);
    }
  }
  //update User Details
  async function updateUser(e) {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await updateAUser(id, user);
      console.log(response);
      if (userDetails.id === response.data.updateU.id) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      setApiError(true);
      console.error("Error:", error);
      console.error("Error Response:", error.response); // Log the error response
    }
    setLoader(false);
    getUser();
  }
  // get new userDetails
  function getNewData(e) {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  }
  // update Profile Photo
  async function updatePhoto() {
    setLoader(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const response = await updateProfilePhoto(formData);
      getUser();
    } catch (error) {
      setApiError(true);
      console.error("Error:", error);
    }
    setLoader(false);
  }
  //handleImageChange
  function handleImageChange(e) {
    const file = e.target.files[0];
    setImageFile(file);
  }
  /* *************** Handale Pop Forms *************** */
  //update form open
  function handaleUpdateFormOpen() {
    setIsFormOpen(true);
    setIsUpdateFormOpen(true);
  }

  //update imageForm
  function closeUpdateForm() {
    setIsFormOpen(false);
    setIsUpdateFormOpen(false);
  }
  //image form open
  function handaleImageFormOpen() {
    setIsFormOpen(true);
    setIsImgFormOpen(true);
  }

  //Close imageForm
  function closeImgForm() {
    setIsFormOpen(false);
    setIsImgFormOpen(false);
  }

  return (
    <>
      {" "}
      <Suspense
        fallback={
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        }
      >
        <UserProfilePrsintation
          user={user}
          userDetails={userDetails}
          darkMode={darkMode}
          isImgFormOpen={isImgFormOpen}
          isUpdateFormOpen={isUpdateFormOpen}
          closeUpdateForm={closeUpdateForm}
          handleImageChange={handleImageChange}
          updatePhoto={updatePhoto}
          handaleUpdateFormOpen={handaleUpdateFormOpen}
          handaleImageFormOpen={handaleImageFormOpen}
          errorList={errorList}
          apiError={apiError}
          closeImgForm={closeImgForm}
          apiErrorMessage={apiErrorMessage}
          getNewData={getNewData}
          updateUser={updateUser}
          loader={loader}
        />{" "}
      </Suspense>
    </>
  );
}
