import React from "react";
import { Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";

export function ErrorPage() {
    const history = useHistory();
    return (
        <>
            <Row>
                <Col>
                    <h2>Page no found</h2>
                    <Button type='primary' onClick={() => history.push("/")}>Вернуться на главную</Button>
                </Col>
            </Row>
        </>
    );
}
