const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongo')(session);
//express and middlewares

let routes = require('./routes/routes');
//import from app

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.set('port', 3000 || process.env.PORT);
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


let env = process.env.NODE_ENV || 'dev';

let forceSsl = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https')
        return res.redirect(['https://', req.get('Host'), req.url].join(''));

    return next();
 };


app.use((req, res, next) => {

    if (env !== 'dev')
        return forceSsl(req, res, next);

    return next();
});

app.use(session({
  secret: 'chatter',
  saveUninitialized: true,
  resave: true,
  store: new mongoStore({
    url: process.env.MONGODB_URI || 'mongodb://localhost/chat-ibilce',
    autoRemove: 'native'
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

let http = require('http').Server(app);
let io = require('socket.io')(http);
let handler = require('./routes/socket/handler');
let authFail = false;

http.listen(app.get('port'));

module.exports.chat = (room, user) => {
  handler(io, room, user);
};

module.exports.authFail = authFail;
