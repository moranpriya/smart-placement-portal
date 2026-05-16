import {
    useState,
} from "react";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import API from "../services/api";

import {
    useTheme,
} from "../context/ThemeContext";

export default function RecruiterLogin() {

    const navigate =
        useNavigate();

    const {
        darkMode,
        setDarkMode,
    } = useTheme();

    const [formData,
        setFormData] =
        useState({
            email: "",
            password: "",
        });

    const handleChange = (
        e
    ) => {

        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const res =
                    await API.post(
                        "/auth/login",
                        formData
                    );

                if (
                    res.data.user
                        .role !==
                    "recruiter"
                ) {

                    alert(
                        "Not a recruiter account"
                    );

                    return;
                }

                localStorage.setItem(
                    "token",
                    res.data.token
                );

                localStorage.setItem(
                    "user",

                    JSON.stringify(
                        res.data.user
                    )
                );

                navigate(
                    "/recruiter"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Login Failed"
                );
            }
        };

    return (

        <div
            style={{
                minHeight: "100vh",

                display:
                    "flex",

                flexWrap: "wrap",

                flexDirection:
                    "column",

                justifyContent:
                    "center",

                alignItems:
                    "center",

                padding:
                    "40px",
            }}
        >

            <button
                onClick={() =>
                    setDarkMode(!darkMode)
                }

                style={{
                    position: "absolute",

                    right: "200px",

                    top: "20px",

                    padding: "10px 14px",

                    border: "none",

                    borderRadius: "10px",

                    background: darkMode
                        ? "#facc15"
                        : "#111827",

                    color: darkMode
                        ? "black"
                        : "white",

                    cursor: "pointer",

                    fontWeight: "700",

                    zIndex: "5",
                }}
            >
                {darkMode ? "☀️ Light" : "🌙 Dark"}

            </button>

            <form
                onSubmit={
                    handleSubmit
                }

                style={{
                    width:
                        "420px",

                    padding:
                        "40px",

                    borderRadius:
                        "24px",

                    display:
                        "flex",

                    flexWrap: "wrap",

                    flexDirection:
                        "column",

                    gap:
                        "18px",

                    border:
                        "1px solid rgba(255,255,255,0.4)",

                    background: darkMode
                        ? "rgba(15,23,42,0.1)"
                        : "rgba(255,255,255,0.15)",

                    color: darkMode
                        ? "white"
                        : "#0b1f59",

                    backdropFilter: "blur(6px)",
                }}
            >

                <h1
                    style={{
                        textAlign:
                            "center",

                        marginBottom:
                            "10px",

                        color: darkMode
                            ? "#0f172a"
                            : "white",
                        fontSize: "45px",

                        position: "relative",

                        top: "-20px",

                        WebkitTextStroke: "1px white",

                    }}
                >
                    Recruiter Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Official Email"

                    onChange={
                        handleChange
                    }

                    style={{
                        ...input,

                        background: darkMode
                            ? "#1e293b"
                            : "white",

                        color: darkMode
                            ? "white"
                            : "black",

                        border: darkMode
                            ? "1px solid #cbd5e1"
                            : "1px solid #94a3b8",
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"

                    onChange={
                        handleChange
                    }

                    style={{
                        ...input,

                        background: darkMode
                            ? "#1e293b"
                            : "white",

                        color: darkMode
                            ? "white"
                            : "black",

                        border: darkMode
                            ? "1px solid #cbd5e1"
                            : "1px solid #94a3b8",
                    }}
                />

                <button
                    type="submit"

                    style={button}
                >
                    Login
                </button>

                <p
                    style={{
                        color:
                            "white",

                        textAlign:
                            "center",

                        marginTop:
                            "10px",
                    }}
                >
                    New Recruiter ?

                    {" "}

                    <Link
                        to="/recruiter-register"

                        style={{
                            color:
                                "#b6f509",

                            textDecoration:
                                "none",

                            fontWeight:
                                "600",
                        }}
                    >
                        Register
                    </Link>
                </p>

                <Link
                    to="/"

                    style={{
                        textAlign:
                            "center",

                        color:
                            "#b6f509",

                        textDecoration:
                            "none",

                        marginTop:
                            "5px",

                        fontWeight:
                            "600",
                    }}
                >
                    ← Back to Home
                </Link>

            </form>

            <div
                style={{
                    marginTop:
                        "60px",

                    textAlign:
                        "center",

                    color:
                        "#cbd5e1",

                    fontSize:
                        "18px",
                }}
            >
                © 2026 Placement Portal. All rights reserved.
            </div>
        </div>

    );
}

const input = {

    padding:
        "14px",

    borderRadius:
        "12px",

    border:
        "1px solid #cbd5e1",

    fontSize:
        "16px",

    background:
        "#1e293b",
};

const button = {

    padding:
        "15px",

    border:
        "none",

    borderRadius:
        "999px",

    background:
        "#2563eb",

    color:
        "white",

    fontWeight:
        "700",

    cursor:
        "pointer",

    fontSize:
        "16px",
};