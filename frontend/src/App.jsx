import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Leaderboard from "./pages/Leaderboard";
import Experiences from "./pages/Experiences";
import ResumeBuilder from "./pages/ResumeBuilder";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import bgImage from "./assets/college.jpg";

function MainLayout() {

  const location =
    useLocation();

  const isHome =
    location.pathname === "/";

  return (

    <div
      style={{
        minHeight:
          "100vh",

        backgroundImage:
          isHome
            ? "none"
            : `linear-gradient(
                rgba(0,0,0,0.65),
                rgba(0,0,0,0.65)
              ),
              url(${bgImage})`,

        backgroundSize:
          "cover",

        backgroundPosition:
          "center",

        backgroundAttachment:
          "fixed",
      }}
    >

      <Outlet />

    </div>
  );
}

export default function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route
          element={<MainLayout />}
        >
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/experiences"
            element={
              <ProtectedRoute>
                <Experiences />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resume-builder"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<h1>404 Not Found</h1>}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}