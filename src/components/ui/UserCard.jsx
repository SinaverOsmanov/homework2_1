import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";
import { SettingFilled, CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

import { QualitiesList } from "./qualities/QualitiesList";
import { PropTypes } from "prop-types";
import { Loading } from "../../utils/loading.utils";

export function UserCard({ userId }) {
    const [user, setUser] = useState();

    useEffect(async() => {
        const data = await API.users.getById(userId);
        if (data) {
            setUser(data);
        }
    }, []);

    if (!user) {
        return <Loading />;
    }

    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                        <Link to={`${userId}/edit`}>
                            <SettingFilled />
                        </Link>
                    </button>
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img
                            src={`https://avatars.dicebear.com/api/adventurer-neutral/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="150"
                        />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <p className="text-secondary mb-1">
                                {user.profession.name}
                            </p>
                            <div className="text-muted">
                                <CaretDownOutlined
                                    style={{ color: "#eb2f96" }}
                                />
                                <CaretUpOutlined
                                    style={{ color: "#52c41a" }}
                                />
                                <span className="ms-2">
                                    {user.rate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                        <QualitiesList qualities={user.qualities} />
                    </p>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Completed meetings</span>
                    </h5>
                    <h1 className="display-1">
                        {user.completedMeetings}
                    </h1>
                </div>
            </div>
        </>
    );
}

UserCard.propTypes = {
    userId: PropTypes.string
};
