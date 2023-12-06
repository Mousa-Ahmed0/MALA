import React from "react";

export default function formatDate({ date }) {
  let newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  return <span>{`${year}-${month}-${day}`}</span>;
}
