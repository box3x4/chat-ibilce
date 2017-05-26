const express = require('express');

const index = require('./index');

let router = express.Router();

router.get('/', index.get);

module.exports = router;
