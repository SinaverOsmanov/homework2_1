import React, { useEffect, useState } from "react";
import API from "../api";
import { Users } from "./Users";
import Loading from "./../utils/loading.utils";

export function App() {
    const [users, setUsers] = useState();
    function removeHandler(id) {
        setUsers((prev) => [...prev.filter((user) => user._id !== id)]);
    }

    useEffect(async() => {
        const data = await API.users.fetchAll();
        if (data) setUsers(data);
    }, [users]);

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
    return (users
        ? <Users
            users={users}
            onPickFavorite={pickFavoriteHandle}
            onRemove={removeHandler} />
        : <Loading styles={{ position: "absolute", top: "50%", left: "50%", marginLeft: "-20px" }}/>);
}
