import React from "react";
import { GroupListTypes } from "../../types/types";

export function GroupList({
    professions,
    onItemSelect,
    valueProperty,
    contentProperty,
    onSelectedItem
}) {
    return (
        <ul className="list-group">
            {professions.map((item) => (
                <li
                    key={item[valueProperty]}
                    className={`list-group-item ${
                        item === onSelectedItem && "active"
                    }`}
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    );
}

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = GroupListTypes;
