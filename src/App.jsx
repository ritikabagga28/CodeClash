import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import Problem from "./pages/Problem";
import LevelComplete from "./pages/LevelComplete";
import CreateProblem from "./pages/CreateProblem";
import Achievements from "./pages/Achievements";
import ProgressPage from "./pages/Progress";
import Login from "./pages/Login";
import SettingsPage from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/:slug"
            element={
              <ProtectedRoute>
                <Problem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result/:slug"
            element={
              <ProtectedRoute>
                <LevelComplete />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateProblem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/achievements"
            element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login initialMode="login" />} />
          <Route path="/signup" element={<Login initialMode="signup" />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
