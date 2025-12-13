const express = require("express");
const { register, login ,getAllUsers, deleteInactive} = require("../controller/authController");
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get('/users', auth,  getAllUsers);
router.delete('/users/inactive', auth,  deleteInactive);
module.exports = router;
