const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
      const query = { role: 'user' };
      const users = await User.find(query).sort({ date: -1 });
      res.json(users);
    } catch (err) { res.status(500).json({ message: 'Server error' }); }
  };

  const deleteUser = async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id});
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: 'Server error' }); }
  };
  
  module.exports = { getUsers, deleteUser };
  
