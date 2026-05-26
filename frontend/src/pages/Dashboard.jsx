import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import {
  useTheme,
} from "../context/useTheme";

export default function Dashboard() {
  const [companies,
    setCompanies] =
    useState([]);

  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  const [applications,
    setApplications] =
    useState([]);

  const navigate = useNavigate();

  const [resume,
    setResume] =
    useState(null);

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      )
    );

  const fetchCompanies =
    useCallback(
      async () => {

        try {

          const res =
            await API.get(
              "/companies"
            );

          setCompanies(
            res.data
          );

        } catch (error) {

          console.log(error);
        }
      },
      []
    );

  const fetchApplications =
    useCallback(
      async () => {

        try {

          const res =
            await API.get(
              `/applications/${user._id}`
            );

          setApplications(
            res.data
          );

        } catch (error) {

          console.log(error);
        }
      },
      []
    );

  useEffect(() => {

    const loadData =
      async () => {
        await fetchCompanies();
        if (user?._id) {
          await fetchApplications();
        }
      };
    loadData();
  }, [
    user?._id,
    fetchCompanies,
    fetchApplications
  ]);

  const uploadResume =
    async () => {

      if (!resume) {

        return alert(
          "Select Resume"
        );
      }

      const data =
        new FormData();

      data.append(
        "resume",
        resume
      );

      try {

        const res =
          await API.post(
            `/upload/resume/${user._id}`,
            data
          );

        alert(
          "Resume Uploaded Successfully"
        );

        const updatedUser = {
          ...user,

          resume:
            res.data.resume,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );

        setUser(updatedUser);

      } catch (error) {

        console.log(error);

        alert(
          "Upload Failed"
        );
      }
    };

  const alreadyApplied =
    (
      companyId
    ) => {

      return applications.some(
        (app) =>
          app.company?._id ===
          companyId
      );
    };

  const applyCompany =
    async (
      companyId
    ) => {

      try {

        await API.post(
          "/applications/apply",
          {
            studentId:
              user._id,

            companyId:
              companyId,
          }
        );

        alert(
          "Applied Successfully"
        );

        fetchApplications();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Application Failed"
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

      <br />

      <div
        style={{
          display:
            "flex",
          flexWrap: "wrap",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          marginBottom:
            "40px",
        }}
      >

        <h1
          style={{
            fontSize:
              "50px",

            color: darkMode
              ? "#0f172a"
              : "white",

            WebkitTextStroke: "1px white",
          }}
        >
          Student Dashboard
        </h1>

        <div
          style={{
            display:
              "flex",

            flexWrap: "wrap",

            gap:
              "15px",
          }}
        >

          <Link
            to="/leaderboard"
            style={navButton}
          >
            Leaderboard
          </Link>

          <Link
            to="/experiences"
            style={navButton}
          >
            Experiences
          </Link>

        </div>

      </div>


      <div
        style={{
          backdropFilter:
            "blur(14px)",

          padding:
            "30px",

          borderRadius:
            "24px",

          marginBottom:
            "40px",

          display:
            "flex",

          flexWrap: "wrap",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          gap:
            "20px",

          border:
            "1px solid rgba(255,255,255,0.08)",

          background: darkMode
            ? "rgba(15,23,42,0.1)"
            : "rgba(255,255,255,0.15)",
        }}
      >

        <div
          style={{
            display:
              "flex",

            flexWrap: "wrap",

            alignItems:
              "center",

            gap:
              "20px",

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

              background: darkMode
                ? "#1e293b"
                : "white",

              color: darkMode
                ? "white"
                : "black",

              border: darkMode
                ? "1px solid #cbd5e1"
                : "1px solid #94a3b8",

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
                "700",
            }}
          >
            {
              user?.name?.charAt(0)
            }
          </div>

          <div>

            <h2
              style={{
                fontSize:
                  "30px",

                fontWeight:
                  "700",

                marginBottom:
                  "10px",

                color: "white",
              }}
            >
              {
                user?.name
              }
            </h2>

            <p>
              Email:
              {" "}
              {
                user?.email
              }
            </p>

            <p>
              Branch:
              {" "}
              {
                user?.branch
              }
            </p>

            <p>
              CGPA:
              {" "}
              {
                user?.cgpa
              }
            </p>

            <p>
              Batch:
              {" "}
              {
                user?.batch
              }
            </p>

            <p
              style={{
                color:
                  user?.resume
                    ? "#22c55e"
                    : "#ef4444",

                fontWeight:
                  "700",

                marginTop:
                  "8px",

              }}
            >
              {
                user?.resume
                  ? "✓ Resume Uploaded"
                  : "✗ Resume Not Uploaded"
              }

              {
                user?.resume && (

                  <div
                    style={{
                      marginTop: "12px",
                    }}
                  >

                    <a
                      href={`http://localhost:5000/uploads/${user.resume}`}

                      target="_blank"

                      rel="noreferrer"

                      style={{
                        color: "#60a5fa",

                        textDecoration: "none",

                        fontWeight: "700",

                        fontSize: "18px",
                      }}
                    >
                      View Resume
                    </a>

                  </div>
                )
              }
            </p>


          </div>

        </div>

        <div
          style={{
            display:
              "flex",
            flexWrap: "wrap",

            flexDirection:
              "column",

            gap:
              "15px",

          }}
        >

          <button
            onClick={() =>
              navigate("/edit-profile")
            }

            style={{
              padding:
                "12px 20px",

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
            }}
          >
            Edit Profile
          </button>

          <button
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              localStorage.removeItem(
                "user"
              );

              navigate("/login");
            }}

            style={{
              padding:
                "12px 20px",

              border:
                "none",

              borderRadius:
                "12px",

              background:
                "#ef4444",

              color:
                "white",

              cursor:
                "pointer",

              fontWeight:
                "600",
            }}
          >
            Logout
          </button>

        </div>

      </div>



      <div
        style={{
          backdropFilter:
            "blur(14px)",

          padding:
            "25px",

          marginBottom:
            "40px",

          borderRadius:
            "20px",

          border:
            "1px solid rgba(255,255,255,0.08)",

          background: darkMode
            ? "rgba(15,23,42,0.1)"
            : "rgba(255,255,255,0.15)",
        }}
      >

        <h2
          style={{
            marginBottom:
              "15px",
          }}
        >
          Upload Resume
        </h2>

        <input
          type="file"

          accept=".pdf"

          onChange={(e) =>
            setResume(
              e.target.files[0]
            )
          }

          style={{
            color
              : "white",

            marginBottom:
              "20px",

            border:
              "white solid 1px",

            borderRadius:
              "7px",
          }}
        />

        <br />

        <button
          onClick={
            uploadResume
          }

          style={uploadButton}
        >
          Upload Resume
        </button>

      </div>



      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",

          gap:
            "30px",

        }}
      >

        {companies.map(
          (
            company
          ) => {

            return (

              <div
                key={
                  company._id
                }

                style={{
                  background: darkMode
                    ? "#1e293b"
                    : "white",

                  color: darkMode
                    ? "white"
                    : "#0b1f59",

                  border: darkMode
                    ? "1px solid #cbd5e1"
                    : "1px solid #94a3b8",

                  padding:
                    "30px",

                  borderRadius:
                    "24px",

                  minHeight:
                    "520px",

                  display:
                    "flex",

                  flexWrap: "wrap",

                  flexDirection:
                    "column",

                  justifyContent:
                    "space-between",
                }}
              >

                <div
                  style={{
                    width:
                      "70px",

                    height:
                      "70px",

                    borderRadius:
                      "20px",

                    background:
                      "#8b5cf6",

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
                      "700",

                    marginBottom:
                      "25px",

                    color: darkMode
                      ? "white"
                      : "#0f172a",
                  }}
                >
                  {
                    company.companyName?.charAt(0)
                  }
                </div>

                <h2
                  style={{
                    fontSize:
                      "30px",

                    lineHeight:
                      "1.2",

                    marginBottom:
                      "10px",

                    color: darkMode
                      ? "white"
                      : "#0f172a",
                  }}
                >
                  {
                    company.companyName
                  }
                </h2>

                <p>
                  Role:
                  {" "}
                  {
                    company.role
                  }
                </p>

                <p>
                  Package:
                  {" "}
                  {
                    company.package
                  }
                  {" "}
                  LPA
                </p>

                <p>
                  Required CGPA:
                  {" "}
                  {
                    company.minCGPA
                  }
                </p>

                <p>
                  Allowed Branches:
                  {" "}
                  {
                    Array.isArray(
                      company.allowedBranches
                    )
                      ? company.allowedBranches.join(", ")
                      : company.allowedBranches
                  }
                </p>

                <p
                  style={{
                    marginTop:
                      "15px",

                    color: darkMode
                      ? "#cbd5e1"
                      : "#0f172a",
                  }}
                >
                  {
                    company.description
                  }
                </p>

                <div
                  style={{
                    marginTop:
                      "20px",
                  }}
                >

                  {
                    new Date(company.deadline) <
                      new Date() ? (

                      <button
                        disabled
                        style={{
                          ...applyButton,
                          background: "#ef4444",
                        }}
                      >
                        Deadline Passed
                      </button>

                    ) : alreadyApplied(
                      company._id
                    ) ? (

                      <button
                        disabled
                        style={{
                          ...applyButton,
                          background: "#334155",
                        }}
                      >
                        Applied
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          applyCompany(
                            company._id
                          )
                        }

                        style={{
                          ...applyButton,
                        }}
                      >
                        Apply Now
                      </button>

                    )}

                </div>

              </div>
            );
          }
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

const navButton = {

  padding:
    "12px 22px",

  borderRadius:
    "999px",

  background:
    "#8b5cf6",

  color:
    "white",

  textDecoration:
    "none",

  fontWeight:
    "600",
};

const applyButton = {

  width:
    "100%",

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
    "700",
};

const uploadButton = {

  padding:
    "12px 22px",

  border:
    "none",

  borderRadius:
    "12px",

  background:
    "#8b5cf6",

  color:
    "white",

  fontWeight:
    "700",

  cursor:
    "pointer",
};