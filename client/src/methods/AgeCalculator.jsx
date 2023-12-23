import React, { useState, useEffect } from "react";

export default function AgeCalculator({ birthday }) {
  const [age, setAge] = useState(null);

  useEffect(() => {
    const calculateAge = () => {
      const birthdate = new Date(birthday);
      const currentDate = new Date();

      // Calculate the time difference in milliseconds
      const timeDiff = currentDate - birthdate;

      // Calculate the age
      const ageInMilliseconds = new Date(timeDiff);
      const years = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);

      setAge(years);
    };

    calculateAge();
  }, [birthday]);

  return (
    <div>
      {age !== null ? (
        <p className="mb-0">{age} years old</p>
      ) : (
        <p>Calculating age...</p>
      )}
    </div>
  );
}
