import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./scenes/register";
import Login from "./scenes/login";
import Challenges from "./scenes/challenges";
import Leaderboard from "./scenes/leaderboard";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    localStorage.setItem("auth", isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isAuthenticated ? <Challenges /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
