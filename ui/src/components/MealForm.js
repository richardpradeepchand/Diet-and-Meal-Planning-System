import React, { useState } from 'react';
import axios from "../api/axios";
import "../styles/MealForm.css";
import { useAuth } from "../context/AuthContext";

export default function MealForm({ onSaved, existing }) {
  const [form, setForm] = useState(existing || { name: '', calories: '', protein: '', carbs: '', fat: '' });
  const { user } = useAuth();
  const [message, setMessage] = useState("");


  const submit = async (e) => {
    e.preventDefault();
    try {
      
        await axios.post('/meal/create', { ...form, user: user._id });
      
  
      onSaved();
      setMessage("Meal saved successfully!");

    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };
  
  return (
    <form onSubmit={submit}>
      <input placeholder="Meal name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
      <input placeholder="Calories" type="number" value={form.calories} onChange={e=>setForm({...form, calories: Number(e.target.value)})} />
      <input placeholder="Protein (g)" type="number" value={form.protein} onChange={e=>setForm({...form, protein: Number(e.target.value)})} />
      <input placeholder="Carbs (g)" type="number" value={form.carbs} onChange={e=>setForm({...form, carbs: Number(e.target.value)})} />
      <input placeholder="Fat (g)" type="number" value={form.fat} onChange={e=>setForm({...form, fat: Number(e.target.value)})} />
      <button type="submit">Save Meal</button>
      {message && <p className="msg">{message}</p>}

    </form>
    
  );
}
