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
app.set( process.env.PORT);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'chatter',
  saveUninitialized: true,
  resave: true,
  store: new mongoStore({
    url: 'mongodb://chat-ibilcedb:meuherokuapp@ds161931.mlab.com:61931/heroku_543rhqr5',
    autoRemove: 'native'
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

let http = require('http').Server(app);
let io = require('socket.io')(http);
let handler = require('./routes/socket/handler');

http.listen(app.get('port'));

module.exports.chat = (nsp) => {
  handler(io, nsp);
};
