import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import API from "../../api";
import { SelectField } from "../common/form/selectField";
import { TextAreaField } from "../common/form/textAreaField";
import { PropTypes } from "prop-types";

export function NewComment({ userId, onAddComment }) {
    const [users, setUsers] = useState();
    useEffect(async() => {
        const data = await API.users.fetchAll();
        if (data) {
            setUsers(data);
        }
    }, []);

    const [newComment, setNewComment] = useState({ user: null, content: "", pageId: userId });
    async function addNewComment() {
        const newCommentData = { ...newComment, userId: newComment.user._id };
        const response = await API.comments.add(newCommentData);
        onAddComment(response);
        setNewComment({ user: null, content: "", pageId: userId });
    }

    return (
        <Row>
            <Col span={24}>
                <Row>
                    <h2>New comment</h2>
                </Row>
                <Row>
                    <SelectField
                        data={users}
                        name="user"
                        value={newComment.user ? newComment.user.name : null }
                        onChange={(e) =>
                            setNewComment((prev) => ({ ...prev, user: e }))
                        }
                        size={"100%"}
                    />
                </Row>
                <Row>
                    <TextAreaField
                        label="Комментарий"
                        name="comment"
                        onChange={({ target }) =>
                            setNewComment((prev) => ({
                                ...prev,
                                content: target.value
                            }))
                        }
                        value={newComment.content}
                    />
                </Row>
                <Row>
                    <Button type='primary' disabled={!(newComment.user && newComment.content.trim())} onClick={addNewComment}>Опубликовать</Button>
                </Row>
            </Col>
        </Row>
    );
}

NewComment.propTypes = {
    userId: PropTypes.string,
    onAddComment: PropTypes.func
};
