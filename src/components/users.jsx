import React, { useState } from "react";
import api from "../api";
import { User } from "./User";
import { SearchStatus } from "./SearchStatus";

export function Users() {
  const [users, setUsers] = useState(api.users.fetchAll());

  function removeHandler(id) {
    setUsers((prev) => [...prev.filter((user) => user._id !== id)]);
  }

  function pickFavoriteHandle(id) {
    const newUsers = users.reduce((acc, item) => {
      let tmp = item;
      if (tmp._id === id) {
        tmp = { ...tmp, favorite: tmp.favorite ? false : true };
      }
      acc.push(tmp);
      return acc;
    }, []);
    setUsers(newUsers);
  }

  return (
    <>
      <SearchStatus countUsers={users.length} />
      {!!users.length && (
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
            {users.map((user) => (
              <User
                user={user}
                key={user._id}
                onRemove={removeHandler}
                onPickFavorite={pickFavoriteHandle}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
