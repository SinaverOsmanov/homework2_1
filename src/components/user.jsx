import React from "react";
import { Quality } from "./quality";

export function User({ user, onRemove }) {
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
