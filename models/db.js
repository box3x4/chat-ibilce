const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat-ibilce');

module.exports.conn = mongoose.connection;
module.exports.mongoose = mongoose;
