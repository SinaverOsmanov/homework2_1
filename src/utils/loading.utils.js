import React from "react";
import { Spin, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PropTypes } from "prop-types";

export function Loading({ styles }) {
    const styleLoading = {
        ...styles,
        color: "red",
        fontSize: "60px"
    };
    const antIcon = <LoadingOutlined style={styleLoading} spin />;
    return (
        <Row justify="center" align='middle' wrap style={{ height: "100vh" }}>
            <Col>
                <Spin indicator={antIcon} />
            </Col>
        </Row>
    );
}

Loading.propTypes = {
    styles: PropTypes.object
};
