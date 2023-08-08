const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/user.controllers');
const usersController = new UsersController();

router.post('/users/signup', usersController.createUser);
router.get('/users/:id', usersController.getUserById);
router.post('/users/login', usersController.login);

module.exports = router;
