
import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PropTypes } from "prop-types";

export default function Loading({ styles }) {
    const styleLoading = {
        ...styles,
        color: "red",
        fontSize: "40px"
    };
    const antIcon = <LoadingOutlined style={styleLoading} spin />;
    return <Spin indicator={antIcon} />;
}

Loading.propTypes = {
    styles: PropTypes.object
};
