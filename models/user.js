const mongoose = require('./db').mongoose;
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let userSchema = new schema({
        nome: String,
        _id: String,
        senha: String
});

const user = mongoose.model('User', userSchema);

module.exports = user;

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
