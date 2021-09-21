import React, { useEffect, useState } from "react";
import { SearchStatus } from "./SearchStatus";
import { Pagination } from "./Pagination";
import { paginate } from "../utils/paginate.utils";
import { UsersTypes } from "../types/types";
import { GroupList } from "./GroupList";
import API from "../api";
import { Col, Row, Divider } from "antd";
import UsersTable from "./UsersTable";
import _ from "lodash";
import { Loading } from "./../utils/loading.utils";

export function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [loading, setLoading] = useState("loading");

    const pageSize = 8;

    function removeHandler(id) {
        setUsers((prev) => [...prev.filter((user) => user._id !== id)]);
    }

    function pickFavoriteHandle(id) {
        const newUsers = users.reduce((acc, item) => {
            let tmp = item;
            if (tmp._id === id) {
                tmp = { ...tmp, favorite: !tmp.favorite };
            }
            acc.push(tmp);
            return acc;
        }, []);
        setUsers(newUsers);
    }

    function handleProfessionSelect(item) {
        setSelectedItem(item);
    }

    function handlePageChange(event, pageIndex) {
        event.preventDefault();
        setCurrentPage(pageIndex);
    }

    function handleSort(item) {
        setSortBy(item);
    }

    useEffect(async() => {
        try {
            setLoading("loading");
            const data = await API.users.fetchAll();
            if (data) {
                setUsers(data);
                setLoading("");
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(async() => {
        try {
            setLoading("loading");
            const data = await API.professions.fetchAll();
            if (data) {
                setProfessions(data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedItem]);

    if (loading !== "loading") {
        const filteredUsers = selectedItem
            ? users.filter((user) => user.profession._id === selectedItem._id)
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        function clearFilter() {
            setSelectedItem();
        }

        return (
            <Row>
                <Col span={4}>
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
                        : (
                            <Loading />
                        )}
                </Col>
                <Col span={1} offset={1}>
                    <Divider
                        type="vertical"
                        style={{ height: "100%", color: "#dfdfdf" }}
                    />
                </Col>
                <Col span={18}>
                    <Row>
                        <SearchStatus countUsers={count} />
                    </Row>
                    <Row>
                        {!!count && (
                            <UsersTable
                                users={usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onPickFavorite={pickFavoriteHandle}
                                onRemove={removeHandler}
                            />
                        )}
                    </Row>
                    <Row justify="center">
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
    } else {
        return <Loading />;
    }
}

Users.propTypes = UsersTypes;
