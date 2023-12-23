//formate Date
export const formatDate = (inputDate) => {
  console.log(inputDate);
  const date = new Date(inputDate);

  // Format date components
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear(); // Get last two digits of the year
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Format with leading zeros
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedYear = year;
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Construct the formatted date string
  const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}, ${formattedHours}:${formattedMinutes} ${ampm}`;

  return formattedDate;
};

export const formatDateWithouHour = (inputDate) => {
  // Create a new Date object
  const currentDate = new Date(inputDate);
  const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  // Get the current time

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  // Format with leading zeros
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedYear = year;

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};
