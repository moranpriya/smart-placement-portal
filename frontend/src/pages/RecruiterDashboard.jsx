import {
    useEffect,
    useState,
    useCallback,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    useTheme,
} from "../context/ThemeContext";

import API from "../services/api";

export default function RecruiterDashboard() {

    const [jobs,
        setJobs] =
        useState([]);

    const {
        darkMode,
        setDarkMode,
    } = useTheme();

    const [applications,
        setApplications] =
        useState([]);

    const [formData,
        setFormData] =
        useState({
            role: "",
            package: "",
            minCGPA: "",
            allowedBranches: "",
            deadline: "",
            description: "",
        });

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleChange = (
        e
    ) => {

        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    const fetchJobs = useCallback(

        async () => {

            try {

                const res =
                    await API.get("/companies");

                setJobs(res.data);

            } catch (error) {

                console.log(error);
            }
        },

        []
    );

    const fetchApplications =
        async () => {

            try {

                const res =
                    await API.get(
                        "/applications/recruiter"
                    );

                setApplications(
                    res.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchJobs();

        fetchApplications();

    }, [fetchJobs]);

    const updateApplicationStatus =
        async (
            id,
            status
        ) => {

            try {

                await API.put(
                    `/applications/${id}`,
                    { status }
                );

                fetchApplications();

            } catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchJobs();

    }, [fetchJobs]);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                await API.post(
                    "/companies",
                    {
                        ...formData,

                        recruiter:
                            user?._id,

                        companyName: user?.companyName,
                    }
                );

                alert(
                    "Job Posted Successfully"
                );

                setFormData({
                    role: "",
                    package: "",
                    minCGPA: "",
                    allowedBranches: "",
                    deadline: "",
                    description: "",
                });

                fetchJobs();

            } catch (error) {

                console.log(error);

                alert(
                    "Failed To Post Job"
                );
            }
        };

    return (

        <div
            style={{
                padding:
                    "40px",

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
                        "40px",
                }}
            >

<br />
                <h1
                    style={{
                        fontSize: "clamp(38px, 8vw, 72px)",

                        fontWeight:
                            "900",

                        marginBottom:
                            "10px",

                        display: "flex",

                        justifyContent: "center",

                        flexWrap: "wrap",

                        color: darkMode
                            ? "#0f172a"
                            : "white",

                        WebkitTextStroke: "1px white",

                    }}
                >
                    Recruiter Dashboard
                </h1>

                <p
                    style={{
                        fontSize:
                            "35px",

                        fontWeight:
                            "800",

                        color: darkMode
                            ? "black"
                            : "white",
                    }}
                >
                    <br />
                    Welcome,
                    {" "}
                    {
                        user?.companyName
                    }
                </p>

            </div>

            {/* FORM */}

            <form
                onSubmit={
                    handleSubmit
                }

                style={{
                    background: darkMode
                        ? "rgba(15,23,42,0.1)"
                        : "rgba(255,255,255,0.15)",

                    backdropFilter:
                        "blur(12px)",

                    padding:
                        "30px",

                    borderRadius:
                        "24px",

                    marginBottom:
                        "50px",

                    border:
                        "1px solid rgba(255,255,255,0.4)",
                }}
            >

                <h2
                    style={{
                        textAlign:
                            "center",

                        color:
                            "white",

                        fontSize:
                            "40px",

                        fontWeight:
                            "800",

                        marginBottom:
                            "30px",

                    }}
                >
                    Post New Job
                </h2>

                <div
                    style={{
                        display:
                            "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(300px,1fr))",

                        gap:
                            "20px",
                    }}
                >

                    <input
                        type="text"
                        name="role"
                        placeholder="Job Role"

                        value={
                            formData.role
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
                        type="number"
                        name="package"
                        placeholder="Package (LPA)"

                        value={
                            formData.package
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
                        type="number"
                        name="minCGPA"
                        placeholder="Minimum CGPA"

                        value={
                            formData.minCGPA
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
                        type="text"
                        name="allowedBranches"
                        placeholder="eg:CSE, ECE, ME"

                        value={
                            formData.allowedBranches
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
                        type="date"
                        name="deadline"

                        value={
                            formData.deadline
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

                </div>

                <textarea
                    name="description"
                    placeholder="Job Description"

                    value={
                        formData.description
                    }

                    onChange={
                        handleChange
                    }

                    style={{
                        ...input,

                        marginTop:
                            "20px",

                        minHeight:
                            "120px",

                        width:
                            "100%",

                        boxSizing: "border-box",

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
                        marginTop:
                            "20px",

                        width:
                            "100%",

                        padding:
                            "16px",

                        border:
                            "none",

                        borderRadius:
                            "14px",

                        background:
                            "#2563eb",

                        color:
                            "white",

                        fontSize:
                            "22px",

                        fontWeight:
                            "700",

                        cursor:
                            "pointer",
                    }}
                >
                    + Post Job
                </button>

            </form>

            {/* JOBS */}

            <h2
                style={{
                    marginBottom:
                        "25px",

                    fontSize:
                        "42px",
                }}
            >
                Posted Jobs
            </h2>

            <div
                style={{
                    display:
                        "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(300px,1fr))",

                    gap:
                        "25px",
                }}
            >

                {jobs.map(
                    (job) => (

                        <div
                            key={job._id}

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

                                backdropFilter:
                                    "blur(10px)",

                                borderRadius:
                                    "22px",

                                padding:
                                    "25px",

                                boxShadow:
                                    "0 10px 30px rgba(0,0,0,0.25)",
                            }}
                        >

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
                                        "20px",
                                }}
                            >

                                <div>

                                    <div>
                                        <p
                                            style={{
                                                color: darkMode
                                                    ? "white"
                                                    : "#0b1f59",

                                                margin: "0",


                                                fontWeight:
                                                    "800",

                                                fontSize: "30px",

                                                textAlign: "middle",
                                            }}
                                        >
                                            {
                                                job.role
                                            }
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div
                                style={{
                                    marginBottom:
                                        "20px",
                                }}
                            >

                                <h4
                                    style={{
                                        color:
                                            "#9ca3af",

                                        marginBottom:
                                            "15px",
                                    }}
                                >
                                    ELIGIBILITY CRITERIA
                                </h4>

                                <p>
                                    <strong>
                                        Min CGPA:
                                    </strong>
                                    {" "}
                                    {
                                        job.minCGPA
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Allowed Branches:
                                    </strong>
                                    {" "}
                                    {
                                        job.allowedBranches
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Package:
                                    </strong>
                                    {" "}
                                    {
                                        job.package
                                    }
                                    {" "}
                                    LPA
                                </p>

                            </div>

                            <div
                                style={{
                                    padding:
                                        "15px",

                                    borderRadius:
                                        "14px",

                                    marginBottom:
                                        "18px",
                                }}
                            >

                                <p>
                                    <strong>
                                        Deadline:
                                    </strong>
                                    {" "}
                                    {
                                        job.deadline
                                    }
                                </p>

                            </div>

                            <p
                                style={{
                                    color: darkMode
                                        ? "#d1d5db"
                                        : "black",

                                    lineHeight:
                                        "1.7",
                                }}
                            >
                                {
                                    job.description
                                }
                            </p>

                            <br />

                            <div
                                style={{
                                    background:
                                        "#22c55e",

                                    padding:
                                        "7px 14px",

                                    borderRadius:
                                        "999px",

                                    fontWeight:
                                        "700",

                                    fontSize:
                                        "14px",
                                }}
                            >
                                Active
                            </div>

                        </div>
                    )
                )}

            </div>

            <h2
                style={{
                    marginTop: "60px",

                    marginBottom: "25px",

                    fontSize: "42px",
                }}
            >
                Applicants
            </h2>

            <div
                style={{
                    display: "grid",

                    gap: "20px",
                }}
            >
                {applications.map(
                    (app) => (

                        <div
                            key={app._id}

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

                                padding: "20px",

                                borderRadius: "16px",
                            }}
                        >

                            <h3>
                                {app.student?.name}
                            </h3>

                            <p>
                                Email:
                                {" "}
                                {app.student?.email}
                            </p>

                            <p>
                                Company:
                                {" "}
                                {app.company?.companyName}
                            </p>

                            <p>
                                Status:
                                {" "}

                                <span
                                    style={{
                                        color:
                                            app.status === "Approved"
                                                ? "#22c55e"
                                                : app.status === "Rejected"
                                                    ? "#ef4444"
                                                    : "#facc15",

                                        fontWeight:
                                            "700",
                                    }}
                                >
                                    {
                                        app.status.charAt(0).toUpperCase() +
                                        app.status.slice(1)
                                    }
                                </span>
                            </p>

                            {app.student?.resume && (

                                <a
                                    href={`http://localhost:5000/uploads/${app.student.resume}`}

                                    target="_blank"

                                    rel="noreferrer"

                                    style={{
                                        color: "#60a5fa",

                                        textDecoration:
                                            "none",

                                        fontWeight:
                                            "600",
                                    }}
                                >
                                    View Resume
                                </a>
                            )}

                            <div
                                style={{
                                    display: "flex",

                                    gap: "10px",

                                    marginTop: "15px",
                                }}
                            >

                                <button
                                    onClick={() =>
                                        updateApplicationStatus(
                                            app._id,
                                            "Approved"
                                        )
                                    }

                                    style={{
                                        background: "#22c55e",

                                        color: "white",

                                        border: "none",

                                        padding: "10px 16px",

                                        borderRadius: "10px",

                                        cursor: "pointer",
                                    }}
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() =>
                                        updateApplicationStatus(
                                            app._id,
                                            "Rejected"
                                        )
                                    }

                                    style={{
                                        background: "#ef4444",

                                        color: "white",

                                        border: "none",

                                        padding: "10px 16px",

                                        borderRadius: "10px",

                                        cursor: "pointer",
                                    }}
                                >
                                    Reject
                                </button>

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

const input = {

    padding:
        "14px",

    borderRadius:
        "10px",

    fontSize:
        "16px",

    outline:
        "none",

    background:
        "#1e293b",

    border:
        "1px solid #cbd5e1",

    color:
        "#111827",
};