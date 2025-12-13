import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/MealTable.css";
import { useAuth } from "../context/AuthContext";

export default function MealTable() {
  const [meals, setMeals] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  
  const loadMeals = async () => {
    try {
      const res = await axios.get("/meal");
      setMeals(res.data);
    } catch (err) {
      console.error("Error loading meals:", err);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

 
  const deleteMeal = async (id) => {
    if (!window.confirm("Delete this meal?")) return;

    try {
      await axios.delete(`/meal/delete/${id}`);
      setMeals(meals.filter((m) => m._id !== id));
      setMessage("Meal deleted successfully!");

    } catch (err) {
      console.error("Delete error:", err);
    }
  };


  const startEditing = (meal) => {
    setEditingId(meal._id);
    setEditForm({
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
    });
  };

  
  const saveEdit = async () => {
    try {
      await axios.put(`/meal/update/${editingId}`, {
        ...editForm,
        user: user._id,
      });

      setMeals(
        meals.map((m) =>
          m._id === editingId ? { ...m, ...editForm } : m
        )
      );
      setMessage("Meal updated successfully!");

      setEditingId(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="meal-table-wrapper">
      <h2>Your Meals</h2>

      <table className="meal-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Protein (g)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {meals.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-row">No meals found.</td>
            </tr>
          ) : (
            meals.map((m) => (
              <tr key={m._id}>
                {editingId === m._id ? (
                  <>
                    <td>
                      <input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={editForm.calories}
                        onChange={(e) =>
                          setEditForm({ ...editForm, calories: Number(e.target.value) })
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={editForm.protein}
                        onChange={(e) =>
                          setEditForm({ ...editForm, protein: Number(e.target.value) })
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={editForm.carbs}
                        onChange={(e) =>
                          setEditForm({ ...editForm, carbs: Number(e.target.value) })
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={editForm.fat}
                        onChange={(e) =>
                          setEditForm({ ...editForm, fat: Number(e.target.value) })
                        }
                      />
                    </td>

                    <td>
                      <button onClick={saveEdit} className="save-btn">Save</button>
                      <button onClick={() => setEditingId(null)} className="cancel-btn">
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{m.name}</td>
                    <td>{m.calories}</td>
                    <td>{m.protein}</td>
                    <td>{m.carbs}</td>
                    <td>{m.fat}</td>

                    <td>
                      <button onClick={() => startEditing(m)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => deleteMeal(m._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>

      </table>
      {message && <p className="meal-msg">{message}</p>}

    </div>
  );
}
