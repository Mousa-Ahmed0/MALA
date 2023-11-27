import React from "react";
import AgeCalculator from "../../../methods/AgeCalculator";
export default function DetailsInformation({
  darkMode,
  doctorInformation,
  patintInformation,
  staffInformation,
  date,
}) {
  const originalDateString = date;
  const dateObject = new Date(originalDateString);

  const day = String(dateObject.getUTCDate()).padStart(2, "0");
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  const year = String(dateObject.getUTCFullYear());

  const formattedDate = `${day}/${month}/${year}`;
  return (
    <>
      <div
        className={`d-flex  justify-content-around border p-1 mid-bold detailes-size mb-4 ${
          darkMode ? " spic-dark-mode border-white" : "border-black"
        }`}
      >
        <div className=" d-flex flex-column">
          <div>
            Doctor:
            <span className="light-bold">
              {" "}
              {typeof doctorInformation === "object" &&
              doctorInformation !== null
                ? doctorInformation.firstname + " " + doctorInformation.lastname
                : doctorInformation}
            </span>
          </div>
          <div>
            Staff:
            <span className="light-bold">
              {" "}
              {staffInformation !== null
                ? staffInformation.firstname + " " + staffInformation.lastname
                : "Not Found"}
            </span>
          </div>
          <div>
            SampleDate:
            <span className="light-bold"> {formattedDate}</span>
          </div>
        </div>
        <div className=" d-flex flex-column ">
          <div>
            Patient:
            <span className="light-bold">
              {" "}
              {patintInformation !== null
                ? patintInformation.firstname + " " + patintInformation.lastname
                : "Not Found"}
            </span>
          </div>
          <div className="d-flex gap-1">
            Age:
            <span className="light-bold">
              {" "}
              <AgeCalculator
                birthday={
                  patintInformation !== null
                    ? patintInformation.birthday
                    : Date()
                }
              />
            </span>
          </div>
          <div>
            Sex:
            <span className="light-bold">
              {" "}
              {patintInformation !== null ? patintInformation.sex : "Not Found"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
