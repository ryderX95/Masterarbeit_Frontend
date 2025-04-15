import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setIsAuthenticated: (value: boolean) => void;
};

const Login = ({ setIsAuthenticated }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/"); 
    } catch (error) {
      alert("Login failed: Invalid credentials!");
      console.error("❌ Login Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded-md"
          />
          <button type="submit" className="w-full bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>
        <button
          onClick={() => navigate("/register")}
          className="w-full mt-4 bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
