import React, { useState } from "react";
import api from "../api";
import { Users } from "./Users";

export function App () {
    const [users, setUsers] = useState(api.users.fetchAll());

    function removeHandler (id) {
        setUsers((prev) => [...prev.filter((user) => user._id !== id)]);
    }

    function pickFavoriteHandle (id) {
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

    return (
        <Users users={users} onPickFavorite={pickFavoriteHandle} onRemove={removeHandler}/>
    );
}
