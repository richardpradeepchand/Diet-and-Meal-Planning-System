import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
    dailyCalorieGoal: ""
  });
  
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Email already in use");
        } else if (error.response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert(error.response.data.message || "Something went wrong.");
        }
      } else if (error.request) {
        alert("Network error. Please check your internet connection.");
      } else {
        alert("An unexpected error occurred.");
      }

      console.error("Registration error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />

        <select name="role" onChange={handleChange} value={form.role}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Show calorie goal only for customers */}
        {form.role === "user" && (
          <input
            name="dailyCalorieGoal"
            placeholder="Daily Calorie Goal"
            type="number"
            value={form.dailyCalorieGoal}
            onChange={handleChange}
          />
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
