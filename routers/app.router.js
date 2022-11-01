let ViewsRouter = require('./views.router');
let UsersRouter = require('./users.router');
let WallRouters = require('./wall.router');

let AppRoutes = (app) => {
    app.use('/', ViewsRouter);
    app.use('/api/users', UsersRouter);
    app.use('/api/wall', WallRouters);
}

module.exports = AppRoutes;