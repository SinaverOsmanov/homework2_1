import React from "react";
import { PropTypes } from "prop-types";
import { Bookmark } from "./Bookmark";
import { QualitiesList } from "./QualitiesList";
import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import TableBody from "./TableBody";

export default function UsersTable({ users, onSort, onRemove, selectedSort, onPickFavorite, ...rest }) {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качество", component: (user) => <QualitiesList qualities={user.qualities}/> },
        professions: { path: "profession.name", name: "Профессия" },
        rate: { path: "rate", name: "Оценка" },
        completedMeetings: { path: "completedMeetings", name: "Встетился, раз" },
        favorite: {
            path: "favorite",
            name: "Избранное",
            component: (user) => <Bookmark onPickFavorite={onPickFavorite} user={user} />
        },
        delete: {
            component: (user) => (<button
                type="button"
                className="btn btn-danger"
                onClick={() => onRemove(user._id)}
            >
            Delete
            </button>)
        }
    };

    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} >
            <TableHeader {...{ onSort, selectedSort, columns }}/>
            <TableBody {...{ columns, data: users }}/>
        </Table>
    );
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onPickFavorite: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};
