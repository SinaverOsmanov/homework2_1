import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "antd";

import { validator, validatorConfig } from "./../../utils/validator";
import API from "./../../api/index";
import { TextField } from "../common/form/textField";
import { SelectField } from "../common/form/selectField";
import { RadioField } from "./../common/form/radioField";
import { MultiSelectField } from "../common/form/multiSelectField";
import { CheckBoxtField } from "../common/form/checkBoxField";

export default function RegisterForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();

    function handleChange({ target }) {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    }

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(async() => {
        try {
            const dataProfessions = await API.professions.fetchAll();
            const dataQualities = await API.qualities.fetchAll();

            setProfessions(dataProfessions);
            setQualities(dataQualities);
        } catch (error) {
            console.error(error);
        }
    }, []);

    function validate() {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const isValid = Object.keys(errors).length === 0;

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    }

    function selectHandleChange(value) {
        setData((prev) => ({ ...prev, profession: value }));
    }

    function multiSelectHandleChange(value) {
        setData((prev) => ({ ...prev, qualities: [...value] }));
    }

    function checkBoxHandleChange(value) {
        setData((prev) => ({ ...prev, licence: value }));
    }

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
                    <SelectField
                        value={data.profession}
                        handleChange={selectHandleChange}
                        data={professions}
                        name='profession'
                    />
                </Row>
                <Row>
                    <RadioField
                        value={data.sex}
                        onChange={handleChange}
                        name='sex'
                        data={[
                            { name: "male", value: "male" },
                            { name: "female", value: "female" },
                            { name: "other", value: "other" }
                        ]}
                    />
                </Row>
                <Row>
                    <MultiSelectField
                        data={qualities}
                        onChange={multiSelectHandleChange}
                        name='qualities'
                    />
                </Row>
                <Row>
                    <CheckBoxtField
                        value={data.licence}
                        onChange={checkBoxHandleChange}
                        name="license"
                    >
                        <span>Подтвердить лицензионное соглашение</span>
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
