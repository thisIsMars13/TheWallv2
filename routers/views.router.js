const express = require('express');
const ViewsRouter = express.Router();
const ViewsController = require('../controllers/views.controllers');

let viewsController = new ViewsController();

ViewsRouter.get('/login', (req, res) => {
    if(req.session.general){
        res.redirect('/wall')
    }
    else{
        res.render('login');
    }
});

ViewsRouter.get('/register', (req, res) => {
    if(req.session.general){
        res.redirect('/wall')
    }
    else{
        res.render('registration');
    }
});

ViewsRouter.get('/', (req, res) => {
    if(req.session.general){
        res.redirect('/wall')
    }
    else{
        res.render('login');
    }
});

ViewsRouter.get('/wall', viewsController.renderWall);

module.exports = ViewsRouter;