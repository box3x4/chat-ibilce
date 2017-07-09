const mongoose = require('./db').mongoose;
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new schema({
        username: String,
        senha: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.newUser = (newUser, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.senha, salt, (err, hash) => {
                        newUser.senha= hash;
                        newUser.save(callback);
                });
        });
};

module.exports.comparePassword = (cPass, hash, callback) => {
        bcrypt.compare(cPass, hash, (err, match) => {
                if(err) console.log(err);
                callback(null, match);
        });
};

module.exports.getUserByUsername = (username, callback) => {

  User.findOne({username: username}, callback);
};

module.exports.getUserById = (id, callback) => {

  User.findById(id, callback);
};
