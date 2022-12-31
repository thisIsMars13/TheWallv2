let ViewsRouter = require('./views.router');
let UsersRouter = require('./users.router');
let WallsRouter = require('../routers/walls.router')

let AppRoutes = (app) => {
    app.use('/', ViewsRouter);
    app.use('/api/users', UsersRouter);
    app.use('/api/wall', WallsRouter);
}

module.exports = AppRoutes;