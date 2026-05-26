import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  useTheme,
} from "../context/useTheme";

import API from "../services/api";

export default function Login() {

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

        if (
          res.data.user
            .role ===
          "admin"
        ) {

          navigate(
            "/admin"
          );

        } else {

          navigate(
            "/dashboard"
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Login Failed"
        );
      }
    };

  return (

    <div
      style={container}
    >

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }

        style={{
          position: "absolute",

          top: "20px",

          right: "20px",

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

      <div
        style={circle1}
      />

      <div
        style={circle2}
      />

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          ...formStyle,

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
            ...title,

            color: darkMode
              ? "#0f172a"
              : "white",

            WebkitTextStroke: "1px white",
          }}
        >
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
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
          value={
            formData.password
          }
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
          }}
        >
          Don't have an
          account?

          {" "}

          <Link
            to="/register"
            style={link}
          >
            Register
          </Link>
        </p>

        <Link
          to="/"
          style={link}
        >
          ← Back to Home
        </Link>

      </form>

      <br />
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

const container = {

  minHeight:
    "100vh",

  display:
    "flex",

  flexWrap: "wrap",

  justifyContent:
    "center",

  alignItems:
    "center",

  overflow:
    "hidden",

  position:
    "relative",

  flexDirection:
    "column",

  padding:
    "40px",
};

const circle1 = {

  position:
    "absolute",

  width:
    "350px",

  height:
    "350px",

  borderRadius:
    "50%",

  top:
    "-100px",

  left:
    "-100px",

  filter:
    "blur(80px)",
};

const circle2 = {

  position:
    "absolute",

  width:
    "350px",

  height:
    "350px",

  borderRadius:
    "50%",

  bottom:
    "-120px",

  right:
    "-100px",

  filter:
    "blur(80px)",
};

const formStyle = {

  width:
    "400px",

  background:
    "rgba(30, 41, 59, 0.8)",

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
    "20px",

  position:
    "relative",

  zIndex:
    "2",

  border:
    "1px solid rgba(255,255,255,0.4)",
};

const title = {

  color:
    "white",

  textAlign:
    "center",

  fontSize:
    "52px",
};

const input = {

  padding:
    "14px",

  borderRadius:
    "12px",

  background:
    "#1e293b",

  border:
    "1px solid #cbd5e1",

  color:
    "white",
};

const button = {

  padding:
    "14px",

  border:
    "none",

  borderRadius:
    "12px",

  background:
    "linear-gradient(90deg,#2563eb,#7c3aed)",

  color:
    "white",

  fontWeight:
    "bold",

  cursor:
    "pointer",

  fontSize:
    "16px",
};

const link = {

  color:
    "#b6f509",

  textDecoration:
    "none",

  textAlign:
    "center",
};