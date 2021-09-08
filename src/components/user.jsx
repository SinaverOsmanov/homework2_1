import React from "react";
import { Bookmark } from "./Bookmark";
import { Quality } from "./Quality";
import { UserTypes } from "./../types/types";

export function User({ user, onRemove, onPickFavorite }) {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((q) => (
                    <Quality quality={q} key={q._id} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{`${user.rate}/5`}</td>
            <td>
                <Bookmark
                    onPickFavorite={onPickFavorite}
                    id={user._id}
                    favorite={user.favorite}
                />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onRemove(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

User.propTypes = UserTypes;
