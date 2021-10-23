import React from "react";
import { PropTypes } from "prop-types";
import { QualitiesList } from "./qualities/QualitiesList";
import { Table } from "../common/table/Table";
import { Link } from "react-router-dom";
import { Bookmark } from "../common/Bookmark";

export default function UsersTable({
    users,
    onSort,
    onRemove,
    selectedSort,
    onPickFavorite
}) {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        rate: { path: "rate", name: "Оценка" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встетился, раз"
        },
        favorite: {
            path: "favorite",
            name: "Избранное",
            component: (user) => (
                <Bookmark onPickFavorite={onPickFavorite} user={user} />
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onRemove(user._id)}
                >
                    Delete
                </button>
            )
        }
    };

    return (
        <>
            <Table
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={users}
            />
        </>
    );
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onPickFavorite: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};
