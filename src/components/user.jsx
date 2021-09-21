import React, { useState, useEffect } from "react";
import { UserTypes } from "../types/types";
import { Col, Row, Button } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { Loading } from "./../utils/loading.utils";
import API from "./../api/index";
import { QualitiesList } from "./QualitiesList";

export function User() {
    const { id } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState("loading");

    useEffect(async() => {
        setLoading("loading");
        const data = await API.users.getById(id);
        if (data) {
            setUser(data);
            setLoading("");
        }
    }, []);

    if (loading === "loading") {
        return <Loading/>;
    }

    return (
        <Row className="userRowStyle">
            <Col style={{ flex: "1 0 0" }} >
                <Row><h2>{user.name}</h2></Row>
                <Row><h4>Профессия: {user.profession.name}</h4></Row>
                <Row><QualitiesList qualities={user.qualities}/></Row>
                <Row>Встетился, раз: {user.completedMeetings}</Row>
                <Row><h4>Оценка: {user.rate}</h4></Row>
                <Row><Button type="primary" onClick={() => history.goBack()}>Все пользователи</Button></Row>
            </Col>
        </Row>
    );
}

User.propTypes = UserTypes;
