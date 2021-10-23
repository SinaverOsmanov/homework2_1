import React, { useEffect, useState } from "react";
import { validator, validatorConfig } from "../../utils/validator";
import { Col, Row, Button } from "antd";

import { TextField } from "../common/form/textField";
import { CheckBoxtField } from "../common/form/checkBoxField";

export function LoginForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    function handleChange({ target }) {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    }

    function validate() {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!isValid) return;
        console.log(data);
    }

    const isValid = Object.keys(errors).length === 0;

    function checkBoxHandleChange(value) {
        console.log(value);
        setData((prev) => ({ ...prev, stayOn: value }));
    }

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <Col>
            <form onSubmit={handleSubmit}>
                <Row justify="space-between">
                    <TextField
                        label="E-mail"
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                </Row>
                <Row justify="space-between" style={{ position: "relative" }}>
                    <TextField
                        label="Пароль"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                </Row>
                <Row>
                    <CheckBoxtField
                        value={data.licence}
                        onChange={checkBoxHandleChange}
                        name="license"
                    >
                        <span>Оставаться в системе</span>
                    </CheckBoxtField>
                </Row>
                <Row justify="space-between" style={{ marginTop: "10px" }}>
                    <Button htmlType="submit" disabled={!isValid}>
                        Submit
                    </Button>
                </Row>
            </form>
        </Col>
    );
}
