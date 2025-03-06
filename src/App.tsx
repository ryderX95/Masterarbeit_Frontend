import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./scenes/login";
import Challenges from "./scenes/challenges";
import TaskAccordion from "@/scenes/tasks"; // Ensure this is correctly imported


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
        <Route path="/" element={isAuthenticated ? <Challenges /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
