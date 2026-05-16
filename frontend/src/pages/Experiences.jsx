import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useTheme,
} from "../context/ThemeContext";

import API from "../services/api";

export default function Experiences() {

  const [experiences,
    setExperiences] =
    useState([]);

  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  const [formData,
    setFormData] =
    useState({
      companyName: "",
      role: "",
      experience: "",
      tips: "",
    });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchExperiences =
    async () => {

      try {

        const res =
          await API.get(
            "/experiences"
          );

        setExperiences(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExperiences();

  }, []);

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
          "/experiences",
          {
            ...formData,

            student:
              user?._id,
          }
        );

        alert(
          "Experience Shared Successfully"
        );

        setFormData({
          companyName: "",
          role: "",
          experience: "",
          tips: "",
        });

        fetchExperiences();

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Share Experience"
        );
      }
    };

  return (

    <div
      style={{
        minHeight:
          "100vh",

        color:
          "white",

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

      <br />
      <br />

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          background: darkMode
            ? "rgba(15,23,42,0.1)"
            : "rgba(255,255,255,0.15)",

          color: darkMode
            ? "white"
            : "#0b1f59",

          backdropFilter: "blur(6px)",

          padding:
            "25px",

          borderRadius:
            "20px",

          display:
            "grid",

          gap:
            "15px",

          marginBottom:
            "40px",

          border:
            "1px solid rgba(255,255,255,0.4)",
        }}
      >

        <h1
          style={{
            fontSize:
              "42px",

            marginBottom:
              "30px",

            color: darkMode
              ? "#0f172a"
              : "white",

            WebkitTextStroke: "1px white",

          }}
        >
          Interview Experiences
        </h1>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={
            formData.companyName
          }
          onChange={
            handleChange
          }
          style={{
            ...inputStyle,

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
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={
            formData.role
          }
          onChange={
            handleChange
          }
          style={{
            ...inputStyle,

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
          required
        />

        <textarea
          name="experience"
          placeholder="Interview Experience"
          value={
            formData.experience
          }
          onChange={
            handleChange
          }
          style={{
            ...inputStyle,

            background: darkMode
              ? "#1e293b"
              : "white",

            color: darkMode
              ? "white"
              : "black",

            border: darkMode
              ? "1px solid #cbd5e1"
              : "1px solid #94a3b8",

            minHeight:
              "140px",
          }}
          required
        />

        <textarea
          name="tips"
          placeholder="Tips For Juniors"
          value={
            formData.tips
          }
          onChange={
            handleChange
          }
          style={{
            ...inputStyle,

            background: darkMode
              ? "#1e293b"
              : "white",

            color: darkMode
              ? "white"
              : "black",

            border: darkMode
              ? "1px solid #cbd5e1"
              : "1px solid #94a3b8",

            minHeight:
              "100px",
          }}
          required
        />

        <button
          type="submit"
          style={{
            padding:
              "14px",

            border:
              "none",

            borderRadius:
              "12px",

            background:
              "#2563eb",

            color:
              "white",

            cursor:
              "pointer",

            fontWeight:
              "600",

            fontSize:
              "16px",
          }}
        >
          Share Experience
        </button>

      </form>

      <div
        style={{
          display:
            "grid",

          gap:
            "20px",
        }}
      >

        {experiences.map(
          (exp) => (

            <div
              key={exp._id}
              style={{
                background: darkMode
                  ? "#1e293b"
                  : "white",

                color: darkMode
                  ? "white"
                  : "black",

                border: darkMode
                  ? "1px solid #cbd5e1"
                  : "1px solid #94a3b8",

                padding:
                  "25px",

                borderRadius:
                  "20px",
              }}
            >

              <h2
                style={{
                  color: darkMode
                    ? "white"
                    : "#0f172a",
                }}
              >
                {exp.companyName}
              </h2>

              <p>
                <strong>
                  Role:
                </strong>

                {" "}

                {exp.role}
              </p>

              <hr
                style={{
                  margin:
                    "15px 0",

                  borderColor:
                    "#1e293b",
                }}
              />

              <p>
                {
                  exp.experience
                }
              </p>

              <div
                style={{
                  marginTop:
                    "20px",

                  padding:
                    "15px",

                  borderRadius:
                    "12px",

                }}
              >

                <strong>
                  Tips:
                </strong>

                <p>
                  {exp.tips}
                </p>

              </div>

            </div>
          )
        )}

      </div>

      <br />
      <br />

      <div>

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

            background:
              "rgba(255,255,255,0.08)",

            borderRadius:
              "10px",

            padding:
              "5px 10px",

            border:
              "1px solid #cbd5e1",

          }}
        >
          ← Back to Home
        </Link>

      </div>

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

const inputStyle = {

  padding:
    "14px",

  borderRadius:
    "12px",

  background:
    "#1e293b",

  color:
    "white",

  border:
    "1px solid #cbd5e1",
};