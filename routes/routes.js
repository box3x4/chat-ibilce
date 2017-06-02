const express = require('express');

const index = require('./index');
const register = require('./register');

let router = express.Router();

router.get('/', index.get);
router.get('/reg', register.get);
router.post('/reg', register.post);

module.exports = router;
