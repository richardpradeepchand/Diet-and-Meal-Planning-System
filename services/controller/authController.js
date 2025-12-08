const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { JWT_SECRET_KEY } = require("../config.js"); 

const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, dailyCalorieGoal } = req.body;
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


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, { expiresIn: "7d" });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
};

const deleteInactive = async (req, res) => {
  try {
    const days = parseInt(req.query.days, 10) || 30;
    const cutoff = new Date(Date.now() - days * 24*60*60*1000);
    const result = await User.deleteMany({ lastActive: { $lt: cutoff } });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
};

module.exports = { register, login, getAllUsers, deleteInactive };