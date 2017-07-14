const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_543rhqr5:kcqodK543rhqr5ZpxrRQrs5@ds161931.mlab.com:61931/heroku_543rhqr5');

module.exports.conn = mongoose.connection;
module.exports.mongoose = mongoose;
