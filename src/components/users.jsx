import React, { useState } from "react";
import { User } from "./User";
import { SearchStatus } from "./SearchStatus";
import { Pagination } from "./Pagination";
import { paginate } from "../utils/paginate.utils";
import { UsersTypes } from "../types/types";

export function Users ({ users, ...rest }) {
    const [currentPage, setCurrentPage] = useState(1);
    const count = users.length;
    const pageSize = 4;

    function handlePageChange (event, pageIndex) {
        event.preventDefault();
        setCurrentPage(pageIndex);
    }

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            <SearchStatus countUsers={count} />
            {!!count && (
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
                        {userCrop.map((user) => (
                            <User
                                user={user}
                                key={user._id}
                                {...rest}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
}

Users.propTypes = UsersTypes;
