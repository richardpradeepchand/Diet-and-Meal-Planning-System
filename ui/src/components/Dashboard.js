import React, { useState } from 'react';
import MealForm from './MealForm';
import MealTable from './MealTable';
import UserTable from './UserTable';
import "../styles/Dashboard.css";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showMealTable, setShowMealTable] = useState(false);
  const [showUserTable, setShowUserTable] = useState(false);

  const { user, logout } = useAuth();
  const role = user?.role || "user";

  
  const hideButtons = showForm || showMealTable || showUserTable;

  return (
    <div>
      <h2>Welcome {user?.name}</h2>
      {role === "user" && (
      <p>Daily goal: {user?.dailyCalorieGoal} kcal</p>
      )}
      {}
      {!hideButtons && (
        <div className="dashboard-buttons">
          {role === "user" && (
            <>
              <button
                onClick={() => {
                  setShowMealTable(false);
                  setShowForm(true);
                }}
              >
                Add Meal
              </button>

              <button
                onClick={() => {
                  setShowForm(false);
                  setShowMealTable(true);
                }}
              >
                View Meals
              </button>
            </>
          )}

          {role === "admin" && (
            <button
              onClick={() => {
                setShowForm(false);
                setShowMealTable(false);
                setShowUserTable(true);
              }}
            >
              View Users
            </button>
          )}

          {}
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      )}

      {}
      {showForm && (
        <div className="dashboard-section">
          <button onClick={() => setShowForm(false)} className="close-btn">Close</button>
          <MealForm onSaved={() => setShowForm(false)} />
        </div>
      )}

      {}
      {showMealTable && (
        <div className="dashboard-section">
          <button onClick={() => setShowMealTable(false)} className="close-btn">Close</button>
          <MealTable />
        </div>
      )}

      {}
      {showUserTable && role === "admin" && (
        <div className="dashboard-section">
          <button onClick={() => setShowUserTable(false)} className="close-btn">Close</button>
          <UserTable />
        </div>
      )}
    </div>
  );
}
