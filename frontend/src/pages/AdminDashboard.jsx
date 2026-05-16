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

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCompanies();

    fetchStats();

  }, [
    fetchCompanies,
    fetchStats
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
          fontSize: "50px",

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
        Recruiter Advertisements
      </h2>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3,1fr)",

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