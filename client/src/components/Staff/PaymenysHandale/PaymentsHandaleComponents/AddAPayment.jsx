import React, { useEffect, useState } from "react";
import BackBtn from "../../../BackBtn";
import { useDarkMode } from "../../../../context/DarkModeContext";

import { addPayment } from "../../../../apis/ApisHandale";

export default function AddAPayment() {
  const { darkMode } = useDarkMode();
  const [isInsuranceComp, setIsInsuranceComp] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [payment, setPayment] = useState({
    identPatient: "",
    payDate: new Date(),
    InsuranceCompName: "",
    InsuranceCompPers: 0,
    value: 0,
    discountedValue: 0,
  });
  /* Get New Payment Details Function */
  function getNewPayment(e) {
    let newPayment = { ...payment };
    newPayment[e.target.name] = e.target.value;
    setPayment(newPayment);
  }
  /* Send New Payment to DB */
  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const response = await addPayment(payment);
      setApiMessage(response.data.message);
    } catch (error) {
      console.error("Error from addPayment: ", error);
    }
    setPayment({
      identPatient: "",
      payDate: new Date(),
      InsuranceCompName: "",
      InsuranceCompPers: 0,
      value: 0,
      discountedValue: 0,
    });
    setIsInsuranceComp(false);
  }
  useEffect(() => {
    console.log(payment);
  }, [payment]);
  return (
    <>
      <div className="ST-section my-1">
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
            <form className="mx-5" onSubmit={onSubmitForm}>
              <div className="row">
                <div className="col-12 col-md-4">
                  <label
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Patient Identify:
                  </label>
                  <input
                    onChange={getNewPayment}
                    type="text"
                    name="identPatient"
                    className="form-control"
                    value={payment.identPatient}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label
                    className={`form-label ${
                      darkMode ? " spic-dark-mode" : ""
                    }`}
                  >
                    Payement Value:
                  </label>
                  <input
                    onChange={getNewPayment}
                    type="number"
                    name="value"
                    className="form-control"
                    value={payment.value}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label
                    className={`form-label ${
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
              </div>
              <div className="row my-4">
                <div className="col-12 col-md-4 d-flex align-items-center">
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
                  className={`col-12 col-md-8 ${
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
          </div>
        </div>
      </div>
    </>
  );
}
