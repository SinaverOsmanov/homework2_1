import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import { PropTypes } from "prop-types";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export function TextField({ type, label, name, value, onChange, error }) {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword((prev) => !prev);
    }

    return (
        <Col style={{ marginBottom: "10px" }}>
            <Row >
                <label htmlFor={name}>{label}:</label>
            </Row>
            <Row style={{ margin: "5px 0 0 " }}>
                <Col>
                    <Input label={label} type={showPassword ? "text" : type} id={name} name={name} value={value} onChange={onChange} />
                </Col>
                <Col>
                    {type === "password" &&
                        <Button icon={showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />} onClick={toggleShowPassword} htmlType='button'/>
                    }
                </Col>
            </Row>
            {error && <p>{error}</p>}
        </Col>
    );
}

TextField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};
