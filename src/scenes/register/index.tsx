import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed: User may already exist!");
      console.error("❌ Registration Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" className="w-full bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">
            Register
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
