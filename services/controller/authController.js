const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { JWT_SECRET_KEY } = require("../config.js"); 


const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, dailyCalorieGoal } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = new User({
      name,
      email,
     password: hashedPassword,
      role,
      phone,
      dailyCalorieGoal: role === "admin" ? undefined : dailyCalorieGoal,
    });

    await user.save();

    res.status(201).json({ message: "Registration successful", user });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};





module.exports = { register};