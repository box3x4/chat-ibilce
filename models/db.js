const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://chat-ibilcedb:meuherokuapp@ds161931.mlab.com:61931/heroku_543rhqr5');

module.exports.conn = mongoose.connection;
module.exports.mongoose = mongoose;
