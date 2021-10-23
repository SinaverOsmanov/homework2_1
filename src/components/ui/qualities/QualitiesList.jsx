import React from "react";
import { PropTypes } from "prop-types";
import { Quality } from "./Quality";

export function QualitiesList({ qualities }) {
    return (
        <>
            {qualities.map((q) => (
                <Quality quality={q} key={q._id} />
            ))}
        </>
    );
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
