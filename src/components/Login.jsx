import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { TextField } from "./textField";
import { validator } from "../utils/validator";

export function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    function handleChange({ target }) {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    }

    useEffect(() => {
        validate();
    }, [data]);

    function validate() {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const isValid = Object.keys(errors).length === 0;
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email должен быть заполнен"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль должен быть заполнен"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать как минимум одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать как минимум одну цифру"
            },
            isMin: {
                message: "Пароль должен содержать как минимум 8 символов",
                value: 8
            }
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    }

    return (
        <>
            <h2>Login</h2>
            <Col>
                <form onSubmit={handleSubmit}>
                    <Row justify='space-between'>
                        <TextField label="E-mail" type="text" name="email" value={data.email} onChange={handleChange} error={errors.email}/>
                    </Row>
                    <Row justify='space-between' style={{ position: "relative" }}>
                        <TextField label='Пароль' type="password" name="password" value={data.password} onChange={handleChange} error={errors.password}/>
                    </Row>
                    <Row justify='space-between' style={{ marginTop: "10px" }}>
                        <Button htmlType='submit' disabled={!isValid}>Submit</Button>
                    </Row>
                </form>
            </Col>
        </>
    );
}
