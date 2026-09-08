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

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/problem/:slug" element={<Problem />} />
          <Route path="/result/:slug" element={<LevelComplete />} />
          <Route path="/create" element={<CreateProblem />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/login" element={<Login initialMode="login" />} />
          <Route path="/signup" element={<Login initialMode="signup" />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
