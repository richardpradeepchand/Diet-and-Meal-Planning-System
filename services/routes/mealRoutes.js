const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createMeal, getMeals,  updateMeal, deleteMeal
} = require('../controller/mealController');

router.get('/', auth, getMeals);
router.post('/create', auth, createMeal);
router.put('/update/:id', auth, updateMeal);
router.delete('/delete/:id', auth, deleteMeal);

module.exports = router;
