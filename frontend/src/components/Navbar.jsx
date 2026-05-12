import {
  Link,
  useNavigate,
} from "react-router-dom";

export default function Navbar() {
  const navigate =
    useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <div
      style={{
        width: "100%",

        background:
          "#111827",

        padding:
          "18px 40px",

        display: "flex",

        justifyContent:
          "space-between",

        alignItems:
          "center",

        position:
          "sticky",

        top: 0,

        zIndex: 1000,

        boxSizing:
          "border-box",
      }}
    >
      <h2
        style={{
          color:
            "#8b5cf6",

          margin: 0,
        }}
      >
        SmartPlace
      </h2>

      <div
        style={{
          display: "flex",

          gap: "25px",

          alignItems:
            "center",
        }}
      >
        <Link
          to="/dashboard"
          style={linkStyle}
        >
          Dashboard
        </Link>

        <Link
          to="/leaderboard"
          style={linkStyle}
        >
          Leaderboard
        </Link>

        <Link
          to="/experiences"
          style={linkStyle}
        >
          Experiences
        </Link>

        {user?.role ===
          "admin" && (
          <Link
            to="/admin"
            style={
              linkStyle
            }
          >
            Admin
          </Link>
        )}

        <button
          onClick={logout}
          style={{
            padding:
              "10px 18px",

            border:
              "none",

            borderRadius:
              "10px",

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
  );
}

const linkStyle = {
  color: "white",

  textDecoration:
    "none",

  fontWeight: "500",
};