const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/chat-ibilce');
mongoose.connect('mongodb://chat-ibilcedb:meuherokuapp@ds161931.mlab.com:61931/heroku_543rhqr5');

module.exports.conn = mongoose.connection;
module.exports.mongoose = mongoose;
