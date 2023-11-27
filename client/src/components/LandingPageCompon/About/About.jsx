import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../../context/DarkModeContext";

export default function About() {
  const { darkMode } = useDarkMode();

  let [Anlyser, setAnlyser] = useState({
    image: "./images/avatar-03.png",
    Name: "Full Name",
    Spec: "University Specialization",
    Univr: "University Name",
    Years: 5,
    Email: "SomeExample@exampl.com",
    face: "https://www.facebook.com/",
    twit: "https://www.facebook.com/",
    inst: "https://www.facebook.com/",
    PhoneNo: "0569346999",
  });

  let [Anlysers, setAnlysers] = useState([]);

  //Get API Function ...
  function getAnlysers() {
    for (let i = 0; i < 3; i++) {
      let tempAnlysesr = { ...Anlyser };
      setAnlysers([...Anlysers, tempAnlysesr]);
    }
  }
  //Test
  function showAnlysers() {
    console.log(Anlysers);
  }

  useEffect(() => {
    // Code (similar to componentDidMount)
    getAnlysers();
  }, []);
  return (
    <div className="LP-section LP-About">
      <div className="row">
        {Anlysers.map((Anlyser, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-6 col-sm-12 col-xsm-12 mb-3"
          >
            <div
              className={`card border-0 position-relative m-1 m-xl-3 mt-0 ${
                darkMode ? " spic-dark-mode border-0" : ""
              }`}
            >
              <div className="card-body">
                <div className="card-Top d-flex gap-3 justify-content-around align-items-center pt-0 pb-3">
                  <img
                    className="card-Top-Image"
                    src={Anlyser.image}
                    alt="Card image cap"
                  />
                  <div className="card-Top-Details d-flex gap-1 justify-content-around flex-column">
                    <h4 className="">{Anlyser.Name}</h4>
                    <p className="">{Anlyser.Spec}.</p>
                    <p className="">{Anlyser.Univr}.</p>
                    <p className="">{Anlyser.Years} Years Exp.</p>
                  </div>
                </div>
                <div className="card-Mid py-3">
                  <p className="m-0">{Anlyser.Email}</p>
                </div>
                <div className="card-Bottom py-2 d-flex justify-content-between align-items-center m-0">
                  <ul className="d-flex justify-content-around align-items-center m-0 p-0 fs-4">
                    <li>
                      {" "}
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fa-brands fa-facebook" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="fa-brands fa-twitter " />
                      </a>
                    </li>
                  </ul>
                  <p className="m-0">
                    <i className=" btn colorMain fa-solid fa-phone"></i>-{" "}
                    {Anlyser.PhoneNo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
