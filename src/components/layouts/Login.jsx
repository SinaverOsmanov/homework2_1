import React, { useState } from "react";
import { useParams } from "react-router";
import { LoginForm } from "../ui/LoginForm";
import RegisterForm from "./../ui/RegisterForm";

export function Login() {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = (params) => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    return (
        <>
            {formType === "register"
                ? (
                    <>
                        <h2>Register</h2>
                        <RegisterForm />
                        <p>
                        Already have account?{" "}
                            <a role="button" onClick={toggleFormType}>
                            Sign in
                            </a>
                        </p>
                    </>
                )
                : (
                    <>
                        <h2>Login</h2>
                        <LoginForm />
                        <p>
                        Dont have account?{" "}
                            <a role="button" onClick={toggleFormType}>
                            Sign Up
                            </a>
                        </p>
                    </>
                )}
        </>
    );
}
