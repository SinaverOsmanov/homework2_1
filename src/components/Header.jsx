import React, { useState } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

export function Header() {
    const { pathname } = useLocation();
    console.log(pathname);
    const [current, setCurrent] = useState({
        current: pathname
    });

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
