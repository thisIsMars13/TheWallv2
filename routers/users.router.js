const express = require('express');
const UsersRouter = express.Router();
const UsersController = require('../controllers/users.controllers');

let usersController = new UsersController();

UsersRouter.post('/login', usersController.loginUser);

UsersRouter.post('/registration', usersController.registerUser);

module.exports = UsersRouter;
