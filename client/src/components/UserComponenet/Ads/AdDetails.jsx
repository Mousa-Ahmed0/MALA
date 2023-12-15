import React from "react";
import { Carousel } from "react-bootstrap";

import BackBtn from "../../BackBtn";

export default function AdDetails({ darkMode }) {
  const arrowStyles = {
    color: darkMode ? "white !important" : "black !important", // Set the desired color for the arrows
    "font-family": "fontawesome",
  };
  return (
    <div className="ST-section">
      <BackBtn />
      <div className="my-4" style={{}}>
        <Carousel
          nextIcon={<span style={arrowStyles}>&#xf30b;</span>}
          prevIcon={<span style={arrowStyles}>&#xf30a;</span>}
        >
          <Carousel.Item>
            <img
              className="d-block w-100 h-100"
              src="./images/1.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-100"
              src="./images/meet.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-100"
              src="./images/med.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <hr className="my-4" />
    </div>
  );
}
