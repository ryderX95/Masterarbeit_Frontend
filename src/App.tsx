import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./scenes/register";
import Login from "./scenes/login";
import Leaderboard from "./scenes/leaderboard";
import Rooms from "./scenes/rooms";
import InjectionRoom from "@/scenes/tasks/Injection";
import AuthenticationRoom from "@/scenes/tasks/Authentication";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:8000/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem("token");
            localStorage.removeItem("auth");
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          localStorage.removeItem("auth");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={isAuthenticated ? <Rooms /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/leaderboard"
          element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/rooms/injection-attacks"
          element={isAuthenticated ? <InjectionRoom /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/rooms/authentication"
          element={isAuthenticated ? <AuthenticationRoom /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
