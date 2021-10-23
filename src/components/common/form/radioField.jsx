import React from "react";
import { PropTypes } from "prop-types";
import { Radio } from "antd";

export function RadioField({ onChange, value, data, name }) {
    const handleChange = (e) => {
        onChange(e);
    };

    return (
        <Radio.Group onChange={handleChange} value={value} name={name}>
            {data.map((d) => (
                <Radio value={d.value} key={d.value}>
                    {d.name}
                </Radio>
            ))}
        </Radio.Group>
    );
}

RadioField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.array
};
