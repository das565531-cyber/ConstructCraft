import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      alert("Admin Login Successful");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center px-6">

      <div className="absolute inset-0 bg-black/40"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/95 backdrop-blur-md w-full max-w-md p-8 rounded-3xl shadow-2xl"
      >

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🏗️
          </div>

          <h1 className="text-4xl font-bold">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            ConstructCraft Management Portal
          </p>

        </div>

        <input
          type="text"
          placeholder="Admin Username"
          className="w-full border p-4 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          className="w-full border p-4 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition"
        >
          Login as Admin
        </button>

        <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl mt-6">

          <p className="font-bold text-orange-600 mb-2">
            Demo Credentials
          </p>

          <p>
            Username: <b>admin</b>
          </p>

          <p>
            Password: <b>admin123</b>
          </p>

        </div>

        <div className="text-center mt-6">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-orange-500 hover:underline"
          >
            ← Back To Home
          </button>

        </div>

      </form>

    </div>
  );
}

export default AdminLogin;