import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-background");

    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

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
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Register for CyberX</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition font-bold py-3 rounded-md text-white"
          >
            Register
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 bg-gray-600 hover:bg-gray-700 py-2 rounded-md text-white"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
