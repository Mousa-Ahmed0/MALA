import React, { useEffect } from "react";
import { useDarkMode } from "../../../context/DarkModeContext";

export default function Home({ setActiveId }) {
  const { darkMode } = useDarkMode();
  /////////////////
  useEffect(() => {
    setActiveId(1);
  }, []);
  return (
    <div className="LP-section LP-Home">
      <div className="LP-Home-Details">
        <h1
          className={`dynamic-txts ${darkMode ? " dark-theme" : "light-theme"}`}
        >
          Welcome To MALM!
        </h1>
        <p className={`${darkMode ? " text-white" : ""}`}>
          At <span className="sp-milm">MALM</span>, we provide for you the best
          medical services. All types of laboratory analyzes, obtaining results
          as quickly and accurately as possible, easy communication with the
          laboratory, and more that you can only find in our medical laboratory,
          for more details you can <span className="home-imp">Contact</span>{" "}
          with us.
        </p>
        <p className={`${darkMode ? " text-white" : ""}`}>
          Don't wait, <span className="home-imp">Register</span> and become one
          of our family.
        </p>
      </div>
      <div className="LP-Home-Image d-none d-md-block">
        <img src="./images/medical1.png" alt="LP-Home-Img" />
      </div>
    </div>
  );
}
