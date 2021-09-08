import React from "react";
import { QualitiesTypes } from "./../types/types";

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

Quality.propTypes = QualitiesTypes;
