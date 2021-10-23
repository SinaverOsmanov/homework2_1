import React from "react";
import { Input, Row, Col } from "antd";
import { PropTypes } from "prop-types";

export function TextAreaField({ label, name, value, onChange, error }) {
    return (
        <Col style={{ marginBottom: "10px", flex: "1 0 0" }}>
            <Row>
                <label htmlFor={name}>{label}:</label>
            </Row>
            <Row style={{ margin: "5px 0 0 " }}>
                <Input.TextArea
                    label={label}
                    id={name}
                    name={name}
                    rows={4}
                    value={value}
                    onChange={onChange}
                />
            </Row>
            {error && <p>{error}</p>}
        </Col>
    );
}

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};
