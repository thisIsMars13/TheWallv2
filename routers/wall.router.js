const express = require('express');
const WallRouters = express.Router();
const WallControllers = require('../controllers/wall.controllers');

let wallControllers =  new WallControllers();

WallRouters.post('/create_post', wallControllers.createPost);

WallRouters.post('/create_comment', wallControllers.createComment);

module.exports = WallRouters;