import { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post("/auth/login", form);
      login(data);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Incorrect email or password. Please try again.");
        }  else if (error.response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert(error.response.data.message || "Something went wrong.");
        }
      } else if (error.request) {
        alert("Network error. Please check your internet connection.");
      } else {
        alert("An unexpected error occurred.");
      }
  
      console.error("Login error:", error);
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>

      {/* ✅ Add Register link below the login form */}
      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}
