import React, { useEffect, useState } from "react";
import BackBtn from "../../../BackBtn";
import { useDarkMode } from "../../../../context/DarkModeContext";

import { addPayment, getResultByID } from "../../../../apis/ApisHandale";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function AddAPayment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [resutlDetails, setResultDetails] = useState();
  const { darkMode } = useDarkMode();
  const [isInsuranceComp, setIsInsuranceComp] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [payment, setPayment] = useState({
    resultId: "",
    payDate: new Date(),
    totalValue: 0,
    resultCostDetils: [],
    InsuranceCompName: "",
    InsuranceCompPers: 0,
    paiedvalue: 0,
    discountedValue: 0,
  });
  const [allDone, setAllDone] = useState(false);

  const goBack = () => {
    navigate(-1);
  };
  /* get Result Details to handale inputs: identPatient, totalValue, resultCostDetils */
  async function getResultDetails() {
    let tempTotalValue = 0;
    let tempResultCostDetils = [];
    try {
      const response = await getResultByID(id);
      setResultDetails(response.data);
      console.log(response.data);
      if (response.data.analysArray && response.data.analysArray.length > 0) {
        response.data.analysArray.map((anlyze, index) => {
          tempTotalValue += anlyze.cost;
          tempResultCostDetils.push({
            anlayzeCost: {
              aName: anlyze.name + " " + "(" + anlyze.code + ")",
              aCost: anlyze.cost,
            },
          });
        });
        setPayment({
          ...payment,
          resultId: response.data.detailsAnalyze.id,
          totalValue: tempTotalValue,
          resultCostDetils: tempResultCostDetils,
          paiedvalue:
            payment.InsuranceCompPers === 0
              ? tempTotalValue
              : tempTotalValue -
                tempTotalValue * (payment.InsuranceCompPers / 100.0),
        });
      }
    } catch (error) {
      console.error("Error From getResultDetails in AddPayment");
    }
  }
  /* Get New Payment Details Function */
  function getNewPayment(e) {
    let newPayment = { ...payment };
    newPayment[e.target.name] = e.target.value;
    setPayment(newPayment);
  }
  /* Send New Payment to DB */
  async function onSubmitForm(e) {
    e.preventDefault();
    const newPayment = {
      ...payment,
      discountedValue: payment.totalValue - payment.paiedvalue,
    };
    try {
      const response = await addPayment(newPayment);
      setApiMessage(response.data.message);
      try {
        const changedPaidCondition = await axios.put(
          `http://localhost:5000/api/result/Results/ifPaiedEdit/${id}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(changedPaidCondition);
      } catch (error) {
        console.error("Error Fron Updating isPaid Status: ", error);
      }
      setAllDone(true);
    } catch (error) {
      console.error("Error from addPayment: ", error);
    }
  }

  //////////
  useEffect(() => {
    getResultDetails();
    console.log(id);
  }, []);
  useEffect(() => {
    if (allDone) {
      goBack();
    }
  }, [allDone]);
  useEffect(() => {
    setPayment({
      ...payment,
      paiedvalue:
        payment.InsuranceCompPers !== 100
          ? payment.totalValue -
            payment.totalValue * (payment.InsuranceCompPers / 100.0)
          : payment.totalValue,
    });
  }, [payment.InsuranceCompPers]);
  useEffect(() => {
    console.log(payment);
  }, [payment]);
  return (
    <>
      <div className="ST-section my-5">
        <BackBtn />
        <div className="Reg-Pat my-4">
          <div className={`page-form ${darkMode ? " spic-dark-mode" : ""}`}>
            <h1
              className={`h3 formHeader ${
                darkMode ? " spic-dark-mode border-0 border-bottom" : ""
              }`}
            >
              New Payment:
            </h1>
            {apiMessage ? (
              <div className="alert alert-info d-flex justify-content-center">
                {apiMessage}
              </div>
            ) : (
              ""
            )}
            {resutlDetails ? (
              resutlDetails.detailsAnalyze.isPaied ? (
                <div>Already Paid!</div>
              ) : (
                <form className="mx-5" onSubmit={onSubmitForm}>
                  <div className="row">
                    <div className="col-12 col-md-4 mb-3 bg-white">
                      <div className="row">
                        <div className="col-12 mb-3">Patient Name:</div>
                        <div className="col-12 text-center colorMain h3 m-0 high-bold">
                          {resutlDetails.usersPatint.firstname}{" "}
                          {resutlDetails.usersPatint.lastname}
                        </div>
                      </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-12 col-md-3 mb-3 bg-white">
                      <div className="row">
                        <div className="col-12 mb-3">Total Value:</div>
                        <div className="col-12 text-center h3 m-0 high-bold">
                          {payment ? payment.totalValue : 0}{" "}
                          <span style={{ fontSize: "0.758rem" }}>NIS</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-12 col-md-3 mb-3 bg-white">
                      <div className="row text-truncate">
                        <div className="col-12 mb-3">Nedded to Pay:</div>
                        <div className="col-12 text-center h3 m-0 high-bold colorMain">
                          {payment ? payment.paiedvalue : 0}{" "}
                          <span style={{ fontSize: "0.758rem" }}>NIS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="row gap-3 gap-lg-0">
                    <div className="col-12 col-lg-3">
                      <label
                        className={`form-label mb-3 ${
                          darkMode ? " spic-dark-mode" : ""
                        }`}
                      >
                        Payement Date:
                      </label>
                      <input
                        onChange={getNewPayment}
                        type="date"
                        name="payDate"
                        className="form-control"
                        value={payment.payDate}
                      />
                    </div>
                    <div className="col-12 col-lg-3 d-flex align-items-end">
                      <div className="custom-control custom-checkbox ">
                        <input
                          onChange={() => setIsInsuranceComp(!isInsuranceComp)}
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                          checked={isInsuranceComp}
                        />
                        <label
                          className={`custom-control-label mx-2 ${
                            darkMode ? " spic-dark-mode" : ""
                          }`}
                          htmlFor="customCheck1"
                        >
                          Insurance Company?
                        </label>
                      </div>
                    </div>
                    <div
                      className={`col-12 col-lg-6 ${
                        isInsuranceComp ? "" : "d-none"
                      }`}
                    >
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <label
                            className={`form-label ${
                              darkMode ? " spic-dark-mode" : ""
                            }`}
                          >
                            Insurance Company Name:
                          </label>
                          <input
                            onChange={getNewPayment}
                            type="text"
                            name="InsuranceCompName"
                            className="form-control"
                            value={payment.InsuranceCompName}
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <label
                            className={`form-label ${
                              darkMode ? " spic-dark-mode" : ""
                            }`}
                          >
                            Discount Value (%):
                          </label>
                          <input
                            onChange={getNewPayment}
                            type="number"
                            name="InsuranceCompPers"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 d-flex justify-content-end">
                    <button className="btn btn-primary d-flex justify-content-center BTN-Bold">
                      Add
                    </button>
                  </div>
                </form>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
