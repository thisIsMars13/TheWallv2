const express = require('express');
const ViewsRouter = express.Router();
const ViewsController = require('../controllers/views.controllers');

let viewsController = new ViewsController();

ViewsRouter.get('/login', (req, res) => {
    res.render('login');
});

ViewsRouter.get('/register', (req, res) => {
    res.render('registration');
});

ViewsRouter.get('/', (req, res) => {
    res.render('login');
});

module.exports = ViewsRouter;