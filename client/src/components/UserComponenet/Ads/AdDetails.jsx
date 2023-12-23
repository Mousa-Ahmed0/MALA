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
      <div className="row mt-4 mb-0">
        <div className="col-12 col-md-9 h3 m-0 high-bold colorMain d-flex align-items-center my-1 text-truncate">
          Welcome All ...
        </div>
        <div className="col-12 col-md-3 h6 m-0 high-bold colorMain my-1">
          <span style={{ fontSize: "0.875rem" }} className="text-black">
            From:
          </span>
          22-10-2023{" "}
          <span style={{ fontSize: "0.875rem" }} className="text-black">
            to:
          </span>{" "}
          22-11-2023
        </div>
      </div>
      <hr className="mt-0 mb-4" />
      <div style={{}}>
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
      <div
        style={{ lineHeight: "1.75", textAlign: "justify" }}
        className="h5 m-0"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
        reprehenderit et quos suscipit pariatur recusandae dignissimos nemo
        necessitatibus ipsum ducimus asperiores excepturi corrupti aliquid
        placeat cum doloremque inventore, adipisci explicabo. Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Deleniti reprehenderit et quos
        suscipit pariatur recusandae dignissimos nemo necessitatibus ipsum
        ducimus asperiores excepturi corrupti aliquid placeat cum doloremque
        inventore, adipisci explicabo. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Deleniti reprehenderit et quos suscipit pariatur
        recusandae dignissimos nemo necessitatibus ipsum ducimus asperiores
        excepturi corrupti aliquid placeat cum doloremque inventore, adipisci
        explicabo. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Deleniti reprehenderit et quos suscipit pariatur recusandae dignissimos
        nemo necessitatibus ipsum ducimus asperiores excepturi corrupti aliquid
        placeat cum doloremque inventore, adipisci explicabo. Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Deleniti reprehenderit et quos
        suscipit pariatur recusandae dignissimos nemo necessitatibus ipsum
        ducimus asperiores excepturi corrupti aliquid placeat cum doloremque
        inventore, adipisci explicabo. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Deleniti reprehenderit et quos suscipit pariatur
        recusandae dignissimos nemo necessitatibus ipsum ducimus asperiores
        excepturi corrupti aliquid placeat cum doloremque inventore, adipisci
        explicabo.
      </div>
    </div>
  );
}
