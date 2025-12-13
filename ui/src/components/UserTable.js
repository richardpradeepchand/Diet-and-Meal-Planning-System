import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/UserTable.css";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  
  const loadUsers = async () => {
    try {
      const res = await axios.get("/user"); 
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/user/delete/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      setMessage("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="user-table-wrapper">
      <h2>User List</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-row">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {message && <p className="msg">{message}</p>}
    </div>
  );
}
