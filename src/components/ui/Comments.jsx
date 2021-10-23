import React, { useEffect, useState } from "react";
import API from "../../api";
import { Loading } from "../../utils/loading.utils";
import { Comment } from "./Comment";
import { PropTypes } from "prop-types";

export function Comments({ userId, comments, onRemove }) {
    if (!comments) {
        return <Loading />;
    }
    return (
        <>
            <h2>Comments</h2>
            <hr />
            {comments.length > 0
                ? comments.map((comment) => (
                    <Comment
                        comment={comment}
                        key={comment._id}
                        onRemove={onRemove}
                    />
                ))
                : "нет комментариев"}
        </>
    );
}

Comments.propTypes = {
    userId: PropTypes.string,
    comments: PropTypes.array,
    onRemove: PropTypes.func
};
