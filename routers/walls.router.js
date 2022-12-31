const express = require('express');
const WallsRouter = express.Router();
const WallsController = require('../controllers/walls.controllers');

let wallsController = new WallsController();

WallsRouter.post('/create_post', wallsController.createPost);
WallsRouter.post('/create_comments', wallsController.createComment);
WallsRouter.post('/delete_posts', wallsController.deletePost);

module.exports = WallsRouter;