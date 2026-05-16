import {
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  useTheme,
} from "../context/ThemeContext";

import bgImage from "../assets/college.jpg";

export default function MainLayout() {

  const location =
    useLocation();

  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  const isHome =
    location.pathname === "/";

  return (

    <div
      style={{
        minHeight:
          "100vh",

        backgroundColor:
          darkMode
            ? "#121212"
            : "#f5f5f5",

        color:
          darkMode
            ? "#ffffff"
            : "#000000",

        backgroundImage:
          isHome
            ? "none"
            : `url(${bgImage})`,

        backgroundSize:
          "cover",

        backgroundPosition:
          "center",

        backgroundRepeat:
          "no-repeat",

        backgroundAttachment:
          "fixed",

        transition:
          "0.3s",
      }}
    >

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }

        style={{
          position: "fixed",

          top: "20px",

          right: "20px",

          padding: "12px 18px",

          border:
            "1px solid rgba(255,255,255,0.25)",

          borderRadius:
            "14px",

          background: darkMode
            ? "rgba(255,255,255,0.12)"
            : "rgba(15,23,42,0.85)",

          color:
            "white",

          cursor:
            "pointer",

          fontWeight:
            "700",

          fontSize:
            "16px",

          backdropFilter:
            "blur(8px)",

          boxShadow:
            "0 8px 20px rgba(0,0,0,0.25)",

          zIndex:
            "9999",

          transition:
            "0.3s",
        }}
      >
        {darkMode
          ? "☀️ Light"
          : "🌙 Dark"}
      </button>

      <Outlet />

    </div>
  );
}