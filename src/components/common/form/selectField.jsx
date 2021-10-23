import React from "react";
import { Select } from "antd";
import { PropTypes } from "prop-types";

export function SelectField({ value, onChange, data, name, size }) {
    function handleChange(e) {
        const profession = data.find(d => d._id === e);
        onChange(profession);
    }

    return (
        <Select
            style={{ width: size }}
            onChange={handleChange}
            placeholder={`Select a ${name}`}
            name={name}
            defaultValue={value}
        >
            {data &&
                data.map((p) => {
                    return (
                        <Select.Option value={p._id} key={p._id}>
                            {p.name}
                        </Select.Option>
                    );
                }
                )}
        </Select>
    );
}

SelectField.propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.array,
    value: PropTypes.string,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    name: PropTypes.string
};
