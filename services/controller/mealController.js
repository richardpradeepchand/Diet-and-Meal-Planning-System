const Meal = require('../models/Meal');

// Create meal
const createMeal = async (req, res) => {
  try {
    const { user, name, calories, protein, carbs, fat, date } = req.body;
    const meal = new Meal({
      user: user,
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      date: date ? new Date(date) : new Date()
    });
    await meal.save();
    res.json(meal);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

const getMeals = async (req, res) => {
  try {
    const { date } = req.query;
    const query = { user: req.user.id };
    if (date) {
      const start = new Date(date);
      start.setHours(0,0,0,0);
      const end = new Date(start); end.setDate(end.getDate() + 1);
      query.date = { $gte: start, $lt: end };
    }
    const meals = await Meal.find(query).sort({ date: -1 });
    res.json(meals);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
};


const updateMeal = async (req, res) => {
  try {

    const updates = req.body;
    const meal = await Meal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true }
    );
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json(meal);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
};

const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
};

module.exports = { createMeal, getMeals, updateMeal, deleteMeal };
