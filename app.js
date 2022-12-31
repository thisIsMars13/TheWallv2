const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const store = new session.MemoryStore();
const { PORT, SESSION_NAME, SESSION_SECRET, SESSSION_EXPIRE_AT } = require('./config/constants/app.constants'); 


const app = express();

app.use(session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    cookie: { maxAge: SESSSION_EXPIRE_AT },
    saveUninitialized: false,
    store
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

const AppRoutes = require('./routers/app.router');
AppRoutes(app);

const port = 3000 || PORT;

app.listen(port, () =>  console.log(`Running on port ${port}`));