import React from "react";
import _ from "lodash";
import { PaginationTypes } from "./../../types/types";
export function Pagination(props) {
    const { itemsCount, pageSize, onPageChange, currentPage } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;

    const pages = _.range(1, pageCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        className={`${
                            page === currentPage
                                ? "page-item active"
                                : "page-item"
                        }`}
                        key={page}
                    >
                        <a
                            className="page-link"
                            href="/"
                            onClick={(e) => onPageChange(e, page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

Pagination.propTypes = PaginationTypes;
