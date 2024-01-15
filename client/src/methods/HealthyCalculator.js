export const bmrCalc = (age, sex, height, weight) => {
  let result = 0;
  if (sex === "Male") {
    result = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    result = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
  return Math.ceil(result);
};
export const bmiCalc = (age, sex, height, weight) => {
  let result = weight / ((height / 100.0) * (height / 100.0));
  return result.toFixed(2);
};
