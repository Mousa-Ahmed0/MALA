import React from "react";
import axios from "axios";

/* Auth API`s */
export const newUser = async (User) => {
  return await axios.post("http://localhost:5000/api/auth/register", User);
};
/* Analysis API`s */
export const getAllAnalysis = async () => {
  return await axios.get("http://localhost:5000/api/Analyze/getAnalyzes", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};
export const getOneAnalyze = async (code) => {
  //console.log(code);
  return await axios.get(
    `http://localhost:5000/api/analyze/getAnalyzesOne/${code}`
  );
};
export const addANewAnalyze = async (anlyze) => {
  return await axios.post(
    "http://localhost:5000/api/Analyze/Add-Analyze",
    anlyze,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  );
};
/* Users API`s */
export const getAllUsers = async (pageNo) => {
  return await axios.get(
    `http://localhost:5000/api/user/get-users?userNumber=${pageNo}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  );
};
export const getAllDoctPat = async () => {
  return await axios.get("http://localhost:5000/api/user/getAllDoctorPatient", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};
export const getAllDoctor = async () => {
  return await axios.get("http://localhost:5000/api/user/getAllDoctor");
};
export const getUserByID = async (id) => {
  return await axios.get(`http://localhost:5000/api/user/profile/${id}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};
export const updateAUser = async (id, user) => {
  return await axios.put(
    `http://localhost:5000/api/user/upadteUser/${id}`,
    user,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  );
};
export const updateProfilePhoto = async (formData) => {
  // console.log("formData", formData);

  return await axios.post(
    `http://localhost:5000/api/user/profile/profile-photo-upload`,
    formData,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      "Content-Type": "multipart/form-data",
    }
  );
};
export const deleteAUser = async (id) => {
  return await axios.delete(`http://localhost:5000/api/user/deleteUser/${id}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};
/* Storage API`s */
export const getItems = async () => {
  return await axios.get("http://localhost:5000/api/storage/getAllItem?", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};
export const addItem = async (item) => {
  return await axios.post("http://localhost:5000/api/storage/additem", item, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};
export const deleteAnItem = async (id) => {
  return await axios.delete(
    `http://localhost:5000/api/storage/deleteitem/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  );
};
export const updateAnItem = async (id, item) => {
  return await axios.put(
    `http://localhost:5000/api/storage/updateItem/${item.id}`,
    item,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  );
};
/* Results API`s */
export const addResult = async (newResult) => {
  return await axios.post(
    "http://localhost:5000/api/result/addResults",
    newResult,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getAllResults = async () => {
  return await axios.get("http://localhost:5000/api/result/getResult", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};
export const getSamples = async (cond, pageNo) => {
  // console.log(cond);
  return await axios.get(
    `http://localhost:5000/api/result/Results/ifDone?isDone=${cond}&pageNumber=${pageNo}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getResultByID = async (id) => {
  return await axios.get(`http://localhost:5000/api/result/getResults/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};
export const getDetailsResult = async (id) => {
  return await axios.get(
    `http://localhost:5000/api/result/getAllResults/${id}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getPateinrResults = async (ident) => {
  return await axios.get(
    `http://localhost:5000/api/result/getPatientAnalyze`,
    {
      params: ident, // Use 'params' to send data as query parameters
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getResultsFromTo = async (date) => {
  console.log(" custome date: ", date);
  return await axios.get(
    `http://localhost:5000/api/result/getResults/resultDateFromTo?firstDate=${date.firstDate}&secondtDate=${date.secondtDate}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getResultsFiltered = async (date) => {
  //console.log(" custome date: ", date);
  return await axios.get(
    `http://localhost:5000/api/result/getResults/resultDate?number=${date.number}&date=${date.payDate}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
/* Patments API`s */
export const addPayment = async (newPayment) => {
  return await axios.post(
    "http://localhost:5000/api/payment/addPayment",
    newPayment,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getAllPayments = async () => {
  return await axios.get(
    "http://localhost:5000/api/payment/getPayment",

    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getUnPaidSamples = async () => {
  return await axios.get(
    "http://localhost:5000/api/result/Results/ifPaied?isPaied=false",

    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getPaymentsFromTo = async (date) => {
  //console.log(" custome date: ", date);
  return await axios.get(
    "http://localhost:5000/api/payment/getFromToDate",
    {
      params: date, // Use 'params' to send data as query parameters
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getPaymentsFiltered = async (date) => {
  // console.log(" custome date: ", date);
  return await axios.get(
    `http://localhost:5000/api/payment/week?payDate=${date.payDate}&number=${date.number}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
export const getPateinrPayments = async (ident) => {
  return await axios.get(
    `http://localhost:5000/api/payment/getPaymentIdentPatient`,
    {
      params: ident, // Use 'params' to send data as query parameters
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};
//////////////
const ApisHandale = () => {
  return <div>ApisHandle Component</div>;
};

export default ApisHandale;
