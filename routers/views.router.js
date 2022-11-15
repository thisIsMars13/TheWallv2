const express = require('express');
const ViewsRouter = express.Router();
const WallsController = require('../controllers/walls.controllers');

const wallsController = new WallsController();

ViewsRouter.get('/login', (req, res) => {
    if(req.session.general){
        res.redirect('/wall');
    }
    else{
        res.render('login');
    }
});

ViewsRouter.get('/register', (req, res) => {
    if(req.session.general){
        res.redirect('/wall');
    }
    else{
        res.render('registration');
    }
});

ViewsRouter.get('/', (req, res) => {
    if(req.session.general){
        res.redirect('/wall');
    }
    else{
        res.render('login');
    }
});

ViewsRouter.get('/wall', wallsController.renderWall);

module.exports = ViewsRouter;