import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import API from "../services/api";

import {
  useTheme,
} from "../context/ThemeContext";

export default function Register() {

  const navigate =
    useNavigate();

  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      branch: "",
      cgpa: "",
      batch: "",
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

        await API.post(
          "/auth/register",
          formData
        );

        alert(
          "Registration Successful"
        );

        navigate(
          "/login"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Registration Failed"
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

      <br />
      <br />

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
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
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
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
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
          value={formData.password}
          onChange={handleChange}
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

        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          style={{
            ...input,
            background: darkMode
              ? "#1e293b"
              : "white",

            color: "#7c7d7e",

            border: darkMode
              ? "1px solid #94a3b8"
              : "1px solid #94a3b8",

            appearance: "none",
          }}
        >

          <option value="">
            Select Branch
          </option>

          <option value="CSE">
            CSE
          </option>

          <option value="ECE">
            ECE
          </option>

          <option value="EE">
            EE
          </option>

          <option value="ME">
            ME
          </option>

          <option value="CE">
            CE
          </option>

          <option value="IT">
            IT
          </option>

          <option value="ME">
            ME
          </option>

          <option value="EEE">
            EEE
          </option>

          <option value="CHE">
            CHE
          </option>

          <option value="Data Science">
            Data Science
          </option>

          <option value="AI & ML">
            AI & ML
          </option>

          <option value="BioTech">
            BioTech
          </option>

        </select>

        <input
          type="number"
          name="cgpa"
          placeholder="CGPA"
          value={formData.cgpa}
          onChange={handleChange}
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

        <select
          name="batch"
          value={formData.batch}
          onChange={handleChange}
          style={{
            ...input,
            background: darkMode
              ? "#1e293b"
              : "white",

            color: "#7c7d7e",

            border: darkMode
              ? "1px solid #cbd5e1"
              : "1px solid #94a3b8",

            appearance: "none",
          }}
        >

          <option value="">
            Select Batch
          </option>

          <option value="2020">
            2020
          </option>

          <option value="2021">
            2021
          </option>

          <option value="2022">
            2022
          </option>

          <option value="2023">
            2023
          </option>

          <option value="2024">
            2024
          </option>

          <option value="2025">
            2025
          </option>

        </select>

        <button
          type="submit"
          style={button}
        >
          Register
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
            to="/login"
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

  padding:
    "20px",

  flexDirection:
    "column",
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
    "420px",

  backdropFilter:
    "blur(14px)",

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
    "16px",

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
    "48px",
};

const input = {

  padding:
    "14px",

  border:
    "1px solid #cbd5e1",

  borderRadius:
    "12px",

  background:
    "#1e293b",

  color:
    "white",

  outline:
    "none",
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