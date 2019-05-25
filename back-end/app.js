const userCtrl = require('./controller/user-controller');
const loginCtrl = require('./controller/login-controller');

const express = require('express');
const session = require('express-session');

// initialize session
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelizeSession = new Sequelize(
    "sessionDB",
    "root",
    "",
    {
        "dialect": "sqlite",
        "storage": "./session.sqlite"
    }
);
sequelizeSession.sync();

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(session({
    secret: 'Ericko Yaputro',
    store: new SequelizeStore({
        db: sequelizeSession,
        expiration: 60*60*1000 // in milliseconds
    }),
    resave: false,
    proxy: true,
    cookie: {
        expires: 600000,
        secure: false
    }
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var sessionChecker = function(req, res, next){
    console.log(req.session);
    if (req.session.email && req.cookies.email) {
        next();
    } else {
        res.write(JSON.stringify({
            message: "You have to login first",
            command: 'REDIRECT_TO_LOGIN'
        }));
        res.end();
    }
};

// routing
app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`Created by Ericko Yaputro. See the documentation on POSTMAN collection included in the code.
            <br><br>[GET] Get All User: <br>"/user"
            <br><br>[GET] Get One User: <br>"/user/:id"
            <br><br>[GET] Get One User By Identity: <br>"/user/identity/:id"
            <br><br>[GET] Get One User By Account: <br>"/user/account/:id"
            <br><br>[POST] Add User: <br>"/user"
            <br><br>[PUT] Update User: <br>"/user/:id"
            <br><br>[DELETE] Delete User: <br>"/user/:id"
        `);
    res.end();
});
app.get('/user', sessionChecker, userCtrl.getAll);
app.get('/user/:id', sessionChecker, userCtrl.get);
app.get('/user/identity/:id', sessionChecker, userCtrl.getByIdentityNumber);
app.get('/user/account/:id', sessionChecker, userCtrl.getByAccountNumber);
app.post('/user', sessionChecker, userCtrl.add);
app.put('/user/:id', sessionChecker, userCtrl.update);
app.delete('/user/:id', sessionChecker, userCtrl.delete);

app.post('/login',loginCtrl.login);
app.get('/logout', loginCtrl.logout);

app.listen(port, function(){ console.log(`Listen on port ${port}!`); });