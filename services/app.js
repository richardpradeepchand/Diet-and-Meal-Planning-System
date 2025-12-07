const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const mealRoutes = require('./routes/mealRoutes');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/v1/auth', authRoutes);
app.use('/v1/meal', mealRoutes);
app.use('/v1/user', userRoute);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app; 
