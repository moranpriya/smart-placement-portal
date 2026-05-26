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
} from "../context/useTheme";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [companies, setCompanies] =
    useState([]);

  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  const [stats, setStats] =
    useState({});

  const [applications,
    setApplications] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      companyName: "",
      role: "",
      package: "",
      minCGPA: "",
      allowedBranches: "",
      deadline: "",
      description: "",
    });

  const handleChange =
    (e) => {

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

        await API.post("/companies", {

          ...formData,

          recruiter:
            "684f123456789abcdef1234",

          allowedBranches:
            formData.allowedBranches
              .split(",")
              .map((branch) =>
                branch.trim()
              ),
        });

        alert(
          "Job Posted Successfully"
        );

        setFormData({
          companyName: "",
          role: "",
          package: "",
          minCGPA: "",
          allowedBranches: "",
          deadline: "",
          description: "",
        });

        fetchCompanies();

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Post Job"
        );
      }
    };

  const fetchCompanies = useCallback(
    async () => {
      try {
        const res =
          await API.get("/companies");
        setCompanies(res.data);

      } catch (error) {
        console.log(error);
      }
    },

    []
  );

  const fetchStats = useCallback(
    async () => {
      try {
        const res =
          await API.get(
            "/applications/stats/overview"
          );

        setStats(
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
              "/applications/all"
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
        await fetchStats();
        await fetchApplications();
      };

    loadData();

  }, [
    fetchCompanies,
    fetchStats,
    fetchApplications,
  ]);

  const chartData = [
    {
      name: "Approved",
      value:
        stats.approved || 0,
    },

    {
      name: "Rejected",
      value:
        stats.rejected || 0,
    },

    {
      name: "Pending",
      value:
        stats.pending || 0,
    },
  ];

  const updateApplicationStatus =
    async (id, status) => {

      try {

        await API.put(

          `/applications/${id}`,

          {
            status,
          }
        );

        fetchApplications();

        fetchStats();

      } catch (error) {

        console.log(error);
      }
    };

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#facc15",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",

        color: "white",

        padding: "40px",
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

      <h1
        style={{
          fontSize: "60px",

          marginBottom:
            "30px",

          color: darkMode
            ? "#0f172a"
            : "white",

          WebkitTextStroke: "1px white",
        }}
      >
        Admin Dashboard
      </h1>

      <br />

      <form
        onSubmit={handleSubmit}

        style={{
          background: darkMode
            ? "rgba(15,23,42,0.1)"
            : "rgba(255,255,255,0.15)",

          color: darkMode
            ? "white"
            : "#0b1f59",

          backdropFilter: "blur(6px)",

          border: darkMode
            ? "1px solid #cbd5e1"
            : "1px solid #94a3b8",

          padding: "30px",

          borderRadius: "20px",

          marginBottom: "40px",

          display: "grid",

          gap: "15px",
        }}
      >

        <h2>
          Post New Job
        </h2>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
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
          value={formData.role}
          onChange={handleChange}
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
          type="number"
          name="package"
          placeholder="Package"
          value={formData.package}
          onChange={handleChange}
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
          type="number"
          name="minCGPA"
          placeholder="Minimum CGPA"
          value={formData.minCGPA}
          onChange={handleChange}
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
          name="allowedBranches"
          placeholder="Allowed Branches (CSE,ECE,ME)"
          value={formData.allowedBranches}
          onChange={handleChange}
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
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          style={{
            ...inputStyle,
            background: darkMode
              ? "#1e293b"
              : "white",

            color: "#757576",

            border: darkMode
              ? "1px solid #cbd5e1"
              : "1px solid #94a3b8",
          }}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          style={{
            ...inputStyle,

            minHeight: "120px",

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

        <button
          type="submit"

          style={{
            padding: "14px",

            border: "none",

            borderRadius: "12px",

            background: "#2563eb",

            color: "white",

            fontWeight: "700",

            cursor: "pointer",
          }}
        >
          Post Job
        </button>

      </form>

      <br />

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",

          gap: "20px",

          marginBottom:
            "40px",
        }}
      >
        <StatCard
          title="Total Applications"
          value={
            stats.total
          }
          darkMode={darkMode}
        />

        <StatCard
          title="Approved"
          value={
            stats.approved
          }
          darkMode={darkMode}
        />

        <StatCard
          title="Rejected"
          value={
            stats.rejected
          }
          darkMode={darkMode}
        />

        <StatCard
          title="Pending"
          value={
            stats.pending
          }
          darkMode={darkMode}
        />

        <StatCard
          title="Placement %"
          value={`${stats.percentage ?? 0}%`}
          darkMode={darkMode}
        />
      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "30px",

          marginBottom:
            "50px",
        }}
      >
        <div
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

            height:
              "400px",
          }}
        >
          <h2
            style={{
              marginBottom:
                "20px",

              color: darkMode
                ? "white"
                : "black",
            }}
          >
            Application Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {chartData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  )
                )}
              </Pie>

              <Tooltip
                contentStyle={{
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
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
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

            height:
              "400px",
          }}
        >
          <h2
            style={{
              marginBottom:
                "20px",

              color: darkMode
                ? "white"
                : "black",
            }}
          >
            Placement Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={
                  darkMode
                    ? "#475569"
                    : "#cbd5e1"
                }
              />

              <XAxis
                dataKey="name"
                stroke={
                  darkMode
                    ? "white"
                    : "black"
                }
              />

              <YAxis
                stroke={
                  darkMode
                    ? "white"
                    : "black"
                }
              />

              <Tooltip
                contentStyle={{
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

              <Bar
                dataKey="value"
                fill={
                  darkMode
                    ? "#8b5cf6"
                    : "#6366f1"
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2
        style={{
          marginBottom: "55px",

          fontSize: "40px",

          color: darkMode
            ? "black"
            : "white",

          WebkitTextStroke: "1px white",
        }}
      >
        Placement Opportunities
      </h2>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",

          gap: "30px",

          marginBottom: "40px",
        }}
      >
        {companies.map((company) => (

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
                "450px",

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
              Role: {company.role}
            </p>

            <p>
              Package: {company.package}
            </p>

            <p>
              Min CGPA: {company.minCGPA}
            </p>

            <p>
              Branches:
              {" "}
              {company.allowedBranches.join(", ")}
            </p>

            <p>
              Deadline:
              {" "}
              {new Date(
                company.deadline
              ).toLocaleDateString()}
            </p>

            <p
              style={{
                color: darkMode
                  ? "#cbd5e1"
                  : "#334155",

                lineHeight: "1.6",
              }}
            >
              {company.description}
            </p>

            <br />

            <div
              style={{
                background:
                  new Date(company.deadline) <
                    new Date()

                    ? "#ef4444"
                    : "#22c55e",

                padding:
                  "10px 0px",

                borderRadius:
                  "10px",

                fontWeight:
                  "700",

                fontSize:
                  "15px",

                color:
                  "white",

                textAlign:
                  "center",

                marginTop:
                  "10px",

                alignSelf:
                  "flex-start",

                width:
                  "100%",
              }}
            >
              {
                new Date(company.deadline) <
                  new Date()

                  ? "Closed"
                  : "Active"
              }
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",

          gap: "20px",

          marginBottom: "40px",

          flexWrap: "wrap",
        }}
      >

      </div>

      <h2
        style={{
          marginBottom:
            "35px",

          fontSize:
            "40px",

          color: darkMode
            ? "black"
            : "white",

          WebkitTextStroke:
            "1px white",
        }}
      >
        Student Applications
      </h2>

      <br />

      <div
        style={{
          display:
            "grid",

          gap:
            "25px",

          marginBottom:
            "50px",
        }}
      >

        {applications.map((app) => (

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

              borderRadius:
                "20px",

              padding:
                "25px",
            }}
          >

            <h2
              style={{
                marginBottom:
                  "10px",

                color: darkMode
                  ? "white"
                  : "#0f172a",


              }}
            >
              {app.student?.name}
            </h2>

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
              Role:
              {" "}
              {app.company?.role}
            </p>

            <a
              href={`http://localhost:5000/uploads/${app.student?.resume}`}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#60a5fa",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "17px",
              }}
            >
              View Resume
            </a>

            <p
              style={{
                marginTop:
                  "10px",

                fontWeight:
                  "700",

                color:
                  app.status ===
                    "Approved"

                    ? "#22c55e"

                    : app.status ===
                      "Rejected"

                      ? "#ef4444"

                      : "#facc15",
              }}
            >
              Status:
              {" "}
              {app.status}
            </p>

            <div
              style={{
                display:
                  "flex",

                gap:
                  "15px",

                marginTop:
                  "20px",
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
                  background:
                    "#22c55e",

                  border:
                    "none",

                  padding:
                    "10px 18px",

                  borderRadius:
                    "12px",

                  color:
                    "white",

                  fontWeight:
                    "700",

                  cursor:
                    "pointer",
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
                  background:
                    "#ef4444",

                  border:
                    "none",

                  padding:
                    "10px 18px",

                  borderRadius:
                    "12px",

                  color:
                    "white",

                  fontWeight:
                    "700",

                  cursor:
                    "pointer",
                }}
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>

      <br />

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

function StatCard({
  title,
  value,
  darkMode,
}) {
  return (
    <div
      style={{
        background: darkMode
          ? "#1e293b"
          : "white",

        color: darkMode
          ? "white"
          : "black",

        border: darkMode
          ? "1px solid #cbd5e1"
          : "1px solid black",

        padding: "25px",

        borderRadius: "20px",

        textAlign: "center",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",

          color: darkMode
            ? "#cbd5e1"
            : "#475569",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          fontSize: "42px",

          color: darkMode
            ? "white"
            : "black",
        }}
      >
        {value ?? 0}
      </h1>
    </div>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: "16px",
};