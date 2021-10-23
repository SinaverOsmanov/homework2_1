import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Typography } from "antd";
import { TextField } from "../../common/form/textField";
import { SelectField } from "../../common/form/selectField";
import { MultiSelectField } from "../../common/form/multiSelectField";
import { RadioField } from "../../common/form/radioField";
import { useHistory, useParams } from "react-router";
import { validator, validatorConfig } from "./../../../utils/validator";
import API from "./../../../api/index";
import { Loading } from "../../../utils/loading.utils";
import { UserTypes } from "./../../../types/types";

const { Title } = Typography;
export default function EditUserPage() {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();
    const [qualities, setQualities] = useState();
    const [professions, setProfessions] = useState();
    const [loading, setLoading] = useState("loading");
    const [errors, setErrors] = useState({});

    function handleChange({ target }) {
        setUser({ ...user, [target.name]: target.value });
    }

    function selectHandleChange(value) {
        setUser((prev) => ({ ...prev, profession: value }));
    }

    function multiSelectHandleChange(value) {
        setUser((prev) => ({ ...prev, qualities: [...value] }));
    }

    function validate() {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function updateUser() {
        API.users.update(userId, user);
        setUser(user);
        history.goBack();
    }

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [user]);

    useEffect(async() => {
        setLoading("loading");
        const data = await API.users.getById(userId);
        if (data) {
            setUser(data);
            setLoading("");
        }
    }, []);

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

    if (loading === "loading") {
        return <Loading />;
    }

    return (
        <Row className="userRowStyle">
            <Card title={<Title level={4}>Изменение пользователя</Title> }>
                <Row>
                    <TextField onChange={handleChange} name='name' value={user.name} label="Имя"/>
                </Row>
                <Row>
                    <Row justify="space-between">
                        <TextField
                            label="E-mail"
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                    </Row>
                </Row>
                <Row>
                    <SelectField onChange={selectHandleChange} name='profession' value={user.profession.name} data={professions}/>
                </Row>
                <Row>
                    <MultiSelectField
                        data={qualities}
                        onChange={multiSelectHandleChange}
                        value={user.qualities.map(q => q.name)}
                    />
                </Row>

                <Row>
                    <RadioField
                        value={user.sex}
                        onChange={handleChange}
                        name='sex'
                        data={[
                            { name: "male", value: "male" },
                            { name: "female", value: "female" },
                            { name: "other", value: "other" }
                        ]}
                    />
                </Row>
                <Row gutter={10}>
                    <Col>
                        <Button type="primary" style={{ background: "green" }} onClick={() => history.goBack()}>
                        Отменить Редактирование
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" disabled={!isValid} onClick={updateUser}>
                        Сохранить
                        </Button>
                    </Col>
                </Row>
            </Card>
        </Row>
    );
}

EditUserPage.propTypes = UserTypes;
