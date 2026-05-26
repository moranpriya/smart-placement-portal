import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../services/api";

import {
  useTheme,
} from "../context/useTheme";

export default function ResumeBuilder() {

  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      name: "",

      skills: "",

      projects: "",

      education: "",

      achievements: "",
    });

  const [aiResume,
    setAiResume] =
    useState("");

  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const generateAIResume =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.post(

            "/ai/generate-resume",

            formData
          );

        setAiResume(
          res.data.result
        );

      } catch (error) {

        console.log(error);

        alert(
          "AI Resume Generation Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div
      style={{
        minHeight:
          "100vh",

        padding:
          "50px 30px",

        color:
          "white",
      }}
    >

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }

        style={{
          position: "absolute",

          top: "20px",

          right: "200px",

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

      {/* TOP SECTION */}

      <div
        style={{
          textAlign:
            "center",

          marginBottom:
            "50px",
        }}
      >

        <br />


        <h1
          style={{
            fontSize:
              "64px",

            marginBottom:
              "12px",

            fontWeight:
              "900",

            color: darkMode
              ? "#0f172a"
              : "white",

            WebkitTextStroke: "1px white",
          }}
        >
          AI Resume Builder
        </h1>

        <p
          style={{
            fontSize:
              "22px",

            color: darkMode
              ? "black"
              : "white",

            fontWeight: "500",
          }}
        >
          <br />
          Build professional AI-powered resumes for placements
        </p>

      </div>

      {/* MAIN CONTAINER */}

      <div
        style={{
          maxWidth:
            "1400px",

          margin:
            "0 auto",

          display:
            "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap:
            "35px",
        }}
      >

        {/* LEFT SECTION */}

        <div
          style={{
            display:
              "grid",

            gap:
              "30px",
          }}
        >


          {/* AI FORM */}

          <div
            style={{
              backdropFilter:
                "blur(14px)",

              color: darkMode
                ? "#0f172a"
                : "white",

              borderRadius:
                "24px",

              padding:
                "40px",

              border:
                "1px solid rgba(255,255,255,0.4)",

              background: darkMode
                ? "rgba(15,23,42,0.1)"
                : "rgba(255,255,255,0.15)",
            }}
          >

            <h2
              style={{
                color: darkMode
                  ? "#0f172a"
                  : "white",

                fontSize:
                  "34px",

                marginBottom:
                  "20px",

                  WebkitTextStroke: "0.25px white",
              }}
            >
              Generate AI Resume
            </h2>

            <div
              style={{
                display:
                  "grid",

                gap:
                  "18px",
              }}
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"

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

              <textarea
                name="skills"
                placeholder="Skills"

                rows="3"

                onChange={
                  handleChange
                }

                style={{
                  ...textarea,

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

              <textarea
                name="projects"
                placeholder="Projects"

                rows="4"

                onChange={
                  handleChange
                }

                style={{
                  ...textarea,

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

              <textarea
                name="education"
                placeholder="Education"

                rows="3"

                onChange={
                  handleChange
                }

                style={{
                  ...textarea,

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

              <textarea
                name="achievements"
                placeholder="Achievements"

                rows="3"

                onChange={
                  handleChange
                }

                style={{
                  ...textarea,

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
                onClick={
                  generateAIResume
                }

                style={{
                  padding:
                    "16px",

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

                  fontSize:
                    "18px",

                  cursor:
                    "pointer",
                }}
              >
                {
                  loading
                    ? "Generating..."
                    : "Generate AI Resume"
                }
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div
          style={{
            display:
              "grid",

            gap:
              "30px",
          }}
        >

          {/* AI OUTPUT */}

          <div
            style={{

              border:
                "1px solid rgba(255,255,255,0.4)",

              borderRadius:
                "24px",

              padding:
                "40px",

              backdropFilter:
                "blur(12px)",

              minHeight:
                "360px",

              background: darkMode
                ? "rgba(15,23,42,0.1)"
                : "rgba(255,255,255,0.15)",
            }}
          >

            <h2
              style={{
                fontSize:
                  "34px",

                marginBottom:
                  "25px",

                color: darkMode
                  ? "#0f172a"
                  : "white",

                  WebkitTextStroke: "0.25px white",
              }}
            >
              AI Generated Resume
            </h2>

            <div
              style={{
                whiteSpace:
                  "pre-wrap",

                lineHeight:
                  "1.9",

                fontWeight: "700",

                color: darkMode
                ? "rgba(239, 235, 235, 0.4)"
                :"white",
              }}
            >
              {
                aiResume ||
                "Your AI-generated professional resume will appear here..."
              }
            </div>

          </div>

          {/* TIPS */}

          <div
            style={{
              background: darkMode
                ? "rgba(15,23,42,0.1)"
                : "rgba(255,255,255,0.15)",

              border:
                "1px solid rgba(255,255,255,0.4)",

              borderRadius:
                "24px",

              padding:
                "40px",

              backdropFilter:
                "blur(12px)",

            }}
          >

            <h2
              style={{
                fontSize:
                  "34px",

                marginBottom:
                  "25px",

                color: darkMode
                  ? "#0f172a"
                  : "white",

                  WebkitTextStroke: "0.25px white",
              }}
            >
              Resume Tips
            </h2>

            <div
              style={{
                display:
                  "grid",

                gap:
                  "18px",
              }}
            >

              {tips.map(
                (tip) => (

                  <div
                    key={tip}

                    style={{
                      background: darkMode
                        ? "#1e293b"
                        : "white",

                      color: darkMode
                        ? "white"
                        : "black",

                      padding:
                        "18px",

                      borderRadius:
                        "16px",

                      lineHeight:
                        "1.7",
                    }}
                  >
                    ✓ {tip}
                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>

      <br />
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

            border:
              "1px solid #cbd5e1",

            borderRadius:
              "10px",

            padding:
              "5px 10px",

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

const textarea = {

  padding:
    "14px",

  borderRadius:
    "12px",

  border:
    "1px solid #cbd5e1",

  fontSize:
    "16px",

  resize:
    "none",

  background:
    "#1e293b",


};

const tips = [

  "Keep your resume limited to one page.",

  "Mention projects and technical skills clearly.",

  "Use professional email and LinkedIn profile.",

  "Highlight internships and certifications.",

  "Avoid grammatical and spelling mistakes.",

  "Use action verbs and measurable achievements.",

  "Customize resume for every company.",

  "Keep formatting clean and ATS-friendly.",
];