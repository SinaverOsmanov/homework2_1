import React from "react";
import { PropTypes } from "prop-types";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

export function TableHeader({ onSort, selectedSort, columns }) {
    function handleSort(item) {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    }

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => {
                    return (
                        <th
                            key={column}
                            onClick={
                                columns[column].path
                                    ? () => handleSort(columns[column].path)
                                    : undefined
                            }
                            {...{ role: columns[column].path && "button" }}
                            scope="col"
                        >
                            <Row align="bottom">
                                <Col>{columns[column].name}</Col>
                                {columns[column].path === selectedSort.path && (
                                    <Col>
                                        {columns[column].path &&
                                        selectedSort.order === "asc"
                                            ? (
                                                <CaretUpOutlined />
                                            )
                                            : (
                                                <CaretDownOutlined />
                                            )}
                                    </Col>
                                )}
                            </Row>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object,
    columns: PropTypes.object
};
