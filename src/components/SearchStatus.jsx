import React from "react";

export function SearchStatus({ countUsers }) {
  function changeText(num) {
    const text = num < 5 && num > 1 ? "человека" : "человек";
    return num > 0
      ? `${num} ${text} тусанет с тобой сегодня`
      : "никто c тобой не тусанет";
  }
  return (
    <h2>
      <span className={`badge ${countUsers > 0 ? "bg-primary" : "bg-danger"}`}>
        {changeText(countUsers)}
      </span>
    </h2>
  );
}
