import React, { useEffect, useState } from "react";
import { User } from "./User";
import { SearchStatus } from "./SearchStatus";
import { Pagination } from "./Pagination";
import { paginate } from "../utils/paginate.utils";
import { UsersTypes } from "../types/types";
import { GroupList } from "./GroupList";
import API from "../api";
import Loading from "../utils/loading.utils";
import { Col, Row, Divider } from "antd";

export function Users({ users, ...rest }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const pageSize = 2;

    function handleProfessionSelect(item) {
        setSelectedItem(item);
    }

    useEffect(async() => {
        const data = await API.professions.fetchAll();
        if (data) setProfessions(data);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedItem]);

    function handlePageChange(event, pageIndex) {
        event.preventDefault();
        setCurrentPage(pageIndex);
    }

    function clearFilter() {
        setSelectedItem();
    }

    const filteredUsers = selectedItem
        ? users.filter((user) => user.profession.name === selectedItem.name)
        : users;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);
    const count = filteredUsers.length;

    return (
        <Row style={{ marginTop: "35px" }}>
            <Col span={4} offset={1}>
                {professions
                    ? (
                        <>
                            <GroupList
                                onSelectedItem={selectedItem}
                                professions={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                        Очистить фильтр
                            </button>
                        </>
                    )
                    : <Loading />}
            </Col>
            <Col span={1} offset={1} ><Divider type='vertical' style={{ height: "100%", color: "#dfdfdf" }} /></Col>
            <Col span={15} >
                <Row>
                    <SearchStatus countUsers={count} />
                </Row>
                <Row>
                    {!!count && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Имя</th>
                                    <th scope="col">Качества</th>
                                    <th scope="col">Профессия</th>
                                    <th scope="col">Встетился, раз</th>
                                    <th scope="col">Оценка</th>
                                    <th scope="col">Избранное</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersCrop.map((user) => (
                                    <User user={user} key={user._id} {...rest} />
                                ))}
                            </tbody>
                        </table>
                    )}
                </Row>
                <Row justify='center'>
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </Row>
            </Col>
        </Row>
    );
}

Users.propTypes = UsersTypes;
