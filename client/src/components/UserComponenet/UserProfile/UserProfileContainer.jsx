import UserProfilePrsintation from "./UserProfilePrsintation";
import React, { useEffect, useState } from "react";
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
  const [imageFile, setImageFile] = useState(null);
  const [isImgFormOpen, setIsImgFormOpen] = useState(false);

  /* use Effects */
  useEffect(() => {
    getUser();
  }, []);
  //handale change image
  useEffect(() => {
    console.log(user);
    console.log(user.id);
    if (user.id === userDetails.id) {
      localStorage.setItem("profileIMG", user.profilePhoto.url);
    }
  }, [user]);

  //Get User Details
  async function getUser() {
    try {
      const response = await getUserByID(id);
      setUser(response.data.profile);
      setUserDetails(response.data.profile);
    } catch (error) {
      setApiError(true);
      console.error("Error:", error);
    }
  }
  //update User Details
  async function updateUser(e) {
    e.preventDefault();
    try {
      const response = await updateAUser(id, user);
      console.log(response);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setApiError(true);
      console.error("Error:", error);
      console.error("Error Response:", error.response); // Log the error response
    }

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
    const formData = new FormData();
    formData.append("image", imageFile);
    console.log(formData);
    try {
      const response = await updateProfilePhoto(formData);
      getUser();
    } catch (error) {
      setApiError(true);
      console.error("Error:", error);
    }
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
      />
    </>
  );
}
