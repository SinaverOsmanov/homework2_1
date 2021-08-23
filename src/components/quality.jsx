import React from "react";

export function Quality({ quality }) {
  return (
    <span
      className={`badge bg-${quality.color}`}
      style={{ marginRight: "5px" }}
    >
      {quality.name}
    </span>
  );
}
