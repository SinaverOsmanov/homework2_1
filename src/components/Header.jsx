import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

export function Header() {
    const { pathname } = useLocation();

    const [current, setCurrent] = useState({
        current: pathname
    });

    useEffect(() => {
        setCurrent({ current: pathname });
    }, [pathname]);

    const handleClick = e => {
        setCurrent({ current: e.key });
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current.current]} mode="horizontal">
            <Menu.Item key="/" >
                <Link to='/'>Main</Link>
            </Menu.Item>
            <Menu.Item key="/login" >
                <Link to='/login'>Login</Link>
            </Menu.Item>
            <Menu.Item key='/users' >
                <Link to='/users'>Users</Link>
            </Menu.Item>
        </Menu>

    );
}
