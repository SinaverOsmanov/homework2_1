import React from "react";
import { Select } from "antd";
import { PropTypes } from "prop-types";

const { Option } = Select;

export function MultiSelectField({ onChange, data, value }) {
    function handleChange(e) {
        const filteredData = data.filter((d) => e.find(item => item === d.name) && true);
        onChange(filteredData);
    }

    return (
        <Select
            mode="multiple"
            allowClear
            style={{ width: "500px" }}
            placeholder="Please select"
            defaultValue={value}
            onChange={handleChange}
        >
            {data &&
                data.map((d) => (
                    <Option key={d._id} value={d.name} >
                        {d.name}
                    </Option>
                ))}
        </Select>
    );
}

MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.array,
    value: PropTypes.array
};
