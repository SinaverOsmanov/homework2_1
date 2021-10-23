import React, { useEffect, useState } from "react";
import { SearchStatus } from "../ui/SearchStatus";
import { paginate } from "../../utils/paginate.utils";
import { UsersTypes } from "../../types/types";
import API from "../../api";
import { Col, Row, Divider, Input } from "antd";
import UsersTable from "../ui/UsersTable";
import _ from "lodash";
import { Loading } from "../../utils/loading.utils";
import { GroupList } from "../common/GroupList";
import { Pagination } from "../common/Pagination";

export function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const [users, setUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [loading, setLoading] = useState("loading");
    const [search, setSearch] = useState();
    const pageSize = 8;

    function removeHandler(id) {
        setUsers((prev) => [...prev.filter((user) => user._id !== id)]);
        setSearchUsers((prev) => [...prev.filter((user) => user._id !== id)]);
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
        setSearch("");
    }

    function handlePageChange(event, pageIndex) {
        event.preventDefault();
        setCurrentPage(pageIndex);
    }

    function handleSort(item) {
        setSortBy(item);
    }

    function searchHandler(event) {
        const { value } = event.target;
        setSelectedItem(null);
        const newValue = value.match(/[^а-яa-z]/gim) ? "" : value.trim();
        setSearch(newValue);
    }

    useEffect(() => {
        if (search) {
            const strRegEx = `(${search})`;
            const newRegEx = new RegExp(strRegEx, "gmi");
            const searchResult = searchUsers.filter((u) =>
                u.name.match(newRegEx)
            );
            setUsers(searchResult);
        } else {
            setUsers(searchUsers);
        }
    }, [search]);

    useEffect(async() => {
        try {
            setLoading("loading");
            const data = await API.users.fetchAll();
            if (data) {
                setUsers(data);
                setSearchUsers(data);
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
            setSearch("");
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
                        <Input
                            onChange={searchHandler}
                            value={search}
                            style={{ width: 200 }}
                        />
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
