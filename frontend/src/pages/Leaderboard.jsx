import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../services/api";

import {
  useTheme,
} from "../context/useTheme";

export default function Leaderboard() {

  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchLeaderboard =
    async () => {

      try {

        const res =
          await API.get(
            "/leaderboard"
          );

        console.log(
          res.data
        );

        setStudents(
          res.data
        );

      } catch (error) {

        console.log(
          error
        );

      } finally {

        setLoading(
          false
        );
      }
    };


  useEffect(() => {
    const loadLeaderboard =
      async () => {
        await fetchLeaderboard();
      };
    loadLeaderboard();
  }, []);

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

      {/* HEADER */}

      <div
        style={{
          textAlign:
            "center",

          marginBottom:
            "50px",
        }}
      >

        <h1
          style={{
            fontSize:
              "57px",


            wordBreak:
              "break-word",

            fontWeight:
              "800",

            marginBottom:
              "10px",

            color: darkMode
              ? "#0f172a"
              : "white",

            WebkitTextStroke: "2px white",
          }}
        >
          Placement Leaderboard
        </h1>

        <p
          style={{
            fontSize:
              "30px",

            fontWeight:
              "600",

            color: darkMode
              ? "black"
              : "white",
          }}
        >
          <br />
          Successfully placed students
        </p>

      </div>

      {/* LOADING */}

      {loading && (

        <h2
          style={{
            textAlign:
              "center",

            marginTop:
              "60px",
          }}
        >
          Loading...
        </h2>
      )}

      {/* NO DATA */}

      {!loading &&
        students.length === 0 && (

          <h2
            style={{
              textAlign:
                "center",

              marginTop:
                "60px",

              color:
                "#cbd5e1",
            }}
          >
            No placed students found
          </h2>
        )}

      {/* LEADERBOARD */}

      <div
        style={{
          maxWidth:
            "1100px",

          margin:
            "0 auto",

          display:
            "grid",

          gap:
            "25px",
        }}
      >

        {students.map(
          (
            student,
            index
          ) => (

            <div
              key={
                student._id
              }

              style={{
                background: darkMode
                  ? "rgba(15,23,42,0.1)"
                  : "rgba(255,255,255,0.15)",

                border:
                  "1px solid rgba(255,255,255,0.4)",

                backdropFilter:
                  "blur(12px)",

                padding:
                  "28px 35px",

                display:
                  "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "center",

                borderRadius:
                  "24px",


                flexWrap:
                  "wrap",

                gap:
                  "20px",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >

              {/* LEFT */}

              <div
                style={{
                  display:
                    "flex",

                  flexWrap: "wrap",

                  alignItems:
                    "center",

                  gap:
                    "25px",
                }}
              >

                <div
                  style={{
                    width:
                      "80px",

                    height:
                      "80px",

                    borderRadius:
                      "50%",

                    background:
                      index === 0
                        ? "#facc15"
                        : index === 1
                          ? "#cbd5e1"
                          : index === 2
                            ? "#fb923c"
                            : "#8b5cf6",

                    display:
                      "flex",

                    flexWrap: "wrap",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",

                    fontSize:
                      "34px",

                    fontWeight:
                      "900",

                    color:
                      "#0f172a",
                  }}
                >
                  {
                    index + 1
                  }
                </div>

                <div>

                  <h2
                    style={{
                      fontSize:
                        "32px",

                      marginBottom:
                        "8px",

                      color: darkMode
                        ? "#0f172a"
                        : "white",
                    }}
                  >
                    {
                      student.name ||
                      "No Name"
                    }
                  </h2>

                  <p
                    style={{
                      color: "white",

                      fontSize:
                        "18px",
                    }}
                  >
                    {
                      student.branch ||
                      "No Branch"
                    }
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div
                style={{
                  textAlign:
                    "right",
                }}
              >

                <div
                  style={{
                    background:
                      "#22c55e",

                    padding:
                      "10px 20px",

                    borderRadius:
                      "999px",

                    fontWeight:
                      "700",

                    marginBottom:
                      "12px",

                    display:
                      "inline-block",
                  }}
                >
                  Placed
                </div>

                <h3
                  style={{
                    fontSize:
                      "28px",

                    marginBottom:
                      "8px",

                    color: darkMode
                      ? "#0f172a"
                      : "white",
                  }}
                >
                  {
                    student.company ||
                    "Company Not Added"
                  }
                </h3>

                <p
                  style={{
                    fontSize:
                      "20px",

                    color:
                      "#93c5fd",

                    fontWeight:
                      "700",
                  }}
                >
                  {
                    student.package ||
                    "0"
                  }{" "}
                  LPA
                </p>

              </div>

            </div>
          )
        )}

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