import React from "react";
import { Checkbox } from "antd";
import { PropTypes } from "prop-types";

export function CheckBoxtField({ value, onChange, name, children }) {
    function handleChange() {
        onChange(!value);
    }

    return (
        <Checkbox defaultChecked={value} name={name} onChange={handleChange}>
            {children}
        </Checkbox>
    );
}

CheckBoxtField.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
