import React, { useEffect, useState } from "react";
import API from "./../../api/index";
import { PropTypes } from "prop-types";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { convertDate } from "../../utils/convertDate";

export function Comment({ comment, onRemove }) {
    const [commentUser, setCommentUser] = useState({});

    useEffect(async() => {
        const data = await API.users.getById(comment.userId);
        setCommentUser(data);
    }, [comment]);

    function removeHandler(id) {
        API.comments.remove(id);
        onRemove(id);
    }

    return (
        <div className="bg-light card-body mb-3" >
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={`https://avatars.dicebear.com/api/adventurer-neutral/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 "><span>{commentUser && commentUser.name} -</span>
                                        <span className="small" style={{ marginLeft: "5px" }}>{convertDate(comment.created_at).text}</span>
                                    </p>
                                    <button className="btn btn-sm text-primary d-flex align-items-center" onClick={() => removeHandler(comment._id)}>
                                        <CloseCircleTwoTone twoToneColor="red" />
                                    </button>
                                </div>
                                <p className="small mb-0">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object,
    onRemove: PropTypes.func
};
