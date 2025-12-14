const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    getUsers, deleteUser
} = require('../controller/userController');

router.get('/', auth, getUsers);
router.delete('/delete/:id', auth, deleteUser);

module.exports = router;
