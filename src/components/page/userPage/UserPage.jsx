import React, { useState, useEffect } from "react";
import { UserTypes } from "../../../types/types";
import { useParams } from "react-router-dom";
import { Loading } from "../../../utils/loading.utils";
import API from "../../../api/index";
import { Comments } from "../../ui/Comments";
import { NewComment } from "../../ui/NewComment";
import { UserCard } from "../../ui/UserCard";

export function UserPage() {
    const { userId } = useParams();
    // const [loading, setLoading] = useState("loading");
    const [comments, setComments] = useState();

    function onRemove(id) {
        const filterComments = comments.filter((comment) => comment._id !== id);
        setComments(filterComments);
    }

    function onAddComment(obj) {
        setComments(prev => ([...prev, obj]));
    }

    useEffect(async() => {
        const data = await API.comments.fetchCommentsForUser(userId);
        setComments(data);
    }, []);

    if (!comments) {
        return <Loading />;
    }

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard userId={userId}/>
                </div>
                <div className="col-md-8">
                    <div className="card mb-2">
                        <div className="card-body ">
                            <NewComment userId={userId} onAddComment={onAddComment}/>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body ">
                            <Comments userId={userId} onRemove={onRemove} comments={comments}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

UserPage.propTypes = UserTypes;
