import {
    useState,
} from "react";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import {
    useTheme,
} from "../context/ThemeContext";

import API from "../services/api";

export default function RecruiterRegister() {

    const navigate =
        useNavigate();

    const {
        darkMode,
        setDarkMode,
    } = useTheme();

    const [formData,
        setFormData] =
        useState({
            companyName: "",
            hrName: "",
            email: "",
            password: "",
            website: "",
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

                console.log(
                    "Sending:",
                    {
                        ...formData,
                        role:
                            "recruiter",
                    }
                );

                const res =
                    await API.post(
                        "/auth/register",
                        {
                            ...formData,

                            role:
                                "recruiter",
                        }
                    );

                console.log(
                    "SUCCESS:",
                    res.data
                );

                alert(
                    "Recruiter Registered Successfully"
                );

                navigate(
                    "/recruiterLogin"
                );

            } catch (error) {

                console.log(
                    "FULL ERROR:",
                    error
                );

                console.log(
                    "ERROR RESPONSE:",
                    error.response
                );

                alert(
                    error.response?.data?.message ||
                    "Registration Failed"
                );
            }
        };

    return (

        <div
            style={{
                minHeight:
                    "100vh",

                display:
                    "flex",

                flexWrap: "wrap",

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
                        "100%",

                    maxWidth:
                        "500px",

                    border:
                        "1px solid rgba(255,255,255,0.4)",

                    padding:
                        "40px",

                    borderRadius:
                        "24px",

                    display:
                        "grid",

                    gap:
                        "18px",

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
                            "20px",

                        color: darkMode
                            ? "#0f172a"
                            : "white",

                        fontSize: "45px",

                        position: "relative",

                        top: "-20px",

                        WebkitTextStroke: "1px white",

                    }}
                >
                    Recruiter Registration
                </h1>

                <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"

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
                    type="text"
                    name="hrName"
                    placeholder="HR Name"

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

                <input
                    type="text"
                    name="website"
                    placeholder="Company Website"

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

                    style={{
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
                    }}
                >
                    Register Recruiter
                </button>

                <p
                    style={{
                        color:
                            "white",

                        textAlign:
                            "center",
                    }}
                >
                    Already Registered?

                    {" "}

                    <Link
                        to="/recruiterLogin"
                        style={link}
                    >
                        Login
                    </Link>
                </p>

                <Link
                    to="/"
                    style={link}
                >
                    ← Back to Home
                </Link>
            </form>

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

const link = {

    color:
        "#b6f509",

    textDecoration:
        "none",

    textAlign:
        "center",
};