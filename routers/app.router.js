let ViewsRouter = require('./views.router');
let UsersRouter = require('./users.router');

let AppRoutes = (app) => {
    app.use('/', ViewsRouter);
    app.use('/api/users', UsersRouter);
}

module.exports = AppRoutes;