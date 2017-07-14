const express = require('express');

const auth = require('./auth/passport');
const index = require('./index');
const register = require('./register');
const chats = require('./chats');
const chatRoom = require('./chatRoom');

const loggedIn = (req, res, next) => {
        if(req.isAuthenticated())
          return next();
        return res.render('index', {error: false});
}

let router = express.Router();

router.get('/', loggedIn, index.get);
router.get('/auth_failed', index.getFail);

router.get('/register', register.get);
router.post('/register', register.post);

router.post('/login', auth.authenticate('login', {
        successRedirect : '/chats',
        failureRedirect : '/auth_failed',
        failureFlash: false
}));
router.get('/logout', auth.logout);

router.get('/chats', loggedIn, chats.get);
router.get('/chats/:id', loggedIn, chatRoom.get);

module.exports = router;
