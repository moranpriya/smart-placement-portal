import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

export default function Dashboard() {

  const [companies,
    setCompanies] =
    useState([]);

  const [applications,
    setApplications] =
    useState([]);

  const navigate = useNavigate();

  const [resume,
    setResume] =
    useState(null);

  const user = useState(
    JSON.parse(
      localStorage.getItem("user")
    )
  )[0];

  const fetchCompanies =
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
    };

  const fetchApplications =
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
    };

  useEffect(() => {

    let mounted = true;

    const loadData =
      async () => {

        if (!mounted) return;

        await fetchCompanies();

        if (user?._id) {

          await fetchApplications();
        }
      };

    loadData();

    return () => {

      mounted = false;
    };

  },);

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

        await API.post(
          `/upload/resume/${user._id}`,
          data
        );

        alert(
          "Resume Uploaded Successfully"
        );

        const updatedUser = {
          ...user,
          resume: resume.name,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );

      } catch (error) {

        console.log(error);
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

  const checkEligibility =
    (
      company
    ) => {

      const allowedBranches =

        company.allowedBranches

          ?.split(",")

          .map(
            (
              branch
            ) =>

              branch
                .trim()
                .toLowerCase()
          );

      const cgpaEligible =

        Number(
          user.cgpa
        )

        >=

        Number(
          company.minCGPA
        );

      const branchEligible =

        allowedBranches?.includes(

          user.branch
            ?.trim()
            .toLowerCase()
        );

      const backlogEligible =

        Number(
          user.backlogs
        )

        <=

        Number(
          company.maxBacklogs
        );

      return (

        cgpaEligible

        &&

        branchEligible

        &&

        backlogEligible
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

      {/* HEADER */}

      <div
        style={{
          display:
            "flex",

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
              "42px",
          }}
        >
          Student Dashboard
        </h1>

        <div
          style={{
            display:
              "flex",

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

      {/* PROFILE */}

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

          justifyContent:
            "space-between",

          alignItems:
            "center",

          flexWrap:
            "wrap",

          gap:
            "20px",

          border:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >

        <div
          style={{
            display:
              "flex",

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

              background:
                "#111827",

              display:
                "flex",

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

                marginBottom:
                  "10px",
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
              Backlogs:
              {" "}
              {
                user?.backlogs
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
            </p>

          </div>

        </div>

        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap:
              "15px",

          }}
        >

          <button
            style={{
              padding:
                "12px 20px",

              border:
                "none",

              borderRadius:
                "12px",

              color:
                "white",

              background:
                "#2563eb",

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

      {/* RESUME */}

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

          onChange={(e) =>
            setResume(
              e.target.files[0]
            )
          }

          style={{
            color:
              "white",

            marginBottom:
              "20px",

            border:
              "1px solid rgba(255,255,255,0.08)",

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

      {/* COMPANY CARDS */}

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(3,1fr)",

          gap:
            "30px",
        }}
      >

        {companies.map(
          (
            company
          ) => {

            const eligible =
              checkEligibility(
                company
              );

            return (

              <div
                key={
                  company._id
                }

                style={{
                  background:
                    "#111827",

                  padding:
                    "30px",

                  borderRadius:
                    "24px",

                  minHeight:
                    "520px",

                  display:
                    "flex",

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
                    company.allowedBranches
                  }
                </p>

                <p>
                  Max Backlogs:
                  {" "}
                  {
                    company.maxBacklogs
                  }
                </p>

                <p
                  style={{
                    marginTop:
                      "15px",

                    color:
                      "#cbd5e1",
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

                  {eligible ? (

                    <div
                      style={{
                        color:
                          "#22c55e",

                        marginBottom:
                          "15px",

                        fontWeight:
                          "700",
                      }}
                    >
                      ✓ You are Eligible
                    </div>

                  ) : (

                    <div
                      style={{
                        color:
                          "#ef4444",

                        marginBottom:
                          "15px",

                        fontWeight:
                          "700",
                      }}
                    >
                      ✗ You are Not Eligible
                    </div>

                  )}

                  {alreadyApplied(
                    company._id
                  ) ? (

                    <button
                      disabled
                      style={{
                        ...applyButton,

                        background:
                          "#334155",
                      }}
                    >
                      Applied
                    </button>

                  ) : (

                    <button
                      disabled={
                        !eligible
                      }

                      onClick={() =>
                        applyCompany(
                          company._id
                        )
                      }

                      style={{
                        ...applyButton,

                        opacity:
                          eligible
                            ? 1
                            : 0.5,

                        cursor:
                          eligible
                            ? "pointer"
                            : "not-allowed",
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