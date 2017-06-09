const express = require('express');
const auth = require('./auth/passport');
const index = require('./index');
const register = require('./register');
const chats = require('./chats');
const chatRoom = require('./chatRoom');
const logggedIn = (req, res, next) => {
        if(req.isAuthenticated())
                return next();
        return res.redirect('/');
}

let router = express.Router();

router.get('/', index.get);

router.get('/register', register.get);
router.post('/register', register.post);

router.post('/login', auth.authenticate('login', {
        successRedirect : '/chats',
        failureRedirect : '/',
        failureFlash : false
}));
router.get('/logout', auth.logout);

router.get('/chats', chats.get);
router.get('/chats/:id', chatRoom.get);

module.exports = router;
