const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat_ibilce');

module.exports.conn = mongoose.connection;
module.exports.mongoose = mongoose;
