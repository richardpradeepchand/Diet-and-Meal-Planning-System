const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, default: 0 }, // grams
  carbs: { type: Number, default: 0 },   // grams
  fat: { type: Number, default: 0 },     // grams
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Meal', MealSchema);
