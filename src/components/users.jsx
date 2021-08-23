import React, { useState } from "react";
import api from "../api";
import { User } from "./user";

export function Users() {
  const [users, setUsers] = useState(api.users.fetchAll());
  function removeHandler(id) {
    setUsers((prev) => [...prev.filter((user) => user._id !== id)]);
  }
  function changeText(num) {
    const text = num < 5 && num > 1 ? "человека" : "человек";
    return num > 0
      ? `${num} ${text} тусанет с тобой сегодня`
      : "никто c тобой не тусанет";
  }

  return (
    <>
      <h2>
        <span
          className={`badge ${users.length > 0 ? "bg-primary" : "bg-danger"}`}
        >
          {changeText(users.length)}
        </span>
      </h2>
      {!!users.length && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встетился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User user={user} key={user._id} onRemove={removeHandler} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
