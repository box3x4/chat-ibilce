const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chat-ibilce');

module.exports.conn = mongoose.connection;
module.exports.mongoose = mongoose;
